"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ClassCards from "@/components/home/ClassCards";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import LiveAlgoDemo from "@/components/home/LiveAlgoDemo";
import FaqSection from "@/components/home/FaqSection";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay },
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Gradient glow background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-400/30 blur-[120px] dark:bg-indigo-600/25" />
        <div className="absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-400/25 blur-[120px] dark:bg-violet-600/20" />
        <div className="absolute top-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-sky-300/20 blur-[120px] dark:bg-sky-600/15" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <header className="pt-24 pb-16 text-center sm:pt-28">
          <motion.p {...fade(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 font-mono text-xs uppercase tracking-widest text-indigo-700 backdrop-blur dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
            Martin Wong · Private CS Tutoring
          </motion.p>
          <motion.h1 {...fade(0.05)} className="mx-auto max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Learn CS.{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
              Build things.
            </span>
          </motion.h1>
          <motion.p {...fade(0.1)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
            Python fundamentals to algorithms — taught with code you run, lessons you poke at, and an
            AI tutor that nudges instead of spoiling.
          </motion.p>
          <motion.div {...fade(0.15)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/beginner"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500"
            >
              Start learning free
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Open the playground
            </Link>
          </motion.div>
        </header>

        <div className="space-y-20 pb-24">
          <LiveAlgoDemo eyebrow="Try it now" />
          <ClassCards eyebrow="Two tracks" />
          <FeatureHighlights eyebrow="Why it works" />
          <FaqSection eyebrow="Questions" />

          {/* Final CTA */}
          <section className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-10 text-center dark:border-indigo-900 dark:from-indigo-950/40 dark:to-violet-950/40">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to start building?</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
              Jump into the first lesson — no setup, runs right in your browser.
            </p>
            <Link
              href="/beginner"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500"
            >
              Start learning free
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        </div>
      </div>

      <footer className="relative border-t border-slate-200 dark:border-slate-800/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <span className="font-mono text-xs text-slate-700 dark:text-slate-400">Martin Wong · Private Tutoring</span>
          <span className="font-mono text-xs text-slate-700 dark:text-slate-400">{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
