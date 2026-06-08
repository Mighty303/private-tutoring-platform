/** Inline SVG check / cross marks (replaces ✓ ✅ ✗ ❌ emoji). */

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const ICON_CLASS = "inline-block h-[1em] w-[1em] align-[-0.125em]";

/**
 * react-markdown component map that renders the <check-icon>/<x-icon>
 * placeholder elements emitted by `rehypeStatusIcons` as inline SVGs.
 * Spread into a ReactMarkdown `components` prop.
 */
export const statusIconComponents = {
  "check-icon": () => (
    <CheckIcon className={`${ICON_CLASS} text-emerald-600 dark:text-emerald-400`} />
  ),
  "x-icon": () => (
    <XIcon className={`${ICON_CLASS} text-red-600 dark:text-red-400`} />
  ),
};

const iconEl = (tagName) => ({ type: "element", tagName, properties: {}, children: [] });

/**
 * Rehype plugin: replace ✅/✓/❌ in prose text with <check-icon>/<x-icon>
 * placeholder elements (rendered as inline SVG via `statusIconComponents`).
 * Skips text inside `code`/`pre` so emoji in code samples stay literal.
 */
export function rehypeStatusIcons() {
  const swap = (node, inCode) => {
    if (!node.children) return;
    const out = [];
    for (const child of node.children) {
      if (child.type === "element") {
        swap(child, inCode || child.tagName === "code" || child.tagName === "pre");
        out.push(child);
      } else if (child.type === "text" && !inCode && /[✅✓❌✗]/.test(child.value)) {
        for (const part of child.value.split(/([✅✓❌✗])/)) {
          if (part === "✅" || part === "✓") out.push(iconEl("check-icon"));
          else if (part === "❌" || part === "✗") out.push(iconEl("x-icon"));
          else if (part !== "") out.push({ type: "text", value: part });
        }
      } else {
        out.push(child);
      }
    }
    node.children = out;
  };
  return (tree) => swap(tree, false);
}
