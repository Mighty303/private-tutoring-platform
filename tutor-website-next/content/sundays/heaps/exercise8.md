# Exercise 8: Running Median 📈
`🎯 Functions` `📋 Lists` `🔁 Loops`

**Your Task:**
Write a function `running_median(nums)` that:
- Returns a list of medians after each number is added
- Use TWO heaps: a max-heap for the lower half and a min-heap for the upper half

**Examples:**
```python
print(running_median([2, 1, 5, 7, 2, 0, 5]))
# Output: [2, 1.5, 2, 3.5, 2, 2, 2]

# After [2]: median = 2
# After [2,1]: median = 1.5
# After [2,1,5]: median = 2
# After [2,1,5,7]: median = 3.5
# ...
```

**Hint:** Keep the two heaps balanced (same size or differ by 1)!
