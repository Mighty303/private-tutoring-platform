# AGENTS.md

Guide for AI agents working on this codebase. Read this before making changes.

## Project overview

A private CS tutoring platform built with **Next.js 16 (App Router)**. It teaches programming through interactive lessons:

- **Beginner** — Python basics (variables, loops, functions, lists, dictionaries), Roblox-themed exercises.
- **Intermediate** — algorithms & data structures (binary search, BSTs, trees, heaps, graphs, Dijkstra, backtracking).
- **Web track** — HTML/CSS/Tailwind intro lessons (content under `content/web/`).

Core features: in-browser Python code playgrounds (Pyodide WASM, runs client-side), algorithm animations, an AI tutor (Claude), Google OAuth login, an admin dashboard (classrooms / students / homework), and a Neon Postgres backend.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (`next dev --webpack`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next` + TS rules) |

**There is no test runner.** No Jest/Vitest/Playwright is configured. "Verification" here means: `npm run lint`, `npm run build`, and running the app manually (`npm run dev`). Never claim "tests pass" — there are none.

## Language & file conventions

**This codebase is JavaScript/JSX-first.** ~100 `.jsx` + ~28 `.js` files vs only **2 `.tsx`** (`components/ui/accordion.tsx`, `components/ui/button.tsx`) and **3 `.ts`** (`lib/utils.ts`, the hand-written `next.config.ts`, and the generated `next-env.d.ts`). TypeScript is strict in `tsconfig.json` but used almost nowhere.

- **Write app pages, components, hooks, API routes, and `lib/` code in `.jsx` / `.js`** to match the surrounding code. Do **not** "upgrade" new feature code to TypeScript.
- TypeScript only appears in shadcn primitives (`components/ui/*`), `lib/utils.ts`, and `next.config.ts`. Leave it that way.
- **Path alias:** `@/*` → repo root (e.g. `import { getDb } from "@/lib/db"`). Defined in `tsconfig.json`.
- **Naming:** components `PascalCase`; hooks `use*`; route directories `kebab-case` with a `page.jsx`; API routes at `app/api/<feature>/route.js`; lesson markdown `TitleCase` under `content/`.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework / runtime | Next.js 16.1.6 (App Router), React 19.2.3 |
| Styling | Tailwind CSS v4, CVA, `clsx`, `tailwind-merge`, Geist font |
| UI | shadcn/ui (Base Nova) + Base UI React, Lucide icons |
| Animation | Motion (`motion`) |
| Code editing / exec | Monaco (`@monaco-editor/react`), Pyodide via `hooks/usePyodide.js` |
| Markdown | `react-markdown` + `remark-gfm` / `remark-math` / `rehype-katex` / `rehype-raw`, KaTeX |
| Auth | `next-auth` v5 beta, Google OAuth |
| Database | Neon serverless Postgres (`@neondatabase/serverless`), raw SQL, no ORM |
| AI | `@anthropic-ai/sdk`, model `claude-haiku-4-5` |

## Directory map

```
app/                 # App Router routes
  page.jsx, layout.jsx, globals.css
  api/<feature>/route.js   # ask, hint, auth, classrooms, homework, submissions, users, discord, invite
  beginner/  intermediate/      # lessons; dynamic routes beginner/[id], intermediate/[id]
  admin/  login/  homework/  leaderboard/  playground/  invite/[code]/
components/          # flat dir of PascalCase .jsx components, e.g.:
  #   algorithm visualizations: TreeAnimation.jsx, GraphAnimation.jsx, DijkstraAnimation.jsx, ...
  #   challenge modes:          DiscordPlayground.jsx, GuessWhoPlayground.jsx, ...
  ui/                # shadcn primitives — the only subdir, and the only .tsx files
lib/                 # auth.js, db.js, content.js, lessons.js, utils.ts
hooks/               # usePyodide.js, useExerciseProgress.js
content/             # lesson markdown: saturdays/ (Beginner), sundays/ (Intermediate), web/
db/migrations/       # hand-written SQL migrations
.agents/skills/      # project skills (see below)
```

## Architecture notes

**Server vs client components.** Components are React Server Components by default. Anything using hooks, state, browser APIs, Pyodide, or Monaco must start with `"use client"` (the playgrounds, editors, and most interactive components do).

**Lessons system.** Lesson content is markdown under `content/` (`saturdays/` = Beginner, `sundays/` = Intermediate, `web/` = web track). Lesson routes live at `app/beginner/` and `app/intermediate/` (note: the homepage still links to stale `/grade-7` and `/grade-10` hrefs). `lib/lessons.js` holds the JS catalog: lesson lists (`webLessons`, `saturdayLessons`, `IntermediateLessons`) and many per-topic exercise arrays (`loopExercises`, `functionExercises`, `graph1Exercises`, `heapExercises`, `bstExercises`, …). `lib/content.js` loads markdown by id (`getContent(id)`, `getAllContentIds()`). Rendering goes through `components/MarkdownRenderer.jsx`. Lesson pages render via dynamic routes `beginner/[id]` and `intermediate/[id]`.

**Database.** `lib/db.js` exports `getDb()`, which returns `neon(process.env.DATABASE_URL)`. Queries use SQL template literals — **there is no ORM, and that's intentional.** Don't add Prisma/Drizzle. Schema changes go in `db/migrations/` as hand-written `.sql` files. For anything Neon-specific, use the `neon-postgres` skill.

**Auth.** `next-auth` v5 in `lib/auth.js` (Google OAuth), with role-based access (student / admin). `components/AuthProvider.jsx` wraps the app; `components/UserMenu.jsx` / `Navbar.jsx` consume the session.

**AI endpoints.** `app/api/ask/route.js` (tutor Q&A) and `app/api/hint/route.js` call Claude `claude-haiku-4-5`. The governing rule, encoded in the system prompt: **help the student understand concepts but never give the solution or write working code that solves the exercise.** Preserve that intent when editing these routes.

**Code execution.** Student Python runs client-side in Pyodide (`hooks/usePyodide.js`); Monaco provides the editor; exercise test cases are checked against the program's output.

## Project skills (`.agents/skills/`)

Use these when relevant:

- **`neon-postgres`** — Neon Serverless Postgres: connection methods, local dev, features, CLI/SDKs. Use for any database work.
- **`svg-design`** — generating/editing SVG logos, icons, path data, optimization, and SVG animation.
- **`ui-design`** — the project's visual language and interaction patterns; use when creating or redesigning any component or page so the UI doesn't look generic.

## Gotchas — do not

- Don't convert `.js`/`.jsx` to TypeScript, and don't write new feature code in TS.
- Don't add an ORM — raw SQL via `getDb()` is the chosen pattern.
- Don't commit secrets. `DATABASE_URL`, Google OAuth credentials, and `ANTHROPIC_API_KEY` are environment variables.
- Don't claim tests pass — no test framework exists. Verify with lint + build + manual run.
- Don't break the server/client boundary — add `"use client"` to anything interactive.
- Don't make the AI tutor endpoints hand out solutions; keep the "explain, don't solve" system prompt.
