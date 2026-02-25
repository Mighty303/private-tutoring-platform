import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users — list all users (admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sql = getDb();
  const users = await sql`
    SELECT id, name, email, image, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  return NextResponse.json(users);
}
