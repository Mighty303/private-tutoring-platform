# Exercise 2: Course Schedule — Can You Finish? 🎓

## Your Task

There are `numCourses` courses labeled `0` to `numCourses - 1`. You're given a list of `prerequisites` where `prerequisites[i] = [a, b]` means **you must take course `b` before course `a`**.

Return `True` if you can finish **all** courses, or `False` if there's a **cycle** in the prerequisites (making it impossible).

This is [LeetCode 207: Course Schedule](https://leetcode.com/problems/course-schedule/).

---

## Examples

```python
print(can_finish(2, [[1, 0]]))
# Output: True
# Take course 0, then course 1

print(can_finish(2, [[1, 0], [0, 1]]))
# Output: False
# Course 0 requires 1, and course 1 requires 0 — cycle!

print(can_finish(4, [[1, 0], [2, 1], [3, 2]]))
# Output: True
# Linear chain: 0 → 1 → 2 → 3

print(can_finish(4, [[1, 0], [2, 1], [3, 2], [0, 3]]))
# Output: False
# Cycle: 0 → 1 → 2 → 3 → 0
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` = numCourses and `E` = number of prerequisites.

**Why?** We build an adjacency list (O(V + E)), then DFS visits each node and edge at most once.

---

## Approach — DFS with 3 Colors

Use the **WHITE / GRAY / BLACK** technique:

1. **Build** an adjacency list from the prerequisites
2. **Initialize** every node as WHITE (unvisited)
3. **DFS** from each WHITE node:
   - Mark it **GRAY** (in progress — on the current path)
   - Visit all neighbors recursively
   - If you hit a **GRAY** node → **cycle found!** Return `False`
   - If BLACK → already done, skip
   - Mark it **BLACK** when all neighbors are explored
4. If no cycles found across all nodes, return `True`

---

## Starter Code

```python
def can_finish(numCourses, prerequisites):
    # Your code here
    pass

# Test your function:
print(can_finish(2, [[1, 0]]))
# Output: True

print(can_finish(2, [[1, 0], [0, 1]]))
# Output: False

print(can_finish(4, [[1, 0], [2, 1], [3, 2]]))
# Output: True

print(can_finish(4, [[1, 0], [2, 1], [3, 2], [0, 3]]))
# Output: False

print(can_finish(5, [[1,0], [2,0], [3,1], [3,2], [4,3]]))
# Output: True
```

---

## Hints

<details>
<summary>💡 Hint 1 — Build the adjacency list</summary>

For each prerequisite `[a, b]` (b must be taken before a), add an edge from `b` to `a`:

```python
adj = {i: [] for i in range(numCourses)}
for a, b in prerequisites:
    adj[b].append(a)
```

This means "after completing b, you can take a".

</details>

<details>
<summary>💡 Hint 2 — Three-color DFS</summary>

Use a dictionary or list to track each node's color:

```python
WHITE, GRAY, BLACK = 0, 1, 2
color = [WHITE] * numCourses
```

- When you **start** visiting a node: `color[node] = GRAY`
- When you **finish** visiting a node and all its neighbors: `color[node] = BLACK`
- If you encounter a **GRAY** neighbor during DFS: that's a back edge → **cycle!**

</details>

<details>
<summary>💡 Hint 3 — Why not just track "visited"?</summary>

A simple visited set isn't enough for directed graphs. Consider:

```
0 → 2
1 → 2
```

If we visit 2 from 0, then visit 2 again from 1, a simple "visited" check would wrongly think there's a cycle. The three-color approach distinguishes between "currently on the path" (GRAY) and "fully explored" (BLACK).

</details>

<details>
<summary>✅ Solution</summary>

```python
def can_finish(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    for a, b in prerequisites:
        adj[b].append(a)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * numCourses

    def has_cycle(node):
        color[node] = GRAY
        for neighbor in adj[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and has_cycle(neighbor):
                return True
        color[node] = BLACK
        return False

    for i in range(numCourses):
        if color[i] == WHITE:
            if has_cycle(i):
                return False
    return True
```

**How it works:**
- `has_cycle(node)` returns `True` if a cycle is reachable from `node`
- We mark nodes GRAY when we enter them and BLACK when we leave
- Hitting a GRAY node means we've found a back edge — the node is an ancestor in the current DFS path, so there's a cycle
- BLACK nodes are safe to skip — they and all their descendants were fully explored with no cycle

</details>

---

## Bonus Challenge 🌟

What if the prerequisites could also have a **self-loop** like `[1, 1]` (course 1 requires itself)? Does your solution handle it? Test it!

```python
print(can_finish(3, [[1, 0], [1, 1], [2, 1]]))
# Output: False (course 1 requires itself — impossible!)
```
