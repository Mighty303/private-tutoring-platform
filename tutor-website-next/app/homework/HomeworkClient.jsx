"use client";

import Link from "next/link";
import { getLessonById, getExerciseUrl } from "@/lib/lessons";

function getDueDateStatus(dueDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
  if (diffDays <= 3) return { label: `Due in ${diffDays}d`, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
  return { label: `Due ${due.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" };
}

export default function HomeworkClient({ assignments }) {
  // Group by title
  const groups = assignments.reduce((acc, row) => {
    if (!acc[row.title]) acc[row.title] = [];
    acc[row.title].push(row);
    return acc;
  }, {});

  const groupEntries = Object.entries(groups);

  if (groupEntries.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Homework
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            No homework assigned yet. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            📚 Homework
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Your assigned exercises
          </p>
        </div>

        <div className="space-y-6">
          {groupEntries.map(([title, rows]) => {
            const dueStatus = getDueDateStatus(rows[0].due_date);
            const completedCount = rows.filter((r) => r.submitted_at).length;
            const total = rows.length;
            const allDone = completedCount === total;

            return (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
              >
                {/* Group header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <h2 className="font-semibold text-slate-800 dark:text-white">
                      {title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {completedCount}/{total} completed
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {allDone && (
                      <span className="text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                        ✓ All done
                      </span>
                    )}
                    <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${dueStatus.color}`}>
                      {dueStatus.label}
                    </span>
                  </div>
                </div>

                {/* Exercise rows */}
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {rows.map((row) => {
                    const lesson = getLessonById(row.exercise_slug);
                    const url = getExerciseUrl(row.exercise_slug);
                    const done = !!row.submitted_at;

                    return (
                      <li
                        key={row.id}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {lesson?.emoji ?? "📝"}
                          </span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {lesson?.title ?? row.exercise_slug}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {done ? (
                            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                              ✓ Done
                            </span>
                          ) : (
                            <span className="text-xs font-medium bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400 px-2 py-0.5 rounded-full">
                              Pending
                            </span>
                          )}
                          {url && (
                            <Link
                              href={url}
                              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Open →
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
