# Exercise 3: Permutations 🔀

## Your Task

Given an array `nums` of **unique integers**, return **all possible permutations** of `nums`.

You may return the answer in **any order**.

---

## Examples

```python
print(permutations([1, 2, 3]))
# Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

print(permutations([7]))
# Output: [[7]]
```

---

## The Pattern

Unlike subsets, **every number must be used exactly once**. At each step, pick one of the **remaining** numbers to add to the path.

- Keep track of which numbers you&apos;ve already used (e.g. a `used` set)
- For each unused number, add it to the path, mark it used, recurse, then backtrack

---

## Hints

<details>
<summary>💡 Hint 1 — Track used numbers</summary>

Use a set (or list) to track which indices you&apos;ve already placed. When the path has length `len(nums)`, you&apos;ve used all numbers — add the path to the result.

</details>

<details>
<summary>💡 Hint 2 — Recursive structure</summary>

```python
def backtrack(path, used, nums, result):
    if len(path) == len(nums):
        result.append(path[:])
        return
    for i in range(len(nums)):
        if i not in used:
            path.append(nums[i])
            used.add(i)
            backtrack(path, used, nums, result)
            path.pop()
            used.remove(i)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def permutations(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if i not in used:
                path.append(nums[i])
                used.add(i)
                backtrack(path, used)
                path.pop()
                used.remove(i)

    backtrack([], set())
    return result
```

**Key insight:** We iterate over indices. Each recursive call tries placing one more number. The `used` set ensures we never pick the same number twice.

</details>

---

## Starter Code

```python
def permutations(nums):
    # Your code here
    pass

# Test your function:
print(permutations([1, 2, 3]))
# Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

print(permutations([7]))
# Expected: [[7]]
```

---

## Bonus Challenge 🌟

Solve it **without a used set** by swapping elements in-place. Swap `nums[start]` with `nums[i]` for each `i >= start`, recurse on `start + 1`, then swap back.
