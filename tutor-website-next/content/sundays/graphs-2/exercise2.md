# Exercise 2: Get Neighbors of a Node 🔍

## Your Task

Write a function `get_neighbors(num_nodes, edges, x)` that:

1. Builds an adjacency list from the given edge list
2. Returns the list of **direct neighbors** of node `x` (nodes that `x` points to)

The graph is **directed** — edge `[u, v]` means there's an arrow from `u` to `v`.

---

## Examples

```python
print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 0))
# Output: [1, 2]

print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 1))
# Output: [3]

print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 3))
# Output: []

print(get_neighbors(3, [[0,1], [1,2], [2,0]], 2))
# Output: [0]
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` is the number of nodes and `E` is the number of edges.

**Why?** Building the adjacency list takes O(V + E). Looking up neighbors is O(1).

---

## Approach

1. Build the adjacency list (same as Exercise 1)
2. Return `adj[x]`

---

## Starter Code

```python
def get_neighbors(num_nodes, edges, x):
    # Your code here
    pass

# Test your function:
print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 0))
# Output: [1, 2]

print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 1))
# Output: [3]

print(get_neighbors(4, [[0,1], [0,2], [1,3], [2,3]], 3))
# Output: []

print(get_neighbors(3, [[0,1], [1,2], [2,0]], 2))
# Output: [0]

print(get_neighbors(5, [[0,1], [0,4], [1,2], [1,3]], 0))
# Output: [1, 4]
```

---

## Hints

<details>
<summary>💡 Hint 1 — Build the adjacency list first</summary>

Reuse the same pattern from Exercise 1:

```python
adj = {i: [] for i in range(num_nodes)}
for a, b in edges:
    adj[a].append(b)
```

</details>

<details>
<summary>💡 Hint 2 — Returning neighbors</summary>

Once you have `adj`, the neighbors of node `x` are just:

```python
return adj[x]
```

Since we initialized every node with an empty list, even nodes with no outgoing edges are safe to look up.

</details>

<details>
<summary>✅ Solution</summary>

```python
def get_neighbors(num_nodes, edges, x):
    adj = {i: [] for i in range(num_nodes)}
    for a, b in edges:
        adj[a].append(b)
    return adj[x]
```

**Why does this work?** The adjacency list maps each node to its outgoing neighbors. We initialize all nodes to `[]` first so that nodes with no outgoing edges (like node 3 in the first example) still return an empty list instead of raising a KeyError.

</details>

