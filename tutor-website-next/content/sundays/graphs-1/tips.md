# Grid Tips & CCC Reference

## The Checklist

**Before writing any grid function:**
- [ ] Know your grid size: `rows = len(grid)`, `cols = len(grid[0])`
- [ ] Use `grid[row][col]` — row first, then col
- [ ] Validate before accessing: `0 <= r < rows and 0 <= c < cols`
- [ ] Track visited cells to avoid infinite recursion

---

## Boundary Check — Never Skip This

```python
# Always check before accessing a cell
if 0 <= r < rows and 0 <= c < cols:
    val = grid[r][c]  # safe
```

Missing this causes `IndexError` or silent wrong answers.

---

## Visited Set vs Visited Grid

```python
# Option 1: set of tuples (easy)
visited = set()
visited.add((row, col))
if (row, col) in visited: ...

# Option 2: boolean grid (faster for large grids)
visited = [[False] * cols for _ in range(rows)]
visited[row][col] = True
if visited[row][col]: ...
```

Both work. Sets are simpler to write in a contest.

---

## DFS vs BFS — When to Use Each

| Problem | Use |
|---|---|
| Does a path exist? | DFS |
| Count all regions / islands | DFS |
| Flood fill | DFS |
| **Shortest** path length | **BFS** |
| Minimum steps to reach target | BFS |

---

## Common Mistakes

**Wrong index order:**
```python
# WRONG — trying to use (x, y) like math coordinates
grid[col][row]

# RIGHT — grid is indexed row first
grid[row][col]
```

**Forgetting to mark visited before recursing:**
```python
# WRONG — infinite loop if two neighbors point to each other
def dfs(r, c):
    dfs(r+1, c)  # visits (r+1,c), which calls dfs(r,c) again → infinite!

# RIGHT — mark before recursing
def dfs(r, c):
    visited.add((r, c))
    dfs(r+1, c)
```

**Not initializing `cols` correctly for non-square grids:**
```python
# WRONG for non-square grids
cols = len(grid)  # this is rows!

# RIGHT
rows = len(grid)
cols = len(grid[0])
```

---

## CCC Q5 Tips

- **Draw it on paper** — trace a 3×3 example by hand before coding
- **Start small** — get the 2×2 case working first
- **Separate concerns** — write a helper `is_valid(r, c)` if you need bounds checks repeatedly
- **BFS guarantees shortest** — if the problem asks for minimum distance, reach for BFS first
