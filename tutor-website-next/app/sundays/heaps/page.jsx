import Link from "next/link";
import HeapAnimation from "@/components/HeapAnimation";
import { heapExercises } from "@/lib/lessons";

const tagColors = {
  Heaps: "bg-amber-100 text-amber-700",
  Reference: "bg-blue-100 text-blue-700",
  Exercises: "bg-amber-100 text-amber-700",
  Algorithms: "bg-indigo-100 text-indigo-700",
};

export const metadata = {
  title: "Heaps — CS Tutor",
};

export default function HeapsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/sundays"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors"
          >
            ← Back to Sunday Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
            🏔️ Heaps — Priority Queues
          </h1>
          <p className="text-lg text-slate-500">
            Learn heaps through interactive exercises — from basics to advanced
            problems
          </p>
        </div>

        {/* Animation */}
        <div className="mb-12">
          <HeapAnimation />
        </div>

        {/* Numbered list */}
        <div className="space-y-3">
          {heapExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/sundays/heaps/${lesson.id}`}
              className="group flex items-center gap-4 bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
            >
              {/* Number */}
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                {index + 1}
              </span>

              {/* Emoji */}
              <span className="text-2xl shrink-0">{lesson.emoji}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 truncate">
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
