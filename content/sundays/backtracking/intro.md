# Backtracking Intro 🔙

## What is Backtracking?

**Backtracking** is a technique for exploring all possible solutions by building candidates step-by-step and **undoing** (backtracking) when a path doesn't lead to a solution.

Think of it like exploring a maze:
- Try a path
- If it leads to a dead end → go back and try another
- If it works → record it and keep exploring

---

## The Choose / Don't Choose Pattern

Many backtracking problems follow the same structure:

> For each element, you have **two choices**: include it or exclude it.

```
                    []
                   /   \
                 [1]    []
                /  \   /  \
            [1,2] [1] [2] []
```

**Key idea:** At each step, you:
1. **Choose** — add the current element and recurse
2. **Backtrack** — remove it (undo the choice)
3. **Don't choose** — recurse without adding it

---

## Template

```python
def backtrack(path, choices, result):
    # Base case: no more choices
    if not choices:
        result.append(path[:])  # Save a copy!
        return

    # Option 1: Include current choice
    path.append(choices[0])
    backtrack(path, choices[1:], result)
    path.pop()  # Backtrack! Undo the choice

    # Option 2: Exclude current choice
    backtrack(path, choices[1:], result)
```

**Why `path[:]`?** We need a **copy** of the path. If we append `path` itself, we'd be storing a reference that gets modified later!

---

## When to Use Backtracking

- **Subsets** — all possible subsets of a set
- **Combinations** — choose k elements from n
- **Permutations** — all orderings
- **Partitioning** — split into groups
- **Path finding** — all paths in a maze

---

## Time & Space

| | Complexity |
|---|---|
| **Time** | Often O(2^n) for subsets — we make 2 choices per element |
| **Space** | O(n) for recursion depth |

---

## Next Up

Start with **Subsets** — the classic backtracking problem. Then try **Combination Sum** and **Permutations**!
