# Exercise 3: Course Schedule II — Find a Valid Order 📋

## Your Task

There are `numCourses` courses labeled `0` to `numCourses - 1`. You're given `prerequisites` where `prerequisites[i] = [a, b]` means **you must take course `b` before course `a`**.

Return a **valid order** to take all courses. If there are multiple valid orderings, return any one. If it's **impossible** (cycle exists), return an empty list `[]`.

This is [LeetCode 210: Course Schedule II](https://leetcode.com/problems/course-schedule-ii/).

---

## Examples

```python
print(find_order(2, [[1, 0]]))
# Output: [0, 1]

print(find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))
# Output: [0, 1, 2, 3] or [0, 2, 1, 3]

print(find_order(2, [[1, 0], [0, 1]]))
# Output: []  (cycle — impossible)

print(find_order(1, []))
# Output: [0]
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where `V` = numCourses and `E` = number of prerequisites.

---

## Approach — Topological Sort via DFS

A **topological sort** orders nodes so that for every edge `u → v`, `u` comes before `v`. Two common approaches:

### Option A: DFS + Post-order (Reverse Finish Order)

1. Build the adjacency list
2. Run DFS with three-color marking (same as Exercise 2)
3. When a node turns BLACK (fully explored), **add it to a stack**
4. Reverse the stack — that's the topological order!
5. If a cycle is found, return `[]`

### Option B: BFS + In-degree (Kahn's Algorithm)

1. Calculate the **in-degree** of each node
2. Add all nodes with in-degree 0 to a queue
3. Process the queue: for each node, reduce in-degree of its neighbors. If a neighbor hits 0, add it to the queue
4. If all nodes are processed, the processing order is the answer. Otherwise, there's a cycle

---

## Starter Code

```python
def find_order(numCourses, prerequisites):
    # Your code here
    pass

# Test your function:
print(find_order(2, [[1, 0]]))
# Output: [0, 1]

print(find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))
# Output: [0, 1, 2, 3] or [0, 2, 1, 3]

print(find_order(2, [[1, 0], [0, 1]]))
# Output: []

print(find_order(1, []))
# Output: [0]

print(find_order(6, [[1,0], [2,0], [3,1], [3,2], [4,3], [5,4]]))
# Output: [0, 1, 2, 3, 4, 5] or [0, 2, 1, 3, 4, 5]
```

---

## Hints

<details>
<summary>💡 Hint 1 — DFS approach: when to record the order</summary>

When a node turns BLACK (all its descendants are explored), that node can safely go **after** all its dependencies. So add it to your result when it finishes (post-order).

Since deeper nodes finish first, the result is in **reverse** topological order — reverse it at the end!

</details>

<details>
<summary>💡 Hint 2 — Kahn's (BFS) approach: how in-degree helps</summary>

A node with in-degree 0 has **no prerequisites** — it can be taken immediately. Once you "take" a course, reduce the in-degree of courses that depend on it. This mimics removing the node from the graph.

```python
from collections import deque

indegree = [0] * numCourses
for a, b in prerequisites:
    indegree[a] += 1

queue = deque(i for i in range(numCourses) if indegree[i] == 0)
```

</details>

<details>
<summary>💡 Hint 3 — Detecting cycles in Kahn's</summary>

If the queue empties before all nodes are processed, some nodes have a circular dependency and can never reach in-degree 0. Check: `len(order) == numCourses`.

</details>

<details>
<summary>✅ Solution — DFS approach</summary>

```python
def find_order(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    for a, b in prerequisites:
        adj[b].append(a)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * numCourses
    order = []
    has_cycle = False

    def dfs(node):
        nonlocal has_cycle
        if has_cycle:
            return
        color[node] = GRAY
        for neighbor in adj[node]:
            if color[neighbor] == GRAY:
                has_cycle = True
                return
            if color[neighbor] == WHITE:
                dfs(neighbor)
                if has_cycle:
                    return
        color[node] = BLACK
        order.append(node)

    for i in range(numCourses):
        if color[i] == WHITE:
            dfs(i)
            if has_cycle:
                return []

    return order[::-1]
```

**Why reverse?** DFS finishes the deepest nodes first. A course with no dependencies finishes first and gets appended first — but it should appear first in the result. Reversing the post-order gives the correct topological order.

</details>

<details>
<summary>✅ Solution — Kahn's (BFS) approach</summary>

```python
from collections import deque

def find_order(numCourses, prerequisites):
    adj = {i: [] for i in range(numCourses)}
    indegree = [0] * numCourses

    for a, b in prerequisites:
        adj[b].append(a)
        indegree[a] += 1

    queue = deque(i for i in range(numCourses) if indegree[i] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(order) != numCourses:
        return []
    return order
```

**How Kahn's works:**
1. Start with courses that have no prerequisites (in-degree 0)
2. "Take" each one, reducing in-degree of dependent courses
3. When a course's in-degree hits 0, all its prereqs are done — add it to the queue
4. If all courses get processed, we have a valid order. If not, a cycle prevents it.

</details>

---

## Bonus Challenge 🌟

Can you modify your solution to return **all possible valid orderings**? (Warning: this can be exponential — only try for small inputs!)

```python
print(find_all_orders(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))
# Output: [[0, 1, 2, 3], [0, 2, 1, 3]]
```
