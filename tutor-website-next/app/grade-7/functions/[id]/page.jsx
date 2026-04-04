import LessonEmoji from "@/components/LessonEmoji";
import Link from "next/link";
import { getContent, getAllContentIds } from "@/lib/content";
import { getLessonById, functionExercises, discordBotExercises } from "@/lib/lessons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ExercisePlayground from "@/components/ExercisePlayground";
import DiscordExercisePlayground from "./DiscordExercisePlayground";
import { notFound } from "next/navigation";

const allFunctionItems = [...functionExercises, ...discordBotExercises];

export async function generateStaticParams() {
  const ids = getAllContentIds().filter((id) => id.startsWith("func-"));
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return {
    title: lesson ? `${lesson.title} — Functions Practice` : "Functions — CS Tutor",
  };
}

export default async function FunctionExercisePage({ params }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  const content = getContent(id);

  if (!lesson || !content) notFound();

  const isDiscord = !!lesson.isDiscord;
  const exerciseList = isDiscord ? discordBotExercises : functionExercises;
  const currentIndex = exerciseList.findIndex((l) => l.id === id);
  const prev = currentIndex > 0 ? exerciseList[currentIndex - 1] : null;
  const next =
    currentIndex < exerciseList.length - 1
      ? exerciseList[currentIndex + 1]
      : null;

  const accentColor = isDiscord ? "[#5865F2]" : "violet";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top bar */}
      <div className={`border-b ${isDiscord ? "bg-[#5865F2]/5 dark:bg-[#5865F2]/10 border-[#5865F2]/20" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/grade-7/functions"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-3 transition-colors"
          >
            ← Back to Functions
          </Link>
          <div className="flex items-center gap-3">
            <LessonEmoji emoji={lesson.emoji} className="text-3xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {isDiscord && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5865F2] bg-[#5865F2]/10 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                    </svg>
                    Discord Bot
                  </span>
                )}
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  {currentIndex + 1} of {exerciseList.length}
                </p>
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
        {isDiscord ? (
          <DiscordExercisePlayground
            content={content}
            exerciseId={id}
            title={lesson.title}
          />
        ) : (
          <ExercisePlayground
            content={content}
            exerciseId={id}
            title={lesson.title}
          />
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className={`border-t ${isDiscord ? "border-[#5865F2]/20 bg-[#5865F2]/5 dark:bg-[#5865F2]/10" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-stretch gap-4">
            {prev ? (
              <Link
                href={`/grade-7/functions/${prev.id}`}
                className={`group flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:shadow-md transition-all duration-200 ${isDiscord ? "hover:border-[#5865F2]" : "hover:border-violet-300 dark:hover:border-violet-600"}`}
              >
                <svg className={`w-5 h-5 shrink-0 text-slate-400 group-hover:-translate-x-1 transition-all ${isDiscord ? "group-hover:text-[#5865F2]" : "group-hover:text-violet-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Previous</p>
                  <p className={`text-sm font-bold text-slate-700 dark:text-slate-200 truncate transition-colors ${isDiscord ? "group-hover:text-[#5865F2]" : "group-hover:text-violet-600 dark:group-hover:text-violet-400"}`}>
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/grade-7/functions/${next.id}`}
                className={`group flex-1 flex items-center justify-end gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 hover:shadow-md transition-all duration-200 ${isDiscord ? "hover:border-[#5865F2]" : "hover:border-violet-300 dark:hover:border-violet-600"}`}
              >
                <div className="min-w-0 text-right">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Next</p>
                  <p className={`text-sm font-bold text-slate-700 dark:text-slate-200 truncate transition-colors ${isDiscord ? "group-hover:text-[#5865F2]" : "group-hover:text-violet-600 dark:group-hover:text-violet-400"}`}>
                    {next.title}
                  </p>
                </div>
                <svg className={`w-5 h-5 shrink-0 text-slate-400 group-hover:translate-x-1 transition-all ${isDiscord ? "group-hover:text-[#5865F2]" : "group-hover:text-violet-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
