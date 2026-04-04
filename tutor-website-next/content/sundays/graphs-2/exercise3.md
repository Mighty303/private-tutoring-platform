# Exercise 3: Count Sink Nodes 🔚

## Your Task

Write a function `count_sinks(num_nodes, edges)` that counts how many nodes have **no outgoing edges**.

A node with no outgoing edges is called a **sink** — nothing flows out of it.

---

## Examples

```python
print(count_sinks(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: 1
# Only node 3 has no outgoing edges

print(count_sinks(3, [[0,1], [1,2], [2,0]]))
# Output: 0
# Every node has an outgoing edge

print(count_sinks(3, []))
# Output: 3
# No edges at all — every node is a sink

print(count_sinks(5, [[0,1], [0,2]]))
# Output: 4
# Nodes 1, 2, 3, 4 have no outgoing edges
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` is the number of nodes and `E` is the number of edges.

---

## Approach

1. Build the adjacency list
2. Count nodes where the neighbor list is empty

---

## Starter Code

```python
def count_sinks(num_nodes, edges):
    # Your code here
    pass

# Test your function:
print(count_sinks(4, [[0,1], [0,2], [1,3], [2,3]]))
# Output: 1

print(count_sinks(3, [[0,1], [1,2], [2,0]]))
# Output: 0

print(count_sinks(3, []))
# Output: 3

print(count_sinks(5, [[0,1], [0,2]]))
# Output: 4

print(count_sinks(6, [[0,1], [1,2], [2,3], [3,4], [4,5]]))
# Output: 1
```

---

## Hints

<details>
<summary>💡 Hint 1 — Build the adjacency list</summary>

Same pattern as before:

```python
adj = {i: [] for i in range(num_nodes)}
for a, b in edges:
    adj[a].append(b)
```

Because we initialize every node to `[]`, nodes that never appear as a source in the edge list automatically have empty neighbor lists.

</details>

<details>
<summary>💡 Hint 2 — Counting the sinks</summary>

Loop through all nodes and check if their neighbor list is empty:

```python
count = 0
for node in adj:
    if len(adj[node]) == 0:
        count += 1
return count
```

Or use a list comprehension to make it shorter.

</details>

<details>
<summary>✅ Solution</summary>

```python
def count_sinks(num_nodes, edges):
    adj = {i: [] for i in range(num_nodes)}
    for a, b in edges:
        adj[a].append(b)
    return sum(1 for node in adj if len(adj[node]) == 0)
```

**Why does this work?** Every node starts with an empty list. Adding edges only fills in lists for nodes with outgoing edges. So after processing all edges, any node still with `[]` is a sink — it was never the source of any edge.

**Alternative — without building the full adjacency list:**

```python
def count_sinks(num_nodes, edges):
    has_outgoing = set(a for a, b in edges)
    return num_nodes - len(has_outgoing)
```

This works because a node is a sink if and only if it never appears as the source (`a`) of any edge.

</details>

