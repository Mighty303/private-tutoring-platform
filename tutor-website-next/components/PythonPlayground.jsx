"use client";

import { useState, useCallback } from "react";
import usePyodide from "@/hooks/usePyodide";
import CodeEditor from "./CodeEditor";
import OutputConsole from "./OutputConsole";

export default function PythonPlayground({
  starterCode = "# Write your Python code here\nprint('Hello, world!')\n",
  title,
  exerciseDescription,
  // exerciseId — reserved for future submission saving
}) {
  const [code, setCode] = useState(starterCode);
  const { isLoading, isReady, error, isRunning, output, runCode, clearOutput } =
    usePyodide();
  const [hint, setHint] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [askAnswer, setAskAnswer] = useState(null);
  const [askLoading, setAskLoading] = useState(false);

  const handleRun = useCallback(() => {
    runCode(code);
  }, [code, runCode]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    clearOutput();
    setHint(null);
    setHintUsed(false);
    setAskAnswer(null);
    setQuestion("");
  }, [starterCode, clearOutput]);

  const handleGetHint = useCallback(async () => {
    if (hintUsed || hintLoading) return;
    setHintLoading(true);

    // Find the last error from output to send as context
    const lastError = output.find((o) => o.type === "error")?.text || "";

    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          exerciseDescription: exerciseDescription || "",
          error: lastError,
        }),
      });

      if (!res.ok) throw new Error("Failed to get hint");
      const data = await res.json();
      setHint(data.hint);
      setHintUsed(true);
    } catch {
      setHint("Sorry, couldn't generate a hint right now. Try again later.");
      // Don't mark as used on failure so they can retry
    } finally {
      setHintLoading(false);
    }
  }, [code, exerciseDescription, output, hintUsed, hintLoading]);

  const handleAskQuestion = useCallback(async () => {
    if (!question.trim() || askLoading) return;
    setAskLoading(true);
    setAskAnswer(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          exerciseDescription: exerciseDescription || "",
          code,
        }),
      });

      if (!res.ok) throw new Error("Failed to get answer");
      const data = await res.json();
      setAskAnswer(data.answer);
    } catch {
      setAskAnswer("Sorry, couldn't get an answer right now. Try again later.");
    } finally {
      setAskLoading(false);
    }
  }, [question, exerciseDescription, code, askLoading]);

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

        {/* Hint button — only show when exerciseDescription exists */}
        {exerciseDescription && (
          <button
            onClick={handleGetHint}
            disabled={hintUsed || hintLoading || isRunning}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            title={hintUsed ? "Hint already used for this exercise" : "Get a hint (1 per exercise)"}
          >
            {hintLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Thinking…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {hintUsed ? "Hint Used" : "Get Hint"}
              </>
            )}
          </button>
        )}

        {/* Keyboard shortcut hint */}
        <span className="hidden sm:inline text-xs text-slate-400 ml-auto">
          ⌘ + Enter to run
        </span>
      </div>

      {/* Hint display */}
      {hint && (
        <div className="mb-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-lg mt-0.5 shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Hint
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 whitespace-pre-wrap">
                {hint}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ask a Question panel — only on exercise pages */}
      {exerciseDescription && (
        <div className="mb-3">
          <button
            onClick={() => setAskOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {askOpen ? "Close" : "Ask a Question"}
            <svg className={`w-3 h-3 transition-transform ${askOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {askOpen && (
            <div className="mt-2 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">
                Ask about the exercise, a concept, or Python — no solutions given.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAskQuestion();
                    }
                  }}
                  placeholder="e.g.I don't understand the question"
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                  disabled={askLoading}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={askLoading || !question.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {askLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      …
                    </>
                  ) : (
                    "Ask"
                  )}
                </button>
              </div>

              {/* Answer display */}
              {askAnswer && (
                <div className="mt-3 flex items-start gap-2">
                  <span className="text-base mt-0.5 shrink-0">🤖</span>
                  <p className="text-sm text-indigo-800 dark:text-indigo-300 whitespace-pre-wrap">
                    {askAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
