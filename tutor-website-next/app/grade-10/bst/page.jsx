import Link from "next/link";
import LessonEmoji from "@/components/LessonEmoji";
import { bstExercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  BST: "bg-orange-100 text-orange-700",
  Easy: "bg-teal-100 text-teal-700",
  Medium: "bg-indigo-100 text-indigo-700",
  Hard: "bg-rose-100 text-rose-700",
};

export const metadata = {
  title: "Binary Search Trees — CS Tutor",
};

export default function BSTPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10"
            className="inline-flex items-center text-sm text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 mb-4 transition-colors"
          >
            ← Back to Grade 10 Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Binary Search Trees
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Search, insert, validate, and query ordered trees using the BST property
          </p>
        </div>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={bstExercises}
          label="BST Exercises"
          color="orange"
          className="mb-6"
        />

        {/* Exercise list */}
        <div className="space-y-3">
          {bstExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/grade-10/bst/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {index + 1}
              </span>
              <LessonEmoji emoji={lesson.emoji} className="text-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
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
