import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/homework/admin — admin fetches all assignments with classroom info and completion counts
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const sql = getDb();

    const assignments = await sql`
      SELECT
        ha.id,
        ha.title,
        ha.exercise_slug,
        ha.due_date,
        ha.classroom_id,
        ha.created_at,
        c.name AS classroom_name,
        (
          SELECT COUNT(DISTINCT s.user_id)
          FROM submissions s
          WHERE s.exercise_slug = ha.exercise_slug
        ) AS completion_count
      FROM homework_assignments ha
      LEFT JOIN classrooms c ON c.id = ha.classroom_id
      ORDER BY ha.due_date DESC, ha.title, ha.exercise_slug
    `;

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching admin homework:", error);
    return NextResponse.json({ error: "Failed to fetch homework" }, { status: 500 });
  }
}
