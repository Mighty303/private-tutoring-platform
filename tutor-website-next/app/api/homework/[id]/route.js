import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// PATCH /api/homework/[id] — admin updates due_date for a single homework assignment row
export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { dueDate } = await request.json();
    if (!dueDate) {
      return NextResponse.json({ error: "dueDate is required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`UPDATE homework_assignments SET due_date = ${dueDate} WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error updating homework:", error);
    return NextResponse.json({ error: "Failed to update homework" }, { status: 500 });
  }
}

// DELETE /api/homework/[id] — admin deletes a single homework assignment row
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const sql = getDb();

    await sql`DELETE FROM homework_assignments WHERE id = ${id}`;

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting homework:", error);
    return NextResponse.json({ error: "Failed to delete homework" }, { status: 500 });
  }
}
