import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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
