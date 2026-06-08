"use client";

import { motion } from "motion/react";

/** Real platform differentiators — each maps to a feature that already exists. */
const FEATURES = [
  {
    title: "AI tutor",
    sub: "Ask anything; get explanations, not answers.",
    accent: "text-indigo-600 dark:text-indigo-400",
    ring: "group-hover:border-indigo-300 dark:group-hover:border-indigo-700",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z" />
      </svg>
    ),
  },
  {
    title: "Python playground",
    sub: "Run real Python in the browser — no install.",
    accent: "text-emerald-600 dark:text-emerald-400",
    ring: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Instant auto-grading",
    sub: "Submit code, get checked instantly.",
    accent: "text-violet-600 dark:text-violet-400",
    ring: "group-hover:border-violet-300 dark:group-hover:border-violet-700",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Homework tracking",
    sub: "Assignments, due dates, and progress in one place.",
    accent: "text-amber-600 dark:text-amber-400",
    ring: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function FeatureHighlights({ eyebrow = "Why it works" }) {
  return (
    <section>
      <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">{eyebrow}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors dark:border-slate-800 dark:bg-slate-900 ${f.ring}`}
          >
            <div className={`mb-3 ${f.accent}`}>{f.icon}</div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
