# Exercise 7: Shortest Path (BFS)

## Your Task

Write a function `shortest_path_length(maze)` that:
- Finds the **shortest path** from `(0, 0)` to the bottom-right corner
- Returns the number of cells in that path
- Returns `-1` if no path exists
- `0` = wall, `1` = open path
- Uses **BFS** (not recursion)

---

## Why BFS and not DFS?

DFS might find *a* path, but not necessarily the *shortest* one. BFS explores cells in order of distance from the start, so the first time it reaches the destination, that's guaranteed to be the shortest path.

---

## BFS Template

```python
from collections import deque

queue = deque([(0, 0, 1)])  # (row, col, distance)
visited = {(0, 0)}

while queue:
    row, col, dist = queue.popleft()

    # Check if destination
    # ...

    # Explore neighbors
    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        r, c = row + dr, col + dc
        if valid and not visited:
            visited.add((r, c))
            queue.append((r, c, dist + 1))
```

---

## Examples

```python
maze1 = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
]
print(shortest_path_length(maze1))  # 5
# Path: (0,0)→(0,1)→(1,1)→(2,1)→(2,2) = 5 cells

maze2 = [
    [1, 0],
    [0, 1]
]
print(shortest_path_length(maze2))  # -1 — no path
```

---

## Hints

<details>
<summary>💡 Hint</summary>

Start `queue` with `(0, 0, 1)` — distance starts at 1 because you're already standing on the first cell.

When you pop a cell and it's the bottom-right corner, return `dist`.

If the queue empties without reaching the destination, return `-1`.

</details>

<details>
<summary>✅ Solution</summary>

```python
from collections import deque

def shortest_path_length(maze):
    rows, cols = len(maze), len(maze[0])
    if maze[0][0] == 0:
        return -1

    queue = deque([(0, 0, 1)])
    visited = {(0, 0)}

    while queue:
        row, col, dist = queue.popleft()

        if row == rows - 1 and col == cols - 1:
            return dist

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            r, c = row + dr, col + dc
            if (0 <= r < rows and 0 <= c < cols
                    and maze[r][c] == 1
                    and (r, c) not in visited):
                visited.add((r, c))
                queue.append((r, c, dist + 1))

    return -1
```

</details>
