# Exercise 4: Task Scheduler ⏰

## The Scenario

You're building a task scheduler for a game server. Tasks arrive with a **priority number** — the **lower the number, the more urgent** the task.

Your job: process all tasks in priority order!

---

## Your Task

Write a function `process_tasks(tasks)` that:
- Takes a list of `(priority, task_name)` tuples
- Returns a list of task names in the order they should be processed (lowest priority number first)
- If two tasks have the same priority, either order is fine

**Use `heapq`!**

---

## Examples

```python
tasks = [(3, "Email"), (1, "Fire"), (2, "Meeting"), (1, "Crash")]
print(process_tasks(tasks))
# Output: ["Crash", "Fire", "Meeting", "Email"]
# (or ["Fire", "Crash", ...] — both priority-1 tasks can go first)

tasks2 = [(5, "Cleanup"), (1, "Critical Bug"), (3, "Feature")]
print(process_tasks(tasks2))
# Output: ["Critical Bug", "Feature", "Cleanup"]
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

When you push a **tuple** into a heap, Python compares by the **first element** (priority number). That's exactly what we want!

</details>

<details>
<summary>💡 Hint 2</summary>

1. Push all `(priority, name)` tuples into a heap
2. Pop them one by one — they come out in priority order
3. Collect just the task names

</details>

<details>
<summary>✅ Solution</summary>

```python
import heapq

def process_tasks(tasks):
    heap = []
    for priority, name in tasks:
        heapq.heappush(heap, (priority, name))
    
    result = []
    while heap:
        priority, name = heapq.heappop(heap)
        result.append(name)
    return result
```

**Why this works:** Tuples are compared element-by-element. Since priority is first, the heap sorts by priority automatically. Lower numbers = higher urgency = popped first! 

</details>

---

## Bonus Challenge 🌟

What if you want **higher** priority numbers to go first? (e.g., priority 5 is more urgent than priority 1)

Modify your function to handle this. (Hint: negate trick again!)

```python
tasks = [(3, "Email"), (5, "Fire"), (2, "Meeting")]
print(process_tasks_max(tasks))
# Output: ["Fire", "Email", "Meeting"]
```
