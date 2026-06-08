# Theme backgrounds

Pick **one** theme image and use it as a **full-page background** — not a small picture in a corner. Your job is to **experiment**: add headings, labels, and short lines of text in **different areas** of the screen (top, bottom, corners, center) and see what reads well on top of the art.

Save **one** image in the same folder as your `index.html`, using the exact filename so `bg-[url('your-image.png')]` matches:

- **Roblox-style** — warm vs cool, high energy: [theme-roblox.png](/lessons/web/theme-roblox.png) (right-click → *Save image as…* → `theme-roblox.png`)
- **Labubu-style** — soft panels, playful colors: [theme-labubu.png](/lessons/web/theme-labubu.png) → save as `theme-labubu.png`

You can also use any wide image you like; just change the filename in the `bg-[url('your-image.png')]` class to match.

---

## Roblox-style: dark text on a busy background

Use a **semi-transparent dark strip** or **text shadow** so words stay readable. Move blocks around: try `justify-between`, `items-end`, or `text-right`.

```html
<body
  class="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('theme-roblox.png')] text-white"
>
  <div class="flex min-h-screen flex-col justify-between p-6 sm:p-10">
    <header class="max-w-md">
      <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-200">
        Your label here
      </p>
      <h1 class="text-3xl font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl">
        Big title — top left
      </h1>
    </header>

    <p
      class="self-end text-right text-sm font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
    >
      Short line — try the right side
    </p>

    <footer class="text-center text-xs text-slate-200/90">
      Footer line — bottom center
    </footer>
  </div>
</body>
```

**Try:** change `justify-between` to `justify-center`, add another `<p>` with `self-center`, or wrap a line in `rounded-lg bg-black/40 px-4 py-2` for a readable “card” on top of the image.

---

## Labubu-style: softer contrast

The art is lighter — you may want **dark text** plus a chunky outline or a **light panel** behind a paragraph.

```html
<body
  class="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('theme-labubu.png')] text-stone-900"
>
  <div class="grid min-h-screen grid-rows-[auto_1fr_auto] gap-6 p-6 sm:p-10">
    <h1
      class="justify-self-start rounded-2xl border-4 border-black bg-[#FEE5D2]/90 px-4 py-3 text-xl font-black uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
    >
      Title in a panel — top
    </h1>

    <p
      class="max-w-xs justify-self-end self-center rounded-xl border-2 border-black bg-white/85 p-4 text-sm font-medium leading-relaxed"
    >
      Middle-right: a “sticker” with text inside a soft box.
    </p>

    <p class="justify-self-center text-center text-xs font-bold uppercase tracking-widest text-stone-700">
      Bottom — small caps line
    </p>
  </div>
</body>
```

**Try:** swap `justify-self-end` for `justify-self-start`, add a second panel with different `bg-[#...]`, or stack two lines in the bottom row.

---

## What to experiment with

| Idea | Tailwind hints |
|------|----------------|
| Full-page image | `min-h-screen bg-cover bg-center bg-no-repeat bg-[url('your-image.png')]` |
| Text in a safe bubble | `rounded-xl bg-black/50 px-4 py-2` or `bg-white/80` |
| Pin to a corner | `flex` + `justify-between` / `items-start`, or `grid` + `justify-self-*` |
| Readable on busy art | `drop-shadow-lg`, `font-bold`, or a solid panel behind text |

You are **not** copying the artwork — you are using it as wallpaper and **designing where the words go**.

---

**Previous:** [← Add Tailwind](/grade-7/web-tailwind) · **Next:** [Starter: Roblox-style page →](/grade-7/web-starter-roblox)
