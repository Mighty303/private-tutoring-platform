"use client";

import { useState } from "react";
import { exerciseSections } from "@/lib/lessons";
import ClassroomPicker from "./ClassroomPicker";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";

export default function HomeworkSection({ classrooms, users, hwAssignments, submissions, allExerciseSlugs, onRefreshHomework }) {
  const [hwTitle, setHwTitle] = useState("");
  const [hwSlugs, setHwSlugs] = useState([]);
  const [hwDueDate, setHwDueDate] = useState("");
  const [hwClassroomId, setHwClassroomId] = useState("");
  const [hwStudentIds, setHwStudentIds] = useState([]);
  const [hwCreating, setHwCreating] = useState(false);

  const [editingDueDateTitle, setEditingDueDateTitle] = useState(null);
  const [editingDueDateValue, setEditingDueDateValue] = useState("");
  const [addingExerciseTitle, setAddingExerciseTitle] = useState(null);
  const [addExerciseSlug, setAddExerciseSlug] = useState("");
  const [addingExercise, setAddingExercise] = useState(false);
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const completionsBySlug = submissions.reduce((acc, sub) => {
    if (!acc[sub.exercise_slug]) acc[sub.exercise_slug] = [];
    if (!acc[sub.exercise_slug].find((c) => c.user_id === sub.user_id)) {
      acc[sub.exercise_slug].push({
        user_id: sub.user_id,
        user_name: sub.user_name,
        submitted_at: sub.created_at,
      });
    }
    return acc;
  }, {});

  async function createHomework(e) {
    e.preventDefault();
    if (!hwTitle || !hwSlugs.length || !hwDueDate) return;
    setHwCreating(true);
    try {
      const res = await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: hwTitle,
          exerciseSlugs: hwSlugs,
          dueDate: hwDueDate,
          classroomId: hwClassroomId ? Number(hwClassroomId) : null,
          studentIds: hwStudentIds.map(Number),
        }),
      });
      if (res.ok) {
        setHwTitle("");
        setHwSlugs([]);
        setHwDueDate("");
        setHwClassroomId("");
        setHwStudentIds([]);
        await onRefreshHomework();
      }
    } finally {
      setHwCreating(false);
    }
  }

  async function deleteHomeworkRow(id) {
    await fetch(`/api/homework/${id}`, { method: "DELETE" });
    setPendingDeleteId(null);
    await onRefreshHomework();
  }

  async function saveDueDate(rows, newDate) {
    for (const row of rows) {
      await fetch(`/api/homework/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dueDate: newDate }),
      });
    }
    setEditingDueDateTitle(null);
    await onRefreshHomework();
  }

  async function addExerciseToAssignment(rows) {
    const slug = addExerciseSlug.trim();
    if (!slug) return;
    setAddingExercise(true);
    const first = rows[0];
    try {
      await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: first.title,
          exerciseSlugs: [slug],
          dueDate: first.due_date,
          classroomId: first.classroom_id,
          studentIds: [],
        }),
      });
      setAddExerciseSlug("");
      setAddingExerciseTitle(null);
      await onRefreshHomework();
    } finally {
      setAddingExercise(false);
    }
  }

  const students = users.filter((u) => u.role !== "admin");

  const groups = hwAssignments.reduce((acc, row) => {
    if (!acc[row.title]) acc[row.title] = [];
    acc[row.title].push(row);
    return acc;
  }, {});

  return (
    <div className="mt-12 space-y-4">
      {pendingDeleteId && (
        <ConfirmModal
          title="Remove exercise"
          message="Remove this exercise from the assignment? This cannot be undone."
          confirmLabel="Remove"
          onConfirm={() => deleteHomeworkRow(pendingDeleteId)}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Assign Homework</h2>

      {/* Create form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-medium text-slate-700 dark:text-slate-200 mb-4">New Assignment</h3>
        <form onSubmit={createHomework} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Assignment Title
              </label>
              <input
                type="text"
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                placeholder="e.g. Week 3 Homework"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Classroom card picker */}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Classroom (optional)
            </label>
            <ClassroomPicker classrooms={classrooms} value={hwClassroomId} onChange={setHwClassroomId} />
          </div>

          {/* Individual students */}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Individual Students (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {students.map((u) => {
                const selected = hwStudentIds.includes(String(u.id));
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() =>
                      setHwStudentIds((prev) =>
                        selected
                          ? prev.filter((id) => id !== String(u.id))
                          : [...prev, String(u.id)]
                      )
                    }
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm transition-colors cursor-pointer ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    {u.image ? (
                      <Image src={u.image} alt={u.name || ""} width={20} height={20} className="rounded-full shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {u.name?.charAt(0) || "?"}
                      </div>
                    )}
                    <span>{u.name || u.email}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exercise selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Exercises</label>
              {hwSlugs.length > 0 && (
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {hwSlugs.length} selected
                </span>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-y-auto max-h-96 divide-y divide-slate-200 dark:divide-slate-700">
              {exerciseSections.map((section) => {
                const sectionSlugs = section.exercises.map((e) => e.id);
                const allSelected = sectionSlugs.every((s) => hwSlugs.includes(s));
                const someSelected = sectionSlugs.some((s) => hwSlugs.includes(s));
                function toggleSection() {
                  if (allSelected) {
                    setHwSlugs((prev) => prev.filter((s) => !sectionSlugs.includes(s)));
                  } else {
                    setHwSlugs((prev) => [...new Set([...prev, ...sectionSlugs])]);
                  }
                }
                return (
                  <div key={section.label}>
                    <button
                      type="button"
                      onClick={toggleSection}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        {section.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        allSelected
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                          : someSelected
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                      }`}>
                        {allSelected
                          ? "All selected"
                          : someSelected
                          ? `${sectionSlugs.filter((s) => hwSlugs.includes(s)).length}/${sectionSlugs.length}`
                          : "Select all"}
                      </span>
                    </button>
                    <div className="px-4 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {section.exercises.map((ex) => {
                        const checked = hwSlugs.includes(ex.id);
                        return (
                          <label
                            key={ex.id}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                              checked
                                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200"
                                : "hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setHwSlugs((prev) => [...prev, ex.id]);
                                } else {
                                  setHwSlugs((prev) => prev.filter((s) => s !== ex.id));
                                }
                              }}
                              className="accent-indigo-600 w-4 h-4 shrink-0"
                            />
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-[10px] font-semibold uppercase text-slate-600 dark:border-slate-600 dark:bg-slate-950/40 dark:text-slate-400">
                              {ex.title.charAt(0)}
                            </span>
                            <span className="truncate">{ex.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={hwCreating || !hwTitle || !hwSlugs.length || !hwDueDate}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {hwCreating ? "Creating…" : "Create Assignment"}
          </button>
        </form>
      </div>

      {/* Existing assignments */}
      {Object.keys(groups).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Existing Assignments ({Object.keys(groups).length})
          </h3>
          {Object.entries(groups).map(([title, rows]) => {
            const isExpanded = expandedAssignment === title;
            const isEditingDate = editingDueDateTitle === title;
            const isAddingEx = addingExerciseTitle === title;
            return (
              <div
                key={title}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700 gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-slate-800 dark:text-white">{title}</span>
                    {rows[0].classroom_name && (
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        {rows[0].classroom_name}
                      </span>
                    )}
                    {isEditingDate ? (
                      <form
                        onSubmit={(e) => { e.preventDefault(); saveDueDate(rows, editingDueDateValue); }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <input
                          type="date"
                          value={editingDueDateValue}
                          onChange={(e) => setEditingDueDateValue(e.target.value)}
                          required
                          className="text-xs px-2 py-1 rounded-lg border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button type="submit" className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-lg cursor-pointer transition-colors">
                          Save
                        </button>
                        <button type="button" onClick={() => setEditingDueDateTitle(null)} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingDueDateTitle(title);
                          setEditingDueDateValue(rows[0].due_date?.slice(0, 10) ?? "");
                        }}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer group"
                      >
                        Due {new Date(rows[0].due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setExpandedAssignment(isExpanded ? null : title)}
                    className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shrink-0"
                  >
                    {isExpanded ? "Hide details" : "Show details"}
                  </button>
                </div>

                {/* Exercise pills */}
                <div className="px-5 py-3 flex flex-wrap gap-2">
                  {rows.map((row) => (
                    <div key={row.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
                      <span>{row.exercise_slug}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{row.completion_count} done</span>
                      <button
                        onClick={() => setPendingDeleteId(row.id)}
                        className="ml-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove this exercise"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Expanded: completion details + add exercise */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-700 px-5 py-4 space-y-4">
                    <div className="space-y-3">
                      {rows.map((row) => {
                        const completers = completionsBySlug[row.exercise_slug] || [];
                        return (
                          <div key={row.id}>
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                                {row.exercise_slug}
                              </code>
                              <span className="text-xs text-slate-400">{completers.length} completed</span>
                            </div>
                            {completers.length === 0 ? (
                              <span className="text-xs text-slate-400">No submissions yet</span>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {completers.map((c) => (
                                  <span
                                    key={c.user_id}
                                    className="inline-flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full"
                                  >
                                    {c.user_name}
                                    <span className="text-emerald-500 dark:text-emerald-600">·</span>
                                    {new Date(c.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isAddingEx ? (
                      <form
                        onSubmit={(e) => { e.preventDefault(); addExerciseToAssignment(rows); }}
                        className="flex items-center gap-2 pt-1"
                      >
                        <input
                          type="text"
                          list="grant-pass-slugs"
                          value={addExerciseSlug}
                          onChange={(e) => setAddExerciseSlug(e.target.value)}
                          placeholder="Exercise slug…"
                          required
                          className="flex-1 min-w-0 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="submit"
                          disabled={addingExercise || !addExerciseSlug.trim()}
                          className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer transition-colors"
                        >
                          {addingExercise ? "Adding…" : "Add"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddingExerciseTitle(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => { setAddingExerciseTitle(title); setAddExerciseSlug(""); }}
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add exercise
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
