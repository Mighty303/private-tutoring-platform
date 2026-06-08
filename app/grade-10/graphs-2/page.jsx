import Link from "next/link";
import LessonEmoji from "@/components/LessonEmoji";
import { GlobeMark, PlayMark } from "@/components/TrackLinkIcon";
import { graph2Exercises } from "@/lib/lessons";
import ExerciseProgressTracker, { ExerciseCheckmark } from "@/components/ExerciseProgressTracker";

const tagColors = {
  Graphs: "bg-teal-100 text-teal-700",
  Reference: "bg-blue-100 text-blue-700",
  Exercises: "bg-teal-100 text-teal-700",
  "Cycle Detection": "bg-red-100 text-red-700",
  "Topological Sort": "bg-violet-100 text-violet-700",
};

export const metadata = {
  title: "Graphs Part 2 — CS Tutor",
};

export default function Graphs2Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Grade 10 Lessons
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Graphs Part 2 — Adjacency Lists & Cycles
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Build adjacency lists, detect cycles with DFS, and find valid course orderings
          </p>
        </div>

        {/* Link to Part 1 (Graphs / DFS on grids) */}
        <Link
          href="/grade-10/graphs"
          className="group flex items-center gap-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl px-5 py-4 mb-4 shadow-sm hover:shadow-md hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-200"
        >
          <GlobeMark />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors">
              Graphs Part 1 — DFS on Grids
            </h3>
            <p className="text-sm text-teal-600 dark:text-teal-400">
              Haven&apos;t done Part 1? Start with DFS grid exploration first
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Link to animation */}
        <Link
          href="/grade-10/graphs-2/animation"
          className="group flex items-center gap-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-xl px-5 py-4 mb-6 shadow-sm hover:shadow-md hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-200"
        >
          <PlayMark />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-cyan-800 dark:text-cyan-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
              Interactive Graph Animation
            </h3>
            <p className="text-sm text-cyan-600 dark:text-cyan-400">
              Watch DFS cycle detection step-by-step with adjacency lists
            </p>
          </div>
          <svg className="w-5 h-5 shrink-0 text-cyan-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Progress */}
        <ExerciseProgressTracker
          exercises={graph2Exercises}
          label="Graph Part 2 Exercises"
          color="emerald"
          className="mb-6"
        />

        {/* Numbered list */}
        <div className="space-y-3">
          {graph2Exercises.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/grade-10/graphs-2/${lesson.id}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {index + 1}
              </span>

              <LessonEmoji emoji={lesson.emoji} className="text-2xl shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
          ))}
        </div>
      </div>
    </div>
  );
}
