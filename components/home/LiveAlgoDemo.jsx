"use client";

import { motion } from "motion/react";
import DataStructureShowcase from "@/components/home/DataStructureShowcase";

/**
 * Homepage showcase: an auto-looping animation of core data structures (array
 * search, stack, queue) in box form — a taste of how the lessons visualize concepts.
 */
export default function LiveAlgoDemo({ eyebrow = "Try it now" }) {
  return (
    <section>
      <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">{eyebrow}</p>
      <div className="mb-5 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Concepts you can see, not just read
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
          Watch an array get searched, a stack push and pop, a queue move first-in first-out. Every
          topic in the course comes with an interactive visual like this.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <DataStructureShowcase />
      </motion.div>
    </section>
  );
}
