# Starter: minimal Roblox-inspired page

Copy the whole block into `index.html`, save, and refresh. Then change the title, colors, and text.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Roblox-style mini site</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen bg-slate-950 text-slate-100">
    <div
      class="min-h-screen bg-gradient-to-br from-red-600/40 via-slate-950 to-cyan-500/30"
    >
      <header class="border-b border-white/10 backdrop-blur-sm">
        <nav
          class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4"
        >
          <span class="text-sm font-black tracking-[0.3em] text-white/90"
            >STUDIO</span
          >
          <a
            href="#about"
            class="text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >About</a
          >
        </nav>
      </header>

      <main class="mx-auto max-w-4xl px-4 py-16">
        <section class="text-center">
          <p
            class="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-amber-200"
          >
            Fan page · not affiliated
          </p>
          <h1
            class="text-4xl font-black tracking-tight text-white drop-shadow-[0_0_24px_rgba(34,211,238,0.35)] sm:text-5xl"
          >
            Build. Battle. Show off your style.
          </h1>
          <p class="mx-auto mt-4 max-w-xl text-base text-slate-300">
            A tiny one-page site — swap the copy, tweak the gradient, add your
            own links.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#about"
              class="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              >Jump in</a
            >
            <a
              href="https://www.roblox.com"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >Open Roblox</a
            >
          </div>
        </section>

        <section id="about" class="mt-20">
          <h2 class="text-xl font-bold text-white">Loadout</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-3">
            <div
              class="rounded-2xl border border-red-500/40 bg-red-950/40 p-4 shadow-lg shadow-red-500/10"
            >
              <p class="text-xs font-semibold uppercase text-red-300">Class</p>
              <p class="mt-1 text-lg font-bold">Swordfighter</p>
            </div>
            <div
              class="rounded-2xl border border-cyan-500/40 bg-cyan-950/40 p-4 shadow-lg shadow-cyan-500/10"
            >
              <p class="text-xs font-semibold uppercase text-cyan-300">Realm</p>
              <p class="mt-1 text-lg font-bold">Neon City</p>
            </div>
            <div
              class="rounded-2xl border border-amber-500/40 bg-amber-950/40 p-4 shadow-lg shadow-amber-500/10"
            >
              <p class="text-xs font-semibold uppercase text-amber-300">Rank</p>
              <p class="mt-1 text-lg font-bold">Gold III</p>
            </div>
          </div>
        </section>

        <footer class="mt-20 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          Made for practice · replace with your name and social links
        </footer>
      </main>
    </div>
  </body>
</html>
```

**Try changing:** `from-red-600/40`, `to-cyan-500/30`, the three “Loadout” cards, and the heading text.

---

**Previous:** [← Theme inspiration](/grade-7/web-themes) · **Next:** [Starter: Labubu-style page →](/grade-7/web-starter-labubu)
