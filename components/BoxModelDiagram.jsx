/**
 * Classic CSS box model: margin → border → padding → content.
 * Nested rectangles like the standard teaching diagram.
 */
export default function BoxModelDiagram() {
  return (
    <figure
      className="not-prose my-8 mx-auto max-w-md rounded-2xl border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900"
      aria-label="Diagram: outer margin, then border, padding, and inner content"
    >
      <figcaption className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        The box model
      </figcaption>

      <div className="border border-black dark:border-slate-400">
        {/* Margin */}
        <div className="border-b border-black bg-slate-50 px-3 py-2 text-center text-[11px] font-semibold text-slate-700 dark:border-slate-500 dark:bg-slate-950 dark:text-slate-300">
          Margin
        </div>
        <div className="bg-slate-50 px-4 pb-4 pt-3 dark:bg-slate-950">
          {/* Border */}
          <div className="border-2 border-black bg-sky-200 dark:border-sky-400 dark:bg-sky-950/60">
            <div className="border-b border-black bg-sky-200 px-2 py-1.5 text-center text-[11px] font-semibold text-sky-950 dark:border-sky-600 dark:bg-sky-900/40 dark:text-sky-100">
              Border
            </div>
            <div className="px-3 pb-3 pt-2">
              {/* Padding */}
              <div className="border border-dashed border-amber-800/40 bg-amber-200 dark:border-amber-600/50 dark:bg-amber-900/50">
                <div className="border-b border-amber-800/30 px-2 py-1.5 text-center text-[11px] font-semibold text-amber-950 dark:border-amber-600/40 dark:text-amber-100">
                  Padding
                </div>
                <div className="p-3">
                  {/* Content */}
                  <div className="flex min-h-[64px] items-center justify-center border border-black/25 bg-orange-200 px-3 py-4 text-sm font-bold text-orange-950 dark:bg-orange-900/60 dark:text-orange-50">
                    Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        <strong className="text-slate-700 dark:text-slate-300">Margin</strong> is space outside the border.{" "}
        <strong className="text-slate-700 dark:text-slate-300">Padding</strong> is space inside the border,
        around the content. Tailwind classes like <code className="font-mono text-[11px]">m-4</code> and{" "}
        <code className="font-mono text-[11px]">p-4</code> adjust those layers.
      </p>
    </figure>
  );
}
