# Nested Lists — Tips & Common Mistakes

## Common Mistake 1: Wrong Index Order

Always remember: `grid[row][col]` — **row first, column second**.

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# ❌ Wrong — this tries column first
print(grid[2])      # [7, 8, 9] — this is a row, not a column!

# ✅ Correct — row 1, column 2
print(grid[1][2])   # 6
```

---

## Common Mistake 2: Index Out of Range

Make sure your indices don't go past the grid size:

```python
grid = [
    [1, 2, 3],
    [4, 5, 6]
]

# grid has 2 rows (0-1) and 3 columns (0-2)
print(grid[2][0])   # ❌ IndexError! Only rows 0 and 1 exist
print(grid[0][3])   # ❌ IndexError! Only columns 0, 1, 2 exist

# ✅ Check dimensions first
print(len(grid))     # 2 rows
print(len(grid[0]))  # 3 columns
```

---

## Common Mistake 3: Creating Grids the Wrong Way

```python
# ❌ Wrong — all rows point to the SAME list!
grid = [[0] * 3] * 3
grid[0][0] = 5
print(grid)
# [[5, 0, 0], [5, 0, 0], [5, 0, 0]]  ← All rows changed!

# ✅ Correct — create each row separately
grid = []
for r in range(3):
    grid.append([0] * 3)

grid[0][0] = 5
print(grid)
# [[5, 0, 0], [0, 0, 0], [0, 0, 0]]  ← Only row 0 changed
```

This is a **very** common Python trap!

---

## Common Mistake 4: Forgetting to Reset Variables

When looping through rows, reset your counter/total for each row:

```python
# ❌ Wrong — total keeps growing across all rows
total = 0
for row in grid:
    for num in row:
        total += num
    print(total)  # Shows cumulative total, not row total!

# ✅ Correct — reset total for each row
for row in grid:
    total = 0     # ← Reset here!
    for num in row:
        total += num
    print(total)  # Shows each row's total
```

---

## Debugging Tip: Print the Grid Nicely

When debugging, print the grid row by row:

```python
def print_grid(grid):
    for row in grid:
        print(row)
    print()

# Use it to check your grid at any point
print_grid(grid)
```

---

## Quick Reference

| Operation | Code |
|-----------|------|
| Get element | `grid[row][col]` |
| Set element | `grid[row][col] = value` |
| Get a row | `grid[row]` |
| Number of rows | `len(grid)` |
| Number of columns | `len(grid[0])` |
| Loop by value | `for row in grid: for item in row:` |
| Loop by index | `for r in range(len(grid)): for c in range(len(grid[r])):` |

---

## When to Use Nested Lists

- **Game boards** — tic-tac-toe, chess, minesweeper
- **Maps/grids** — Roblox terrain, mazes
- **Tables of data** — scores, schedules
- **Images** — pixel grids, color maps
- **Math** — matrices, coordinate systems
