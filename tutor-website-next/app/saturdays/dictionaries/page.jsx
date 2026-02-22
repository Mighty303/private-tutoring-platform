import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { dictionaryExercises } from "@/lib/lessons";

export const metadata = {
  title: "Dictionary Exercises — CS Tutor",
};

export default function DictionariesPage() {
  const exercises = dictionaryExercises.filter(
    (l) => !l.id.includes("project")
  );
  const projects = dictionaryExercises.filter((l) =>
    l.id.includes("project")
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/saturdays"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Saturdays
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            📖 Dictionary Exercises
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Learn dictionaries through Roblox catalog shop exercises
          </p>
        </div>

        {/* Exercises */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exercises.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/saturdays/dictionaries"
            />
          ))}
        </div>

        {/* Projects */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
          🌟 Mini Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/saturdays/dictionaries"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
