import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

// POST /api/classrooms/[id]/invite — generate a single-use invite link (admin only)
export async function POST(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const sql = getDb();

  // Verify classroom exists
  const classroom = await sql`SELECT id, name FROM classrooms WHERE id = ${id}`;
  if (classroom.length === 0) {
    return NextResponse.json({ error: "Classroom not found" }, { status: 404 });
  }

  // Get admin user id
  const adminRows = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;

  // Generate a unique invite code
  const code = crypto.randomBytes(16).toString("hex");

  // Expires in 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const rows = await sql`
    INSERT INTO invite_links (code, classroom_id, created_by, expires_at)
    VALUES (${code}, ${id}, ${adminRows[0].id}, ${expiresAt.toISOString()})
    RETURNING *
  `;

  return NextResponse.json({
    ...rows[0],
    url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/invite/${code}`,
  }, { status: 201 });
}

// GET /api/classrooms/[id]/invite — list invites for a classroom (admin only)
export async function GET(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const sql = getDb();

  const invites = await sql`
    SELECT il.*, u.name as used_by_name, u.email as used_by_email
    FROM invite_links il
    LEFT JOIN users u ON u.id = il.used_by
    WHERE il.classroom_id = ${id}
    ORDER BY il.created_at DESC
  `;

  return NextResponse.json(invites);
}
