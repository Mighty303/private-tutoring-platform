# Exercise 6: Dodge the Obstacles

You're running through an obstacle course. The path has items you can collect and spikes you must dodge. Loop through the path and use `continue` to **skip** any `"spike"` items. Collect everything else and count how many items you picked up.

Use this path:

```python
path = ["coin", "spike", "coin", "coin", "spike", "gem", "spike", "coin"]
```

**Expected output:**
```
Collected: coin
Skipped: spike
Collected: coin
Collected: coin
Skipped: spike
Collected: gem
Skipped: spike
Collected: coin
Total items collected: 5
```

---

## Requirements

- Use a `for` loop to go through the path
- Use `continue` to skip `"spike"` items (but still print "Skipped" before continuing)
- Keep a counter of how many items you collected
- No starter code — write the whole solution yourself!

---

## Hints

<details>
<summary>Hint 1 — Print before you continue</summary>

You need to print `"Skipped: spike"` **before** calling `continue`, because `continue` skips everything after it:

```python
if item == "spike":
    print(f"Skipped: {item}")
    continue
```

</details>

<details>
<summary>Hint 2 — Counting collected items</summary>

Create a variable like `collected = 0` before the loop. After the spike check (which uses `continue`), increment it by 1 for each non-spike item.

</details>

<details>
<summary>Hint 3 — Structure of the loop body</summary>

The order inside the loop should be:
1. Check if spike → print skip message → `continue`
2. Print collected message
3. Increment counter

</details>
