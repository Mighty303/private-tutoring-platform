import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/homework/student-status
// Returns all non-admin users, each with the assignments that apply to them
// (via classroom membership OR individual assignment) and per-exercise completion status.
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

    // Union of classroom-based and individually-assigned homework rows per user
    const rows = await sql`
      WITH user_assignments AS (
        SELECT ha.id, ha.title, ha.exercise_slug, ha.due_date, ha.classroom_id, cm.user_id
        FROM homework_assignments ha
        JOIN classroom_members cm ON cm.classroom_id = ha.classroom_id
        UNION
        SELECT ha.id, ha.title, ha.exercise_slug, ha.due_date, ha.classroom_id, hsa.user_id
        FROM homework_assignments ha
        JOIN homework_student_assignments hsa ON hsa.assignment_id = ha.id
      )
      SELECT
        u.id           AS user_id,
        u.name         AS user_name,
        u.email        AS user_email,
        u.image        AS user_image,
        ua.id          AS assignment_id,
        ua.title,
        ua.exercise_slug,
        ua.due_date,
        ua.classroom_id,
        c.name         AS classroom_name,
        s.created_at   AS submitted_at
      FROM users u
      LEFT JOIN user_assignments ua ON ua.user_id = u.id
      LEFT JOIN classrooms c ON c.id = ua.classroom_id
      LEFT JOIN LATERAL (
        SELECT created_at FROM submissions
        WHERE user_id = u.id AND exercise_slug = ua.exercise_slug
        ORDER BY created_at DESC LIMIT 1
      ) s ON ua.exercise_slug IS NOT NULL
      WHERE u.role != 'admin'
      ORDER BY u.name, ua.due_date DESC NULLS LAST, ua.title, ua.exercise_slug
    `;

    // Group flat rows into structured student objects
    const studentMap = new Map();
    for (const row of rows) {
      if (!studentMap.has(row.user_id)) {
        studentMap.set(row.user_id, {
          user_id: row.user_id,
          user_name: row.user_name,
          user_email: row.user_email,
          user_image: row.user_image,
          assignments: new Map(),
        });
      }
      const student = studentMap.get(row.user_id);
      if (row.assignment_id) {
        const key = `${row.title}__${row.due_date}`;
        if (!student.assignments.has(key)) {
          student.assignments.set(key, {
            title: row.title,
            due_date: row.due_date,
            classroom_name: row.classroom_name,
            exercises: [],
          });
        }
        student.assignments.get(key).exercises.push({
          exercise_slug: row.exercise_slug,
          submitted_at: row.submitted_at ?? null,
        });
      }
    }

    const result = [...studentMap.values()].map((s) => ({
      user_id: s.user_id,
      user_name: s.user_name,
      user_email: s.user_email,
      user_image: s.user_image,
      assignments: [...s.assignments.values()],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching student status:", error);
    return NextResponse.json({ error: "Failed to fetch student status" }, { status: 500 });
  }
}
