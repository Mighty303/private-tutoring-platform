import Link from "next/link";
import { functionExercises, discordBotExercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  Functions: "bg-violet-100 text-violet-700",
  Reference: "bg-blue-100 text-blue-700",
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
  Discord: "bg-indigo-100 text-indigo-700",
};

export const metadata = {
  title: "Functions Practice — CS Tutor",
};

export default function FunctionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/saturdays"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Saturday Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Functions Practice
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Learn functions step by step — from basics to building game features
          </p>
        </div>

        {/* Animation card */}
        <Link
          href="/saturdays/functions/animation"
          className="group flex items-center gap-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700 rounded-xl px-5 py-4 mb-6 shadow-sm hover:shadow-md hover:border-violet-400 dark:hover:border-violet-500 transition-all duration-200"
        >
          <span className="text-2xl shrink-0">🎬</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-violet-800 dark:text-violet-300 group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
              How Function Calls Work
            </h3>
            <p className="text-sm text-violet-600 dark:text-violet-400">
              Interactive step-through animation — see how Python jumps into functions
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-violet-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={functionExercises}
          label="Function Exercises"
          color="violet"
          className="mb-6"
        />

        {/* Numbered list */}
        <div className="space-y-3">
          {functionExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/saturdays/functions/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {index + 1}
              </span>
              <span className="text-2xl shrink-0">{lesson.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {lesson.description}
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 gap-2">
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
              <ExerciseCheckmark exerciseId={lesson.id} />
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Discord Bot Challenge section */}
        <div className="mt-12 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Discord Bot Challenge
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Write functions that make a real bot post to Discord — practice functions with a live project!
              </p>
            </div>
          </div>
        </div>

        {/* Discord server invite */}
        <a
          href="https://discord.gg/janmfXcPFH"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 bg-[#5865F2]/5 dark:bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-xl px-5 py-4 mb-6 shadow-sm hover:shadow-md hover:border-[#5865F2]/60 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#5865F2] group-hover:text-[#4752C4] transition-colors">
              Join the Discord Server
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join to see your bot messages appear live as you complete the exercises!
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-[#5865F2]/60 group-hover:text-[#5865F2] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <ExerciseProgressTracker
          exercises={discordBotExercises}
          label="Discord Bot Exercises"
          color="discord"
          className="mb-6"
        />

        <div className="space-y-3">
          {discordBotExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/saturdays/functions/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-[#5865F2] dark:hover:border-[#5865F2] transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#5865F2]/10 group-hover:bg-[#5865F2]/20 flex items-center justify-center text-sm font-bold text-[#5865F2] transition-colors">
                {index + 1}
              </span>
              <span className="text-2xl shrink-0">{lesson.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-[#5865F2] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {lesson.description}
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 gap-2">
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
              <ExerciseCheckmark exerciseId={lesson.id} />
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-[#5865F2] group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
