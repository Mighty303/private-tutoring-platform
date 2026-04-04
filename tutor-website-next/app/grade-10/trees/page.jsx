import Link from "next/link";
import LessonEmoji from "@/components/LessonEmoji";
import { PlayMark } from "@/components/TrackLinkIcon";
import { treeExercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  Trees: "bg-emerald-100 text-emerald-700",
  Reference: "bg-blue-100 text-blue-700",
  Exercises: "bg-emerald-100 text-emerald-700",
  Easy: "bg-teal-100 text-teal-700",
  Medium: "bg-indigo-100 text-indigo-700",
  Recursion: "bg-violet-100 text-violet-700",
};

export const metadata = {
  title: "Binary Trees — CS Tutor",
};

export default function TreesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10"
            className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-4 transition-colors"
          >
            ← Back to Grade 10 Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Binary Trees
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Master recursive thinking through binary trees — from traversals to path problems
          </p>
        </div>

        {/* Animation card */}
        <Link
          href="/grade-10/trees/animation"
          className="group flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl px-5 py-4 mb-6 shadow-sm hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200"
        >
          <PlayMark />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-200 transition-colors">
              How Binary Trees Work
            </h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Interactive BST — insert nodes and animate inorder, preorder, postorder traversals
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={treeExercises}
          label="Tree Exercises"
          color="emerald"
          className="mb-6"
        />

        {/* Exercise list */}
        <div className="space-y-3">
          {treeExercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/grade-10/trees/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {index + 1}
              </span>
              <LessonEmoji emoji={lesson.emoji} className="text-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
                className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
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
