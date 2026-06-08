---
name: ui-design
description: Principles and patterns for building opinionated, non-generic UI in this project. Use when creating or significantly redesigning any component, page, or interactive element. Covers the project's visual language, interaction patterns, and what to avoid to keep UI from looking like AI-generated slop.
---

# UI Design for This Project

This is a CS tutor platform for grade 7 and grade 10 students. The UI must feel like a product someone sweated over — not a template. Use this as the governing document whenever building new UI.

---

## Stack

- **Next.js 16 (App Router)** with `"use client"` where interactivity is needed
- **Tailwind CSS v4** — utility-first
- **shadcn/ui** — use as the component base, but always customize heavily. Never ship a shadcn component unmodified; adapt colors, radius, spacing, and copy to fit this project's visual language. `components/ui/` contains the primitives.
- **motion** (`framer-motion`) for meaningful transitions and animations; CSS animations (`@keyframes` in `globals.css`) for simple, looping, or performance-sensitive effects
- **Fonts** — Geist Sans (body/UI) + Geist Mono (code), loaded via the `geist` package in `app/layout.jsx`. Geist Mono is available as `var(--font-geist-mono)` in CSS.
- **No icon libraries** — inline SVG only (24×24 viewBox, `fill="none" stroke="currentColor"`, strokeWidth 2, strokeLinecap/strokeLinejoin round)
- **next/image** for all `<img>` tags
- **react-markdown + rehype-raw + remark-gfm** for rendered content

---

## Visual Language

### Dark Mode First

Design for dark mode first, then verify light mode. The app defaults to the user's system preference and persists via `localStorage`. Dark mode is toggled via `document.documentElement.classList` — not a React context. Every color token must have a `dark:` counterpart; if you can only test one, test dark.

### Color

The palette is **slate + indigo**. Accent is always indigo. Never reach for random colors; expand only when the domain demands it (e.g., gold for 1st place, orange for 3rd).

| Role | Dark (primary) | Light |
|---|---|---|
| Page background | `slate-950` → `slate-900` | `slate-50` → `white` |
| Surface (cards) | `slate-900` | `white` |
| Border | `slate-700` | `slate-200` |
| Body text | `white` | `slate-800` |
| Muted text | `slate-400` | `slate-500` |
| Primary accent | `indigo-400` | `indigo-600` |
| Active bg | `indigo-500/20` | `indigo-50` |
| Hover bg | `slate-800` | `slate-100` |

### Typography

- Page titles: `text-3xl font-bold text-slate-800 dark:text-white`
- Section headings: `text-xl font-semibold` or `text-lg font-semibold`
- Body: `text-sm` or `text-base`, `text-slate-600 dark:text-slate-400`
- Labels/badges: `text-xs font-medium`
- Monospace (code): `font-mono text-sm`

No `text-black`. No arbitrary font sizes unless a specific visual effect requires it.

### Spacing & Layout

- Max content width: `max-w-2xl` for focused flows, `max-w-4xl` for dashboards, `max-w-7xl` for full-width layouts
- Page padding: `px-4 py-12`
- Card padding: `p-6` (compact: `p-4`)
- Gap between major sections: `mb-8` or `space-y-6`
- Prefer CSS Grid (`grid grid-cols-...`) for card grids; Flexbox for inline arrangements

### Borders & Radius

- Cards: `rounded-2xl border border-slate-200 dark:border-slate-700`
- Buttons/inputs: `rounded-lg`
- Tight elements (badges, tags): `rounded-md` or `rounded-full`
- Never `rounded-none` on interactive elements

---

## Component Patterns

### shadcn/ui Usage

shadcn components live in `components/ui/`. They are the starting point, not the finish line. Rules:

1. **Always customize** — change the default radius, colors, and variant styles to match this project's slate/indigo palette
2. **Don't fight the primitive** — if a shadcn component requires heavy surgery to look right, build the element from scratch using the raw Tailwind pattern below
3. **Prefer shadcn for**: Dialog, Dropdown, Tooltip, Popover, Tabs, Select, Sheet — anything with complex accessibility requirements (focus traps, ARIA roles, keyboard nav)
4. **Build from scratch for**: simple buttons, cards, inputs, badges — these are trivial and shadcn's overhead isn't worth it

When adding a new shadcn component: `npx shadcn@latest add <component>`

**Override the default CSS variables** — shadcn initializes with neutral colors. The project uses indigo as primary. In `globals.css`, the `.dark` and `:root` blocks contain `--primary` and related vars; override them when a component relies on `bg-primary` etc.:
```css
/* in :root */
--primary: oklch(0.511 0.262 276.966); /* indigo-600 */
--primary-foreground: oklch(0.985 0 0); /* white */

/* in .dark */
--primary: oklch(0.673 0.182 276.935); /* indigo-400 */
--primary-foreground: oklch(0.145 0 0); /* near-black */
```

**Ignore the lucide icon library** — `components.json` sets `iconLibrary: "lucide"` but this project uses inline SVG only. If shadcn's CLI adds lucide imports to a generated component, replace them with the inline SVG pattern.

### Buttons

Primary action:
```jsx
<button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors disabled:opacity-50">
  Label
</button>
```

