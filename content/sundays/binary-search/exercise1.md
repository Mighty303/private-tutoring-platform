# Exercise 1: Binary Search

## Your Task

Write a function `binary_search(nums, target)` that searches for `target` in a **sorted** list `nums`.

Return the **index** of `target` if found, or `-1` if it is not in the list.

---

## Examples

```python
print(binary_search([1, 3, 5, 7, 9], 5))   # 2
print(binary_search([1, 3, 5, 7, 9], 7))   # 3
print(binary_search([1, 3, 5, 7, 9], 4))   # -1
print(binary_search([], 1))                 # -1
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(log n) — halve the search space each step |
| **Space** | O(1) — only two pointers |

---

## Approach

Keep two pointers, `lo` and `hi`, that mark the current search window:

1. Set `lo = 0`, `hi = len(nums) - 1`
2. While `lo <= hi`:
   - Compute `mid = (lo + hi) // 2`
   - If `nums[mid] == target` → found, return `mid`
   - If `nums[mid] < target` → target is in the right half, set `lo = mid + 1`
   - If `nums[mid] > target` → target is in the left half, set `hi = mid - 1`
3. Loop ended without a match → return `-1`

---

## Starter Code

```python
def binary_search(nums, target):
    lo = 0
    hi = len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        # Your code here
        pass

    return -1

print(binary_search([1, 3, 5, 7, 9], 5))   # 2
print(binary_search([1, 3, 5, 7, 9], 7))   # 3
print(binary_search([1, 3, 5, 7, 9], 4))   # -1
print(binary_search([], 1))                 # -1
```

---

## Hints

<details>
<summary>💡 Hint 1 — What to do at mid</summary>

Check three cases at `mid`:

```python
if nums[mid] == target:
    return mid
elif nums[mid] < target:
    lo = mid + 1   # target must be to the right
else:
    hi = mid - 1   # target must be to the left
```

</details>

<details>
<summary>💡 Hint 2 — Why lo <= hi?</summary>

The loop condition `lo <= hi` keeps going as long as the search window has at least one element. When `lo > hi` the window is empty and the target cannot exist — return `-1`.

</details>

<details>
<summary>✅ Solution</summary>

```python
def binary_search(nums, target):
    lo = 0
    hi = len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1
```

**Why this works:** Each iteration cuts the remaining search space in half. After at most log₂(n) iterations, either the target is found or the window collapses to nothing.

</details>

---

## Bonus Challenge 🌟

Modify your function to handle a list that is sorted in **descending** order (largest first).

```python
print(binary_search_desc([9, 7, 5, 3, 1], 5))  # 2
print(binary_search_desc([9, 7, 5, 3, 1], 4))  # -1
```
