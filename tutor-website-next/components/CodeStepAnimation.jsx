"use client";

import { useState, useCallback, useEffect } from "react";

const STEP_SPEED = 800;

/**
 * Generic step-through code animation component.
 *
 * Props:
 *  - title: string (e.g. "How Nested Loops Work")
 *  - examples: array of { name, code: [{ line, indent, type }], steps: [{ lineIdx, note, output, vars, isOuter, isInner, ... }] }
 *  - accentColor: "violet" | "sky" | "rose" etc.
 *  - legend: array of { color, label } (overrides default)
 */
export default function CodeStepAnimation({ title, examples, accentColor = "violet", legend }) {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [outputs, setOutputs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const example = examples[exampleIdx];
  const currentStep = stepIdx >= 0 && stepIdx < example.steps.length ? example.steps[stepIdx] : null;

  const reset = useCallback(() => {
    setStepIdx(-1);
    setOutputs([]);
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    setStepIdx((prev) => {
      const next = prev + 1;
      if (next >= example.steps.length) return prev;
      const step = example.steps[next];
      if (step.output) {
        setOutputs((o) => [...o, step.output]);
      }
      return next;
    });
  }, [example]);

  const stepBack = useCallback(() => {
    setStepIdx((prev) => {
      if (prev <= 0) {
        setOutputs([]);
        return -1;
      }
      const newIdx = prev - 1;
      const newOutputs = [];
      for (let i = 0; i <= newIdx; i++) {
        if (example.steps[i].output) {
          newOutputs.push(example.steps[i].output);
        }
      }
      setOutputs(newOutputs);
      return newIdx;
    });
  }, [example]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= example.steps.length - 1) {
      return;
    }
    const timer = setTimeout(() => {
      stepForward();
      if (stepIdx + 1 >= example.steps.length - 1) {
        setIsPlaying(false);
      }
    }, STEP_SPEED);
    return () => clearTimeout(timer);
  }, [isPlaying, stepIdx, stepForward, example.steps.length]);

  const switchExample = (idx) => {
    setExampleIdx(idx);
    setStepIdx(-1);
    setOutputs([]);
    setIsPlaying(false);
  };

  const isFinished = stepIdx >= example.steps.length - 1;

  // Color maps
  const accent = {
    violet: {
      tabActive: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
      btn: "bg-violet-600 hover:bg-violet-700",
      line: "bg-violet-500/20 border-l-2 border-violet-400",
      lineGlow: "bg-violet-500/5",
      arrow: "text-violet-400",
      noteBox: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800",
    },
    sky: {
      tabActive: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
      btn: "bg-sky-600 hover:bg-sky-700",
      line: "bg-sky-500/20 border-l-2 border-sky-400",
      lineGlow: "bg-sky-500/5",
      arrow: "text-sky-400",
      noteBox: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800",
    },
    rose: {
      tabActive: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
      btn: "bg-rose-600 hover:bg-rose-700",
      line: "bg-rose-500/20 border-l-2 border-rose-400",
      lineGlow: "bg-rose-500/5",
      arrow: "text-rose-400",
      noteBox: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
    },
    emerald: {
      tabActive: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
      btn: "bg-emerald-600 hover:bg-emerald-700",
      line: "bg-emerald-500/20 border-l-2 border-emerald-400",
      lineGlow: "bg-emerald-500/5",
      arrow: "text-emerald-400",
      noteBox: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    },
  };
  const colors = accent[accentColor] || accent.violet;

  // Determine line highlight
  function getLineHighlight(line, i) {
    if (!currentStep) return "";
    const isActive = currentStep.lineIdx === i;
    if (!isActive) {
      // Highlight outer/inner loop context
      if (currentStep.isInner && (line.type === 'outer' || line.type === 'outer-head')) return "bg-sky-500/5";
      if (currentStep.isInFunc && (line.type === 'def' || line.type === 'body')) return "bg-violet-500/5";
      return "";
    }
    // Active line — pick color based on step flags
    if (currentStep.isCall) return "bg-amber-500/20 border-l-2 border-amber-400";
    if (currentStep.isReturn) return "bg-emerald-500/20 border-l-2 border-emerald-400";
    if (currentStep.isOuter) return "bg-sky-500/20 border-l-2 border-sky-400";
    if (currentStep.isInner) return "bg-amber-500/20 border-l-2 border-amber-400";
    return colors.line;
  }

  function getArrowColor() {
    if (!currentStep) return colors.arrow;
    if (currentStep.isCall) return "text-amber-400";
    if (currentStep.isReturn) return "text-emerald-400";
    if (currentStep.isOuter) return "text-sky-400";
    if (currentStep.isInner) return "text-amber-400";
    return colors.arrow;
  }

  function getNoteBoxClass() {
    if (!currentStep) return "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500";
    if (currentStep.isCall) return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    if (currentStep.isReturn) return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    if (currentStep.isOuter) return "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800";
    if (currentStep.isInner) return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    return colors.noteBox;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 py-4">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-3">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => switchExample(i)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                i === exampleIdx
                  ? colors.tabActive
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Code panel */}
        <div className="flex-1 p-5">
          <div className="font-mono text-sm bg-slate-950 rounded-xl p-4 overflow-x-auto">
            {example.code.map((line, i) => {
              const isActive = currentStep?.lineIdx === i;
              const bgClass = getLineHighlight(line, i);

              return (
                <div
                  key={i}
                  className={`flex items-center transition-all duration-300 rounded px-2 py-0.5 -mx-2 min-h-6 ${bgClass}`}
                >
                  <span className="w-6 text-right text-slate-600 text-xs mr-4 select-none shrink-0">
                    {line.type !== 'blank' ? i + 1 : ''}
                  </span>
                  <span className="w-5 shrink-0 text-center">
                    {isActive && (
                      <span className={`text-sm ${getArrowColor()} animate-pulse`}>▶</span>
                    )}
                  </span>
                  <span
                    style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                    className={`${getCodeColor(line.type)} ${isActive ? 'font-semibold' : ''}`}
                  >
                    {renderCodeLine(line.line.trimStart())}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={stepBack}
              disabled={stepIdx < 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              onClick={() => {
                if (isFinished) {
                  reset();
                } else if (isPlaying) {
                  setIsPlaying(false);
                } else {
                  if (stepIdx === -1) stepForward();
                  setIsPlaying(true);
                }
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${colors.btn}`}
            >
              {isFinished ? "↺ Restart" : isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <button
              onClick={stepForward}
              disabled={isFinished}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Step
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
              {stepIdx >= 0 ? `Step ${stepIdx + 1} / ${example.steps.length}` : "Ready"}
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
          {/* What's happening */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              What&apos;s Happening
            </h4>
            <div className={`text-sm rounded-lg p-3 min-h-14 transition-all duration-300 ${getNoteBoxClass()}`}>
              {currentStep ? currentStep.note : "Press Play or Step to begin"}
            </div>
          </div>

          {/* Variables */}
          {currentStep?.vars && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Variables
              </h4>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 space-y-1">
                {Object.entries(currentStep.vars).map(([name, val]) => (
                  <div key={name} className="flex items-center gap-2 text-sm font-mono">
                    <span className="text-sky-600 dark:text-sky-400">{name}</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      {typeof val === "string" ? `"${val}"` : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output console */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Output
            </h4>
            <div className="bg-slate-950 rounded-lg p-3 min-h-20 font-mono text-sm">
              {outputs.length === 0 ? (
                <span className="text-slate-600 italic">No output yet</span>
              ) : (
                outputs.map((o, i) => (
                  <div key={i} className="text-green-400">{o}</div>
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          {legend && (
            <div className="mt-auto">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Legend
              </h4>
              <div className="space-y-1.5 text-xs">
                {legend.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded shrink-0 ${item.color}`} />
                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getCodeColor(type) {
  switch (type) {
    case 'def': return 'text-sky-400';
    case 'body': return 'text-slate-300';
    case 'call': return 'text-amber-300';
    case 'outer-head': return 'text-sky-400';
    case 'outer': return 'text-sky-300';
    case 'inner-head': return 'text-amber-400';
    case 'inner': return 'text-amber-300';
    case 'comment': return 'text-slate-500';
    default: return 'text-slate-300';
  }
}

/* Simple syntax highlighting for Python code lines */
function renderCodeLine(code) {
  if (!code) return null;

  const keywords = /\b(def|return|print|if|else|elif|for|in|range|True|False|None|len|end|append)\b/g;
  const strings = /(f?"[^"]*"|'[^']*')/g;
  const numbers = /\b(\d+)\b/g;

  const matches = [];
  let m;
  while ((m = keywords.exec(code)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type: 'keyword' });
  }
  while ((m = strings.exec(code)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type: 'string' });
  }
  while ((m = numbers.exec(code)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type: 'number' });
  }

  matches.sort((a, b) => a.start - b.start);
  const filtered = [];
  let lastEnd = 0;
  for (const match of matches) {
    if (match.start >= lastEnd) {
      filtered.push(match);
      lastEnd = match.end;
    }
  }

  const parts = [];
  let lastIndex = 0;
  for (const match of filtered) {
    if (match.start > lastIndex) {
      parts.push(<span key={`t-${lastIndex}`}>{code.slice(lastIndex, match.start)}</span>);
    }
    const colorClass =
      match.type === 'keyword' ? 'text-pink-400' :
      match.type === 'string' ? 'text-green-400' :
      'text-amber-300';
    parts.push(
      <span key={`m-${match.start}`} className={colorClass}>
        {match.text}
      </span>
    );
    lastIndex = match.end;
  }
  if (lastIndex < code.length) {
    parts.push(<span key={`t-${lastIndex}`}>{code.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : code;
}