Secondary/ghost:
```jsx
<button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
  Label
</button>
```

Icon button:
```jsx
<button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors">
  <svg .../>
</button>
```

Always: `transition-colors`, `disabled:opacity-50` on interactive elements that can be disabled.

### Inputs & Selects

```jsx
<input className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
```

Use `focus:ring-2 focus:ring-indigo-500` — never default browser outlines.

### Cards

```jsx
<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
```

Cards with hover states get `hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer`.

### Loading States

Spinner (centered):
```jsx
<div className="flex justify-center py-16">
  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
</div>
```

Skeleton: `bg-slate-200 dark:bg-slate-700 rounded animate-pulse`

Never use placeholder text like "Loading..." as the primary loading UI.

### Empty States

```jsx
<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
  <p className="text-slate-500 dark:text-slate-400">Specific message relevant to context.</p>
</div>
```

Empty state messages should be contextual — not "No data found."

### Badges / Status Chips

```jsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400">
  Label
</span>
```

Use color semantically: indigo = primary/info, green = success/pass, red = error/fail, yellow = warning/pending.

---

## Interaction Principles

1. **Optimistic UI**: Update state immediately on user action; roll back on failure. Don't show a spinner for actions that should feel instant.

2. **Focused state transitions**: Use `transition-colors` on color changes, `transition-all duration-200` for layout changes. No `transition-all` on everything.

3. **Inline feedback over modals**: Show errors/success inline near the triggering element, not in toast toasts or alerts at the top of the page. Modals only for destructive confirmations.

4. **No skeleton forests**: If loading time is short (< 300ms typical), a spinner is better than a skeleton screen. Skeleton for lists with > 5 items.

5. **Keyboard navigation**: All interactive elements must be reachable by Tab. Custom components must handle `onKeyDown` for Enter/Space.

---

## What Makes UI Feel Like Slop (Avoid These)

- **Generic headers**: "Welcome to our platform" or "Manage your data" — be specific to context
- **Equal visual weight on everything**: Use size, color, and spacing to create clear hierarchy
- **Excessive whitespace**: Padding that makes cards feel empty rather than spacious
- **Symmetric everything**: Real layouts have intentional asymmetry — don't center-align forms just because you can
- **Emoji as decorations**: Only use emoji when they carry meaning (medals, status), never as bullet decorations
- **Shadow soup**: This project uses `shadow-md` sparingly on avatars and elevated elements only — don't add `shadow-xl` to cards just to make them "pop"
- **Gradient abuse**: Gradients only on podium blocks, hero backgrounds, and intentional decorative elements — not on every card
- **Placeholder-quality copy**: Write real labels, real descriptions, real empty-state messages
- **Unused layout props**: Don't add `flex-wrap` or `overflow-hidden` "just in case"
- **Accessibility theater**: Don't add `aria-label` to every div — use semantic HTML (`<button>`, `<nav>`, `<section>`) and label only interactive elements that lack visible text

---

## Page Structure Template

```jsx
export default function PageClient({ ... }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-[size] mx-auto px-4 py-12">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Title</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Specific subtitle.</p>
          </div>
          {/* Right side actions */}
        </div>

        {/* Content */}
      </div>
    </div>
  );
}
```

---

## Specific Component Notes

### Animations (existing components)

`TreeAnimation`, `GraphAnimation`, `HeapAnimation`, `FunctionFlowAnimation`, `LoopAnimation` — these use canvas or DOM-based step animations with a consistent step-through UI. When building new animations, match that pattern: step counter, prev/next buttons, description text below.

### Animation Guidelines

Use **motion** (`framer-motion`) for:
- Page/section entrance animations (`initial`, `animate`, `exit`)
- Interactive state transitions (hover lifts, accordion open/close, tab switches)
- List item stagger effects
- Anything driven by user interaction or component mount/unmount

Use **CSS `@keyframes`** (in `globals.css`) for:
- Looping effects (`animate-spin`, shimmer, progress pulse)
- Performance-sensitive animations (canvas-adjacent, 60fps requirements)
- Simple one-shot effects already defined (`slide-in-right`, `progress-bounce`)

**Motion conventions:**
```jsx
import { motion } from "motion/react";

// Entrance
<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

// Stagger list
<motion.ul>
  {items.map((item, i) => (
    <motion.li key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
  ))}
</motion.ul>

// Layout shift
<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
```

Keep durations short: `0.15–0.25s` for micro-interactions, `0.3–0.4s` for page elements. Never animate color with motion — use `transition-colors` instead.

### Exercise Playgrounds

`PythonPlayground` and `DiscordPlayground` share a layout: code editor on top, run button, output console, test results. The 3-hint countdown system lives here. Don't redesign this structure — extend it.

### Markdown Rendering

Use `<MarkdownRenderer content={...} />` for any user-facing markdown. It handles KaTeX, GFM tables, and syntax highlighting. Don't roll your own.

---

## Dark Mode

Dark mode is toggled via `document.documentElement.classList` and stored in `localStorage`. It is NOT driven by a React context — read `useSyncExternalStore` in `Navbar.jsx` for the pattern if you need to observe theme state in a component.

Always write `light dark:` pairs. Test both modes mentally before shipping.
