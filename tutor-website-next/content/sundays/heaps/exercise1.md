# Exercise 1: Build a Min-Heap 🏗️
`🎯 Functions` `📋 Lists` `🔁 Loops`

**Your Task:**
Write a function `build_min_heap(nums)` that:
- Takes a list of numbers
- Returns a new list that is a valid min-heap
- Do NOT use `heapq` — implement it yourself!

**Examples:**
```python
print(build_min_heap([5, 3, 8, 1, 4]))
# Output: [1, 3, 8, 5, 4] (or any valid min-heap arrangement)

print(build_min_heap([10, 20, 5]))
# Output: [5, 20, 10]
```

**Hint:** Insert elements one by one, bubbling up each time!
