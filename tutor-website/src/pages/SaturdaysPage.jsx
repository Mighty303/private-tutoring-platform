import { Link } from "react-router-dom";
import LessonCard from "../components/LessonCard";
import { saturdayLessons } from "../data/lessons";

export default function SaturdaysPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
            🐍 Saturday Lessons
          </h1>
          <p className="text-lg text-slate-500">
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

        {/* Link to dictionaries */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-lg text-amber-800 mb-2">
            📖 Dictionary Exercises
          </h3>
          <p className="text-amber-700 mb-4">
            Roblox-themed dictionary exercises and projects — part of Milestone
            2.
          </p>
          <Link
            to="/dictionaries"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-sm"
          >
            View Dictionary Exercises →
          </Link>
        </div>
      </div>
    </div>
  );
}
