# Exercise 1: Build an Adjacency List 🔗

## Your Task

Write a function `build_adj_list(num_nodes, edges)` that converts an **edge list** into an **adjacency list**.

The graph is **directed** — each edge `[a, b]` means there's an arrow from node `a` to node `b`.

Return the adjacency list as a **dictionary** mapping each node to its list of neighbors.

---

## Examples

```python
print(build_adj_list(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: {0: [1, 2], 1: [3], 2: [3], 3: []}

print(build_adj_list(3, [[0,1], [1,2], [2,0]]))
# Output: {0: [1], 1: [2], 2: [0]}

print(build_adj_list(3, []))
# Output: {0: [], 1: [], 2: []}
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` is the number of nodes and `E` is the number of edges.

**Why?** We initialize V empty lists, then iterate through E edges.

---

## Approach

1. Create a dictionary with an empty list for each node `0` to `num_nodes - 1`
2. For each edge `[a, b]`, append `b` to the list at key `a`
3. Return the dictionary

**Key insight:** In a directed graph, edge `[a, b]` only adds `b` to `a`'s list (not the reverse). For undirected graphs you'd add both directions.

---

## Starter Code

```python
def build_adj_list(num_nodes, edges):
    # Your code here
    pass

# Test your function:
print(build_adj_list(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: {0: [1, 2], 1: [3], 2: [3], 3: []}

print(build_adj_list(3, [[0,1], [1,2], [2,0]]))
# Output: {0: [1], 1: [2], 2: [0]}

print(build_adj_list(3, []))
# Output: {0: [], 1: [], 2: []}

print(build_adj_list(5, [[0,1], [0,2], [1,3], [2,3], [3,4]]))
# Output: {0: [1, 2], 1: [3], 2: [3], 3: [4], 4: []}
```

---

## Hints

<details>
<summary>💡 Hint 1 — Initialize the dictionary</summary>

Use a dictionary comprehension to create empty lists for all nodes:

```python
adj = {i: [] for i in range(num_nodes)}
```

This ensures every node has an entry, even if it has no outgoing edges.

</details>

<details>
<summary>💡 Hint 2 — Process each edge</summary>

For a directed graph, each edge `[a, b]` only needs:

```python
adj[a].append(b)
```

For an **undirected** graph, you'd also add `adj[b].append(a)`.

</details>

<details>
<summary>✅ Solution</summary>

```python
def build_adj_list(num_nodes, edges):
    adj = {i: [] for i in range(num_nodes)}
    for a, b in edges:
        adj[a].append(b)
    return adj
```

**Why a dictionary?** Each key is a node, each value is the list of nodes it points to. This gives O(1) lookup for any node's neighbors.

**Alternative with defaultdict:**

```python
from collections import defaultdict

def build_adj_list(num_nodes, edges):
    adj = defaultdict(list)
    for i in range(num_nodes):
        adj[i]  # ensure all nodes exist
    for a, b in edges:
        adj[a].append(b)
    return dict(adj)
```

</details>

---

## Bonus Challenge 🌟

Modify your function to also return the **in-degree** of each node (how many edges point TO it). This will be useful for topological sort later!

```python
print(build_adj_list_with_indegree(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: ({0: [1, 2], 1: [3], 2: [3], 3: []}, {0: 0, 1: 1, 2: 1, 3: 2})
```
