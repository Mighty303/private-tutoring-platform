"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import FloatingTerminal from "@/components/FloatingTerminal";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay },
});

const COMPANIES = [
  { name: "Electronic Arts", logo: "/assets/ea-logo.png" },
  { name: "Rivian", logo: "/assets/rivian-logo.jpg" },
  { name: "Avena", logo: "/assets/avena-logo.jpg" },
  { name: "SFU", logo: "/assets/sfu-logo.png" },
];

const CLASSES = [
  {
    grade: "Grade 7",
    day: "Saturdays",
    time: "12 – 2 PM",
    href: "/grade-7",
    tagline: "Python & Roblox-themed exercises",
    topics: ["Variables & loops", "Functions", "Lists", "Dictionaries"],
    cardClass: "border-indigo-200 bg-indigo-50/50 hover:border-indigo-300 dark:border-indigo-800 dark:bg-indigo-950/30 dark:hover:border-indigo-700",
    topicBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    timeBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  },
  {
    grade: "Grade 10",
    day: "Sundays",
    time: "1:30 – 3:30 PM",
    href: "/grade-10",
    tagline: "Algorithms, data structures & CCC prep",
    topics: ["DFS / BFS", "Two-pointer", "Graphs & heaps", "Competitive"],
    cardClass: "border-violet-200 bg-violet-50/50 hover:border-violet-300 dark:border-violet-800 dark:bg-violet-950/30 dark:hover:border-violet-700",
    topicBg: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    timeBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
  },
];

const QUICK_LINKS = [
  {
    href: "/grade-7/cheatsheet",
    label: "Cheatsheet",
    sub: "Python quick ref",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/playground",
    label: "Playground",
    sub: "Run code live",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    sub: "Top solvers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero + terminal: column on mobile, row on lg+ */}
        <div className="pt-20 pb-16 lg:pb-20">
          <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-14 xl:gap-16">
            <div className="w-full min-w-0 text-center lg:max-w-2xl lg:flex-1 lg:text-left">
              <motion.p {...fade(0)} className="font-mono text-sm text-slate-500 tracking-widest uppercase mb-6">
                Martin Wong · Private Tutoring
              </motion.p>
              <motion.h1 {...fade(0.05)} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                Learn CS.<br />
                <span className="text-slate-500">Build things.</span>
              </motion.h1>
              <motion.p {...fade(0.1)} className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Computer Science tutoring for Grade 7 & Grade 10.
              </motion.p>
              <motion.div {...fade(0.14)} className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Meet your tutor
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="flex w-full min-w-0 shrink-0 justify-center lg:w-auto lg:justify-end">
              <FloatingTerminal />
            </div>
          </div>
        </div>

        {/* Class cards */}
        <motion.div {...fade(0.15)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {CLASSES.map((c) => (
            <Link
              key={c.grade}
              href={c.href}
              className={`group block rounded-2xl border transition-all duration-200 p-6 ${c.cardClass}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{c.grade}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{c.tagline}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${c.timeBg}`}>
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 3" />
                  </svg>
                  {c.day} · {c.time}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.topics.map((t) => (
                  <span key={t} className={`text-xs px-2 py-0.5 rounded-md ${c.topicBg}`}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors">
                Open lessons
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </motion.div>

        {/* Quick links */}
        <div className="mb-14">
          <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-3">Quick access</p>
          <motion.div {...fade(0.2)} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group block rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 transition-all duration-150 px-4 py-3"
              >
                <div className="text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors mb-2">{l.icon}</div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white transition-colors">{l.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">{l.sub}</p>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* About */}
        <motion.div {...fade(0.25)} className="mb-24">
          <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-3">Your tutor</p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <Image
                src="/assets/martin.png"
                alt="Martin Wong"
                width={72}
                height={72}
                className="rounded-full ring-2 ring-slate-300 dark:ring-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 mb-2">
                  <h2 className="text-lg font-bold text-white">Martin Wong</h2>
                  <span className="font-mono text-xs text-slate-500">· B.Sc. Computer Science, SFU · 2+ yrs tutoring</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  Software engineering intern at EA, Rivian, and Safety CLI. I teach Python fundamentals to Grade 7 students and data structures &amp; algorithms to Grade 10 with a focus on building real intuition, not just passing tests.
                </p>
                {/* Company logos */}
                <div className="flex items-center gap-3 mb-5">
                  {COMPANIES.map((c) => (
                    <div key={c.name} className="w-8 h-8 rounded-md bg-slate-100 dark:bg-black flex items-center justify-center overflow-hidden border border-slate-300/50 dark:border-slate-700/50">
                      <Image src={c.logo} alt={c.name} width={24} height={24} className="object-contain" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/tutors"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Full profile
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <span className="font-mono text-xs text-slate-700">Martin Wong · Private Tutoring</span>
          <span className="font-mono text-xs text-slate-700">{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
