# Nested Loops — Tips & Common Mistakes

## Common Mistake 1: Forgetting `print()`

If you forget the `print()` after the inner loop, everything stays on one line:

```python
# ❌ Wrong — no newline
for r in range(3):
    for c in range(4):
        print("*", end=" ")

# Output: * * * * * * * * * * * *  (all on one line!)

# ✅ Correct — add print() after inner loop
for r in range(3):
    for c in range(4):
        print("*", end=" ")
    print()  # ← this moves to the next line
```

---

## Common Mistake 2: Wrong Variable Names

Using the same variable for both loops causes bugs:

```python
# ❌ Wrong — both loops use 'i'
for i in range(3):
    for i in range(4):    # This overwrites the outer 'i'!
        print(i, end=" ")
    print()

# ✅ Correct — use different names
for i in range(3):
    for j in range(4):
        print(j, end=" ")
    print()
```

---

## Common Mistake 3: Off-by-One in Range

Remember: `range(n)` goes from 0 to n-1, and `range(a, b)` goes from a to b-1.

```python
# Want to print 1 to 5?
range(5)      # gives 0, 1, 2, 3, 4  ← starts at 0!
range(1, 5)   # gives 1, 2, 3, 4     ← misses 5!
range(1, 6)   # gives 1, 2, 3, 4, 5  ← correct!
```

---

## Common Mistake 4: `break` Only Breaks the Inner Loop

```python
for i in range(5):
    for j in range(5):
        if j == 2:
            break    # Only exits the inner loop!
    # Outer loop keeps going...
```

If you need to break both loops, use a flag:

```python
done = False
for i in range(5):
    for j in range(5):
        if some_condition:
            done = True
            break
    if done:
        break
```

---

## Debugging Tip: Add Print Statements

When your nested loop isn't working, add prints to see what's happening:

```python
for i in range(3):
    print(f"--- Outer loop: i = {i} ---")
    for j in range(3):
        print(f"  Inner loop: j = {j}")
```

This shows you exactly how the loops are running.

---

## Quick Reference

| Pattern | Outer | Inner | Total |
|---------|-------|-------|-------|
| 3×4 grid | `range(3)` | `range(4)` | 12 runs |
| Triangle | `range(1, n+1)` | `range(i)` | varies |
| All pairs | `range(len(list))` | `range(i+1, len(list))` | n×(n-1)/2 |
| Times table | `range(1, 13)` | (just multiply) | 12 runs |

---

## When to Use Nested Loops

- **Grids and tables** — rows × columns
- **Comparing all pairs** — matching, finding duplicates
- **Pattern printing** — stars, numbers, shapes
- **2D data** — game boards, spreadsheets, images
