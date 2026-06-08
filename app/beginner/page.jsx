"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
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

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay },
});

// --- Topic SVG illustrations (inline, currentColor so className colors them) ---

function CheatsheetIcon({ className }) {
  // A reference document with text lines
  return (
    <svg width="44" height="54" viewBox="0 0 44 54" fill="none" className={className} aria-hidden>
      <rect x="4" y="2" width="36" height="50" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="13" x2="33" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="21" x2="33" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="29" x2="27" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="37" x2="33" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="45" x2="24" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChecklistIcon({ className }) {
  // Checkbox list — completed items
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className={className} aria-hidden>
      <rect x="2" y="4" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10 L7.5 12.5 L11 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="21" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 27 L7.5 29.5 L11 24.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="38" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="21" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="27" x2="50" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

function ChecklistTwoIcon({ className }) {
  // Checklist with a "2" badge — review part 2
  return (
    <svg width="58" height="54" viewBox="0 0 58 54" fill="none" className={className} aria-hidden>
      <rect x="2" y="4" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10 L7.5 12.5 L11 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="21" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 27 L7.5 29.5 L11 24.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="38" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 44 L7.5 46.5 L11 41.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="10" x2="44" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="27" x2="44" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <text x="50" y="49" textAnchor="middle" style={{ fontSize: "16px" }} fill="currentColor" fontWeight="bold">2</text>
    </svg>
  );
}

function LoopIcon({ className }) {
  // Circular arrow — a loop
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M38 24 a14 14 0 1 1 -4.1 -9.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M34 5 L34 15 L24 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoopBreakIcon({ className }) {
  // Circular arrow with a break gap + exit arrow — loops part 2 (break/continue)
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" className={className} aria-hidden>
      <path
        d="M34 24 a12 12 0 1 1 -3.5 -8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M30.5 6 L30.5 15.5 L21 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* break: exit arrow out to the right */}
      <line x1="34" y1="24" x2="49" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M45 20 L50 24 L45 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NestedLoopsIcon({ className }) {
  // rows × columns grid — nested loops
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className={className} aria-hidden>
      {[2, 19, 36].map((y) =>
        [2, 19, 36].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}

function NestedListsIcon({ className }) {
  // 2D grid of cells, a few filled — nested lists / game boards
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className={className} aria-hidden>
      {[2, 19, 36].map((y, r) =>
        [2, 19, 36].map((x, c) => {
          const filled = (r + c) % 2 === 0 && !(r === 1 && c === 1);
          return filled ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.85" />
          ) : (
            <rect key={`${x}-${y}`} x={x} y={y} width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          );
        })
      )}
    </svg>
  );
}

function FunctionsIcon({ className }) {
  // input → box(f) → output
  return (
    <svg width="72" height="46" viewBox="0 0 72 46" fill="none" className={className} aria-hidden>
      {/* input arrow */}
      <line x1="2" y1="23" x2="20" y2="23" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M16 19 L21 23 L16 27" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {/* function box */}
      <rect x="22" y="9" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.75" />
      <text x="36" y="29" textAnchor="middle" style={{ fontSize: "16px", fontStyle: "italic" }} fill="currentColor" fontWeight="bold">f</text>
      {/* output arrow */}
      <line x1="52" y1="23" x2="70" y2="23" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M65 19 L70 23 L65 27" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DictionaryIcon({ className }) {
  // key → value pair rows
  return (
    <svg width="64" height="50" viewBox="0 0 64 50" fill="none" className={className} aria-hidden>
      {[2, 19, 36].map((y) => (
        <g key={y}>
          <rect x="2" y={y} width="20" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1={y + 6.5} x2="36" y2={y + 6.5} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M32 ${y + 3.5} L36 ${y + 6.5} L32 ${y + 9.5}`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="38" y={y} width="24" height="13" rx="2.5" fill="currentColor" fillOpacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

// --- Color → literal Tailwind class strings (avoids dynamic class names) ---

const COLORS = {
  indigo: {
    border: "border-l-indigo-500",
    icon: "text-indigo-500",
    link: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300",
  },
  emerald: {
    border: "border-l-emerald-500",
    icon: "text-emerald-500",
    link: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
  },
  teal: {
    border: "border-l-teal-500",
    icon: "text-teal-500",
    link: "text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300",
  },
  sky: {
    border: "border-l-sky-500",
    icon: "text-sky-500",
    link: "text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300",
  },
  violet: {
    border: "border-l-violet-500",
    icon: "text-violet-500",
    link: "text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300",
  },
  amber: {
    border: "border-l-amber-500",
    icon: "text-amber-500",
    link: "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
  },
  rose: {
    border: "border-l-rose-500",
    icon: "text-rose-500",
    link: "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300",
  },
};

// --- Card data ---

// Saturday lessons: reuse title/description from lib; attach an icon + grid color by id.
const SATURDAY_META = {
  cheatsheet: { Icon: CheatsheetIcon, color: "indigo" },
  review: { Icon: ChecklistIcon, color: "emerald" },
  review2: { Icon: ChecklistTwoIcon, color: "teal" },
};

const SATURDAY_CARDS = saturdayLessons.map((lesson) => ({
  id: lesson.id,
  href: `/beginner/${lesson.id}`,
  title: lesson.title,
  description: lesson.description,
  Icon: SATURDAY_META[lesson.id]?.Icon ?? CheatsheetIcon,
  color: SATURDAY_META[lesson.id]?.color ?? "indigo",
}));

// Practice tracks: each has an exercises array → progress bar (palette-safe colors).
const PRACTICE_CARDS = [
  {
    id: "loops",
    href: "/beginner/loops",
    title: "Loops",
    description:
      "for and while — countdowns, grinding XP, inventories, and health regen.",
    exercises: loopExercises,
    Icon: LoopIcon,
    color: "sky",
  },
  {
    id: "loops-2",
    href: "/beginner/loops-2",
    title: "Loops part 2",
    description:
      "break, continue, and while True — harder exercises with no starter code.",
    exercises: loopPart2Exercises,
    Icon: LoopBreakIcon,
    color: "violet",
  },
  {
    id: "nested-loops",
    href: "/beginner/nested-loops",
    title: "Nested loops",
    description: "Grids, patterns, multiplication tables, and matching pairs.",
    exercises: nestedLoopExercises,
    Icon: NestedLoopsIcon,
    color: "teal",
  },
  {
    id: "nested-lists",
    href: "/beginner/nested-lists",
    title: "Nested lists",
    description: "2D grids, game boards, searching, and patterns.",
    exercises: nestedListExercises,
    Icon: NestedListsIcon,
    color: "amber",
  },
  {
    id: "functions",
    href: "/beginner/functions",
    title: "Functions",
    description:
      "XP calculators, health systems, shop discounts, and Discord-style bots.",
    exercises: [...functionExercises, ...discordBotExercises],
    Icon: FunctionsIcon,
    color: "rose",
  },
  {
    id: "dictionaries",
    href: "/beginner/dictionaries",
    title: "Dictionaries",
    description: "Roblox-themed dict exercises — part of Milestone 2.",
    exercises: dictionaryExercises,
    Icon: DictionaryIcon,
    color: "emerald",
  },
];

function HubCard({ card }) {
  const { Icon, color } = card;
  const c = COLORS[color] ?? COLORS.indigo;
  return (
    <div
      className={`block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${c.border} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="p-6">
        <Icon className={`${c.icon} mb-3`} />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
          {card.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
          {card.description}
        </p>
        {card.exercises && (
          <ExerciseProgressTracker
            exercises={card.exercises}
            color={color}
            className="mb-3"
          />
        )}
        <Link
          href={card.href}
          className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${c.link}`}
        >
          View Exercises →
        </Link>
      </div>
    </div>
  );
}

export default function BeginnerPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Beginner
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-2">
            Beginner lessons
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
            Python fundamentals and extra practice tracks — work through them at
            your own pace.
          </p>
        </motion.div>

        {/* Saturday lessons */}
        <section aria-labelledby="saturday-heading" className="mb-12">
          <h2
            id="saturday-heading"
            className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1"
          >
            Saturday lessons
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Follow these in order during class.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SATURDAY_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.08 + i * 0.04 }}
              >
                <HubCard card={card} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Practice tracks */}
        <section aria-labelledby="practice-heading">
          <h2
            id="practice-heading"
            className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1"
          >
            Practice tracks
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
            Extra exercises you can tackle anytime. Your completion progress is
            saved in this browser.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.12 + i * 0.03 }}
              >
                <HubCard card={card} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
