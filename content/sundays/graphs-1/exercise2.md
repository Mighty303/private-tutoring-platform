# Exercise 2: Find Position

## Your Task

Write a function `find_position(grid, target)` that:
- Returns the `(row, col)` of the **first** occurrence of `target` in the grid (scanning row by row, left to right)
- Returns `None` if the value isn't found

---

## Examples

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(find_position(grid, 5))   # (1, 1)
print(find_position(grid, 7))   # (2, 0)
print(find_position(grid, 10))  # None
```

---

## Hints

<details>
<summary>💡 Hint</summary>

Use nested loops. When you find the target, immediately `return (row, col)`. If the loops finish without finding it, `return None`.

</details>

<details>
<summary>✅ Solution</summary>

```python
def find_position(grid, target):
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            if grid[row][col] == target:
                return (row, col)
    return None
```

</details>
