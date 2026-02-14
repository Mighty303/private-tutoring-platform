import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import contentMap from "../content";
import {
  saturdayLessons,
  dictionaryExercises,
  sundayLessons,
  sundayAnswers,
} from "../data/lessons";

function getAllLessons() {
  return [
    ...saturdayLessons,
    ...dictionaryExercises,
    ...sundayLessons,
    ...sundayAnswers,
  ];
}

function getBackPath(pathname) {
  if (pathname.startsWith("/saturdays")) return { path: "/saturdays", label: "Saturday Lessons" };
  if (pathname.startsWith("/dictionaries")) return { path: "/dictionaries", label: "Dictionary Exercises" };
  if (pathname.startsWith("/sundays")) return { path: "/sundays", label: "Sunday Lessons" };
  return { path: "/", label: "Home" };
}

export default function LessonPage() {
  const { id } = useParams();
  const location = useLocation();
  const allLessons = getAllLessons();
  const lesson = allLessons.find((l) => l.id === id);
  const content = contentMap[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!lesson || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-300 mb-4">404</h1>
          <p className="text-slate-500 mb-6">Lesson not found</p>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Go Home
          </Link>
        </div>
      </div>
    );
  }

  const back = getBackPath(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={back.path}
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-3 transition-colors"
          >
            ← Back to {back.label}
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
