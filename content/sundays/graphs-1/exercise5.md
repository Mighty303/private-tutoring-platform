# Exercise 5: Count Regions

## Your Task

Write a function `count_regions(grid, target)` that counts how many **separate connected regions** of `target` exist in the grid.

A region = a group of cells with the same value that are connected horizontally or vertically.

---

## Model: Count Islands

This is the classic version with `1`s (land) and `0`s (water):

```python
grid = [
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0]
]
# 3 islands (separate groups of 1s)
```

**Algorithm:**
```python
def count_islands(grid):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if (r, c) in visited or grid[r][c] == 0:
            return
        visited.add((r, c))
        dfs(r - 1, c)
        dfs(r + 1, c)
        dfs(r, c - 1)
        dfs(r, c + 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and (r, c) not in visited:
                dfs(r, c)
                count += 1

    return count
```

**Key idea:** Scan every cell. When you find an unvisited target cell, run DFS to mark its entire region, then increment the counter.

---

## Now your turn — generalize it

Write `count_regions(grid, target)` that works for any target value (not just `1`).

---

## Examples

```python
grid1 = [
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1]
]
print(count_regions(grid1, 1))  # 3

grid2 = [
    [2, 2, 3],
    [2, 3, 3],
    [3, 3, 3]
]
print(count_regions(grid2, 3))  # 1 — all 3s are connected
print(count_regions(grid2, 2))  # 1 — all 2s are connected
```

---

## Hints

<details>
<summary>💡 Hint</summary>

Adapt the `count_islands` algorithm above. The only change: instead of checking `grid[r][c] == 0`, check `grid[r][c] != target`.

</details>

<details>
<summary>✅ Solution</summary>

```python
def count_regions(grid, target):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if (r, c) in visited or grid[r][c] != target:
            return
        visited.add((r, c))
        dfs(r - 1, c)
        dfs(r + 1, c)
        dfs(r, c - 1)
        dfs(r, c + 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == target and (r, c) not in visited:
                dfs(r, c)
                count += 1

    return count
```

</details>
