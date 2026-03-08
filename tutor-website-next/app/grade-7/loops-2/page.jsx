import Link from "next/link";
import { loopPart2Exercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  Loops: "bg-emerald-100 text-emerald-700",
  Reference: "bg-blue-100 text-blue-700",
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

export const metadata = {
  title: "Loops Part 2 — CS Tutor",
};

export default function LoopsPart2Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-7"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Grade 7 Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Loops Part 2
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            break, continue, while True — dungeons, obstacle courses, loot filters, and boss battles
          </p>
        </div>

        {/* Prerequisite note */}
        <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl px-5 py-4 mb-6">
          <span className="text-xl shrink-0 mt-0.5">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">
              No starter code in these exercises!
            </p>
            <p className="text-sm text-teal-700 dark:text-teal-400 mt-1">
              These are more challenging — you need to write the full solution from scratch.
              Make sure you&apos;re comfortable with{" "}
              <Link href="/grade-7/loops" className="underline font-medium hover:text-teal-900 dark:hover:text-teal-200">
                Loops Part 1
              </Link>{" "}
              first.
            </p>
          </div>
        </div>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={loopPart2Exercises}
          label="Loops Part 2 Exercises"
          color="teal"
          className="mb-6"
        />

        {/* Numbered list */}
        <div className="space-y-3">
          {loopPart2Exercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/grade-7/loops-2/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {index + 1}
              </span>

              <span className="text-2xl shrink-0">{lesson.emoji}</span>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
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
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all"
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
