# Minimal HTML document

Every page starts with a small boilerplate: document type, `html`, `head`, and `body`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser “this is modern HTML.”
- `<meta charset="UTF-8" />` helps emojis and special characters show correctly.
- `<meta name="viewport" ...>` helps the page look good on phones.
- `<title>` is the text on the browser tab.

**Semantic tags** (good habits): use `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>` to group content instead of putting everything in plain `<div>`s. Screen readers and future you will thank you.

---

**Previous:** [← Overview](/grade-7/web-intro) · **Next:** [Add Tailwind →](/grade-7/web-tailwind)
