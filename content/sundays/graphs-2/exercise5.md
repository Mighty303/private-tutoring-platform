# Exercise 5: Path Existence + Path Reconstruction 🗺️

## Your Task

Write a function `find_path(num_nodes, edges, start, end)` that:

1. Builds an adjacency list from the edge list
2. Returns **one valid path** from `start` to `end` as a list of nodes
3. If no path exists, returns an **empty list** `[]`

The graph is **directed** — you can only follow edges in their given direction.

---

## Examples

```python
print(find_path(5, [[0,1], [0,2], [1,3], [2,3], [3,4]], 0, 4))
# Output: [0, 1, 3, 4]
# (or [0, 2, 3, 4] — any valid path is accepted)

print(find_path(4, [[0,1], [1,2], [2,3]], 0, 3))
# Output: [0, 1, 2, 3]

print(find_path(4, [[0,1], [2,3]], 0, 3))
# Output: []
# (no path from 0 to 3)

print(find_path(3, [[0,1], [1,2], [2,0]], 0, 2))
# Output: [0, 1, 2]

print(find_path(4, [[0,1], [0,2], [1,3], [2,3]], 1, 0))
# Output: []
# (no path from 1 back to 0 — directed graph)
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` is the number of nodes and `E` is the number of edges.

---

## Approach — DFS with Path Tracking

1. Build the adjacency list
2. Run DFS from `start`, keeping track of the current path
3. If you reach `end`, return the path
4. Use a `visited` set to avoid revisiting nodes
5. If DFS exhausts all possibilities, return `[]`

---

## Starter Code

```python
def find_path(num_nodes, edges, start, end):
    # Your code here
    pass

# Test your function:
print(find_path(5, [[0,1], [0,2], [1,3], [2,3], [3,4]], 0, 4))
# Output: [0, 1, 3, 4] or [0, 2, 3, 4]

print(find_path(4, [[0,1], [1,2], [2,3]], 0, 3))
# Output: [0, 1, 2, 3]

print(find_path(4, [[0,1], [2,3]], 0, 3))
# Output: []

print(find_path(3, [[0,1], [1,2], [2,0]], 0, 2))
# Output: [0, 1, 2]

print(find_path(4, [[0,1], [0,2], [1,3], [2,3]], 1, 0))
# Output: []
```

---

## Hints

<details>
<summary>💡 Hint 1 — Build the adjacency list</summary>

Same as always:

```python
adj = {i: [] for i in range(num_nodes)}
for a, b in edges:
    adj[a].append(b)
```

</details>

<details>
<summary>💡 Hint 2 — DFS function signature</summary>

Write a helper that takes the current node and the path so far:

```python
def dfs(node, path):
    if node == end:
        return path
    ...
```

Add `node` to a `visited` set before exploring its neighbors so you don't loop forever.

</details>

<details>
<summary>💡 Hint 3 — Backtracking</summary>

When DFS goes down a dead-end branch, it returns `[]`. Try each neighbor — if one succeeds, return that result. If none do, this branch failed.

```python
for neighbor in adj[node]:
    if neighbor not in visited:
        result = dfs(neighbor, path + [neighbor])
        if result:
            return result
return []
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def find_path(num_nodes, edges, start, end):
    adj = {i: [] for i in range(num_nodes)}
    for a, b in edges:
        adj[a].append(b)

    visited = set()

    def dfs(node, path):
        if node == end:
            return path
        visited.add(node)
        for neighbor in adj[node]:
            if neighbor not in visited:
                result = dfs(neighbor, path + [neighbor])
                if result:
                    return result
        return []

    return dfs(start, [start])
```

**How it works:**
- Start DFS from `start` with the initial path `[start]`
- At each step, if we've reached `end`, return the path we've built
- Mark each node visited before exploring so we don't loop in cycles
- If all neighbors lead to dead ends, return `[]` to signal failure
- The first valid path found is returned immediately

</details>
