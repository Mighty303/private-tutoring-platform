# BFS Shortest Path

## Your Task

Write a function `bfs_shortest_path(graph, start, target)` that finds the **shortest path** (fewest edges) between `start` and `target` in an **unweighted, undirected** graph.

Return the path as a **list of nodes** from `start` to `target`. If no path exists, return `None`.

The graph is given as an adjacency list where `graph[node]` is a list of neighbors.

---

## Example

```python
graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
}

print(bfs_shortest_path(graph, "A", "F"))
# ["A", "C", "F"]  — 2 hops

print(bfs_shortest_path(graph, "A", "E"))
# ["A", "B", "E"]  — 2 hops

print(bfs_shortest_path(graph, "D", "F"))
# ["D", "B", "E", "F"]  — 3 hops
```

**Why BFS?** BFS explores nodes level by level (1 hop away, then 2 hops, then 3...), so the **first time** it reaches the target it has taken the fewest hops possible.

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V) |

Where `V` is the number of nodes and `E` is the number of edges.

---

## Approach

1. Use a **queue** (deque) and a **visited set** — same as regular BFS
2. But instead of storing just nodes, store the **entire path so far** in the queue
3. When you reach the target, return that path immediately — it's the shortest one
4. If the queue empties without finding the target, return `None`

**Key insight:** Unlike Dijkstra, BFS doesn't need edge weights or a priority queue. All edges cost the same (1 hop), so the first path found is always shortest.

---

## Starter Code

```python
from collections import deque

def bfs_shortest_path(graph, start, target):
    # Your code here
    pass


# Test your function:
graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
}

print(bfs_shortest_path(graph, "A", "F"))
# Expected: ["A", "C", "F"]

print(bfs_shortest_path(graph, "A", "E"))
# Expected: ["A", "B", "E"]

print(bfs_shortest_path(graph, "D", "F"))
# Expected: ["D", "B", "E", "F"]  or  ["D", "B", "A", "C", "F"] (same length)

print(bfs_shortest_path(graph, "A", "A"))
# Expected: ["A"]

print(bfs_shortest_path(graph, "A", "Z"))
# Expected: None
```

---

## Hints

<details>
<summary>💡 Hint 1 — What to store in the queue</summary>

Instead of queuing individual nodes, queue the **path** to reach each node:

```python
queue = deque([[start]])
visited = {start}
```

Each item in the queue is a list of nodes representing a route taken so far.

</details>

<details>
<summary>💡 Hint 2 — Processing each path</summary>

Pop a path, look at its last node, and explore its neighbors:

```python
path = queue.popleft()
current = path[-1]

for neighbor in graph[current]:
    if neighbor not in visited:
        ...
```

</details>

<details>
<summary>💡 Hint 3 — When to return</summary>

Check if you've reached the target **before** expanding further:

```python
if neighbor == target:
    return path + [neighbor]
```

Because BFS explores level by level, the first time you hit the target is the shortest path.

</details>

<details>
<summary>✅ Solution</summary>

```python
from collections import deque

def bfs_shortest_path(graph, start, target):
    if start == target:
        return [start]

    queue = deque([[start]])
    visited = {start}

    while queue:
        path = queue.popleft()
        current = path[-1]

        for neighbor in graph[current]:
            if neighbor not in visited:
                new_path = path + [neighbor]
                if neighbor == target:
                    return new_path
                visited.add(neighbor)
                queue.append(new_path)

    return None
```

**How it works:**
- The queue holds paths (not just nodes) so we can reconstruct the route when we find the target
- `visited` prevents revisiting nodes — without it, BFS could loop forever on undirected graphs
- We mark a node visited **when we add it to the queue** (not when we pop it), which avoids adding duplicate paths for the same node
- Returning as soon as we find the target guarantees the shortest path, because BFS expands all 1-hop paths before any 2-hop paths, all 2-hop before any 3-hop, etc.

**Contrast with Dijkstra:** BFS works here because all edges have equal cost. If edges had different weights, BFS might return a 2-hop path with total cost 100 while missing a 3-hop path with total cost 3. That's exactly the problem Dijkstra solves.

</details>
