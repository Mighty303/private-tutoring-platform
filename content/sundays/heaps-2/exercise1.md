# Exercise 1: Top K Frequent Elements 📊

## Your Task

Write a function `top_k_frequent(nums, k)` that returns the **k most frequent elements** from a list of integers.

You may return the answer in **any order**.

---

## Examples

```python
print(top_k_frequent([1,1,1,2,2,3], 2))
# Output: [1, 2]

print(top_k_frequent([1], 1))
# Output: [1]

print(top_k_frequent([4,4,4,6,6,2,2,2,2], 2))
# Output: [2, 4]
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n log k) |
| **Space** | O(n) |

Where `n` is the length of the input list and `k` is the number of top elements.

**Why O(n log k)?** Counting frequencies takes O(n). Then maintaining a heap of size `k` means each push/pop is O(log k), and we do this for each unique element.

---

## Approach

1. **Count** the frequency of each element using a dictionary
2. **Use a min-heap of size k** — push each `(frequency, element)` pair, and pop when size exceeds `k`
3. Whatever remains in the heap are the top k frequent elements

---

## Starter Code

```python
import heapq
from collections import Counter

def top_k_frequent(nums, k):
    # Your code here
    pass

# Test your function:
print(top_k_frequent([1,1,1,2,2,3], 2))
# Output: [1, 2]

print(top_k_frequent([1], 1))
# Output: [1]

print(top_k_frequent([4,4,4,6,6,2,2,2,2], 2))
# Output: [2, 4]
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

Use `Counter(nums)` to build the frequency map. Then you need to find the `k` keys with the highest counts.

</details>

<details>
<summary>💡 Hint 2</summary>

A **min-heap of size k** works well here:
- Push `(count, num)` onto the heap
- If the heap grows larger than `k`, pop the smallest — this removes the least frequent among the current top candidates
- At the end, the heap contains exactly the top `k` frequent elements

</details>

<details>
<summary>💡 Hint 3 — One-liner approach</summary>

`heapq.nlargest(k, counts.keys(), key=counts.get)` does the same thing in one line!

</details>

<details>
<summary>✅ Solution — Min-heap approach</summary>

```python
import heapq
from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    
    return [num for freq, num in heap]
```

**Why this works:** We maintain a min-heap of size `k`. When we push a new element and the heap exceeds size `k`, we pop the smallest frequency. After processing all elements, only the `k` most frequent remain.

**Time:** O(n log k) — n for counting, then at most n push/pop operations each costing O(log k).

**Space:** O(n) — for the frequency map.

</details>

<details>
<summary>✅ Solution — One-liner with nlargest</summary>

```python
import heapq
from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)
```

Simpler, same time complexity internally.

</details>

---

## Bonus Challenge 🌟

What if you needed to return the k **least** frequent elements instead? Modify your solution!

```python
print(top_k_least_frequent([1,1,1,2,2,3], 2))
# Output: [2, 3]  (frequency 2 and 1 — the two least frequent)
```
