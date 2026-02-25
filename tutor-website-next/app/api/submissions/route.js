import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// POST /api/submissions — save a code submission
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { exerciseSlug, code } = await request.json();

    if (!exerciseSlug || !code) {
      return NextResponse.json(
        { error: "exerciseSlug and code are required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO submissions (user_id, exercise_slug, code)
      VALUES (${session.user.dbId}, ${exerciseSlug}, ${code})
      RETURNING id, created_at
    `;

    return NextResponse.json({
      id: rows[0].id,
      createdAt: rows[0].created_at,
    });
  } catch (error) {
    console.error("Error saving submission:", error);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}

// GET /api/submissions?exerciseSlug=xxx — get latest submission for an exercise
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exerciseSlug = searchParams.get("exerciseSlug");

    if (!exerciseSlug) {
      return NextResponse.json(
        { error: "exerciseSlug is required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      SELECT id, code, created_at
      FROM submissions
      WHERE user_id = ${session.user.dbId}
        AND exercise_slug = ${exerciseSlug}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ submission: null });
    }

    return NextResponse.json({
      submission: {
        id: rows[0].id,
        code: rows[0].code,
        createdAt: rows[0].created_at,
      },
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}
