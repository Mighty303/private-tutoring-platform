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

const PODIUM_CONFIG = [
  { rank: 2, blockH: "h-20", avatarSize: 48, label: "2nd", color: "from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700", border: "border-slate-300 dark:border-slate-500" },
  { rank: 1, blockH: "h-32", avatarSize: 64, label: "1st", color: "from-yellow-300 to-yellow-500 dark:from-yellow-500 dark:to-yellow-700", border: "border-yellow-400 dark:border-yellow-500" },
  { rank: 3, blockH: "h-14", avatarSize: 40, label: "3rd", color: "from-orange-300 to-orange-500 dark:from-orange-500 dark:to-orange-700", border: "border-orange-400 dark:border-orange-500" },
];

function PodiumSlot({ config, student }) {
  const isFirst = config.rank === 1;
  return (
    <div className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
      {/* Avatar + name above the block */}
      <div className={`flex flex-col items-center gap-1 pb-2 ${isFirst ? "mb-1" : ""}`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {config.rank}
        </span>
        {student ? (
          student.user_image ? (
            <Image
              src={student.user_image}
              alt={student.user_name || ""}
              width={config.avatarSize}
              height={config.avatarSize}
              className="rounded-full border-2 border-white dark:border-slate-900 shadow-md"
              style={{ width: config.avatarSize, height: config.avatarSize }}
            />
          ) : (
            <div
              className="rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-slate-900 shadow-md"
              style={{ width: config.avatarSize, height: config.avatarSize, fontSize: config.avatarSize * 0.4 }}
            >
              {student.user_name?.charAt(0) || "?"}
            </div>
          )
        ) : (
          <div
            className="rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600"
            style={{ width: config.avatarSize, height: config.avatarSize }}
          />
        )}
        <p className="text-sm font-semibold text-slate-800 dark:text-white text-center max-w-22.5 truncate">
          {student?.user_name ?? "—"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {student ? `${student.exercises.length} solved` : ""}
        </p>
      </div>
      {/* Podium block */}
      <div className={`w-full ${config.blockH} rounded-t-xl bg-linear-to-b ${config.color} border-t-2 border-x-2 ${config.border} flex items-center justify-center`}>
        <span className="text-white font-bold text-lg opacity-70">{config.label}</span>
      </div>
    </div>
  );
}

function Podium({ students }) {
  // Order: 2nd, 1st, 3rd (1st in center)
  const order = [0, 1, 2]; // indices into PODIUM_CONFIG
  return (
    <div className="flex items-end gap-2 mt-8 px-4">
      {order.map((ci) => {
        const config = PODIUM_CONFIG[ci];
        const student = students[config.rank - 1] ?? null;
        return <PodiumSlot key={config.rank} config={config} student={student} />;
      })}
    </div>
  );
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
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
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
          <Podium students={studentProgressList} />
        )}
      </div>
    </div>
  );
}
