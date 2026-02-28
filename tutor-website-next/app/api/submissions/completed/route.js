import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/submissions/completed — returns list of exercise slugs the user has completed
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ slugs: [] });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT DISTINCT exercise_slug
      FROM submissions
      WHERE user_id = ${session.user.dbId}
      ORDER BY exercise_slug
    `;

    return NextResponse.json({
      slugs: rows.map((r) => r.exercise_slug),
    });
  } catch (error) {
    console.error("Error fetching completed exercises:", error);
    return NextResponse.json({ slugs: [] });
  }
}
