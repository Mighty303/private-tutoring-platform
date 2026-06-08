import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users — list users (admin: all; classroom member: ?classroomId=id for that classroom)
export async function GET(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const classroomId = searchParams.get("classroomId") || null;

  const sql = getDb();

  if (classroomId) {
    // Classroom-scoped: only for classroom members (or admin)
    const isAdmin = session.user.role === "admin";
    if (!isAdmin) {
      const memberCheck = await sql`
        SELECT 1 FROM classroom_members
        WHERE classroom_id = ${classroomId} AND user_id = ${session.user.dbId}
      `;
      if (memberCheck.length === 0) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
    const users = await sql`
      SELECT u.id, u.name, u.email, u.image, u.role, u.created_at
      FROM classroom_members cm
      JOIN users u ON u.id = cm.user_id
      WHERE cm.classroom_id = ${classroomId}
      ORDER BY u.name
    `;
    return NextResponse.json(users);
  }

  // No classroomId: admin only
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await sql`
    SELECT id, name, email, image, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  return NextResponse.json(users);
}
