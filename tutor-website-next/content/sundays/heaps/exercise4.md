# Exercise 4: K Smallest Elements 🔢
`🎯 Functions` `📋 Lists` `🔁 Loops`

**Your Task:**
Write a function `k_smallest(nums, k)` that:
- Returns the k smallest elements from the list
- Returns them in sorted order
- Use a heap!

**Examples:**
```python
print(k_smallest([5, 3, 8, 1, 4, 2, 7], 3))
# Output: [1, 2, 3]

print(k_smallest([10, 20, 30, 40], 2))
# Output: [10, 20]
```

**Hint:** Push all elements into a heap, then pop k times!
