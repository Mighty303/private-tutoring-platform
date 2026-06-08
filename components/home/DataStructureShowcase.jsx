"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Auto-looping homepage showcase: cycles through array search, stack push/pop,
 * and queue enqueue/dequeue using box cells. motion's `layout` prop animates the
 * box repositioning (shifts on dequeue, growth on push) for free.
 */

const STATE_STYLES = {
  idle: "bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600",
  compare: "bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-400/15 dark:text-amber-200 dark:border-amber-400/60",
  found: "bg-emerald-100 text-emerald-900 border-emerald-500 dark:bg-emerald-400/15 dark:text-emerald-200 dark:border-emerald-400/70",
  fresh: "bg-indigo-100 text-indigo-900 border-indigo-500 dark:bg-indigo-400/15 dark:text-indigo-200 dark:border-indigo-400/70",
  out: "bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-400/15 dark:text-rose-200 dark:border-rose-400/60",
};

const SCENES = [
  { key: "array", label: "Array" },
  { key: "stack", label: "Stack" },
  { key: "queue", label: "Queue" },
];

function Box({ value, state }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 font-mono text-base font-bold shadow-sm transition-colors duration-200 sm:h-14 sm:w-14 sm:text-lg ${STATE_STYLES[state]}`}
    >
      {value}
    </motion.div>
  );
}

export default function DataStructureShowcase() {
  const [mode, setMode] = useState("array");
  const [items, setItems] = useState([]);
  const [caption, setCaption] = useState("");
  const idRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const nextId = () => idRef.current++;
    const stop = () => cancelled;

    // Helpers that build a box item and mutate the visible list
    const make = (value, state = "idle") => ({ id: nextId(), value, state });
    const setStateAt = (idx, state) =>
      setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, state } : it)));
    const clearStates = () =>
      setItems((prev) => prev.map((it) => ({ ...it, state: "idle" })));

    async function arrayScene() {
      const values = [5, 12, 23, 8, 19, 3, 31];
      const target = 23;
      setMode("array");
      setItems(values.map((v) => make(v)));
      setCaption("An array — values in a row, indexed from 0");
      await sleep(1300);
      if (stop()) return;
      setCaption(`Linear search: find ${target}`);
      await sleep(700);
      for (let i = 0; i < values.length; i++) {
        if (stop()) return;
        setStateAt(i, "compare");
        setCaption(`index ${i}: ${values[i]} ${values[i] === target ? "==" : "≠"} ${target}`);
        await sleep(750);
        if (stop()) return;
        if (values[i] === target) {
          setStateAt(i, "found");
          setCaption(`Found ${target} at index ${i} ✓`);
          await sleep(2000);
          return;
        }
        setStateAt(i, "idle");
      }
    }

    async function stackScene() {
      setMode("stack");
      setItems([]);
      setCaption("A stack — last in, first out");
      await sleep(1000);
      for (const v of [7, 15, 22, 4]) {
        if (stop()) return;
        setItems((prev) => [...prev, make(v, "fresh")]);
        setCaption(`push(${v})`);
        await sleep(620);
        clearStates();
        await sleep(120);
      }
      await sleep(700);
      for (let k = 0; k < 2; k++) {
        if (stop()) return;
        setCaption("pop() — removes the top");
        setItems((prev) => prev.map((it, i) => (i === prev.length - 1 ? { ...it, state: "out" } : it)));
        await sleep(450);
        if (stop()) return;
        setItems((prev) => prev.slice(0, -1));
        await sleep(620);
      }
      await sleep(1100);
    }

    async function queueScene() {
      setMode("queue");
      setItems([]);
      setCaption("A queue — first in, first out");
      await sleep(1000);
      for (const v of [9, 14, 6, 21]) {
        if (stop()) return;
        setItems((prev) => [...prev, make(v, "fresh")]);
        setCaption(`enqueue(${v})`);
        await sleep(560);
        clearStates();
        await sleep(120);
      }
      await sleep(700);
      for (let k = 0; k < 2; k++) {
        if (stop()) return;
        setCaption("dequeue() — removes the front");
        setItems((prev) => prev.map((it, i) => (i === 0 ? { ...it, state: "out" } : it)));
        await sleep(450);
        if (stop()) return;
        setItems((prev) => prev.slice(1));
        await sleep(620);
      }
      await sleep(1100);
    }

    (async () => {
      while (!stop()) {
        await arrayScene();
        if (stop()) break;
        setItems([]);
        await sleep(500);
        await stackScene();
        if (stop()) break;
        setItems([]);
        await sleep(500);
        await queueScene();
        if (stop()) break;
        setItems([]);
        await sleep(500);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Per-mode container: stack grows upward, array & queue run left-to-right.
  const layoutClass =
    mode === "stack"
      ? "flex flex-col-reverse items-center gap-2"
      : "flex flex-row items-end gap-2 sm:gap-2.5";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-violet-50 px-5 py-4 dark:border-slate-700 dark:from-indigo-950/30 dark:to-violet-950/30">
        <h3 className="text-base font-bold text-slate-800 dark:text-white sm:text-lg">
          Data structures in motion
        </h3>
        <div className="flex gap-1.5">
          {SCENES.map((s) => (
            <span
              key={s.key}
              className={`rounded-full px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
                mode === s.key
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Caption bar */}
      <div className="border-b border-indigo-100 bg-indigo-50/70 px-5 py-2 dark:border-slate-700 dark:bg-slate-900/40">
        <p className="min-h-5 text-center font-mono text-sm font-medium text-indigo-700 dark:text-indigo-300">
          {caption}
        </p>
      </div>

      {/* Stage — fixed height so the window never resizes between scenes */}
      <div className="flex h-[300px] items-center justify-center overflow-auto px-5 py-8">
        <div className={layoutClass}>
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <div key={it.id} className="flex flex-col items-center gap-1.5">
                {mode === "queue" && i === 0 ? (
                  <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">front</span>
                ) : null}
                <Box value={it.value} state={it.state} />
                {mode === "array" ? (
                  <span className="font-mono text-xs text-slate-400">{i}</span>
                ) : null}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-100 px-5 py-3 dark:border-slate-700">
        <Legend className="bg-amber-400" label="comparing" />
        <Legend className="bg-emerald-500" label="found" />
        <Legend className="bg-indigo-500" label="added" />
        <Legend className="bg-rose-400" label="removed" />
      </div>
    </div>
  );
}

function Legend({ className, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} />
      {label}
    </span>
  );
}
