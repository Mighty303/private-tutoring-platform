/** Neutral icons for lesson track links (replaces emoji). */

export function PlayMark() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white/90 text-slate-600 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
      aria-hidden
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export function GlobeMark() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white/90 text-slate-600 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
      aria-hidden
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}

export function LayersMark() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white/90 text-slate-600 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
      aria-hidden
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
      </svg>
    </span>
  );
}
