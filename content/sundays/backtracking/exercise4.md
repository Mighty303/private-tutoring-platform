# Exercise 2: Combination Sum 🎯

## Your Task

You are given an array of **distinct integers** `nums` and a **target** integer. Return all **unique combinations** of numbers from `nums` that sum to `target`.

- The **same number may be chosen unlimited times**
- Two combinations are the same if the **frequency** of each chosen number is the same
- Return combinations in any order; numbers within each combination can be in any order

---

## Examples

```python
print(combination_sum([2, 5, 6, 9], 9))
# Output: [[2, 2, 5], [9]]
# Explanation: 2+2+5=9, or 9=9

print(combination_sum([3, 4, 5], 16))
# Output: [[3, 3, 3, 3, 4], [3, 3, 5, 5], [4, 4, 4, 4], [3, 4, 4, 5]]

print(combination_sum([3], 5))
# Output: []
```

---

## The Pattern

For each index, you can:
1. **Include** `nums[i]` (and possibly include it again — stay at index `i`)
2. **Skip** `nums[i]` (move to index `i + 1`)

To avoid duplicate combinations like `[2,5,2]` vs `[2,2,5]`, only consider numbers **from the current index onward**. When you pick `nums[i]`, recurse starting at `i` again (to allow reuse). When you skip, move to `i + 1`.

---

## Hints

<details>
<summary>💡 Hint 1 — Base cases</summary>

- If `target == 0`: you found a valid combination — add `path[:]` to the result
- If `target < 0`: stop — this path overshoots
- If `start >= len(nums)`: no more numbers to try

</details>

<details>
<summary>💡 Hint 2 — Recursive structure</summary>

```python
def backtrack(path, start, target, nums, result):
    if target == 0:
        result.append(path[:])
        return
    if target < 0 or start >= len(nums):
        return
    # Include nums[start] (can reuse!)
    path.append(nums[start])
    backtrack(path, start, target - nums[start], nums, result)
    path.pop()
    # Skip nums[start]
    backtrack(path, start + 1, target, nums, result)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def combination_sum(nums, target):
    result = []

    def backtrack(path, start, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0 or start >= len(nums):
            return
        # Include nums[start] — stay at start to allow reuse
        path.append(nums[start])
        backtrack(path, start, remaining - nums[start])
        path.pop()
        # Skip nums[start]
        backtrack(path, start + 1, remaining)

    backtrack([], 0, target)
    return result
```

**Key insight:** Passing `start` (not `start + 1`) when we include allows reusing the same number. Passing `start + 1` when we skip avoids duplicate combinations.

</details>

---

## Starter Code

```python
def combination_sum(nums, target):
    # Your code here
    pass

# Test your function:
print(combination_sum([2, 5, 6, 9], 9))
# Expected: [[2, 2, 5], [9]]

print(combination_sum([3, 4, 5], 16))
# Expected: [[3, 3, 3, 3, 4], [3, 3, 5, 5], [4, 4, 4, 4], [3, 4, 4, 5]]

print(combination_sum([3], 5))
# Expected: []
```

---

## Bonus Challenge 🌟

What if each number could only be used **once**? (Classic "Combination Sum II" — no reuse.)

**Hint:** When you include `nums[i]`, recurse with `start = i + 1` instead of `start = i`.
