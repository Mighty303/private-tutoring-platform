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
