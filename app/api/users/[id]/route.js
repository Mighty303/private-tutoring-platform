import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/users/[id] — update a user's role (admin only)
export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { role } = await request.json();

  if (!["student", "teacher", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const sql = getDb();

  // Prevent changing own role
  const self = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
  if (self.length > 0 && self[0].id === Number(id)) {
    return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
  }

  const rows = await sql`
    UPDATE users SET role = ${role} WHERE id = ${id} RETURNING id, name, email, role
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

// DELETE /api/users/[id] — delete a user (admin only)
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const sql = getDb();

  // Prevent deleting self
  const self = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
  if (self.length > 0 && self[0].id === Number(id)) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  // Remove from classroom memberships first
  await sql`DELETE FROM classroom_members WHERE user_id = ${id}`;

  // Delete the user
  const rows = await sql`DELETE FROM users WHERE id = ${id} RETURNING id`;

  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
