import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/invite/[code]/join — use an invite link to join a classroom
export async function POST(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized — please sign in first" }, { status: 401 });
  }

  const { code } = await params;
  const sql = getDb();

  // Find the invite
  const invites = await sql`
    SELECT il.*, c.name as classroom_name
    FROM invite_links il
    JOIN classrooms c ON c.id = il.classroom_id
    WHERE il.code = ${code}
  `;

  if (invites.length === 0) {
    return NextResponse.json({ error: "Invalid invite link" }, { status: 404 });
  }

  const invite = invites[0];

  // Check if already used
  if (invite.used_by) {
    return NextResponse.json({ error: "This invite link has already been used" }, { status: 410 });
  }

  // Check if expired
  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: "This invite link has expired" }, { status: 410 });
  }

  // Get the current user from DB
  const userRows = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
  if (userRows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const userId = userRows[0].id;

  // Check if already a member
  const existing = await sql`
    SELECT id FROM classroom_members 
    WHERE classroom_id = ${invite.classroom_id} AND user_id = ${userId}
  `;
  if (existing.length > 0) {
    // Mark invite as used even if already a member
    await sql`
      UPDATE invite_links SET used_by = ${userId}, used_at = NOW() WHERE id = ${invite.id}
    `;
    return NextResponse.json({
      message: "You are already a member of this classroom",
      classroom_name: invite.classroom_name,
      already_member: true,
    });
  }

  // Add user to classroom and mark invite as used (transaction-like)
  await sql`
    INSERT INTO classroom_members (classroom_id, user_id)
    VALUES (${invite.classroom_id}, ${userId})
  `;

  await sql`
    UPDATE invite_links SET used_by = ${userId}, used_at = NOW() WHERE id = ${invite.id}
  `;

  return NextResponse.json({
    message: "Successfully joined the classroom!",
    classroom_name: invite.classroom_name,
    already_member: false,
  });
}

// GET /api/invite/[code]/join — get invite info (for the join page)
export async function GET(request, { params }) {
  const { code } = await params;
  const sql = getDb();

  const invites = await sql`
    SELECT il.id, il.code, il.used_by, il.expires_at, c.name as classroom_name, c.description as classroom_description
    FROM invite_links il
    JOIN classrooms c ON c.id = il.classroom_id
    WHERE il.code = ${code}
  `;

  if (invites.length === 0) {
    return NextResponse.json({ error: "Invalid invite link" }, { status: 404 });
  }

  const invite = invites[0];
  const expired = new Date(invite.expires_at) < new Date();
  const used = !!invite.used_by;

  return NextResponse.json({
    classroom_name: invite.classroom_name,
    classroom_description: invite.classroom_description,
    expired,
    used,
    valid: !expired && !used,
  });
}
