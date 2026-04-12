import Link from "next/link";
import LessonEmoji from "@/components/LessonEmoji";
import { bsearchExercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  "Binary Search": "bg-sky-100 text-sky-700",
  Easy: "bg-teal-100 text-teal-700",
  Medium: "bg-indigo-100 text-indigo-700",
  Hard: "bg-rose-100 text-rose-700",
};

export const metadata = {
  title: "Binary Search — CS Tutor",
};

export default function BinarySearchPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10"
            className="inline-flex items-center text-sm text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 mb-4 transition-colors"
          >
            ← Back to Grade 10 Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Binary Search
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Halve the search space at every step — from basics to boundary searches
          </p>
        </div>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={bsearchExercises}
          label="Binary Search Exercises"
          color="sky"
          className="mb-6"
        />

        {/* Exercise list */}
        <div className="space-y-3">
          {bsearchExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/grade-10/binary-search/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {index + 1}
              </span>
              <LessonEmoji emoji={lesson.emoji} className="text-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
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
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
