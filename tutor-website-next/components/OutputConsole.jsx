"use client";

import { useRef, useEffect } from "react";

export default function OutputConsole({ output = [], isRunning = false }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
      {/* Console header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-medium text-slate-400 ml-2">Output</span>
        </div>
        {isRunning && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Running...</span>
          </div>
        )}
      </div>

      {/* Console output */}
      <div
        ref={scrollRef}
        className="p-4 min-h-30 max-h-75 overflow-y-auto font-mono text-sm"
      >
        {output.length === 0 && !isRunning && (
          <span className="text-slate-500 italic">
            Click &quot;Run&quot; to execute your code...
          </span>
        )}

        {output.map((entry, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap wrap-break-word mb-1 ${
              entry.type === "error"
                ? "text-red-400"
                : entry.type === "info"
                ? "text-slate-500 italic"
                : "text-green-300"
            }`}
          >
            {entry.text}
          </pre>
        ))}

        {isRunning && output.length === 0 && (
          <span className="text-slate-500 italic">Executing...</span>
        )}
      </div>
    </div>
  );
}
