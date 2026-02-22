# Exercise 3: Bubble Down ⬇️
`🎯 Functions` `📋 Lists` `🔀 Conditionals`

**Your Task:**
Write a function `bubble_down(heap, index)` that:
- Takes a heap (list) and the index of an element to move down
- Moves the element down until the heap property is restored
- Modifies the list in place

**Examples:**
```python
heap = [5, 3, 2, 7, 4]  # 5 at root needs to move down
bubble_down(heap, 0)
print(heap)  # [2, 3, 5, 7, 4]
```

**Hint:** Compare with both children, swap with the smaller one!
