"use client";

/**
 * LeetCode-style test case results panel.
 *
 * Props:
 *   results: Array<{ input, expected, actual, passed }>
 *   allPassed: boolean
 */
export default function TestResults({ results, allPassed }) {
  if (!results || results.length === 0) return null;

  const passCount = results.filter((r) => r.passed).length;

  return (
    <div className="my-3 rounded-xl border border-slate-700 overflow-hidden bg-slate-900">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b border-slate-700 ${
          allPassed
            ? "bg-emerald-900/30"
            : "bg-red-900/30"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">
            {allPassed ? "✅" : "❌"}
          </span>
          <span
            className={`text-sm font-bold ${
              allPassed
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {allPassed
              ? "All Test Cases Passed!"
              : `${passCount}/${results.length} Test Cases Passed`}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {passCount}/{results.length}
        </span>
      </div>

      {/* Test case rows */}
      <div className="divide-y divide-slate-800">
        {results.map((tc, i) => (
          <div
            key={i}
            className={`px-4 py-3 ${
              tc.passed
                ? "bg-slate-900"
                : "bg-red-950/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                  tc.passed
                    ? "bg-emerald-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {tc.passed ? "✓" : "✗"}
              </span>
              <span className="text-sm font-semibold text-slate-300">
                Test Case {i + 1}
              </span>
              {tc.error && (
                <span className="text-xs text-red-400 ml-auto">Error</span>
              )}
            </div>

            <div className="ml-7 space-y-1 font-mono text-xs">
              {/* Input */}
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0 w-16">Input:</span>
                <span className="text-slate-300 break-all">{tc.input}</span>
              </div>

              {/* Expected */}
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0 w-16">Expected:</span>
                <span className="text-emerald-400 break-all">{tc.expected}</span>
              </div>

              {/* Actual */}
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0 w-16">Actual:</span>
                <span
                  className={`break-all ${
                    tc.passed ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tc.error ? tc.error : tc.actual}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
