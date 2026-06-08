"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/** Grounded in real platform facts — schedule, levels, in-browser runtime, AI behaviour. */
const FAQS = [
  {
    q: "Do I need to install anything?",
    a: "No. Python runs right in your browser, so you can write and run real code on day one — nothing to download or set up.",
  },
  {
    q: "What levels do you teach?",
    a: "Two tracks: Beginner covers Python fundamentals with Roblox-themed exercises, and Intermediate covers algorithms, data structures, and CCC contest prep.",
  },
  {
    q: "When are the classes?",
    a: "Beginner runs Saturdays 12–2 PM, and Intermediate runs Sundays 1:30–3:30 PM. Lessons and exercises stay available anytime in between.",
  },
  {
    q: "How does the AI tutor work?",
    a: "Ask it anything while you work and it explains the concept and points you in the right direction — it won't just hand over the solution, so you still do the thinking.",
  },
];

export default function FaqSection({ eyebrow = "Questions" }) {
  return (
    <section>
      <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">{eyebrow}</p>
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Frequently asked
      </h2>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 dark:border-slate-800 dark:bg-slate-900">
        <Accordion>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-base text-slate-900 dark:text-white">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
