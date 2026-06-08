import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/submissions/all — admin: all; classroom member: ?classroomId=id for that classroom
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exerciseSlug = searchParams.get("exercise") || null;
    const studentId = searchParams.get("student") || null;
    const classroomId = searchParams.get("classroomId") || null;

    const sql = getDb();

    // Classroom-scoped: only for classroom members (or admin)
    if (classroomId) {
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
    } else if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let rows;
    if (classroomId) {
      // Classroom-scoped queries
      if (exerciseSlug && studentId) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.exercise_slug = ${exerciseSlug} AND s.user_id = ${Number(studentId)}
            AND s.user_id IN (SELECT user_id FROM classroom_members WHERE classroom_id = ${classroomId})
          ORDER BY s.created_at DESC
          LIMIT 50
        `;
      } else if (exerciseSlug) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.exercise_slug = ${exerciseSlug}
            AND s.user_id IN (SELECT user_id FROM classroom_members WHERE classroom_id = ${classroomId})
          ORDER BY s.created_at DESC
          LIMIT 100
        `;
      } else if (studentId) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.user_id = ${Number(studentId)}
            AND s.user_id IN (SELECT user_id FROM classroom_members WHERE classroom_id = ${classroomId})
          ORDER BY s.created_at DESC
          LIMIT 100
        `;
      } else {
        rows = await sql`
          SELECT DISTINCT ON (s.user_id, s.exercise_slug)
                 s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.user_id IN (SELECT user_id FROM classroom_members WHERE classroom_id = ${classroomId})
          ORDER BY s.user_id, s.exercise_slug, s.created_at DESC
        `;
      }
    } else {
      // Admin: all submissions (original logic)
      if (exerciseSlug && studentId) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.exercise_slug = ${exerciseSlug} AND s.user_id = ${Number(studentId)}
          ORDER BY s.created_at DESC
          LIMIT 50
        `;
      } else if (exerciseSlug) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.exercise_slug = ${exerciseSlug}
          ORDER BY s.created_at DESC
          LIMIT 100
        `;
      } else if (studentId) {
        rows = await sql`
          SELECT s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          WHERE s.user_id = ${Number(studentId)}
          ORDER BY s.created_at DESC
          LIMIT 100
        `;
      } else {
        rows = await sql`
          SELECT DISTINCT ON (s.user_id, s.exercise_slug)
                 s.id, s.exercise_slug, s.code, s.created_at,
                 u.id AS user_id, u.name AS user_name, u.email AS user_email, u.image AS user_image
          FROM submissions s
          JOIN users u ON s.user_id = u.id
          ORDER BY s.user_id, s.exercise_slug, s.created_at DESC
        `;
      }
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching all submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
