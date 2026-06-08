import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/classrooms/memberships — all classroom memberships (admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sql = getDb();
  const rows = await sql`
    SELECT cm.user_id, cm.classroom_id, c.name AS classroom_name
    FROM classroom_members cm
    JOIN classrooms c ON c.id = cm.classroom_id
    ORDER BY c.name
  `;

  return NextResponse.json(rows);
}
