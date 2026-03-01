import Link from "next/link";
import { heap2Exercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  Heaps: "bg-amber-100 text-amber-700",
  Reference: "bg-blue-100 text-blue-700",
  Exercises: "bg-amber-100 text-amber-700",
  CCC: "bg-sky-100 text-sky-700",
};

export const metadata = {
  title: "Heaps Part 2 — CS Tutor",
};

export default function Heaps2Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/sundays"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Sunday Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Heaps Part 2 — Top-K & CCC
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Frequency counting, Top-K problems, and competitive programming practice
          </p>
        </div>

        {/* Link to Part 1 */}
        <Link
          href="/sundays/heaps"
          className="group flex items-center gap-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4 mb-6 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200"
        >
          <span className="text-2xl shrink-0">🏔️</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-amber-800 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
              Heaps Part 1 — Basics
            </h3>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Haven&apos;t done Part 1? Start with heap fundamentals and heapq
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={heap2Exercises}
          label="Heap Part 2 Exercises"
          color="emerald"
          className="mb-6"
        />

        {/* Numbered list */}
        <div className="space-y-3">
          {heap2Exercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/sundays/heaps-2/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {index + 1}
              </span>

              <span className="text-2xl shrink-0">{lesson.emoji}</span>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {lesson.description}
                </p>
              </div>

              <div className="hidden sm:flex shrink-0 gap-2">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      tagColors[tag] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ExerciseCheckmark exerciseId={lesson.id} />

              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
