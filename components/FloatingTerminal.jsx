"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SCRIPT = [
  { cmd: "cd ~/tutor" },
  { cmd: "ls", out: "grade-7  grade-10  playground" },
  { cmd: 'python3 -c "print(\'Learn CS. Build things.\')"', out: "Learn CS. Build things." },
  { cmd: "open /playground", out: "→ Code playground ready." },
];

const CHAR_MS = 26;
const LINE_PAUSE_MS = 450;
const LOOP_PAUSE_MS = 3000;

function Prompt() {
  return (
    <>
      <span className="text-emerald-400/90">➜</span>{" "}
      <span className="text-sky-400/90">~/tutor</span>{" "}
      <span className="text-violet-400/80">%</span>
    </>
  );
}

export default function FloatingTerminal({ className = "" }) {
  const [history, setHistory] = useState([]);
  const [typing, setTyping] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!cancelled) {
        for (const line of SCRIPT) {
          for (let i = 1; i <= line.cmd.length; i++) {
            if (cancelled) return;
            setTyping(line.cmd.slice(0, i));
            await sleep(CHAR_MS);
          }
          await sleep(LINE_PAUSE_MS);
          if (cancelled) return;
          setHistory((h) => [...h, { prompt: true, text: line.cmd }]);
          setTyping("");
          if (line.out) {
            await sleep(LINE_PAUSE_MS);
            if (cancelled) return;
            setHistory((h) => [...h, { prompt: false, text: line.out }]);
          }
        }
        await sleep(LOOP_PAUSE_MS);
        if (cancelled) return;
        setHistory([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history, typing]);

  /** Fixed width: flex children use min-w-0 so long lines wrap instead of widening the window. */
  const shellClass =
    "flex h-[min(20rem,44vh)] w-[min(36rem,calc(100vw-2rem))] min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-[#1a1b26] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm sm:h-[24rem] lg:h-[26rem] xl:h-[28rem]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none min-w-0 max-w-[min(36rem,calc(100vw-2rem))] select-none ${className}`}
      aria-hidden
    >
      <div className={shellClass}>
        <div className="flex shrink-0 items-center gap-2 border-b border-slate-700/50 bg-slate-900/80 px-4 py-3">
          <span className="flex shrink-0 gap-2" aria-hidden>
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-inner" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e] shadow-inner" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#28c840] shadow-inner" />
          </span>
          <p className="flex-1 truncate px-2 text-center font-mono text-xs font-medium tracking-wide text-slate-500 sm:text-sm">
            zsh — ~
          </p>
          <span className="w-12 shrink-0" />
        </div>
        <div
          ref={bodyRef}
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 font-mono text-xs leading-relaxed text-slate-300 wrap-anywhere sm:text-sm"
        >
          {history.map((row, i) => (
            <div key={`h-${i}-${row.prompt ? "p" : "o"}`} className="min-w-0 whitespace-pre-wrap wrap-break-word [word-break:break-word]">
              {row.prompt ? (
                <>
                  <Prompt /> <span className="text-slate-200">{row.text}</span>
                </>
              ) : (
                <span className="text-slate-500">{row.text}</span>
              )}
            </div>
          ))}
          <div className="min-w-0 whitespace-pre-wrap wrap-break-word [word-break:break-word]">
            <Prompt /> <span className="text-slate-200">{typing}</span>
            <span className="inline-block h-4 w-2.5 ml-0.5 align-[-3px] bg-emerald-400/85 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
