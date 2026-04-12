import LessonEmoji from "@/components/LessonEmoji";
import Link from "next/link";
import { getContent, getAllContentIds } from "@/lib/content";
import { getLessonById, treeExercises } from "@/lib/lessons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ExercisePlayground from "@/components/ExercisePlayground";
import TreeAnimation from "@/components/TreeAnimation";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const ids = getAllContentIds().filter((id) => id.startsWith("tree-"));
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return {
    title: lesson ? `${lesson.title} — CS Tutor` : "Exercise — CS Tutor",
  };
}

/** Strip the ## Starter Code section — used by the playground, not shown in prose. */
function hideStarterCode(markdown) {
  return markdown.replace(
    /\n+##\s*Starter\s*Code\b[\s\S]*?(?=\n##\s|$)/i,
    "\n"
  );
}

export default async function TreeLessonPage({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  const content = getContent(id);

  if (!lesson || !content) notFound();

  const currentIndex = treeExercises.findIndex((l) => l.id === id);
  const prev = currentIndex > 0 ? treeExercises[currentIndex - 1] : null;
  const next =
    currentIndex < treeExercises.length - 1
      ? treeExercises[currentIndex + 1]
      : null;

  const proseContent = hideStarterCode(content);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/grade-10/trees"
            className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-3 transition-colors"
          >
            ← Back to Binary Trees
          </Link>
          <div className="flex items-center gap-3">
            <LessonEmoji emoji={lesson.emoji} className="text-3xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                {lesson.title}
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                {currentIndex + 1} of {treeExercises.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose">
          <MarkdownRenderer content={proseContent} />
        </div>
        {id === "tree-intro" && <TreeAnimation />}
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
                href={`/grade-10/trees/${prev.id}`}
                className="group flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-emerald-500 group-hover:-translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Previous</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate transition-colors">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/grade-10/trees/${next.id}`}
                className="group flex-1 flex items-center justify-end gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200"
              >
                <div className="min-w-0 text-right">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Next</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate transition-colors">
                    {next.title}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
