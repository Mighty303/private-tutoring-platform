# Exercise 2: Generate All Sequences 🔢

## Your Task

Write a function `all_sequences(n, k)` that returns all sequences of length `k` where each element is chosen from `1` to `n`. Elements **can repeat**.

Return the sequences in any order.

---

## Examples

```python
print(all_sequences(2, 1))
# Output: [[1], [2]]

print(all_sequences(2, 2))
# Output: [[1, 1], [1, 2], [2, 1], [2, 2]]

print(all_sequences(3, 2))
# Output: [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3]]
```

---

## The Pattern

At each position you **loop through all n choices** and pick one:

```
            []
          / | \
        [1] [2] [3]        ← pick first element
        /|\  /|\  /|\
    [1,1][1,2][1,3] ...    ← pick second element
```

When the sequence reaches length `k`, add it to the result.

---

## Starter Code

```python
def all_sequences(n, k):
    # Your code here
    pass

# Test your function:
print(all_sequences(2, 1))
# Expected: [[1], [2]]

print(all_sequences(2, 2))
# Expected: [[1, 1], [1, 2], [2, 1], [2, 2]]

print(all_sequences(3, 2))
# Expected: [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]

print(all_sequences(2, 3))
# Expected: [[1,1,1],[1,1,2],[1,2,1],[1,2,2],[2,1,1],[2,1,2],[2,2,1],[2,2,2]]
```

---

## Hints

<details>
<summary>💡 Hint 1 — Base case</summary>

When the current path has length `k`, you've filled all positions — add a copy to result and return:

```python
if len(path) == k:
    result.append(path[:])
    return
```

</details>

<details>
<summary>💡 Hint 2 — Loop through all choices</summary>

At each step, try every number from `1` to `n`. After each recursive call, remove the last element to "undo" the choice:

```python
for i in range(1, n + 1):
    path.append(i)
    backtrack(path)
    path.pop()
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def all_sequences(n, k):
    result = []

    def backtrack(path):
        if len(path) == k:
            result.append(path[:])
            return
        for i in range(1, n + 1):
            path.append(i)
            backtrack(path)
            path.pop()

    backtrack([])
    return result
```

**Key difference from Exercise 1:** Instead of two hardcoded choices (`'0'` / `'1'`), we loop through `n` choices. The `path.pop()` after the recursive call is the **backtrack step** — it undoes the choice so the next loop iteration starts fresh.

**Time:** O(n^k) — n choices at each of k steps.
**Space:** O(k) for recursion depth.

</details>
