# Exercise 4: Flood Fill

## Background — Recursion on Grids

Before writing DFS, understand why recursion works here:

```
flood_fill starting at (0,0) on a grid of 1s surrounded by 0s:

Step 1: Paint (0,0) → 2, then call fill on its neighbors
Step 2: Each neighbor paints itself → 2, then calls fill on its neighbors
Step 3: Eventually every connected 1 is painted — then recursion unwinds
```

**The key rules:**
1. **Base case** — stop if out of bounds, already painted, or wrong color
2. **Recursive case** — paint current cell, then call on all 4 neighbors

---

## Your Task

Write a function `flood_fill(grid, row, col, new_color)` that:
- Starts at `(row, col)`
- Changes that cell and **all connected cells of the same original color** to `new_color`
- Connected = adjacent horizontally or vertically (not diagonal)
- Returns the modified grid

---

## Examples

```python
grid = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
result = flood_fill(grid, 0, 0, 2)
# [2, 2, 2]
# [2, 0, 2]
# [2, 2, 2]
# All connected 1s become 2. The 0 in the center is untouched.

grid2 = [
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 1]
]
result2 = flood_fill(grid2, 0, 0, 5)
# [5, 5, 0]
# [5, 0, 0]
# [0, 0, 1]
# Only the top-left connected 1s change. The lone 1 at (2,2) is not connected.
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

Store the original color at `grid[row][col]` before you change anything. You'll need it to check if neighbors match.

</details>

<details>
<summary>💡 Hint 2</summary>

Base cases to return early:
- Out of bounds
- `grid[row][col] != original_color` (wrong color or already painted)

</details>

<details>
<summary>✅ Solution</summary>

```python
def flood_fill(grid, row, col, new_color):
    original_color = grid[row][col]
    rows, cols = len(grid), len(grid[0])

    def fill(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != original_color:
            return
        grid[r][c] = new_color
        fill(r - 1, c)
        fill(r + 1, c)
        fill(r, c - 1)
        fill(r, c + 1)

    fill(row, col)
    return grid
```

</details>
