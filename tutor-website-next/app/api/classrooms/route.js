import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/classrooms — list classrooms (admin sees all, students see theirs)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();

  if (session.user.role === "admin") {
    const classrooms = await sql`
      SELECT c.*, 
        (SELECT COUNT(*) FROM classroom_members cm WHERE cm.classroom_id = c.id) as member_count
      FROM classrooms c
      ORDER BY c.created_at DESC
    `;
    return NextResponse.json(classrooms);
  }

  // Students see only their classrooms
  const classrooms = await sql`
    SELECT c.*, cm.joined_at
    FROM classrooms c
    JOIN classroom_members cm ON cm.classroom_id = c.id
    JOIN users u ON u.id = cm.user_id
    WHERE u.email = ${session.user.email}
    ORDER BY cm.joined_at DESC
  `;
  return NextResponse.json(classrooms);
}

// POST /api/classrooms — create a classroom (admin only)
export async function POST(request) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, description } = await request.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const sql = getDb();
  const adminRows = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
  if (adminRows.length === 0) {
    return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
  }

  const rows = await sql`
    INSERT INTO classrooms (name, description, created_by)
    VALUES (${name.trim()}, ${description?.trim() || null}, ${adminRows[0].id})
    RETURNING *
  `;

  return NextResponse.json(rows[0], { status: 201 });
}
