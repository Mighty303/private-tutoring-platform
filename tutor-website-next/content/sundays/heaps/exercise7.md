# Exercise 7: Merge K Sorted Lists 🔗
`🎯 Functions` `📋 Lists` `🔁 Loops`

**Your Task:**
Write a function `merge_k_sorted(lists)` that:
- Takes a list of sorted lists
- Returns one sorted list containing all elements
- Use a heap for efficiency!

**Examples:**
```python
print(merge_k_sorted([[1, 4, 7], [2, 5, 8], [3, 6, 9]]))
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(merge_k_sorted([[1, 3], [2, 4], [0, 5]]))
# Output: [0, 1, 2, 3, 4, 5]
```

**Hint:** Push (value, list_index, element_index) tuples into the heap!
