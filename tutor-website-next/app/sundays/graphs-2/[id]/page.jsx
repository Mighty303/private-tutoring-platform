import Link from "next/link";
import { getContent, getAllContentIds } from "@/lib/content";
import { getLessonById, graph2Exercises } from "@/lib/lessons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ExercisePlayground from "@/components/ExercisePlayground";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const ids = getAllContentIds().filter((id) => id.startsWith("graph2-"));
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return {
    title: lesson ? `${lesson.title} — CS Tutor` : "Exercise — CS Tutor",
  };
}

export default async function Graph2LessonPage({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  const content = getContent(id);

  if (!lesson || !content) notFound();

  const currentIndex = graph2Exercises.findIndex((l) => l.id === id);
  const prev = currentIndex > 0 ? graph2Exercises[currentIndex - 1] : null;
  const next =
    currentIndex < graph2Exercises.length - 1
      ? graph2Exercises[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/sundays/graphs-2"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-3 transition-colors"
          >
            ← Back to Graphs Part 2
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                {lesson.title}
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                {currentIndex + 1} of {graph2Exercises.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose">
          <MarkdownRenderer content={content} />
        </div>
        <ExercisePlayground
          content={content}
          exerciseId={id}
          title={lesson.title}
        />
      </div>

      {/* Prev / Next navigation */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-stretch gap-4">
            {prev ? (
              <Link
                href={`/sundays/graphs-2/${prev.id}`}
                className="group flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    Previous
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors">
                    {prev.emoji} {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/sundays/graphs-2/${next.id}`}
                className="group flex-1 flex items-center justify-end gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200"
              >
                <div className="min-w-0 text-right">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Next</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors">
                    {next.emoji} {next.title}
                  </p>
                </div>
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
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
