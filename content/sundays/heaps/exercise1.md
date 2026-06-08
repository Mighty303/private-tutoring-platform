# Exercise 1: Find the 3rd Largest Element 🥉

## Your Task

Write a function `third_largest(nums)` that returns the **3rd largest** element in a list.

**Use `heapq`!**

---

## Examples

```python
print(third_largest([5, 3, 8, 1, 4, 2, 7]))
# Output: 5

print(third_largest([10, 20, 30]))
# Output: 10

print(third_largest([1, 1, 2, 3, 4]))
# Output: 2
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

`heapq.nlargest(k, nums)` returns the k largest elements in descending order.

</details>

<details>
<summary>💡 Hint 2</summary>

The 3rd largest is the **last element** of `heapq.nlargest(3, nums)`.

</details>

<details>
<summary>✅ Solution</summary>

```python
import heapq

def third_largest(nums):
    return heapq.nlargest(3, nums)[-1]
```

**Why this works:** `heapq.nlargest(3, nums)` gives you `[largest, 2nd, 3rd]`. The last item `[-1]` is the 3rd largest!

</details>

---

## Bonus Challenge 🌟

What if the list has fewer than 3 elements? Modify your function to return `None` in that case.

```python
print(third_largest([5, 2]))
# Output: None
```
