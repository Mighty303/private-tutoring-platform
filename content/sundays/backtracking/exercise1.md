# Exercise 1: Generate All Binary Strings 🧩

## Your Task

Write a function `binary_strings(n)` that returns all binary strings of length `n`.

A binary string only uses the characters `'0'` and `'1'`. Return the strings in any order.

---

## Examples

```python
print(binary_strings(1))
# Output: ['0', '1']

print(binary_strings(2))
# Output: ['00', '01', '10', '11']

print(binary_strings(3))
# Output: ['000', '001', '010', '011', '100', '101', '110', '111']
```

---

## The Pattern

At each position you make **one choice**: place a `'0'` or a `'1'`.

```
              ""
            /    \
          "0"    "1"
          / \    / \
       "00" "01" "10" "11"
```

When the string reaches length `n`, add it to the result.

---

## Starter Code

```python
def binary_strings(n):
    # Your code here
    pass

# Test your function:
print(binary_strings(1))
# Expected: ['0', '1']

print(binary_strings(2))
# Expected: ['00', '01', '10', '11']

print(binary_strings(3))
# Expected: ['000', '001', '010', '011', '100', '101', '110', '111']
```

---

## Hints

<details>
<summary>💡 Hint 1 — Base case</summary>

When the current string `current` has length `n`, you're done building it — add it to the result and return:

```python
if len(current) == n:
    result.append(current)
    return
```

</details>

<details>
<summary>💡 Hint 2 — Two choices</summary>

At each step, try adding `'0'` and try adding `'1'`. After each recursive call, nothing needs to be "undone" because strings are immutable — each call gets its own copy.

```python
backtrack(current + '0')
backtrack(current + '1')
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def binary_strings(n):
    result = []

    def backtrack(current):
        if len(current) == n:
            result.append(current)
            return
        backtrack(current + '0')
        backtrack(current + '1')

    backtrack('')
    return result
```

**Why strings instead of lists?** Since strings are immutable, `current + '0'` creates a new string — so there's no need to manually "undo" the choice after the recursive call. This makes the code simpler for this problem.

**Time:** O(2^n) — two choices at each of n steps.
**Space:** O(n) for recursion depth.

</details>
