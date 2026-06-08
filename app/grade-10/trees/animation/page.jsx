import Link from "next/link";
import TreeAnimation from "@/components/TreeAnimation";

export const metadata = {
  title: "How Binary Trees Work — CS Tutor",
};

export default function TreeAnimationPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-10/trees"
            className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-4 transition-colors"
          >
            ← Back to Binary Trees
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            How Binary Trees Work
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Interactive BST — insert nodes and animate inorder, preorder, and postorder traversals
          </p>
        </div>

        {/* Animation */}
        <TreeAnimation />

        {/* Explanation cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Inorder",
              order: "Left → Root → Right",
              result: "[1, 2, 3, 4, 5, 6, 7, 8]",
              note: "Visits in sorted order for BSTs",
              color: "indigo",
            },
            {
              title: "Preorder",
              order: "Root → Left → Right",
              result: "[8, 4, 2, 1, 3, 6, 5, 7, ...]",
              note: "Useful for copying the tree structure",
              color: "violet",
            },
            {
              title: "Postorder",
              order: "Left → Right → Root",
              result: "[1, 3, 2, 5, 7, 6, 4, ...]",
              note: "Useful for deleting or evaluating",
              color: "teal",
            },
          ].map((t) => (
            <div
              key={t.title}
              className={`bg-${t.color}-50 dark:bg-${t.color}-900/20 border border-${t.color}-200 dark:border-${t.color}-700 rounded-xl p-4`}
            >
              <h3 className={`font-bold text-${t.color}-800 dark:text-${t.color}-300 mb-1`}>
                {t.title}
              </h3>
              <p className={`text-sm font-mono text-${t.color}-700 dark:text-${t.color}-400 mb-2`}>
                {t.order}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
