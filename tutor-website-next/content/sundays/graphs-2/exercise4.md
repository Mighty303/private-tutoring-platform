# Exercise 4: Count In-Degrees 📥

## Your Task

Write a function `count_indegrees(num_nodes, edges)` that returns a dictionary mapping each node to its **in-degree** — how many edges point **to** it.

---

## Examples

```python
print(count_indegrees(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: {0: 0, 1: 1, 2: 1, 3: 2}
# Node 3 has 2 edges pointing to it (from 1 and 2)

print(count_indegrees(3, [[0,1], [1,2], [2,0]]))
# Output: {0: 1, 1: 1, 2: 1}
# Each node has exactly one incoming edge

print(count_indegrees(3, []))
# Output: {0: 0, 1: 0, 2: 0}
# No edges — all in-degrees are 0

print(count_indegrees(4, [[0,3], [1,3], [2,3]]))
# Output: {0: 0, 1: 0, 2: 0, 3: 3}
# Node 3 is a "collector" — three nodes point to it
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V) |

Where `V` is the number of nodes and `E` is the number of edges.

---

## Approach

1. Initialize every node's in-degree to 0
2. For each edge `[a, b]`, increment the in-degree of `b` (the destination)
3. Return the dictionary

**Key insight:** Only the destination matters for in-degree. Edge `[a, b]` adds 1 to `b`'s in-degree, not `a`'s.

---

## Starter Code

```python
def count_indegrees(num_nodes, edges):
    # Your code here
    pass

# Test your function:
print(count_indegrees(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: {0: 0, 1: 1, 2: 1, 3: 2}

print(count_indegrees(3, [[0,1], [1,2], [2,0]]))
# Output: {0: 1, 1: 1, 2: 1}

print(count_indegrees(3, []))
# Output: {0: 0, 1: 0, 2: 0}

print(count_indegrees(4, [[0,3], [1,3], [2,3]]))
# Output: {0: 0, 1: 0, 2: 0, 3: 3}

print(count_indegrees(5, [[0,1], [0,2], [1,3], [2,3], [3,4]]))
# Output: {0: 0, 1: 1, 2: 1, 3: 2, 4: 1}
```

---

## Hints

<details>
<summary>💡 Hint 1 — Initialize the dictionary</summary>

Start every node at 0:

```python
indegree = {i: 0 for i in range(num_nodes)}
```

This ensures every node has an entry, even nodes that no edge points to.

</details>

<details>
<summary>💡 Hint 2 — Which node to increment?</summary>

For edge `[a, b]`, the arrow points **from** `a` **to** `b`. So `b` gains an incoming edge:

```python
indegree[b] += 1
```

Don't touch `a` — it's the source, not the destination.

</details>

<details>
<summary>✅ Solution</summary>

```python
def count_indegrees(num_nodes, edges):
    indegree = {i: 0 for i in range(num_nodes)}
    for a, b in edges:
        indegree[b] += 1
    return indegree
```

**Why does this matter?** In-degrees are the key to Kahn's algorithm for topological sort (coming up soon). Nodes with in-degree 0 have no prerequisites — they can go first.

</details>
