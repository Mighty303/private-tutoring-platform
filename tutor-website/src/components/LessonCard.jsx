import { Link } from "react-router-dom";

const tagColors = {
  Reference: "bg-blue-100 text-blue-700",
  Beginner: "bg-green-100 text-green-700",
  Exercises: "bg-amber-100 text-amber-700",
  Review: "bg-orange-100 text-orange-700",
  Functions: "bg-violet-100 text-violet-700",
  Intermediate: "bg-purple-100 text-purple-700",
  Dictionaries: "bg-yellow-100 text-yellow-700",
  Roblox: "bg-red-100 text-red-700",
  Input: "bg-cyan-100 text-cyan-700",
  Conditionals: "bg-pink-100 text-pink-700",
  Project: "bg-fuchsia-100 text-fuchsia-700",
  Game: "bg-rose-100 text-rose-700",
  Algorithms: "bg-indigo-100 text-indigo-700",
  CCC: "bg-sky-100 text-sky-700",
  Grids: "bg-teal-100 text-teal-700",
  DFS: "bg-emerald-100 text-emerald-700",
  Recursion: "bg-lime-100 text-lime-700",
  Answers: "bg-green-100 text-green-700",
};

const cardBorders = {
  indigo: "border-l-indigo-500",
  emerald: "border-l-emerald-500",
  teal: "border-l-teal-500",
  violet: "border-l-violet-500",
  amber: "border-l-amber-500",
  rose: "border-l-rose-500",
  orange: "border-l-orange-500",
  sky: "border-l-sky-500",
  lime: "border-l-lime-500",
  fuchsia: "border-l-fuchsia-500",
  cyan: "border-l-cyan-500",
  blue: "border-l-blue-500",
  purple: "border-l-purple-500",
  red: "border-l-red-500",
  green: "border-l-green-500",
};

export default function LessonCard({ lesson, basePath }) {
  return (
    <Link
      to={`${basePath}/${lesson.id}`}
      className={`group block bg-white rounded-xl border border-slate-200 border-l-4 ${
        cardBorders[lesson.color] || "border-l-indigo-500"
      } shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{lesson.emoji}</span>
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
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
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {lesson.description}
        </p>
        <div className="flex flex-wrap gap-2">
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
      </div>
    </Link>
  );
}
