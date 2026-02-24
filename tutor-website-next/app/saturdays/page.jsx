import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { saturdayLessons } from "@/lib/lessons";

export const metadata = {
  title: "Saturday Lessons — CS Tutor",
};

export default function SaturdaysPage() {
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
            Saturday Lessons
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Python fundamentals for grade 7 — gamified, Roblox-themed exercises
          </p>
        </div>

        {/* Lesson cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {saturdayLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/saturdays"
            />
          ))}
        </div>

        {/* Link to nested loops */}
        <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg text-sky-800 dark:text-sky-300 mb-2">
            Nested Loops Practice
          </h3>
          <p className="text-sky-700 dark:text-sky-400 mb-4">
            Loops inside loops — grids, patterns, multiplication tables, and
            matching pairs.
          </p>
          <Link
            href="/saturdays/nested-loops"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition-colors text-sm"
          >
            View Nested Loops →
          </Link>
        </div>

        {/* Link to nested lists */}
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg text-rose-800 dark:text-rose-300 mb-2">
            Nested Lists Practice
          </h3>
          <p className="text-rose-700 dark:text-rose-400 mb-4">
            Lists inside lists — 2D grids, game boards, searching, and
            patterns.
          </p>
          <Link
            href="/saturdays/nested-lists"
            className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-sm"
          >
            View Nested Lists →
          </Link>
        </div>

        {/* Link to functions */}
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg text-violet-800 dark:text-violet-300 mb-2">
            Functions Practice
          </h3>
          <p className="text-violet-700 dark:text-violet-400 mb-4">
            Learn functions step by step — XP calculators, health systems, shop
            discounts, and more.
          </p>
          <Link
            href="/saturdays/functions"
            className="inline-flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-violet-700 transition-colors text-sm"
          >
            View Function Exercises →
          </Link>
        </div>

        {/* Link to dictionaries */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-6">
          <h3 className="font-bold text-lg text-amber-800 dark:text-amber-300 mb-2">
            Dictionary Exercises
          </h3>
          <p className="text-amber-700 dark:text-amber-400 mb-4">
            Roblox-themed dictionary exercises and projects — part of Milestone
            2.
          </p>
          <Link
            href="/saturdays/dictionaries"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-sm"
          >
            View Dictionary Exercises →
          </Link>
        </div>
      </div>
    </div>
  );
}
