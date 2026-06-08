# Exercise 3: Search Insert Position

## Your Task

Write a function `search_insert(nums, target)` that returns:

- The **index** of `target` if it exists in the sorted list, or
- The **index where it should be inserted** to keep the list sorted.

You can assume there are no duplicates.

---

## Examples

```python
print(search_insert([1, 3, 5, 6], 5))   # 2  (found at index 2)
print(search_insert([1, 3, 5, 6], 2))   # 1  (insert between 1 and 3)
print(search_insert([1, 3, 5, 6], 7))   # 4  (insert at end)
print(search_insert([1, 3, 5, 6], 0))   # 0  (insert at start)
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## Approach

This is binary search with a twist — instead of returning `-1` on failure, return `lo`.

When the loop ends (`lo > hi`), `lo` is exactly the position where the target *would* go. Think about why:
- Every time the target is too big, you move `lo` up past `mid`
- Every time the target is too small, you move `hi` below `mid`
- When they cross, `lo` is sitting at the first value larger than target — the insertion point

---

## Starter Code

```python
def search_insert(nums, target):
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

    # What should you return here?

print(search_insert([1, 3, 5, 6], 5))   # 2
print(search_insert([1, 3, 5, 6], 2))   # 1
print(search_insert([1, 3, 5, 6], 7))   # 4
print(search_insert([1, 3, 5, 6], 0))   # 0
```

---

## Hints

<details>
<summary>💡 Hint 1 — What is lo when the loop ends?</summary>

Trace through `[1, 3, 5, 6]`, target = `2`:

- lo=0, hi=3, mid=1 → nums[1]=3 > 2 → hi=0
- lo=0, hi=0, mid=0 → nums[0]=1 < 2 → lo=1
- lo=1, hi=0 → loop ends

`lo = 1` — which is exactly where 2 belongs! Return `lo`.

</details>

<details>
<summary>💡 Hint 2 — Edge cases</summary>

- Target smaller than everything → `hi` drops below 0, `lo` stays at 0. Return `lo = 0`. ✓
- Target larger than everything → `lo` rises past the last index. Return `lo = len(nums)`. ✓

</details>

<details>
<summary>✅ Solution</summary>

```python
def search_insert(nums, target):
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

    return lo
```

**Why this works:** Standard binary search, but on failure `lo` has converged to the smallest index whose value exceeds `target` — the correct insertion point.

</details>

---

## Bonus Challenge 🌟

Given a sorted list, write `insert_sorted(nums, target)` that **returns a new list** with `target` inserted at the correct position — without using `list.insert()` or `list.sort()`.

```python
print(insert_sorted([1, 3, 5, 6], 2))   # [1, 2, 3, 5, 6]
print(insert_sorted([1, 3, 5, 6], 7))   # [1, 3, 5, 6, 7]
```
