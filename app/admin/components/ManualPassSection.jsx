"use client";

import { useState } from "react";
import StudentPicker from "./StudentPicker";

export default function ManualPassSection({ students, allExerciseSlugs, grantPass, passing, passSuccess }) {
  const [passStudent, setPassStudent] = useState("");
  const [passExercise, setPassExercise] = useState("");

  function handleGrantPass(e) {
    e.preventDefault();
    const slug = passExercise.trim();
    if (!passStudent || !slug) return;
    grantPass(Number(passStudent), slug);
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Use when the student solved it verbally, on paper, or the grader has a bug and they have no submission to click Pass on.
        </p>
        {passSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Passed: {passSuccess}
          </span>
        )}
      </div>
      <datalist id="grant-pass-slugs">
        {allExerciseSlugs.map((slug) => <option key={slug} value={slug} />)}
      </datalist>
      <form onSubmit={handleGrantPass} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">Student</label>
          <StudentPicker
            students={students}
            value={passStudent}
            onChange={setPassStudent}
            colorScheme="amber"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Exercise slug</label>
          <input
            type="text"
            list="grant-pass-slugs"
            value={passExercise}
            onChange={(e) => setPassExercise(e.target.value)}
            placeholder="Type or pick an exercise…"
            className="w-full px-3 py-2 text-sm rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={!passStudent || !passExercise.trim() || !!passing}
          className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {passing ? "Passing…" : "Pass student"}
        </button>
      </form>
    </div>
  );
}
