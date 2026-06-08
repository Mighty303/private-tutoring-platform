"use client";

import Link from "next/link";
import PythonPlayground from "@/components/PythonPlayground";

const STARTER_CODE = `# Python Playground
# Write any Python code and click Run!
`;

export default function PlaygroundClient() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
              Python Playground
            </h1>
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Write and run Python code directly in your browser — no setup needed
          </p>
        </div>

        {/* Playground */}
        <PythonPlayground
          starterCode={STARTER_CODE}
          title="Free Coding Area"
        />
      </div>
    </div>
  );
}
