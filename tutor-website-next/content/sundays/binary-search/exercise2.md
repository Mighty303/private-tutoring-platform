# Exercise 2: First Occurrence

## Your Task

Write a function `first_occurrence(nums, target)` that returns the **leftmost index** of `target` in a sorted list that may contain duplicates.

Return `-1` if `target` is not in the list.

---

## Examples

```python
print(first_occurrence([1, 2, 2, 2, 3, 4], 2))   # 1
print(first_occurrence([1, 2, 2, 2, 3, 4], 3))   # 4
print(first_occurrence([1, 2, 2, 2, 3, 4], 5))   # -1
print(first_occurrence([2, 2, 2, 2, 2], 2))       # 0
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## Approach

Standard binary search finds *a* match — but not necessarily the leftmost one. The trick is to **keep searching left** even after you find a match:

1. Set `lo = 0`, `hi = len(nums) - 1`, `result = -1`
2. While `lo <= hi`:
   - Compute `mid = (lo + hi) // 2`
   - If `nums[mid] == target` → record `result = mid`, then set `hi = mid - 1` to look further left
   - If `nums[mid] < target` → set `lo = mid + 1`
   - If `nums[mid] > target` → set `hi = mid - 1`
3. Return `result`

---

## Starter Code

```python
def first_occurrence(nums, target):
    lo = 0
    hi = len(nums) - 1
    result = -1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            result = mid
            # keep searching left — your code here
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return result

print(first_occurrence([1, 2, 2, 2, 3, 4], 2))   # 1
print(first_occurrence([1, 2, 2, 2, 3, 4], 3))   # 4
print(first_occurrence([1, 2, 2, 2, 3, 4], 5))   # -1
print(first_occurrence([2, 2, 2, 2, 2], 2))       # 0
```

---

## Hints

<details>
<summary>💡 Hint 1 — Don't stop at the first match</summary>

When you find `nums[mid] == target`, record it but don't return yet. Move `hi = mid - 1` to keep looking left — there might be an earlier occurrence.

```python
if nums[mid] == target:
    result = mid
    hi = mid - 1  # squeeze left
```

</details>

<details>
<summary>💡 Hint 2 — Why does this still run in O(log n)?</summary>

Even though you don't stop at the first hit, each iteration still halves the window. The total number of steps is still logarithmic.

</details>

<details>
<summary>✅ Solution</summary>

```python
def first_occurrence(nums, target):
    lo = 0
    hi = len(nums) - 1
    result = -1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            result = mid
            hi = mid - 1
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return result
```

**Why this works:** Every time you hit the target you record the index and shrink the window to the left. The final value of `result` is the smallest index where the target was ever found.

</details>

---

## Bonus Challenge 🌟

Write `last_occurrence(nums, target)` that returns the **rightmost** index instead.

Then use both functions to count how many times `target` appears in the list — in O(log n) time.

```python
nums = [1, 2, 2, 2, 3, 4]
print(last_occurrence(nums, 2))              # 3
print(last_occurrence(nums, 2) - first_occurrence(nums, 2) + 1)  # 3
```
