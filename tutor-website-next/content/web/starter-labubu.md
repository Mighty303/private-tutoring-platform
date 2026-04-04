# Starter: minimal Labubu-inspired page

Same workflow: replace your `index.html` with this version (or duplicate the file to compare). Thick borders and soft panels echo the collectible-art vibe without copying any character art.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Labubu-style mini site</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen bg-[#F5EBE0] text-stone-900">
    <header class="border-b-4 border-black bg-[#FEE5D2]">
      <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <h1 class="text-xl font-black uppercase tracking-wide">
          The Monsters · Fan nook
        </h1>
        <span class="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold">
          cute &amp; chaotic
        </span>
      </div>
    </header>

    <main class="mx-auto max-w-4xl px-4 py-10">
      <p class="mb-8 max-w-2xl text-sm leading-relaxed">
        Four color moods — mint, peach, cocoa, cream — in a simple grid. Swap
        text, add your own section, keep the chunky outlines.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <section
          class="rounded-2xl border-4 border-black bg-[#A3D2CA] p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          <h2 class="text-lg font-black uppercase">Mint sprout</h2>
          <p class="mt-2 text-sm">
            Soft teal panel — use for “news” or a short bio.
          </p>
        </section>
        <section
          class="rounded-2xl border-4 border-black bg-[#F5C49F] p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          <h2 class="text-lg font-black uppercase">Peach fuzz</h2>
          <p class="mt-2 text-sm">
            Warm orange — good for featured links or a quote.
          </p>
        </section>
        <section
          class="rounded-2xl border-4 border-black bg-[#5E453A] p-5 text-[#FEE5D2] shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          <h2 class="text-lg font-black uppercase">Cocoa nook</h2>
          <p class="mt-2 text-sm text-[#F5EBE0]">
            Dark panel for contrast — try a list of favorites.
          </p>
        </section>
        <section
          class="rounded-2xl border-4 border-black bg-[#FEE5D2] p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          <h2 class="text-lg font-black uppercase">Cream puff</h2>
          <p class="mt-2 text-sm">
            Light panel — contact info or “about this page.”
          </p>
        </section>
      </div>

      <footer class="mt-12 border-t-4 border-black pt-6 text-center text-xs font-bold uppercase tracking-widest text-stone-600">
        Fan page for class · not affiliated with any brand
      </footer>
    </main>
  </body>
</html>
```

**Try changing:** hex colors like `#A3D2CA`, shadow `6px_6px_0_0`, and the four panel titles.

---

**Previous:** [← Roblox starter](/grade-7/web-starter-roblox) · **Next:** [Your assignment →](/grade-7/web-assignment)
