# Graphs Part 1 — Grid Traversal
## 2D Arrays, DFS & BFS

Grid problems are the most common CCC Question 5 type. You'll need to navigate 2D arrays using recursion (DFS) or a queue (BFS).

---

## 2D Arrays in Python

**Creating a grid:**
```python
# Manually
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Programmatically (3 rows, 4 cols)
grid = [[0 for _ in range(4)] for _ in range(3)]
```

**Accessing elements — always `grid[row][col]`:**
```python
print(grid[0][0])  # 1  — top-left
print(grid[1][2])  # 6  — row 1, col 2
print(grid[2][1])  # 8  — bottom-middle
```

**Traversing every cell:**
```python
for row in range(len(grid)):
    for col in range(len(grid[0])):
        print(f"({row},{col}) = {grid[row][col]}")
```

---

## The Four Directions Pattern

This pattern appears in almost every grid problem:

```python
directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
#              up        down    left     right

# Get valid neighbors of (row, col):
rows, cols = len(grid), len(grid[0])
for dr, dc in directions:
    r, c = row + dr, col + dc
    if 0 <= r < rows and 0 <= c < cols:
        # (r, c) is a valid neighbor
```

---

## DFS on a Grid

**Depth-First Search** explores as far as possible before backtracking. Use recursion.

```python
def dfs(grid, row, col, visited):
    rows, cols = len(grid), len(grid[0])

    # Base cases — stop if:
    if row < 0 or row >= rows or col < 0 or col >= cols:
        return  # out of bounds
    if (row, col) in visited:
        return  # already seen
    if grid[row][col] == 0:
        return  # blocked cell (adjust condition per problem)

    visited.add((row, col))

    # Explore all 4 neighbors
    dfs(grid, row - 1, col, visited)  # up
    dfs(grid, row + 1, col, visited)  # down
    dfs(grid, row, col - 1, visited)  # left
    dfs(grid, row, col + 1, visited)  # right
```

**When to use DFS:**
- Visit all connected cells
- Flood fill
- Count separate regions (islands)
- Path existence check

---

## BFS on a Grid

**Breadth-First Search** explores level by level using a queue. Guarantees the shortest path.

```python
from collections import deque

def bfs(grid, start_row, start_col):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start_row, start_col, 0)])  # (row, col, distance)
    visited = {(start_row, start_col)}

    while queue:
        row, col, dist = queue.popleft()

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            r, c = row + dr, col + dc
            if (0 <= r < rows and 0 <= c < cols
                    and grid[r][c] != 0
                    and (r, c) not in visited):
                visited.add((r, c))
                queue.append((r, c, dist + 1))
```

**When to use BFS:**
- Shortest path / minimum steps
- Level-order exploration

---

## DFS vs BFS — Quick Comparison

| | DFS | BFS |
|---|---|---|
| Structure | Recursion (or stack) | Queue (`deque`) |
| Explores | Deep first | Wide first |
| Best for | All paths, regions | Shortest path |
