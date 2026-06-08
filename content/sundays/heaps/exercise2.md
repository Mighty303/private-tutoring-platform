# Exercise 2: K Smallest Elements 🔢

## Your Task

Write a function `k_smallest(nums, k)` that returns the **k smallest** elements from a list, **in sorted order** (smallest first).

**Use `heapq`!**

---

## Examples

```python
print(k_smallest([5, 3, 8, 1, 4, 2, 7], 3))
# Output: [1, 2, 3]

print(k_smallest([10, 20, 30, 40], 2))
# Output: [10, 20]

print(k_smallest([7, 7, 7, 1], 1))
# Output: [1]
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

Check out `heapq.nsmallest(k, nums)` — it does most of the work!

</details>

<details>
<summary>💡 Hint 2 — Manual approach</summary>

You can also do it manually:
1. Turn the list into a heap with `heapq.heapify()`
2. Pop `k` times with `heapq.heappop()`
3. Collect the results

</details>

<details>
<summary>✅ Solution (one-liner)</summary>

```python
import heapq

def k_smallest(nums, k):
    return heapq.nsmallest(k, nums)
```

</details>

<details>
<summary>✅ Solution (manual)</summary>

```python
import heapq

def k_smallest(nums, k):
    heap = nums[:]          # Copy so we don't modify original
    heapq.heapify(heap)     # Turn into a min-heap: O(n)
    result = []
    for _ in range(k):
        result.append(heapq.heappop(heap))  # Pop smallest each time
    return result
```

**Why this works:** After heapifying, each `heappop` gives you the next smallest element. Pop `k` times and you're done!

</details>

---

## Bonus Challenge 🌟

Now write `k_largest(nums, k)` that returns the k **largest** elements in **descending** order.

```python
print(k_largest([5, 3, 8, 1, 4, 2, 7], 3))
# Output: [8, 7, 5]
```

**Hint:** Try `heapq.nlargest()`, or use the **negate trick** — push `-val` to simulate a max-heap!
