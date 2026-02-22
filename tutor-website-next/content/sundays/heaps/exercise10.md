# Exercise 10: Kth Largest in a Stream 🌊
`🎯 Functions` `📋 Lists` `🔁 Loops`

**Your Task:**
Write a class `KthLargest` that:
- Is initialized with `k` and an initial list of numbers
- Has an `add(val)` method that adds a number and returns the kth largest

**Examples:**
```python
kl = KthLargest(3, [4, 5, 8, 2])
print(kl.add(3))   # 4 (sorted: [2,3,4,5,8], 3rd largest = 4)
print(kl.add(5))   # 5 (sorted: [2,3,4,5,5,8], 3rd largest = 5)
print(kl.add(10))  # 5 (sorted: [2,3,4,5,5,8,10], 3rd largest = 5)
print(kl.add(9))   # 8 (sorted: [2,3,4,5,5,8,9,10], 3rd largest = 8)
```

**Hint:** Keep a min-heap of size k. The top is always the kth largest!
