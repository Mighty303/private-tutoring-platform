# Dijkstra's Shortest Path

## Your Task

Write a function `dijkstra(graph, start)` that finds the **shortest distance** from `start` to every other node in a weighted, undirected graph.

The graph is given as an adjacency list where `graph[node]` is a list of `(neighbor, weight)` tuples.

Return a dictionary mapping each node to its shortest distance from `start`.

---

## Example

```python
graph = {
    "A": [("B", 4), ("C", 2)],
    "B": [("A", 4), ("C", 1), ("D", 5)],
    "C": [("A", 2), ("B", 1), ("D", 8), ("E", 10)],
    "D": [("B", 5), ("C", 8), ("E", 2), ("F", 6)],
    "E": [("C", 10), ("D", 2), ("F", 3)],
    "F": [("D", 6), ("E", 3)],
}

print(dijkstra(graph, "A"))
# {"A": 0, "B": 3, "C": 2, "D": 8, "E": 10, "F": 13}
```

This is the **Classic Graph** from the animation — run it first to see Dijkstra's step by step.

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O((V + E) log V) |
| **Space** | O(V + E) |

Where `V` is the number of nodes and `E` is the number of edges.

---

## Approach

1. Initialize `dist[start] = 0`, all others = `float("inf")`
2. Use a **min-heap** (priority queue): start with `[(0, start)]`
3. While the heap is not empty:
   - Pop the node `u` with the smallest tentative distance
   - If `u` is already visited, **skip it**
   - Mark `u` as visited (its distance is now final)
   - For each neighbor `v` with edge weight `w`:
     - If `dist[u] + w < dist[v]`, update `dist[v]` and push `(dist[v], v)` to the heap
4. Return `dist`

---

## Starter Code

```python
import heapq

def dijkstra(graph, start):
    # Your code here
    pass


# Test your function:
graph = {
    "A": [("B", 4), ("C", 2)],
    "B": [("A", 4), ("C", 1), ("D", 5)],
    "C": [("A", 2), ("B", 1), ("D", 8), ("E", 10)],
    "D": [("B", 5), ("C", 8), ("E", 2), ("F", 6)],
    "E": [("C", 10), ("D", 2), ("F", 3)],
    "F": [("D", 6), ("E", 3)],
}

result = dijkstra(graph, "A")
print(result)
# Expected: {"A": 0, "B": 3, "C": 2, "D": 8, "E": 10, "F": 13}

print(result["A"])   # 0
print(result["B"])   # 3
print(result["C"])   # 2
print(result["D"])   # 8
print(result["E"])   # 10
print(result["F"])   # 13
```

---

## Hints

<details>
<summary>💡 Hint 1 — Initialize distances</summary>

Set all distances to infinity first, then set the start to zero:

```python
dist = {node: float("inf") for node in graph}
dist[start] = 0
```

</details>

<details>
<summary>💡 Hint 2 — Priority queue setup</summary>

Python's `heapq` is a min-heap. Push `(distance, node)` tuples so the smallest distance is always popped first:

```python
heap = [(0, start)]
visited = set()
```

</details>

<details>
<summary>💡 Hint 3 — Main loop structure</summary>

```python
while heap:
    curr_dist, u = heapq.heappop(heap)
    if u in visited:
        continue
    visited.add(u)
    for neighbor, weight in graph[u]:
        # relax the edge ...
```

</details>

<details>
<summary>💡 Hint 4 — Relaxing an edge</summary>

Check if going through `u` gives a shorter path to `neighbor`:

```python
new_dist = curr_dist + weight
if new_dist < dist[neighbor]:
    dist[neighbor] = new_dist
    heapq.heappush(heap, (new_dist, neighbor))
```

</details>

<details>
<summary>✅ Solution</summary>

```python
import heapq

def dijkstra(graph, start):
    dist = {node: float("inf") for node in graph}
    dist[start] = 0
    heap = [(0, start)]
    visited = set()

    while heap:
        curr_dist, u = heapq.heappop(heap)
        if u in visited:
            continue
        visited.add(u)
        for neighbor, weight in graph[u]:
            new_dist = curr_dist + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))

    return dist
```

**How it works:**
- `dist[start] = 0`, everything else starts at infinity
- The min-heap always gives us the closest unvisited node next
- Once a node is popped and marked visited, its distance is **final** — no future path through non-negative edges can be shorter
- Edge relaxation: if we can reach a neighbor cheaper through the current node, we update its distance and re-add it to the heap
- Stale duplicates in the heap are harmless — the `if u in visited: continue` check skips them

</details>
