import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

function normalizeSlug(slug) {
  if (!slug || typeof slug !== "string") return slug;
  if (slug.startsWith("http")) {
    const parts = slug.split("/").filter(Boolean);
    return parts[parts.length - 1] || slug;
  }
  return slug;
}

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

    const slugs = [...new Set(rows.map((r) => normalizeSlug(r.exercise_slug)))];
    return NextResponse.json({ slugs });
  } catch (error) {
    console.error("Error fetching completed exercises:", error);
    return NextResponse.json({ slugs: [] });
  }
}
