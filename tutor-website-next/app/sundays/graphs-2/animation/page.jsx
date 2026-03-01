import Link from "next/link";
import GraphAnimation from "@/components/GraphAnimation";

export const metadata = {
  title: "Graph Cycle Detection — CS Tutor",
};

export default function GraphAnimationPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/sundays/graphs-2"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Graphs Part 2
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Directed Graph — Cycle Detection
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Interactive visualization of DFS cycle detection with adjacency lists and three-color marking
          </p>
        </div>

        {/* Animation */}
        <GraphAnimation />
      </div>
    </div>
  );
}
