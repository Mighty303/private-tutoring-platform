"use client";

import { useState, useEffect, useRef } from "react";

export default function ProgressBar({
  completed,
  total,
  label,
  color = "indigo",
  className = "",
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const allDone = completed === total && total > 0;

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const prevCompleted = useRef(completed);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allDone && prevCompleted.current < total) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
    prevCompleted.current = completed;
  }, [allDone, completed, total]);

  const barColors = {
    indigo: "from-indigo-500 to-indigo-400",
    violet: "from-violet-500 to-violet-400",
    sky: "from-sky-500 to-sky-400",
    rose: "from-rose-500 to-rose-400",
    amber: "from-amber-500 to-amber-400",
    emerald: "from-emerald-500 to-emerald-400",
    teal: "from-teal-500 to-teal-400",
    discord: "from-[#5865F2] to-[#7289DA]",
  };

  const trackColors = {
    indigo: "bg-indigo-100 dark:bg-indigo-950/40",
    violet: "bg-violet-100 dark:bg-violet-950/40",
    sky: "bg-sky-100 dark:bg-sky-950/40",
    rose: "bg-rose-100 dark:bg-rose-950/40",
    amber: "bg-amber-100 dark:bg-amber-950/40",
    emerald: "bg-emerald-100 dark:bg-emerald-950/40",
    teal: "bg-teal-100 dark:bg-teal-950/40",
    discord: "bg-[#5865F2]/10 dark:bg-[#5865F2]/20",
  };

  const fractionColors = {
    indigo: "text-indigo-600 dark:text-indigo-400",
    violet: "text-violet-600 dark:text-violet-400",
    sky: "text-sky-600 dark:text-sky-400",
    rose: "text-rose-600 dark:text-rose-400",
    amber: "text-amber-600 dark:text-amber-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    teal: "text-teal-600 dark:text-teal-400",
    discord: "text-[#5865F2]",
  };

  const barColor = allDone
    ? "from-emerald-500 to-emerald-400"
    : barColors[color] || barColors.indigo;

  const trackColor = allDone
    ? "bg-emerald-100 dark:bg-emerald-950/40"
    : trackColors[color] || trackColors.indigo;

  const fractionColor = allDone
    ? "text-emerald-600 dark:text-emerald-400"
    : fractionColors[color] || fractionColors.indigo;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </span>
        )}
        <span
          className={`text-xs font-bold tabular-nums ${fractionColor} ${
            showCelebration ? "animate-progress-bounce" : ""
          }`}
        >
          {allDone ? "Complete! " : ""}
          {completed}/{total}
        </span>
      </div>

      <div
        className={`relative h-2.5 rounded-full overflow-hidden ${trackColor}`}
      >
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-linear-to-r ${barColor} ${
            shouldAnimate ? "transition-all duration-700 ease-out" : ""
          }`}
          style={{ width: `${pct}%` }}
        />

        {showCelebration && (
          <div className="absolute inset-0 animate-progress-flash rounded-full bg-emerald-300/40 dark:bg-emerald-400/20" />
        )}
      </div>
    </div>
  );
}
