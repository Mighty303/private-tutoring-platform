# Exercise 2: Bubble Up ⬆️
`🎯 Functions` `📋 Lists` `🔀 Conditionals`

**Your Task:**
Write a function `bubble_up(heap, index)` that:
- Takes a heap (list) and the index of a newly added element
- Moves the element up until the heap property is restored
- Modifies the list in place

**Examples:**
```python
heap = [1, 3, 5, 7, 4, 2]  # 2 was just added at index 5
bubble_up(heap, 5)
print(heap)  # [1, 3, 2, 7, 4, 5]

heap2 = [3, 5, 7, 1]  # 1 was just added at index 3
bubble_up(heap2, 3)
print(heap2)  # [1, 3, 7, 5]
```

**Hint:** Compare with parent at `(i-1)//2`, swap if smaller, repeat!
