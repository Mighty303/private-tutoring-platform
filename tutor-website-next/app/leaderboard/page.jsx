import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import LeaderboardClient from "./LeaderboardClient";

export default async function LeaderboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const sql = getDb();

  // Get user's classrooms (students see theirs; admin sees all for dropdown)
  let classrooms;
  if (session.user.role === "admin") {
    classrooms = await sql`
      SELECT c.id, c.name
      FROM classrooms c
      ORDER BY c.created_at DESC
    `;
  } else {
    classrooms = await sql`
      SELECT c.id, c.name
      FROM classrooms c
      JOIN classroom_members cm ON cm.classroom_id = c.id
      WHERE cm.user_id = ${session.user.dbId}
      ORDER BY cm.joined_at DESC
    `;
  }

  if (classrooms.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Classroom Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Join a classroom to see the leaderboard and compete with your classmates.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Ask your tutor for an invite link to join a classroom.
          </p>
        </div>
      </div>
    );
  }

  return (
    <LeaderboardClient
      classrooms={classrooms}
      initialClassroomId={classrooms[0].id}
      isAdmin={session.user.role === "admin"}
    />
  );
}
