# Exercise 4: Count Elements in Range

## Your Task

Write a function `count_in_range(nums, lo, hi)` that counts how many elements in the sorted list `nums` fall within the **inclusive** range `[lo, hi]`.

Your solution must run in **O(log n)** — no linear scan allowed.

---

## Examples

```python
nums = [1, 2, 4, 4, 5, 7, 8]

print(count_in_range(nums, 2, 5))   # 4  (values: 2, 4, 4, 5)
print(count_in_range(nums, 4, 4))   # 2  (both 4s)
print(count_in_range(nums, 6, 9))   # 2  (values: 7, 8)
print(count_in_range(nums, 0, 10))  # 7  (all elements)
print(count_in_range(nums, 9, 10))  # 0  (none)
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(log n) — two binary searches |
| **Space** | O(1) |

---

## Approach

Use two binary search helpers:

- `lower_bound(nums, val)` — returns the first index where `nums[index] >= val`
- `upper_bound(nums, val)` — returns the first index where `nums[index] > val`

Then: `count = upper_bound(nums, hi) - lower_bound(nums, lo)`

---

## Starter Code

```python
def lower_bound(nums, val):
    """First index where nums[index] >= val."""
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < val:
            lo = mid + 1
        else:
            hi = mid
    return lo

def upper_bound(nums, val):
    """First index where nums[index] > val."""
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= val:
            lo = mid + 1
        else:
            hi = mid
    return lo

def count_in_range(nums, lo, hi):
    # Use lower_bound and upper_bound here
    pass

nums = [1, 2, 4, 4, 5, 7, 8]
print(count_in_range(nums, 2, 5))   # 4
print(count_in_range(nums, 4, 4))   # 2
print(count_in_range(nums, 6, 9))   # 2
print(count_in_range(nums, 0, 10))  # 7
print(count_in_range(nums, 9, 10))  # 0
```

---

## Hints

<details>
<summary>💡 Hint 1 — What do lower_bound and upper_bound return?</summary>

For `nums = [1, 2, 4, 4, 5, 7, 8]`:

- `lower_bound(nums, 4)` → `2` (first index ≥ 4)
- `upper_bound(nums, 4)` → `4` (first index > 4)
- Elements in `[4, 4]`: indices 2 and 3 → count = 4 - 2 = **2** ✓

</details>

<details>
<summary>💡 Hint 2 — Why hi = len(nums) instead of len(nums) - 1?</summary>

These are "boundary" searches. If every element is smaller than `val`, the boundary sits just past the end of the list — at index `len(nums)`. Starting with `hi = len(nums)` handles this cleanly.

</details>

<details>
<summary>✅ Solution</summary>

```python
def lower_bound(nums, val):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < val:
            lo = mid + 1
        else:
            hi = mid
    return lo

def upper_bound(nums, val):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= val:
            lo = mid + 1
        else:
            hi = mid
    return lo

def count_in_range(nums, lo, hi):
    return upper_bound(nums, hi) - lower_bound(nums, lo)
```

**Why this works:** `lower_bound(lo)` finds the left fence of the range and `upper_bound(hi)` finds the right fence. Subtracting gives the number of elements strictly between the fences.

</details>

---

## Bonus Challenge 🌟

Use `count_in_range` to find the **median** of a sorted list of integers in O(log n) without accessing indices directly — only using binary search queries.

Hint: binary search on the answer value, not the index.
