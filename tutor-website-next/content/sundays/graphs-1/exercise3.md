# Exercise 3: Check Neighbors

## Your Task

Write a function `count_neighbors(grid, row, col, value)` that returns how many of the **4 adjacent cells** (up, down, left, right) equal `value`.

Be careful at the edges — don't go out of bounds!

---

## Examples

```python
grid = [
    [1, 2, 1],
    [2, 5, 2],
    [1, 2, 1]
]

print(count_neighbors(grid, 1, 1, 2))  # 4 — all 4 neighbors of center are 2
print(count_neighbors(grid, 0, 0, 2))  # 1 — top-left corner, only right neighbor is 2
print(count_neighbors(grid, 1, 1, 1))  # 0 — center has no neighbors equal to 1
```

---

## Hints

<details>
<summary>💡 Hint</summary>

Use the four-directions pattern from the intro:

```python
directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
```

For each direction, compute the new position and check:
1. Is it in bounds?
2. Does it equal `value`?

</details>

<details>
<summary>✅ Solution</summary>

```python
def count_neighbors(grid, row, col, value):
    rows, cols = len(grid), len(grid[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    count = 0
    for dr, dc in directions:
        r, c = row + dr, col + dc
        if 0 <= r < rows and 0 <= c < cols:
            if grid[r][c] == value:
                count += 1
    return count
```

</details>
