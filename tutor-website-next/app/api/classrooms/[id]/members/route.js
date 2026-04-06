import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/classrooms/[id]/members — list members of a classroom
export async function GET(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const sql = getDb();

  const members = await sql`
    SELECT u.id, u.name, u.email, u.image, cm.joined_at
    FROM classroom_members cm
    JOIN users u ON u.id = cm.user_id
    WHERE cm.classroom_id = ${id}
    ORDER BY cm.joined_at DESC
  `;

  return NextResponse.json(members);
}

// POST /api/classrooms/[id]/members — add a user to a classroom
export async function POST(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const sql = getDb();
  await sql`
    INSERT INTO classroom_members (classroom_id, user_id)
    VALUES (${id}, ${userId})
    ON CONFLICT (classroom_id, user_id) DO NOTHING
  `;

  return NextResponse.json({ ok: true });
}

// DELETE /api/classrooms/[id]/members?userId=X — remove a user from a classroom
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const sql = getDb();
  await sql`
    DELETE FROM classroom_members
    WHERE classroom_id = ${id} AND user_id = ${userId}
  `;

  return NextResponse.json({ ok: true });
}
