# Loops Part 2 — `break` and `continue`

You already know `for` and `while` loops. Now it's time to learn two powerful keywords that give you **finer control** over how your loops run.

---

## `break` — Exit the Loop Early

`break` **immediately stops** the loop, even if the condition is still True or there are more items to iterate over.

```python
for i in range(10):
    if i == 5:
        print("Found 5! Stopping.")
        break
    print(i)
```

**Output:**
```
0
1
2
3
4
Found 5! Stopping.
```

The loop was supposed to go to 9, but `break` ended it at 5.

---

## `break` with `while True`

A common pattern is to use `while True` (an infinite loop) and `break` to exit when a condition is met:

```python
count = 0
while True:
    count += 1
    if count > 3:
        break
    print(count)

print("Done!")
```

**Output:**
```
1
2
3
Done!
```

This is useful when you don't know the exact stopping condition upfront, or when the exit check needs to happen **in the middle** of the loop body.

---

## `continue` — Skip to the Next Iteration

`continue` **skips the rest of the current iteration** and jumps back to the top of the loop.

```python
for i in range(6):
    if i % 2 == 0:
        continue
    print(i)
```

**Output:**
```
1
3
5
```

Even numbers hit `continue`, so their `print` is skipped. The loop still runs all 6 times — it just doesn't execute the code **after** `continue` for those iterations.

---

## Using Both Together

You can combine `break` and `continue` in the same loop:

```python
numbers = [4, -1, 7, 0, 3, -5, 8]

total = 0
for num in numbers:
    if num < 0:
        continue       # skip negatives
    if num == 0:
        break          # stop at zero
    total += num

print(total)  # 11 (4 + 7)
```

---

## Quick Reference

| Keyword | What it does | When to use |
|---------|-------------|-------------|
| `break` | Exits the loop immediately | Searching for something, stopping early |
| `continue` | Skips to the next iteration | Filtering out certain items |
| `while True` + `break` | Loop until you decide to stop | Unknown number of iterations |

---

## Key Rules

1. `break` and `continue` only affect the **innermost** loop they're in
2. Code **after** `break` or `continue` (in that iteration) does **not** run
3. `break` exits the loop entirely — `continue` just skips one iteration
4. Don't overuse them — sometimes a better loop condition is cleaner
