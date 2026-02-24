# Nested Lists (2D Lists)

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

**Output:**
```
grid[0][0] = 1
grid[0][1] = 2
grid[0][2] = 3
grid[1][0] = 4
...
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

# grid is now:
# [0, 0, 0, 0]
# [0, 0, 0, 0]
# [0, 0, 0, 0]
```

---

## Common Pattern: Searching a Grid

Find where a value is in the grid:

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

**Output:**
```
Found X at row 0, col 2
Found X at row 1, col 1
Found X at row 2, col 0
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

**Output:**
```
X | O | X
---------
. | X | .
---------
O | . | O
---------
Placed O at row 1, col 0
```

---

## Practice Exercises

### Exercise 1: Sum Each Row

Given a grid, print the sum of each row:
```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
# Output:
# Row 0: 6
# Row 1: 15
# Row 2: 24
```

<details>
<summary>Solution</summary>

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for r in range(len(grid)):
    total = 0
    for num in grid[r]:
        total += num
    print(f"Row {r}: {total}")
```

</details>

### Exercise 2: Find the Largest

Find the largest number in a 2D grid:

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]
# Output: The largest number is 9
```

<details>
<summary>Solution</summary>

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]

largest = grid[0][0]
for row in grid:
    for num in row:
        if num > largest:
            largest = num

print(f"The largest number is {largest}")
```

</details>

### Exercise 3: Count a Value

Count how many times a specific value appears in the grid:

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]
# How many "X"s? → 4
```

<details>
<summary>Solution</summary>

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]

count = 0
for row in grid:
    for cell in row:
        if cell == "X":
            count += 1

print(f"Number of X's: {count}")
```

</details>

### Exercise 4: Checkerboard

Create and print a 4×4 checkerboard:
```
B W B W
W B W B
B W B W
W B W B
```

<details>
<summary>Hint</summary>

If `(row + col)` is even, print `B`. If it's odd, print `W`.

</details>

<details>
<summary>Solution</summary>

```python
for r in range(4):
    for c in range(4):
        if (r + c) % 2 == 0:
            print("B", end=" ")
        else:
            print("W", end=" ")
    print()
```

</details>

---

## Key Takeaways

- Nested lists = **lists inside lists** (2D grids)
- Access with **two indices**: `grid[row][col]`
- Loop with **nested for loops**: outer = rows, inner = columns
- `len(grid)` = number of rows, `len(grid[0])` = number of columns
- Common uses: game boards, tables, maps, matrices
