import Link from "next/link";
import { functionExercises } from "@/lib/lessons";

const tagColors = {
  Functions: "bg-violet-100 text-violet-700",
  Reference: "bg-blue-100 text-blue-700",
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
};

export const metadata = {
  title: "Functions Practice — CS Tutor",
};

export default function FunctionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/saturdays"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Saturday Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Functions Practice
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Learn functions step by step — from basics to building game features
          </p>
        </div>

        {/* Numbered list */}
        <div className="space-y-3">
          {functionExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/saturdays/functions/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-200"
            >
              {/* Number */}
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {index + 1}
              </span>

              {/* Emoji */}
              <span className="text-2xl shrink-0">{lesson.emoji}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {lesson.description}
                </p>
              </div>

              {/* Tags */}
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

              {/* Arrow */}
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all"
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
