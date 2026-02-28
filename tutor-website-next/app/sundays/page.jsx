import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { sundayLessons, sundayAnswers, heapExercises } from "@/lib/lessons";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";

export const metadata = {
  title: "Sunday Lessons — CS Tutor",
};

export default function SundaysPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Sunday Lessons
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Algorithms, DFS/BFS, and Waterloo CCC prep
          </p>
        </div>

        {/* Lesson cards */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sundayLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/sundays"
            />
          ))}
          {/* Heaps hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-amber-500 shadow-sm">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Heaps — Priority Queues
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Heap data structure, priority queues, and practical exercises using Python&apos;s heapq module.
              </p>
              <ExerciseProgressTracker
                exercises={heapExercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/sundays/heaps"
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
        </div>

        {/* Answer Keys */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
          Answer Keys
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sundayAnswers.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/sundays"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
