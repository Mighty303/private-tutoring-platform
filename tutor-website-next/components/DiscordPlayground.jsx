"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import usePyodide from "@/hooks/usePyodide";
import CodeEditor from "./CodeEditor";
import OutputConsole from "./OutputConsole";

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

  const { isLoading, isReady, error, isRunning, output, pythonVersion, runCode, clearOutput } =
    usePyodide();

  useEffect(() => {
    const key = cacheKey(exerciseId);
    if (!key) return;
    try {
      localStorage.setItem(key, code);
    } catch {}
  }, [code, exerciseId]);

  const [discordMessages, setDiscordMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [discordError, setDiscordError] = useState(null);

  const lastOutput = useMemo(() => {
    const textParts = output
      .filter((o) => o.type === "stdout" || o.type === "output")
      .map((o) => o.text)
      .join("");
    return textParts.trim();
  }, [output]);

  const handleRun = useCallback(() => {
    runCode(code);
    setDiscordError(null);
  }, [code, runCode]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    clearOutput();
    setDiscordMessages([]);
    setDiscordError(null);
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
      }
    } catch {
      setDiscordError("Network error — couldn't reach the server.");
      setDiscordMessages((prev) => prev.filter((_, i) => i !== previewIdx));
    } finally {
      setSending(false);
    }
  }, [sending, lastOutput, discordMessages.length]);

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

        <button
          onClick={handleSendToDiscord}
          disabled={!lastOutput || sending || isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
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

        <span className="hidden sm:inline text-xs text-slate-400 ml-auto">
          Run first, then send to Discord
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
