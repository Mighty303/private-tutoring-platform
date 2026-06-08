# Exercise 3: Sort Using a Heap 📊

## Your Task

Write a function `heap_sort(nums)` that **sorts a list in ascending order** using only heap operations.

**Rules:**
- ✅ Use `heapq`
- ❌ Do NOT use `.sort()` or `sorted()`

---

## Examples

```python
print(heap_sort([5, 3, 8, 1, 4, 2, 7]))
# Output: [1, 2, 3, 4, 5, 7, 8]

print(heap_sort([10, 1, 10, 1]))
# Output: [1, 1, 10, 10]

print(heap_sort([42]))
# Output: [42]
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

A min-heap always pops the smallest element. If you keep popping until it's empty, what order do the elements come out in?

</details>

<details>
<summary>💡 Hint 2 — Step by step</summary>

1. Copy the list (so you don't destroy the original)
2. `heapq.heapify()` the copy — this is O(n)
3. Pop all elements one by one into a result list
4. Return the result

</details>

<details>
<summary>✅ Solution</summary>

```python
import heapq

def heap_sort(nums):
    heap = nums[:]
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(len(heap))]
```

**Why this works:** `heapify` arranges the list so the smallest is at the front. Each `heappop` removes the smallest remaining element, so you get everything in sorted order!

**Time:** O(n log n) — same as regular sort, but now you understand *why* it works! 🧠

</details>

---

## Bonus Challenge 🌟

Sort in **descending** order using a heap. (Hint: negate trick!)

```python
print(heap_sort_desc([5, 3, 8, 1, 4]))
# Output: [8, 5, 4, 3, 1]
```
