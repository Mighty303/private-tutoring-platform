"use client";

import { useState } from "react";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";

export default function StudentsSection({
  studentStatus,
  users,
  submissions,
  classrooms,
  memberships,
  grantPass,
  passing,
  onDeleteUser,
  onChangeRole,
  onRefreshSubmissions,
  onRefreshClassrooms,
}) {
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [assigningClassroomFor, setAssigningClassroomFor] = useState(null); // userId
  const [classroomLoading, setClassroomLoading] = useState(null); // classroomId being toggled

  const userById = Object.fromEntries(users.map((u) => [u.id, u]));

  const recentSubsByStudent = submissions.reduce((acc, sub) => {
    if (!acc[sub.user_id]) acc[sub.user_id] = [];
    acc[sub.user_id].push(sub);
    return acc;
  }, {});
  Object.values(recentSubsByStudent).forEach((subs) =>
    subs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  );

  // membership lookup: userId -> Set of classroomIds
  const membershipByUser = memberships.reduce((acc, m) => {
    if (!acc[m.user_id]) acc[m.user_id] = new Set();
    acc[m.user_id].add(m.classroom_id);
    return acc;
  }, {});

  async function toggleClassroom(userId, classroomId, isCurrentMember) {
    setClassroomLoading(classroomId);
    try {
      if (isCurrentMember) {
        await fetch(`/api/classrooms/${classroomId}/members?userId=${userId}`, { method: "DELETE" });
      } else {
        await fetch(`/api/classrooms/${classroomId}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }
      await onRefreshClassrooms();
    } finally {
      setClassroomLoading(null);
    }
  }

  const confirmDeleteUser = userById[confirmDeleteId];

  return (
    <div className="mt-12 space-y-4">
      {confirmDeleteId && (
        <ConfirmModal
          title="Delete student"
          message={`Delete ${confirmDeleteUser?.name || "this student"}? All their data will be removed. This cannot be undone.`}
          onConfirm={() => {
            onDeleteUser(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Students ({studentStatus.length})
        </h2>
        <button
          onClick={onRefreshSubmissions}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Refresh"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {studentStatus.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No students yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {studentStatus.map((student) => {
            const user = userById[student.user_id];
            const recentSubs = (recentSubsByStudent[student.user_id] || []).slice(0, 5);
            const isExpanded = expandedStudentId === student.user_id;
            const isAssigning = assigningClassroomFor === student.user_id;
            const studentClassrooms = membershipByUser[student.user_id] || new Set();

            return (
              <div
                key={student.user_id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Card header */}
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
                    <p className="font-medium text-slate-800 dark:text-white truncate">{student.user_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{student.user_email}</p>
                  </div>
                  {user && (
                    <select
                      value={user.role}
                      onChange={(e) => onChangeRole(student.user_id, e.target.value)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shrink-0"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                  <button
                    onClick={() => setConfirmDeleteId(student.user_id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors cursor-pointer shrink-0"
                    title="Delete student"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Classroom assignment */}
                <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center gap-2 flex-wrap">
                  {classrooms.filter((c) => studentClassrooms.has(c.id)).map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-0.5 rounded-full"
                    >
                      {c.name}
                      <button
                        onClick={() => toggleClassroom(student.user_id, c.id, true)}
                        disabled={classroomLoading === c.id}
                        className="ml-0.5 text-indigo-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                        title={`Remove from ${c.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {isAssigning ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {classrooms.filter((c) => !studentClassrooms.has(c.id)).map((c) => (
                        <button
                          key={c.id}
                          onClick={async () => {
                            await toggleClassroom(student.user_id, c.id, false);
                            setAssigningClassroomFor(null);
                          }}
                          disabled={classroomLoading === c.id}
                          className="text-xs px-2.5 py-1 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {classroomLoading === c.id ? "…" : `+ ${c.name}`}
                        </button>
                      ))}
                      <button
                        onClick={() => setAssigningClassroomFor(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    classrooms.some((c) => !studentClassrooms.has(c.id)) && (
                      <button
                        onClick={() => setAssigningClassroomFor(student.user_id)}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add to classroom
                      </button>
                    )
                  )}
                </div>

                {/* Assignment status */}
                {student.assignments.length > 0 && (
                  <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3 space-y-3">
                    {student.assignments.map((asgn, i) => {
                      const doneCount = asgn.exercises.filter((e) => e.submitted_at).length;
                      return (
                        <div key={i}>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{asgn.title}</span>
                            <span className="text-xs text-slate-400">
                              Due {new Date(asgn.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                            {asgn.classroom_name && (
                              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                                {asgn.classroom_name}
                              </span>
                            )}
                            <span className="ml-auto text-xs font-medium text-slate-400">
                              {doneCount}/{asgn.exercises.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {asgn.exercises.map((ex) => (
                              <span
                                key={ex.exercise_slug}
                                title={ex.submitted_at ? `Submitted ${new Date(ex.submitted_at).toLocaleString()}` : "Not submitted"}
                                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                  ex.submitted_at
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                              >
                                {ex.submitted_at && (
                                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                {ex.exercise_slug}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Recent submissions toggle */}
                <div className="border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setExpandedStudentId(isExpanded ? null : student.user_id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Recent submissions{recentSubs.length > 0 ? ` (${recentSubs.length})` : ""}
                    </span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-3 space-y-1.5">
                      {recentSubs.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">No submissions yet.</p>
                      ) : (
                        recentSubs.map((sub) => (
                          <div key={sub.id} className="flex items-center gap-2 py-1">
                            <span className="text-xs font-mono font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 px-2 py-0.5 rounded">
                              {sub.exercise_slug}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <button
                              onClick={() => grantPass(student.user_id, sub.exercise_slug, sub.code)}
                              disabled={!!passing}
                              className="ml-auto px-2.5 py-0.5 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 cursor-pointer transition-colors"
                            >
                              {passing === student.user_id ? "Passing…" : "Pass"}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
