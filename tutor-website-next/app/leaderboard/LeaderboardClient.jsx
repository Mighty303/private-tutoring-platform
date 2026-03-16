"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Same logic as AdminDashboard Student Progress: users + submissions → studentProgressList
function buildStudentProgressList(users, submissions) {
  const students = users.filter((u) => u.role !== "admin");
  const progressByStudent = submissions.reduce((acc, sub) => {
    const id = sub.user_id;
    if (!acc[id]) acc[id] = { exercises: [] };
    acc[id].exercises.push({
      exercise_slug: sub.exercise_slug,
      created_at: sub.created_at,
      id: sub.id,
    });
    return acc;
  }, {});
  return students
    .map((u) => {
      const prog = progressByStudent[u.id] || { exercises: [] };
      return {
        user_id: u.id,
        user_name: u.name,
        user_email: u.email,
        user_image: u.image,
        exercises: [...prog.exercises].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      };
    })
    .sort((a, b) => (b.exercises.length - a.exercises.length)); // Sort by submission count desc (top 3)
}

export default function LeaderboardClient({
  classrooms,
  initialClassroomId,
  isAdmin = false,
}) {
  const [classroomId, setClassroomId] = useState(initialClassroomId);
  const [studentProgressList, setStudentProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  async function fetchProgress(cid) {
    setLoading(true);
    try {
      // Admin: same endpoints as Student Progress (no classroomId)
      // Student: classroom-scoped
      const usersUrl = isAdmin ? "/api/users" : `/api/users?classroomId=${cid}`;
      const subsUrl = isAdmin ? "/api/submissions/all" : `/api/submissions/all?classroomId=${cid}`;
      const [usersRes, subsRes] = await Promise.all([
        fetch(usersUrl),
        fetch(subsUrl),
      ]);
      if (!usersRes.ok || !subsRes.ok) throw new Error("Failed to fetch");
      const usersData = await usersRes.json();
      const subsData = await subsRes.json();
      const users = Array.isArray(usersData) ? usersData : [];
      const submissions = Array.isArray(subsData) ? subsData : [];
      const list = buildStudentProgressList(users, submissions);
      setStudentProgressList(list.slice(0, 3));
    } catch {
      setStudentProgressList([]);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchProgress(classroomId);
  }, [classroomId]);

  async function handleClassroomChange(e) {
    const id = e.target.value;
    if (id === classroomId) return;
    setClassroomId(id);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-4xl">🏆</span>
              Leaderboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Top 3 by problems completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchProgress(classroomId)}
              disabled={loading}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            {!isAdmin && classrooms.length > 1 && (
            <select
              value={classroomId}
              onChange={handleClassroomChange}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !loaded || studentProgressList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              No submissions yet. Complete exercises to climb the leaderboard!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {studentProgressList.slice(0, 3).map((student) => (
              <div
                key={student.user_id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="p-4 flex items-center gap-3">
                  {student.user_image ? (
                    <Image
                      src={student.user_image}
                      alt={student.user_name || ""}
                      width={40}
                      height={40}
                      className="rounded-full shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                      {student.user_name?.charAt(0) || "?"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-white truncate">
                      {student.user_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {student.user_email}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                    {student.exercises.length} completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
