import Link from "next/link";
import { getContent, getAllContentIds } from "@/lib/content";
import { getLessonById } from "@/lib/lessons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const ids = getAllContentIds().filter(
    (id) =>
      ["algorithms", "dfs-bfs", "graphs", "algorithms-answers", "dfs-bfs-answers"].includes(id)
  );
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return { title: lesson ? `${lesson.title} — CS Tutor` : "Lesson — CS Tutor" };
}

export default async function IntermediateLessonPage({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  const content = getContent(id);

  if (!lesson || !content) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/intermediates"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-3 transition-colors"
          >
            ← Back to Intermediate Lessons
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full"
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
        <div className="prose">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}
