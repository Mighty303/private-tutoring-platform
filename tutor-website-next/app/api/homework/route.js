import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/homework — student fetches their assigned homework with completion status
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = getDb();
    const userId = session.user.dbId;

    const assignments = await sql`
      SELECT
        ha.id,
        ha.title,
        ha.exercise_slug,
        ha.due_date,
        ha.classroom_id,
        s.created_at AS submitted_at
      FROM homework_assignments ha
      LEFT JOIN LATERAL (
        SELECT created_at FROM submissions
        WHERE user_id = ${userId} AND exercise_slug = ha.exercise_slug
        ORDER BY created_at DESC
        LIMIT 1
      ) s ON true
      WHERE
        ha.classroom_id IN (
          SELECT classroom_id FROM classroom_members WHERE user_id = ${userId}
        )
        OR ha.id IN (
          SELECT assignment_id FROM homework_student_assignments WHERE user_id = ${userId}
        )
      ORDER BY ha.due_date ASC, ha.title, ha.exercise_slug
    `;

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching homework:", error);
    return NextResponse.json({ error: "Failed to fetch homework" }, { status: 500 });
  }
}

// POST /api/homework — admin creates a homework assignment
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, exerciseSlugs, dueDate, classroomId, studentIds } =
      await request.json();

    if (!title || !exerciseSlugs?.length || !dueDate) {
      return NextResponse.json(
        { error: "title, exerciseSlugs, and dueDate are required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const classId = classroomId || null;

    // Insert one row per exercise slug
    const insertedIds = [];
    for (const slug of exerciseSlugs) {
      const rows = await sql`
        INSERT INTO homework_assignments (title, exercise_slug, due_date, classroom_id, created_by)
        VALUES (${title}, ${slug}, ${dueDate}, ${classId}, ${session.user.dbId})
        RETURNING id
      `;
      insertedIds.push(rows[0].id);
    }

    // Insert per-student assignments if provided
    if (studentIds?.length) {
      for (const assignmentId of insertedIds) {
        for (const userId of studentIds) {
          await sql`
            INSERT INTO homework_student_assignments (assignment_id, user_id)
            VALUES (${assignmentId}, ${userId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
    }

    return NextResponse.json({ created: insertedIds.length });
  } catch (error) {
    console.error("Error creating homework:", error);
    return NextResponse.json({ error: "Failed to create homework" }, { status: 500 });
  }
}
