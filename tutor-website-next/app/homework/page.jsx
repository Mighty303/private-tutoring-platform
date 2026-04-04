import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import HomeworkClient from "./HomeworkClient";

export default async function HomeworkPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
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

  return <HomeworkClient assignments={assignments} />;
}
