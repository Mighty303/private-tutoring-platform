# Exercise 6: Maze Path Finder

## Your Task

Write a function `has_path(maze, row, col, visited)` that:
- Returns `True` if there is a path from `(row, col)` to the **bottom-right corner**
- Returns `False` otherwise
- `0` = wall, `1` = open path
- You can move up, down, left, right — not diagonal

Start by calling `has_path(maze, 0, 0, set())`.

---

## Examples

```python
maze1 = [
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1]
]
print(has_path(maze1, 0, 0, set()))  # True
# Path: (0,0) → (1,0) → (1,1) → (1,2) → (2,2)

maze2 = [
    [1, 0, 1],
    [0, 0, 1],
    [0, 0, 1]
]
print(has_path(maze2, 0, 0, set()))  # False
# (0,0) is surrounded — no way through
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

Base cases:
- Out of bounds → `False`
- Wall (`maze[row][col] == 0`) → `False`
- Already visited → `False`
- Reached bottom-right → `True`

</details>

<details>
<summary>💡 Hint 2</summary>

For the recursive case, try all 4 directions. Return `True` if **any** direction leads to a path — use `or`:

```python
return (has_path(...up...) or has_path(...down...) or ...)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def has_path(maze, row, col, visited):
    rows, cols = len(maze), len(maze[0])

    # Base cases
    if row < 0 or row >= rows or col < 0 or col >= cols:
        return False
    if maze[row][col] == 0:
        return False
    if (row, col) in visited:
        return False
    if row == rows - 1 and col == cols - 1:
        return True

    visited.add((row, col))

    return (has_path(maze, row - 1, col, visited) or
            has_path(maze, row + 1, col, visited) or
            has_path(maze, row, col - 1, visited) or
            has_path(maze, row, col + 1, visited))
```

</details>
