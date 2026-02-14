import { Link } from "react-router-dom";
import LessonCard from "../components/LessonCard";
import { sundayLessons, sundayAnswers } from "../data/lessons";

export default function SundaysPage() {
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
            🏆 Sunday Lessons
          </h1>
          <p className="text-lg text-slate-500">
            Algorithms, DFS/BFS, and Waterloo CCC prep
          </p>
        </div>

        {/* Lesson cards */}
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sundayLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/sundays"
            />
          ))}
        </div>

        {/* Answer Keys */}
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          🔑 Answer Keys
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
