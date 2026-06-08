import Link from "next/link";
import DijkstraAnimation from "@/components/DijkstraAnimation";

export const metadata = {
  title: "Dijkstra's Algorithm — CS Tutor",
};

export default function DijkstraAnimationPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10/dijkstra"
            className="inline-flex items-center text-sm text-slate-500 hover:text-yellow-600 dark:text-slate-400 dark:hover:text-yellow-400 mb-4 transition-colors"
          >
            ← Back to Dijkstra&apos;s
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Dijkstra&apos;s Algorithm
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Interactive step-by-step visualization — watch the priority queue, distance table, and edge relaxation in real time
          </p>
        </div>

        {/* Animation */}
        <DijkstraAnimation />
      </div>
    </div>
  );
}
