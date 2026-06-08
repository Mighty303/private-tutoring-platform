"use client";

import Link from "next/link";
import { motion } from "motion/react";
import LessonCard from "@/components/LessonCard";
import {
  webLessons,
  saturdayLessons,
  functionExercises,
  discordBotExercises,
  loopExercises,
  loopPart2Exercises,
  nestedLoopExercises,
  nestedListExercises,
  dictionaryExercises,
} from "@/lib/lessons";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay },
});

const PRACTICE_TRACKS = [
  {
    id: "loops",
    href: "/grade-7/loops",
    label: "Loops",
    blurb:
      "for and while — countdowns, grinding XP, inventories, and health regen.",
    exercises: loopExercises,
  },
  {
    id: "loops-2",
    href: "/grade-7/loops-2",
    label: "Loops part 2",
    blurb:
      "break, continue, and while True — harder exercises with no starter code.",
    exercises: loopPart2Exercises,
  },
  {
    id: "nested-loops",
    href: "/grade-7/nested-loops",
    label: "Nested loops",
    blurb: "Grids, patterns, multiplication tables, and matching pairs.",
    exercises: nestedLoopExercises,
  },
  {
    id: "nested-lists",
    href: "/grade-7/nested-lists",
    label: "Nested lists",
    blurb: "2D grids, game boards, searching, and patterns.",
    exercises: nestedListExercises,
  },
  {
    id: "functions",
    href: "/grade-7/functions",
    label: "Functions",
    blurb: "XP calculators, health systems, shop discounts, and Discord-style bots.",
    exercises: [...functionExercises, ...discordBotExercises],
  },
  {
    id: "dictionaries",
    href: "/grade-7/dictionaries",
    label: "Dictionaries",
    blurb: "Roblox-themed dict exercises — part of Milestone 2.",
    exercises: dictionaryExercises,
  },
];

function PracticeTrackLink({ track, index }) {
  return (
      <Link
        href={track.href}
        className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/40 p-5 sm:p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline gap-3">
              <span className="font-mono text-xs text-slate-400 tabular-nums dark:text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {track.label}
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 pl-0 sm:pl-9">
              {track.blurb}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 sm:pt-1">
            Open
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
        <ExerciseProgressTracker
          exercises={track.exercises}
          color="indigo"
          className="mt-4 sm:pl-9"
        />
      </Link>
  );
}

export default function Grade7Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div {...fade(0)} className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to home
          </Link>
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3 dark:text-slate-500">
            Grade 7
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                Grade 7 lessons
              </h1>
              <p className="mt-2 max-w-xl text-base text-slate-600 dark:text-slate-400">
                Python fundamentals, extra practice tracks, and an intro to how
                the web works — organized below.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fade(0.06)}>
          <Accordion
            multiple
            defaultValue={["python"]}
            className="space-y-4"
          >
            <AccordionItem
              value="python"
              className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-left hover:bg-slate-50 sm:px-6 sm:py-5 dark:hover:bg-slate-800/60">
                <div className="flex min-w-0 flex-col items-start gap-1 pr-2">
                  <span className="text-lg font-semibold text-slate-800 dark:text-white">
                    Python
                  </span>
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                    Saturday lessons and Roblox-themed practice exercises
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-slate-200 px-5 pb-6 pt-6 dark:border-slate-700 sm:px-6">
                <section
                  aria-labelledby="saturday-heading"
                  className="mb-12"
                >
                  <h2
                    id="saturday-heading"
                    className="text-xl font-semibold text-slate-800 dark:text-white mb-1"
                  >
                    Saturday lessons
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Follow these in order during class.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {saturdayLessons.map((lesson, i) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.08 + i * 0.04 }}
                      >
                        <LessonCard lesson={lesson} basePath="/grade-7" />
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section aria-labelledby="practice-heading">
                  <h2
                    id="practice-heading"
                    className="text-xl font-semibold text-slate-800 dark:text-white mb-1"
                  >
                    Practice tracks
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
                    Extra exercises you can tackle anytime. Your completion
                    progress is saved in this browser.
                  </p>
                  <ul className="space-y-3">
                    {PRACTICE_TRACKS.map((track, i) => (
                      <motion.li
                        key={track.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.12 + i * 0.03 }}
                      >
                        <PracticeTrackLink track={track} index={i} />
                      </motion.li>
                    ))}
                  </ul>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="web"
              className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-left hover:bg-slate-50 sm:px-6 sm:py-5 dark:hover:bg-slate-800/60">
                <div className="flex min-w-0 flex-col items-start gap-1 pr-2">
                  <span className="text-lg font-semibold text-slate-800 dark:text-white">
                    Intro to Web Development
                  </span>
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                    HTML, Tailwind CSS, and a one-file mini project
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-slate-200 px-5 pb-6 pt-6 dark:border-slate-700 sm:px-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mb-6">
                  Build real pages with HTML and Tailwind on your laptop — a
                  separate track from the Python exercises above. The steps are
                  split into short pages; work through them in order, then code
                  along in a single{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">
                    index.html
                  </code>{" "}
                  file.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {webLessons.map((lesson, i) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.06 + i * 0.04 }}
                    >
                      <LessonCard lesson={lesson} basePath="/grade-7" />
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
