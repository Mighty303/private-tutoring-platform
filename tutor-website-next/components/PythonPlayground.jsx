"use client";

import { useState, useCallback } from "react";
import usePyodide from "@/hooks/usePyodide";
import CodeEditor from "./CodeEditor";
import OutputConsole from "./OutputConsole";

export default function PythonPlayground({
  starterCode = "# Write your Python code here\nprint('Hello, world!')\n",
  title,
  // exerciseId — reserved for future submission saving
}) {
  const [code, setCode] = useState(starterCode);
  const { isLoading, isReady, error, isRunning, output, runCode, clearOutput } =
    usePyodide();

  const handleRun = useCallback(() => {
    runCode(code);
  }, [code, runCode]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    clearOutput();
  }, [starterCode, clearOutput]);

  const handleKeyDown = useCallback(
    (e) => {
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (isReady && !isRunning) {
          handleRun();
        }
      }
    },
    [isReady, isRunning, handleRun]
  );

  return (
    <div className="my-6" onKeyDown={handleKeyDown}>
      {/* Header */}
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {title}
          </h3>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
          <svg
            className="w-5 h-5 text-amber-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Loading Python runtime…
          </span>
        </div>
      )}

      {/* Error loading runtime */}
      {error && (
        <div className="px-4 py-3 mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            ❌ Failed to load Python: {error}
          </span>
        </div>
      )}

      {/* Editor */}
      <CodeEditor
        value={code}
        onChange={setCode}
        height="250px"
      />

      {/* Controls */}
      <div className="flex items-center gap-3 my-3">
        {/* Run button */}
        <button
          onClick={handleRun}
          disabled={!isReady || isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          {isRunning ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Running…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Run
            </>
          )}
        </button>

        {/* Reset button */}
        <button
          onClick={handleReset}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>

        {/* Keyboard shortcut hint */}
        <span className="hidden sm:inline text-xs text-slate-400 ml-auto">
          ⌘ + Enter to run
        </span>
      </div>

      {/* Console output */}
      <OutputConsole output={output} isRunning={isRunning} />

      {/* Supported features note */}
      <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        <details>
          <summary className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            ℹ️ About this Python environment
          </summary>
          <div className="mt-2 pl-4 space-y-1">
            <p>✅ Standard library: heapq, collections, itertools, math, random, functools, datetime, bisect</p>
            <p>✅ Functions, classes, recursion, print()</p>
            <p>❌ No file system, subprocess, OS access, or network requests</p>
            <p>❌ No pip install (all supported modules are pre-loaded)</p>
            <p>⏱️ 5 second execution time limit</p>
          </div>
        </details>
      </div>
    </div>
  );
}
