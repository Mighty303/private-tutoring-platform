"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import usePyodide from "@/hooks/usePyodide";
import { markExerciseComplete, invalidateCompletedCache } from "@/hooks/useExerciseProgress";
import CodeEditor from "./CodeEditor";
import OutputConsole from "./OutputConsole";
import TestResults from "./TestResults";

// Helper to build a localStorage key for an exercise
function cacheKey(exerciseId) {
  return exerciseId ? `playground-code:${exerciseId}` : null;
}

export default function PythonPlayground({
  starterCode = "# Write your Python code here\nprint('Hello, world!')\n",
  title,
  exerciseDescription,
  exerciseId,
  testCases = [],
  classroomId, // pass classroomId for membership check
}) {
  // Initialise code from localStorage (if available) or starterCode
  const [code, setCode] = useState(() => {
    if (typeof window === "undefined") return starterCode;
    const key = cacheKey(exerciseId);
    if (!key) return starterCode;
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? saved : starterCode;
    } catch {
      return starterCode;
    }
  });
  const { isLoading, isReady, error, isRunning, output, pythonVersion, runCode, clearOutput, runTests } =
    usePyodide();

  // Persist code to localStorage on every change
  useEffect(() => {
    const key = cacheKey(exerciseId);
    if (!key) return;
    try {
      localStorage.setItem(key, code);
    } catch {
      // Storage full or unavailable — ignore
    }
  }, [code, exerciseId]);

  const [hint, setHint] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [askAnswer, setAskAnswer] = useState(null);
  const [askLoading, setAskLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null); // { results, allPassed }
  const [toast, setToast] = useState(null); // { type: "success" | "error", message }
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const { data: session } = useSession();
  const [isClassroomMember, setIsClassroomMember] = useState(false);
  const [membershipChecked, setMembershipChecked] = useState(false);
  // Check classroom membership or admin
  useEffect(() => {
    if (!session) {
      setIsClassroomMember(false);
      setMembershipChecked(true);
      return;
    }
    // Admin always gets access regardless of classroomId
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (session.user?.role === "admin" || (adminEmail && session.user?.email === adminEmail)) {
      setIsClassroomMember(true);
      setMembershipChecked(true);
      return;
    }
    // No classroomId specified — any authenticated user gets access
    if (!classroomId) {
      setIsClassroomMember(true);
      setMembershipChecked(true);
      return;
    }
    // Otherwise, fetch classrooms for user
    fetch("/api/classrooms")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setIsClassroomMember(data.some((c) => String(c.id) === String(classroomId)));
        } else {
          setIsClassroomMember(false);
        }
        setMembershipChecked(true);
      })
      .catch(() => {
        setIsClassroomMember(false);
        setMembershipChecked(true);
      });
  }, [session, classroomId]);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleRun = useCallback(async () => {
    runCode(code);
    if (testCases.length > 0) {
      const { results, allPassed } = await runTests(code, testCases);
      setTestResults({ results, allPassed });
    }
  }, [code, runCode, testCases, runTests]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    clearOutput();
    setHint(null);
    setHintUsed(false);
    setAskAnswer(null);
    setQuestion("");
    setSubmitted(false);
    setTestResults(null);
    setToast(null);
    setFeedback(null);
    // Clear the cached code so a future refresh loads starter code
    const key = cacheKey(exerciseId);
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
    }
  }, [starterCode, clearOutput, exerciseId]);

  const fetchFeedback = useCallback(async (passCount, totalCount) => {
    if (!exerciseDescription) return;
    setFeedbackLoading(true);
    try {
      const res = await fetch("/api/submissions/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          exerciseDescription,
          testResults: { passed: passCount, total: totalCount },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setFeedback(data.feedback);
      }
    } catch {
      // Non-critical — silently fail
    } finally {
      setFeedbackLoading(false);
    }
  }, [code, exerciseDescription]);

  const handleSubmit = useCallback(async () => {
    if (!exerciseId || submitting) return;
    setSubmitting(true);
    setToast(null);
    setFeedback(null);

    try {
      if (testCases.length > 0) {
        const { results, allPassed } = await runTests(code, testCases);
        setTestResults({ results, allPassed });
        const passCount = results.filter((r) => r.passed).length;

        if (!allPassed) {
          setToast({
            type: "error",
            message: `${passCount}/${results.length} test cases passed. Fix the failing tests and try again.`,
          });
          fetchFeedback(passCount, results.length);
          setSubmitting(false);
          return;
        }

        // All tests passed — save submission to DB
        await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exerciseSlug: exerciseId, code }),
        });
        setSubmitted(true);
        invalidateCompletedCache();
        markExerciseComplete(exerciseId);
        setToast({
          type: "success",
          message: `All ${results.length} test cases passed!`,
        });
        fetchFeedback(passCount, results.length);
      } else {
        // No test cases — save directly
        await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exerciseSlug: exerciseId, code }),
        });
        setSubmitted(true);
        invalidateCompletedCache();
        markExerciseComplete(exerciseId);
        setToast({ type: "success", message: "Code submitted!" });
        fetchFeedback(0, 0);
      }
    } catch {
      setToast({ type: "error", message: "Couldn't submit right now. Try again later." });
    } finally {
      setSubmitting(false);
    }
  }, [exerciseId, code, testCases, submitting, runTests, fetchFeedback]);

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
    <div className="my-6 relative" onKeyDown={handleKeyDown}>
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-sm px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm transition-all animate-slide-in-right flex items-start gap-3 ${
            toast.type === "success"
              ? "bg-emerald-50/95 dark:bg-emerald-900/90 border-emerald-300 dark:border-emerald-600"
              : "bg-red-50/95 dark:bg-red-900/90 border-red-300 dark:border-red-600"
          }`}
        >
          <span className="text-xl shrink-0 mt-0.5">
            {toast.type === "success" ? "✅" : "❌"}
          </span>
          <div className="flex-1">
            <p
              className={`text-sm font-semibold ${
                toast.type === "success"
                  ? "text-emerald-800 dark:text-emerald-200"
                  : "text-red-800 dark:text-red-200"
              }`}
            >
              {toast.type === "success" ? "Passed!" : "Not Passed"}
            </p>
            <p
              className={`text-sm mt-0.5 ${
                toast.type === "success"
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              }`}
            >
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
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
      <div>
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 dark:bg-slate-900 border border-b-0 border-slate-700 rounded-t-lg">
          <span className="text-xs font-medium text-slate-400">
            Python {pythonVersion || "…"}
          </span>
        </div>
        <CodeEditor
          value={code}
          onChange={setCode}
          height="250px"
        />
      </div>

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

        {/* Submit button — only show on exercise pages */}
        {exerciseId && (
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted || isRunning}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm ${
              submitted
                ? "bg-emerald-600 cursor-default"
                : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            }`}
            title={submitted ? "Code submitted!" : "Submit your code"}
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting…
              </>
            ) : submitted ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submitted
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Submit
              </>
            )}
          </button>
        )}

        {/* Hint button — only show when exerciseDescription exists and user is allowed */}
        {exerciseDescription && membershipChecked && (
          isClassroomMember ? (
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
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-not-allowed" title="You must be logged in and in the classroom to use hints and AI features">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Hint/AI features require classroom membership
            </span>
          )
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

      {/* Ask a Question panel — only on exercise pages and if user is allowed */}
      {exerciseDescription && membershipChecked && (
        isClassroomMember ? (
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
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-not-allowed" title="You must be logged in and in the classroom to use hints and AI features">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hint/AI features require classroom membership
          </span>
        )
      )}

      {/* Test case results — LeetCode style */}
      {testResults && (
        <TestResults
          results={testResults.results}
          allPassed={testResults.allPassed}
        />
      )}

      {/* AI Feedback — improvement suggestions */}
      {(feedback || feedbackLoading) && (
        <div className="my-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-base mt-0.5 shrink-0">🤖</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-1">
                Improvement Suggestions
              </p>
              {feedbackLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">Analyzing your code…</span>
                </div>
              ) : (
                <p className="text-sm text-indigo-700 dark:text-indigo-400 whitespace-pre-wrap">{feedback}</p>
              )}
            </div>
          </div>
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
