"use client";

import Link from "next/link";
import { motion } from "motion/react";

// --- Track SVG icons (inline, currentColor so the badge color flows through) ---

function BeginnerIcon({ className }) {
  // Stacked foundation blocks — building up fundamentals
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="14" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="14" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="8" y="4" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IntermediateIcon({ className }) {
  // Connected node graph — algorithms, graphs & data structures
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <line x1="12" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="6" r="2.6" fill="currentColor" />
      <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="18" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

const CLASSES = [
  {
    grade: "Beginner",
    day: "Saturdays",
    time: "12 – 2 PM",
    href: "/beginner",
    tagline: "Python & Roblox-themed exercises",
    topics: ["Variables & loops", "Functions", "Lists", "Dictionaries"],
    Icon: BeginnerIcon,
    cardClass:
      "border-indigo-200 bg-indigo-50/50 hover:border-indigo-300 dark:border-indigo-800 dark:bg-indigo-950/30 dark:hover:border-indigo-700",
    topicBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    timeBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  {
    grade: "Intermediate",
    day: "Sundays",
    time: "1:30 – 3:30 PM",
    href: "/intermediate",
    tagline: "Algorithms, data structures & CCC prep",
    topics: ["DFS / BFS", "Two-pointer", "Graphs & heaps", "Competitive"],
    Icon: IntermediateIcon,
    cardClass:
      "border-violet-200 bg-violet-50/50 hover:border-violet-300 dark:border-violet-800 dark:bg-violet-950/30 dark:hover:border-violet-700",
    topicBg: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    timeBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300",
  },
];

export default function ClassCards({ eyebrow }) {
  return (
    <section>
      {eyebrow ? (
        <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">{eyebrow}</p>
      ) : null}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {CLASSES.map((c, i) => (
          <motion.div
            key={c.grade}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={c.href}
              className={`group block h-full rounded-2xl border p-6 transition-all duration-200 ${c.cardClass}`}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
                    <c.Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">{c.grade}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{c.tagline}</p>
                  </div>
                </div>
                <span className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs ${c.timeBg}`}>
                  <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 3" />
                  </svg>
                  {c.day} · {c.time}
                </span>
              </div>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {c.topics.map((t) => (
                  <span key={t} className={`rounded-md px-2 py-0.5 text-xs ${c.topicBg}`}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200">
                Open lessons
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
