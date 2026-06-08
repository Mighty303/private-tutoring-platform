import Link from "next/link";
import NestedLoopAnimation from "@/components/NestedLoopAnimation";

export const metadata = {
  title: "How Nested Loops Work — CS Tutor",
};

export default function NestedLoopAnimationPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/grade-7/nested-loops"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Nested Loops
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            How Nested Loops Work
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Step through code to see how the outer and inner loops run together
          </p>
        </div>

        {/* Animation */}
        <NestedLoopAnimation />
      </div>
    </div>
  );
}
