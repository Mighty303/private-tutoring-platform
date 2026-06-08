# Exercise 1: Subsets 📦

## Your Task

Given an array `nums` of **unique integers**, return **all possible subsets** of `nums`.

- The solution set must **not contain duplicate subsets**
- You may return the solution in **any order**

---

## Examples

```python
print(subsets([1, 2, 3]))
# Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

print(subsets([7]))
# Output: [[], [7]]

print(subsets([]))
# Output: [[]]
```

---

## The Pattern

For each element, you have **two choices**:
1. **Include** it in the current subset
2. **Exclude** it

```
                    []
                   /   \
                 [1]    []
                /  \   /  \
            [1,2] [1] [2] []
              |     |   |   |
           [1,2,3] [1,3] [2,3] [3]
```

---

## Hints

<details>
<summary>💡 Hint 1 — Two choices per element</summary>

For each number, either include it or don&apos;t. Build the subset step by step. When you&apos;ve processed all elements, add the current subset to the result.

</details>

<details>
<summary>💡 Hint 2 — Recursive structure</summary>

```python
def backtrack(path, index, nums, result):
    if index == len(nums):
        result.append(path[:])
        return
    # Include nums[index]
    path.append(nums[index])
    backtrack(path, index + 1, nums, result)
    path.pop()
    # Exclude nums[index]
    backtrack(path, index + 1, nums, result)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def subsets(nums):
    result = []

    def backtrack(path, index):
        if index == len(nums):
            result.append(path[:])
            return
        # Include nums[index]
        path.append(nums[index])
        backtrack(path, index + 1)
        path.pop()
        # Exclude nums[index]
        backtrack(path, index + 1)

    backtrack([], 0)
    return result
```

**Time:** O(2^n) — we make 2 choices per element, n elements.
**Space:** O(n) for recursion depth.

</details>

---

## Starter Code

```python
def subsets(nums):
    # Your code here
    pass

# Test your function:
print(subsets([1, 2, 3]))
# Expected: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

print(subsets([7]))
# Expected: [[], [7]]
```

---

## Bonus Challenge 🌟

Solve it using a **for loop** instead of the exclude branch. (Iterate from `start` to end, pick one, recurse with `start = i + 1`, then backtrack.)

```python
def subsets_loop(nums):
    result = []
    def build(path, start):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            build(path, i + 1)
            path.pop()
    build([], 0)
    return result
```

Both approaches work — the first is closer to the "choose / don't choose" pattern; the second is often shorter to write!
