# Tips & Common Mistakes — break & continue

## Mistake 1: Code After `break` or `continue` Doesn't Run

```python
# ❌ This print never happens
for i in range(5):
    if i == 3:
        break
        print("This line is unreachable!")  # Never runs!
```

```python
# ✅ Put the print BEFORE break
for i in range(5):
    if i == 3:
        print("Stopping at 3!")
        break
```

**Rule:** Always put any code you want to execute **before** `break` or `continue`.

---

## Mistake 2: Forgetting to Update the Counter Before `continue`

```python
# ❌ count never increases for skipped items
count = 0
for item in items:
    if item == "skip_me":
        continue
    count += 1  # This only counts non-skipped items (might be what you want!)
```

Think about whether your counter should track **all** iterations or just the non-skipped ones.

---

## Mistake 3: `while True` Without a `break`

```python
# ❌ Infinite loop — no way out!
while True:
    print("Help, I'm stuck!")
```

```python
# ✅ Always have a break condition
while True:
    answer = do_something()
    if answer == "done":
        break
```

**Rule:** Every `while True` loop **must** have a `break` somewhere inside it.

---

## Mistake 4: Using `break` When You Meant `continue`

```python
numbers = [1, -2, 3, -4, 5]

# ❌ Stops at the first negative — only processes [1]
for n in numbers:
    if n < 0:
        break
    print(n)

# ✅ Skips negatives — processes [1, 3, 5]
for n in numbers:
    if n < 0:
        continue
    print(n)
```

- `break` = "I'm done with this entire loop"
- `continue` = "Skip this one, keep going"

---

## When to Use What

| Situation | Use |
|-----------|-----|
| Searching for something, stop when found | `break` |
| Filtering items, skip some but keep looping | `continue` |
| Loop until a condition is met (unknown iterations) | `while True` + `break` |
| Skip invalid data but process everything else | `continue` |

---

## Debugging Tip: Add Print Statements

When your loop isn't behaving as expected, add a print at the top to see every iteration:

```python
for i, item in enumerate(items):
    print(f"DEBUG: iteration {i}, item = {item}")
    # ... rest of your code
```

This helps you see if `break` is triggering too early or `continue` is skipping the wrong items.

---

## Challenge Yourself

Once you're comfortable with `break` and `continue`, try solving problems **without** them — using just loop conditions and `if/else`. Sometimes that's cleaner! The best programmers know when to use each approach.
