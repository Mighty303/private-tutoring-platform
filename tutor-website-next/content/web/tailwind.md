# Add Tailwind with the Play CDN

Put this **once** inside `<head>`, **before** your own styles if you add any later:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Your `<head>` can look like this:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My first page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
```

Now you can add **Tailwind classes** to any element using the `class` attribute.

---

## A few Tailwind basics

Padding and margin control **space** around your content. In CSS, every block sits inside the **box model**: from the inside out — **content**, then **padding**, **border**, and **margin**.

[[BOX_MODEL]]

| Class pattern | Meaning |
|----------------|---------|
| `p-4`, `px-6`, `py-8` | Padding inside an element |
| `m-4`, `mt-2`, `mb-8` | Margin outside an element |
| `text-center`, `text-left` | Text alignment |
| `text-xl`, `text-2xl`, `font-bold` | Size and weight |
| `bg-slate-900`, `text-white` | Background and text color |
| `rounded-xl`, `border-2`, `border-black` | Corners and borders |
| `flex`, `items-center`, `justify-center` | Flexbox layout |
| `max-w-2xl`, `mx-auto` | Limit width and center a block |

Search the [Tailwind docs](https://tailwindcss.com/docs) for any utility you need.

---

**Previous:** [← Minimal HTML](/grade-7/web-html) · **Next:** [Theme inspiration →](/grade-7/web-themes)
