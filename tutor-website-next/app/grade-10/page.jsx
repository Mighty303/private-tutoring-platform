import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { IntermediateLessons, basicsExercises, basics2Exercises, heapExercises, heap2Exercises, graph2Exercises, backtrackingExercises, treeExercises } from "@/lib/lessons";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";

export const metadata = {
  title: "Grade 10 Lessons — CS Tutor",
};

export default function Grade10Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Grade 10 Lessons
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Algorithms, DFS/BFS, and Waterloo CCC prep
          </p>
        </div>

        {/* Lesson cards */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Basics hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-emerald-500 shadow-sm">
            <div className="p-6">
              {/* Array / list */}
              <svg width="80" height="34" viewBox="0 0 80 34" fill="none" stroke="currentColor" className="text-emerald-500 mb-3" aria-hidden>
                <rect x="1"  y="3" width="16" height="28" rx="2" strokeWidth="1.5" />
                <rect x="21" y="3" width="16" height="28" rx="2" strokeWidth="1.5" />
                <rect x="41" y="3" width="16" height="28" rx="2" strokeWidth="1.5" />
                <rect x="61" y="3" width="16" height="28" rx="2" strokeWidth="1.5" />
                <line x1="9"  y1="3" x2="9"  y2="31" strokeWidth="0" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Python Basics Review
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Variables, operators, input, conditionals, loops, lists, and functions — 8 exercises plus a bonus battle.
              </p>
              <ExerciseProgressTracker
                exercises={basicsExercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/basics"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Algorithm Review hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-indigo-500 shadow-sm">
            <div className="p-6">
              {/* Unsorted bars → sort/algorithm operations */}
              <svg width="76" height="44" viewBox="0 0 76 44" fill="none" stroke="currentColor" className="text-indigo-500 mb-3" aria-hidden>
                <rect x="2"  y="20" width="10" height="22" rx="1.5" strokeWidth="1.5" />
                <rect x="17" y="6"  width="10" height="36" rx="1.5" strokeWidth="1.5" />
                <rect x="32" y="28" width="10" height="14" rx="1.5" strokeWidth="1.5" />
                <rect x="47" y="12" width="10" height="30" rx="1.5" strokeWidth="1.5" />
                <rect x="62" y="22" width="10" height="20" rx="1.5" strokeWidth="1.5" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Algorithm Review
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Summation, reverse an array, remove duplicates, and find the minimum — algorithm review.
              </p>
              <ExerciseProgressTracker
                exercises={basics2Exercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/basics-2"
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Binary Trees hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-emerald-500 shadow-sm">
            <div className="p-6">
              {/* Binary tree: asymmetric BST (right subtree has one child) */}
              <svg width="80" height="54" viewBox="0 0 80 54" fill="none" className="text-emerald-500 mb-3" aria-hidden>
                <line x1="40" y1="10" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="40" y1="10" x2="58" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="12" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="32" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="68" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="40" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="22" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="58" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="68" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Binary Trees
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                TreeNode class, recursive DFS, traversals, and path problems — with an interactive BST visualizer.
              </p>
              <ExerciseProgressTracker
                exercises={treeExercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/trees"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Heaps hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-amber-500 shadow-sm">
            <div className="p-6">
              {/* Min-heap tree: root (filled = minimum) + 2 children + 4 leaves */}
              <svg width="80" height="54" viewBox="0 0 80 54" fill="none" className="text-amber-500 mb-3" aria-hidden>
                <line x1="40" y1="10" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="40" y1="10" x2="58" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="12" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="32" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="48" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="68" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="40" cy="10" r="8" fill="currentColor" />
                <circle cx="22" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="58" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="48" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="68" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Heaps — Priority Queues
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Heap data structure, priority queues, and practical exercises using Python&apos;s heapq module.
              </p>
              <ExerciseProgressTracker
                exercises={heapExercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/heaps"
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Heaps Part 2 hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-rose-500 shadow-sm">
            <div className="p-6">
              {/* Same heap, top-K=3 nodes filled to show extraction */}
              <svg width="80" height="54" viewBox="0 0 80 54" fill="none" className="text-rose-500 mb-3" aria-hidden>
                <line x1="40" y1="10" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="40" y1="10" x2="58" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="12" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="32" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="48" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="68" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="40" cy="10" r="8" fill="currentColor" />
                <circle cx="22" cy="28" r="7" fill="currentColor" />
                <circle cx="58" cy="28" r="7" fill="currentColor" />
                <circle cx="12" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="48" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="68" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Heaps Part 2 — Top-K &amp; CCC
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Frequency counting, Top-K Frequent Elements, and CCC Bronze Count problem.
              </p>
              <ExerciseProgressTracker
                exercises={heap2Exercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/heaps-2"
                className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Backtracking hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-violet-500 shadow-sm">
            <div className="p-6">
              {/* Decision tree with one pruned branch (×) */}
              <svg width="80" height="54" viewBox="0 0 80 54" fill="none" className="text-violet-500 mb-3" aria-hidden>
                <line x1="40" y1="10" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="40" y1="10" x2="58" y2="28" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="12" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="32" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="48" y2="46" stroke="currentColor" strokeWidth="1.5" />
                <line x1="58" y1="28" x2="68" y2="46" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
                <circle cx="40" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="22" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="58" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="48" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="68" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                <line x1="63" y1="41" x2="73" y2="51" stroke="currentColor" strokeWidth="1.75" strokeOpacity="0.5" strokeLinecap="round" />
                <line x1="73" y1="41" x2="63" y2="51" stroke="currentColor" strokeWidth="1.75" strokeOpacity="0.5" strokeLinecap="round" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Backtracking — Subsets &amp; Combinations
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Master backtracking — subsets, combination sum, and permutations.
              </p>
              <ExerciseProgressTracker
                exercises={backtrackingExercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/backtracking"
                className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {/* Graphs Part 2 hub card */}
          <div className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-teal-500 shadow-sm">
            <div className="p-6">
              {/* Directed graph: 4 nodes, directed edges forming a cycle */}
              <svg width="80" height="54" viewBox="0 0 80 54" fill="none" className="text-teal-500 mb-3" aria-hidden>
                <defs>
                  <marker id="arr-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                  </marker>
                </defs>
                <line x1="25" y1="10" x2="54" y2="10" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                <line x1="16" y1="19" x2="16" y2="36" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                <line x1="64" y1="19" x2="64" y2="36" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                <line x1="25" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                <line x1="23" y1="17" x2="56" y2="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arr-teal)" />
                <circle cx="16" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="64" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16" cy="44" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="64" cy="44" r="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Graphs Part 2 — Adjacency Lists &amp; Cycles
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                Build adjacency lists, detect cycles with DFS, and find valid course orderings.
              </p>
              <ExerciseProgressTracker
                exercises={graph2Exercises}
                color="emerald"
                className="mb-3"
              />
              <Link
                href="/grade-10/graphs-2"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
              >
                View Exercises →
              </Link>
            </div>
          </div>
          {IntermediateLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              basePath="/grade-10"
            />
          ))}
        </div>


      </div>
    </div>
  );
}
