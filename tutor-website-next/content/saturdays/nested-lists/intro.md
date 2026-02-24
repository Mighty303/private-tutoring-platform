# Nested Lists — How They Work

A **nested list** is a list that contains other lists. It's how we represent grids, tables, and matrices in Python.

---

## Creating a Nested List

```python
# A 3×3 grid
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Think of it as a **table with rows and columns**:

|       | Col 0 | Col 1 | Col 2 |
|-------|-------|-------|-------|
| Row 0 |   1   |   2   |   3   |
| Row 1 |   4   |   5   |   6   |
| Row 2 |   7   |   8   |   9   |

---

## Accessing Elements

Use **two indices** — first the row, then the column:

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(grid[0])       # [1, 2, 3]  (entire first row)
print(grid[0][0])    # 1          (row 0, col 0)
print(grid[1][2])    # 6          (row 1, col 2)
print(grid[2][1])    # 8          (row 2, col 1)
```

**How to read it:** `grid[row][col]`

---

## Changing Values

```python
grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

grid[1][1] = 5    # Set the center to 5
grid[0][2] = 9    # Set top-right to 9

# grid is now:
# [0, 0, 9]
# [0, 5, 0]
# [0, 0, 0]
```

---

## Looping Through a Nested List

### Print Every Element

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in grid:
    for item in row:
        print(item, end=" ")
    print()
```

**Output:**
```
1 2 3
4 5 6
7 8 9
```

### Using Index Numbers

Sometimes you need to know the row and column number:

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for r in range(len(grid)):
    for c in range(len(grid[r])):
        print(f"grid[{r}][{c}] = {grid[r][c]}")
```

---

## Getting Dimensions

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

rows = len(grid)         # 3 (number of rows)
cols = len(grid[0])      # 3 (number of columns)
print(f"{rows} rows × {cols} cols")
```

---

## Common Pattern: Creating a Grid

```python
# Create a 3×4 grid filled with zeros
rows = 3
cols = 4

grid = []
for r in range(rows):
    row = []
    for c in range(cols):
        row.append(0)
    grid.append(row)
```

---

## Common Pattern: Searching a Grid

```python
grid = [
    [".", ".", "X"],
    [".", "X", "."],
    ["X", ".", "."]
]

for r in range(len(grid)):
    for c in range(len(grid[r])):
        if grid[r][c] == "X":
            print(f"Found X at row {r}, col {c}")
```

---

## Common Pattern: Summing All Values

```python
grid = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

total = 0
for row in grid:
    for num in row:
        total += num

print(f"Total: {total}")  # Total: 450
```

---

## Real-World Example: Tic-Tac-Toe Board

```python
board = [
    ["X", "O", "X"],
    [".", "X", "."],
    ["O", ".", "O"]
]

# Print the board nicely
for row in board:
    print(" | ".join(row))
    print("-" * 9)

# Check if a cell is empty
r, c = 1, 0
if board[r][c] == ".":
    board[r][c] = "O"
    print(f"Placed O at row {r}, col {c}")
```

---

## Key Takeaways

- Nested lists = **lists inside lists** (2D grids)
- Access with **two indices**: `grid[row][col]`
- Loop with **nested for loops**: outer = rows, inner = columns
- `len(grid)` = number of rows, `len(grid[0])` = number of columns
- Common uses: game boards, tables, maps, matrices
