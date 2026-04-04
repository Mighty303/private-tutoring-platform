"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import usePyodide from "@/hooks/usePyodide";
import { markExerciseComplete, invalidateCompletedCache } from "@/hooks/useExerciseProgress";
import CodeEditor from "./CodeEditor";
import OutputConsole from "./OutputConsole";
import TestResults from "./TestResults";

function cacheKey(exerciseId) {
  return exerciseId ? `discord-code:${exerciseId}` : null;
}

function DiscordMessagePreview({ content, timestamp, status }) {
  return (
    <div className="bg-[#313338] rounded-lg p-4 mt-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white text-sm">tutorbot</span>
            <span className="text-[10px] text-[#949BA4]">
              {status === "sending"
                ? "Sending..."
                : timestamp
                  ? `Today at ${new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
                  : "Just now"}
            </span>
          </div>
          <div className="text-[#DBDEE1] text-sm mt-0.5 whitespace-pre-wrap wrap-break-word">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscordPlayground({
  starterCode = "# Write your Python code here\n",
  title,
  exerciseId,
  exerciseDescription = "",
  classroomId,
  testCases = [],
}) {
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

  useEffect(() => {
    const key = cacheKey(exerciseId);
    if (!key) return;
    try {
      localStorage.setItem(key, code);
    } catch {}
  }, [code, exerciseId]);

  const { data: session, status: sessionStatus } = useSession();
  const [isClassroomMember, setIsClassroomMember] = useState(false);
  const [membershipChecked, setMembershipChecked] = useState(false);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (sessionStatus === "unauthenticated" || !session) {
      setIsClassroomMember(false);
      setMembershipChecked(true);
      return;
    }
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (session.user?.role === "admin" || (adminEmail && session.user?.email === adminEmail)) {
      setIsClassroomMember(true);
      setMembershipChecked(true);
      return;
    }
    if (!classroomId) {
      setIsClassroomMember(true);
      setMembershipChecked(true);
      return;
    }
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
  }, [session, sessionStatus, classroomId]);

  const [discordMessages, setDiscordMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [discordError, setDiscordError] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [toast, setToast] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [hints, setHints] = useState([]);
  const [hintCount, setHintCount] = useState(0);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintCountdown, setHintCountdown] = useState(null);
  const fetchHintNumRef = useRef(null);

  const lastOutput = useMemo(() => {
    const textParts = output
      .filter((o) => o.type === "stdout" || o.type === "output")
      .map((o) => o.text)
      .join("");
    return textParts.trim();
  }, [output]);

  const handleRun = useCallback(async () => {
    runCode(code);
    setDiscordError(null);
    if (testCases.length > 0) {
      const { results, allPassed } = await runTests(code, testCases);
      setTestResults({ results, allPassed });
    }
  }, [code, runCode, testCases, runTests]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    clearOutput();
    setDiscordMessages([]);
    setDiscordError(null);
    setTestResults(null);
    setToast(null);
    setFeedback(null);
    setHints([]);
    setHintCount(0);
    setHintCountdown(null);
    const key = cacheKey(exerciseId);
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  }, [starterCode, clearOutput, exerciseId]);

  const handleSendToDiscord = useCallback(async () => {
    if (sending || !lastOutput) return;
    setSending(true);
    setDiscordError(null);

    const preview = {
      content: lastOutput,
      status: "sending",
      timestamp: null,
    };
    setDiscordMessages((prev) => [...prev, preview]);
    const previewIdx = discordMessages.length;

    try {
      const res = await fetch("/api/discord/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastOutput }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDiscordError(data.error || "Failed to send message");
        setDiscordMessages((prev) => prev.filter((_, i) => i !== previewIdx));
      } else {
        setDiscordMessages((prev) =>
          prev.map((msg, i) =>
            i === previewIdx
              ? { ...msg, status: "sent", timestamp: data.timestamp }
              : msg
          )
        );
        markExerciseComplete(exerciseId);
      }
    } catch {
      setDiscordError("Network error — couldn't reach the server.");
      setDiscordMessages((prev) => prev.filter((_, i) => i !== previewIdx));
    } finally {
      setSending(false);
    }
  }, [sending, lastOutput, discordMessages.length, exerciseId]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

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
        if (data?.feedback) setFeedback(data.feedback);
      }
    } catch {
      // Non-critical
    } finally {
      setFeedbackLoading(false);
    }
  }, [code, exerciseDescription]);

  const doFetchHint = useCallback(async (hintNum) => {
    setHintLoading(true);
    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          exerciseDescription: exerciseDescription || "",
          error: "",
          hintNumber: hintNum,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHints((prev) => [...prev, data.hint || "No hint available."]);
      setHintCount(hintNum);
    } catch {
      setHints((prev) => [...prev, "Sorry, couldn't generate a hint right now."]);
      setHintCount(hintNum);
    } finally {
      setHintLoading(false);
    }
  }, [code, exerciseDescription]);

  // Tick the countdown down every second
  useEffect(() => {
    if (hintCountdown === null || hintCountdown <= 0) return;
    const id = setTimeout(() => setHintCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [hintCountdown]);

  // When countdown hits 0, fetch the next hint
  useEffect(() => {
    if (hintCountdown !== 0) return;
    setHintCountdown(null);
    const hintNum = fetchHintNumRef.current;
    if (hintNum !== null) {
      fetchHintNumRef.current = null;
      doFetchHint(hintNum);
    }
  }, [hintCountdown, doFetchHint]);

  const handleGetHint = useCallback(() => {
    if (hintLoading || hintCountdown !== null || hintCount >= 3) return;
    fetchHintNumRef.current = hintCount + 1;
    setHintCountdown(30);
  }, [hintLoading, hintCountdown, hintCount]);

  const handleSubmit = useCallback(async () => {
    if (!exerciseId || submitting) return;
    setSubmitting(true);
    setToast(null);
    setFeedback(null);

    try {
      // Always save attempt to DB so admin can review and approve if close enough
      const saveRes = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseSlug: exerciseId, code }),
      });
      if (!saveRes.ok) throw new Error("Failed to save");

      if (testCases.length > 0) {
        const { results, allPassed } = await runTests(code, testCases);
        setTestResults({ results, allPassed });
        const passCount = results.filter((r) => r.passed).length;

        if (!allPassed) {
          setToast({
            type: "error",
            message: `${passCount}/${results.length} test cases passed. Fix the failing tests and try again.`,
          });
          setSubmitting(false);
          return;
        }

        setSubmitted(true);
        invalidateCompletedCache();
        markExerciseComplete(exerciseId);
        setToast({
          type: "success",
          message: `All ${results.length} test cases passed!`,
        });
        fetchFeedback(passCount, results.length);
      } else {
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

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (isReady && !isRunning) handleRun();
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
            <p className={`text-sm font-semibold ${
              toast.type === "success"
                ? "text-emerald-800 dark:text-emerald-200"
                : "text-red-800 dark:text-red-200"
            }`}>
              {toast.type === "success" ? "Passed!" : "Not Passed"}
            </p>
            <p className={`text-sm mt-0.5 ${
              toast.type === "success"
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-red-700 dark:text-red-300"
            }`}>
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

      {title && (
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {title}
          </h3>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
          <svg className="w-5 h-5 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Loading Python runtime...
          </span>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            Failed to load Python: {error}
          </span>
        </div>
      )}

      {/* Editor */}
      <div>
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 dark:bg-slate-900 border border-b-0 border-slate-700 rounded-t-lg">
          <span className="text-xs font-medium text-slate-400">
            Python {pythonVersion || "..."}
          </span>
          <span className="text-xs font-medium text-[#5865F2]">
            Discord Bot Mode
          </span>
        </div>
        <CodeEditor value={code} onChange={setCode} height="280px" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 my-3 flex-wrap">
        <button
          onClick={handleRun}
          disabled={!isReady || isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          {isRunning ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Running...
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

        {membershipChecked && (
          isClassroomMember ? (
            <button
              onClick={handleSendToDiscord}
              disabled={!lastOutput || sending || isRunning}
              title={!lastOutput ? "Run your code first to generate output" : "Send output to Discord"}
              className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm ${
                !lastOutput || sending || isRunning
                  ? "bg-slate-600 cursor-not-allowed opacity-60"
                  : "bg-[#5865F2] hover:bg-[#4752C4]"
              }`}
            >
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                  </svg>
                  Send to Discord
                </>
              )}
            </button>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg shadow-sm cursor-not-allowed"
              title="You must be logged in and in the classroom to send to Discord"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
              Discord requires classroom membership
            </span>
          )
        )}

        <button
          onClick={handleReset}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        {exerciseId && (
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted || isRunning}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm ${
              submitted
                ? "bg-emerald-600 cursor-default"
                : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            }`}
            title={submitted ? "Code submitted!" : "Submit your code for grading"}
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

        {exerciseDescription && membershipChecked && (
          isClassroomMember ? (
            <button
              onClick={handleGetHint}
              disabled={hintLoading || hintCountdown !== null || hintCount >= 3}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
              title={hintCount >= 3 ? "All 3 hints used" : "Get a nudge in the right direction"}
            >
              {hintLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Thinking…
                </>
              ) : hintCountdown !== null ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Think first… {hintCountdown}s
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {hintCount >= 3 ? "No Hints Left" : `Get Hint (${3 - hintCount} left)`}
                </>
              )}
            </button>
          ) : null
        )}

        <span className={`hidden sm:inline text-xs ml-auto ${lastOutput ? "text-slate-400" : "text-amber-500 font-medium"}`}>
          {lastOutput ? "Ready to send!" : "Run your code first, then send to Discord"}
        </span>
      </div>

      {/* Discord error */}
      {discordError && (
        <div className="mb-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            Discord: {discordError}
          </span>
        </div>
      )}

      {/* AI Feedback — only shown after all tests pass */}
      {testResults?.allPassed && (feedback || feedbackLoading) && (
        <div className="mb-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl">
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
                <div className="prose prose-sm prose-indigo dark:prose-invert max-w-none text-indigo-700 dark:text-indigo-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{feedback}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hints */}
      {hints.length > 0 && (
        <div className="mb-3 space-y-2">
          {hints.map((h, i) => (
            <div key={i} className="px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5 shrink-0">💡</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    Hint {i + 1}/3
                  </p>
                  <div className="prose prose-sm prose-amber dark:prose-invert max-w-none text-amber-700 dark:text-amber-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{h}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Test case results */}
      {testResults && (
        <TestResults
          results={testResults.results}
          allPassed={testResults.allPassed}
        />
      )}

      {/* Console output */}
      <OutputConsole output={output} isRunning={isRunning} />

      {/* Discord messages preview */}
      {discordMessages.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
            </svg>
            <h4 className="text-sm font-bold text-[#5865F2]">
              Sent to Discord
            </h4>
          </div>
          <div className="space-y-2">
            {discordMessages.map((msg, i) => (
              <DiscordMessagePreview
                key={i}
                content={msg.content}
                timestamp={msg.timestamp}
                status={msg.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
