import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// POST /api/submissions/admin-pass — admin-only: grant a student pass for an exercise (e.g. when grader has a bug)
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, exerciseSlug, code } = body;

    if (!userId || !exerciseSlug) {
      return NextResponse.json(
        { error: "userId and exerciseSlug are required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const codeToSave = code?.trim() || "// Admin passed (grader bug)";
    const rows = await sql`
      INSERT INTO submissions (user_id, exercise_slug, code)
      VALUES (${Number(userId)}, ${String(exerciseSlug).trim()}, ${codeToSave})
      RETURNING id, created_at
    `;

    return NextResponse.json({
      id: rows[0].id,
      createdAt: rows[0].created_at,
      message: "Student passed for this exercise.",
    });
  } catch (error) {
    console.error("Error granting admin pass:", error);
    return NextResponse.json(
      { error: "Failed to grant pass" },
      { status: 500 }
    );
  }
}
