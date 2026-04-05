# Exercise 1: Grid Sum

## Your Task

Write a function `grid_sum(grid)` that takes a 2D list of integers and returns the sum of all numbers in the grid.

---

## Examples

```python
grid1 = [
    [1, 2, 3],
    [4, 5, 6]
]
print(grid_sum(grid1))  # 21

grid2 = [
    [10, -5],
    [3,   7],
    [2,  -1]
]
print(grid_sum(grid2))  # 16
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

Use nested loops — one for rows, one for columns. Accumulate into a total.

</details>

<details>
<summary>✅ Solution</summary>

```python
def grid_sum(grid):
    total = 0
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            total += grid[row][col]
    return total
```

</details>
