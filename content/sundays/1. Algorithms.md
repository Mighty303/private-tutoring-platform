# Python Algorithm Practice - Waterloo CCC Prep 🏆

Welcome! These exercises will develop your algorithmic thinking and problem-solving skills for competitive programming. Focus on understanding the logic before coding!

---

## 📖 Algorithmic Thinking Review

Competitive programming requires breaking complex problems into simple, logical steps. The key is recognizing patterns and choosing efficient approaches.

### Common Problem-Solving Patterns

**Pattern 1: Scanning/Traversal**
```python
# Finding maximum by scanning through data
def find_max(numbers):
    max_val = numbers[0]  # Start with first element
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val
```

**Pattern 2: Accumulation**
```python
# Building up a result as you go
def sum_even_numbers(numbers):
    total = 0
    for num in numbers:
        if num % 2 == 0:
            total += num
    return total
```

**Pattern 3: Two-Pointer/Comparison**
```python
# Comparing elements from different positions
def find_pairs_with_sum(numbers, target):
    pairs = []
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                pairs.append((numbers[i], numbers[j]))
    return pairs
```

### Key Difference: Efficiency Matters
In competitive programming, not just correctness but also **speed** matters. Think about:
- How many times does your loop run?
- Can you solve it with one pass through the data?
- Do you need nested loops or can you avoid them?

---

## 🎯 How to Approach CCC-Style Problems

1. **Read carefully** - Identify inputs, outputs, and constraints
2. **Work through examples by hand** - Trace the logic step-by-step
3. **Identify the pattern** - Is it searching? Counting? Comparing?
4. **Consider edge cases** - Empty lists? Negative numbers? Ties?
5. **Plan your algorithm** - Write pseudocode first
6. **Code and test** - Start with simple cases, then try complex ones

---

## 📚 Model Problem: Maximum Difference (EXAMPLE)

Let's solve a complete CCC-style problem together.

**Problem:**
Write a function `max_difference(numbers)` that finds the maximum difference between any two numbers in a list, where the larger number comes AFTER the smaller number in the list. Return the maximum difference. If no valid difference exists, return 0.

**Example:**
```python
max_difference([7, 1, 5, 3, 6, 4])
# Output: 5 (buy at 1, sell at 6)

max_difference([7, 6, 4, 3, 1])
# Output: 0 (prices only decrease)
```

### Step 1: Understand the Problem
- **Input:** A list of numbers
- **Output:** Maximum difference where larger number appears after smaller
- **Key constraint:** Order matters! Can't use future values for past positions

### Step 2: Work Through Example by Hand
```
[7, 1, 5, 3, 6, 4]

- At 7: no previous numbers, skip
- At 1: 1-7 = -6 (negative, not helpful)
- At 5: 5-1 = 4 ✓
- At 3: 3-1 = 2
- At 6: 6-1 = 5 ✓ (best so far!)
- At 4: 4-1 = 3

Maximum difference = 5
```

### Step 3: Identify the Pattern
This is a **scanning pattern** where we:
1. Track the minimum value seen so far
2. At each position, calculate difference from that minimum
3. Update the maximum difference found

### Step 4: Plan the Algorithm (Pseudocode)
```
1. Initialize min_so_far to first element
2. Initialize max_diff to 0
3. For each number in the list:
   - Calculate difference = current number - min_so_far
   - If difference > max_diff, update max_diff
   - If current number < min_so_far, update min_so_far
4. Return max_diff
```

### Step 5: Write the Code
```python
def max_difference(numbers):
    if len(numbers) < 2:
        return 0
    
    min_so_far = numbers[0]
    max_diff = 0
    
    for num in numbers:
        # Check if current difference is better
        diff = num - min_so_far
        if diff > max_diff:
            max_diff = diff
        
        # Update minimum if we found a smaller number
        if num < min_so_far:
            min_so_far = num
    
    return max_diff
```

### Step 6: Test It
```python
print(max_difference([7, 1, 5, 3, 6, 4]))  # Output: 5
print(max_difference([7, 6, 4, 3, 1]))     # Output: 0
print(max_difference([1, 2, 3, 4, 5]))     # Output: 4
```

**Now use this systematic approach for the exercises below!**

---

## Exercise 0: Warm Up - Find Maximum 🔍

**Difficulty:** Easy

**Your Task:**
Write a function `find_maximum(numbers)` that:
- Takes a list of integers
- Returns the largest number in the list
- You CANNOT use Python's built-in `max()` function

**Examples:**
```python
print(find_maximum([3, 7, 2, 9, 1]))     # Output: 9
print(find_maximum([-5, -2, -10, -1]))   # Output: -1
print(find_maximum([42]))                 # Output: 42
```

**Challenge:** What happens with an empty list? How should you handle it?

---

## Exercise 1: Maximum of Two Arrays 📊

**Difficulty:** Easy

**Your Task:**
Write a function `compare_array_maxes(array1, array2)` that:
- Takes two lists of integers
- Finds the maximum value in each array
- Returns a string: "First" if array1's max is larger, "Second" if array2's max is larger, or "Tie" if they're equal

**Examples:**
```python
print(compare_array_maxes([1, 5, 3], [2, 4, 6]))      # Output: "Second"
print(compare_array_maxes([10, 2, 8], [3, 9, 5]))     # Output: "First"
print(compare_array_maxes([7, 3], [5, 7]))            # Output: "Tie"
print(compare_array_maxes([-1, -5], [-2, -3]))        # Output: "Second"
```

---

## Exercise 2: Second Largest Number 🥈

**Difficulty:** Medium

**Your Task:**
Write a function `find_second_largest(numbers)` that:
- Takes a list of integers (at least 2 elements)
- Returns the second largest number
- If all numbers are the same, return that number

**Examples:**
```python
print(find_second_largest([3, 7, 2, 9, 1]))      # Output: 7
print(find_second_largest([5, 5, 5, 5]))         # Output: 5
print(find_second_largest([10, 10, 9, 8]))       # Output: 10
print(find_second_largest([-3, -1, -5, -2]))     # Output: -2
```

**Hint:** You'll need to track TWO values as you scan through the list!

---

## Exercise 3: Count Above Average 📈

**Difficulty:** Medium

**Your Task:**
Write a function `count_above_average(numbers)` that:
- Takes a list of numbers
- Calculates the average of all numbers
- Returns how many numbers are strictly greater than the average

**Examples:**
```python
print(count_above_average([1, 2, 3, 4, 5]))          # Output: 2
# Average = 3, numbers above: 4, 5

print(count_above_average([10, 10, 10, 10]))         # Output: 0
# Average = 10, no numbers above 10

print(count_above_average([5, 1, 9, 3, 7]))          # Output: 2
# Average = 5, numbers above: 9, 7

print(count_above_average([2, 8, 4, 6]))             # Output: 2
# Average = 5, numbers above: 8, 6
```

**Tip:** This requires TWO passes through the data - first to calculate average, second to count!

---

## Exercise 4: Find Missing Number 🔢

**Difficulty:** Medium

**Your Task:**
Write a function `find_missing(numbers)` that:
- Takes a list of integers from 1 to N with exactly one number missing
- Returns the missing number
- The list is NOT sorted

**Examples:**
```python
print(find_missing([1, 2, 4, 5, 6]))        # Output: 3
print(find_missing([2, 3, 1, 5]))           # Output: 4
print(find_missing([1, 3, 2, 5, 6, 7, 8]))  # Output: 4
```

**Hint:** Think about what the sum SHOULD be versus what it actually is!
- Sum of 1 to N = N × (N + 1) ÷ 2

---

## Exercise 5: Longest Increasing Sequence 📏

**Difficulty:** Medium-Hard

**Your Task:**
Write a function `longest_increasing(numbers)` that:
- Takes a list of integers
- Returns the length of the longest consecutive increasing subsequence
- Numbers must be strictly increasing (each number larger than the previous)

**Examples:**
```python
print(longest_increasing([1, 2, 3, 2, 3, 4, 5]))     # Output: 4
# [2, 3, 4, 5] is longest

print(longest_increasing([5, 4, 3, 2, 1]))           # Output: 1
# No increasing sequence, each element counts as 1

print(longest_increasing([1, 3, 2, 4, 5, 3, 6, 7]))  # Output: 3
# [2, 4, 5] or [3, 6, 7]

print(longest_increasing([1, 1, 1, 1]))              # Output: 1
# No strictly increasing
```

**Hint:** Track the current streak length and the maximum streak seen so far!

---

## Exercise 6: Two Sum Problem 🎯

**Difficulty:** Medium-Hard

**Your Task:**
Write a function `find_two_sum(numbers, target)` that:
- Takes a list of integers and a target sum
- Returns a list of TWO indices where those numbers add up to the target
- If multiple pairs exist, return any valid pair
- If no pair exists, return an empty list

**Examples:**
```python
print(find_two_sum([2, 7, 11, 15], 9))      # Output: [0, 1]
# numbers[0] + numbers[1] = 2 + 7 = 9

print(find_two_sum([3, 2, 4], 6))           # Output: [1, 2]
# numbers[1] + numbers[2] = 2 + 4 = 6

print(find_two_sum([3, 3], 6))              # Output: [0, 1]
# numbers[0] + numbers[1] = 3 + 3 = 6

print(find_two_sum([1, 2, 3], 7))           # Output: []
# No pair adds to 7
```

**Hint:** You can use nested loops, or for extra challenge, try using a dictionary to solve in one pass!

---

## Exercise 7: Peak Finder 🏔️

**Difficulty:** Hard

**Your Task:**
Write a function `find_all_peaks(numbers)` that:
- Takes a list of integers
- Returns a list of indices where "peaks" occur
- A peak is a number that is greater than both its neighbors
- First and last elements are NOT considered peaks (they don't have two neighbors)

**Examples:**
```python
print(find_all_peaks([1, 3, 2, 4, 1]))           # Output: [1, 3]
# Index 1: 3 > 1 and 3 > 2 ✓
# Index 3: 4 > 2 and 4 > 1 ✓

print(find_all_peaks([1, 2, 3, 4, 5]))           # Output: []
# No peaks (always increasing)

print(find_all_peaks([5, 4, 3, 2, 1]))           # Output: []
# No peaks (always decreasing)

print(find_all_peaks([1, 5, 2, 3, 1, 4, 2]))     # Output: [1, 3, 5]
# Peaks at indices 1 (5), 3 (3), and 5 (4)
```

**Hint:** Loop from index 1 to len(numbers)-2 and check both neighbors!

---

## 🎓 Challenge: Subarray with Target Sum

**Difficulty:** Very Hard (Junior CCC Level)

**Your Task:**
Write a function `find_subarray_sum(numbers, target)` that:
- Takes a list of positive integers and a target sum
- Finds a continuous subarray that sums to the target
- Returns the start and end indices (inclusive) as a tuple
- If no subarray exists, return `None`
- If multiple subarrays exist, return any valid one

**Examples:**
```python
print(find_subarray_sum([1, 2, 3, 4, 5], 9))
# Output: (1, 3)
# numbers[1:4] = [2, 3, 4], sum = 9

print(find_subarray_sum([1, 4, 20, 3, 10, 5], 33))
# Output: (2, 4)
# numbers[2:5] = [20, 3, 10], sum = 33

print(find_subarray_sum([1, 4, 0, 0, 3, 10, 5], 7))
# Output: (1, 4)
# numbers[1:5] = [4, 0, 0, 3], sum = 7

print(find_subarray_sum([1, 2, 3], 10))
# Output: None
# No subarray sums to 10
```

**Hint:** Use a "sliding window" approach - maintain a running sum and adjust the window start/end positions!

**Algorithm idea:**
```
1. Use two pointers: start and end
2. Keep a running sum
3. If sum < target, expand window (move end forward)
4. If sum > target, shrink window (move start forward)
5. If sum == target, return the indices!
```

---

## 📝 CCC Success Tips

- **Read the problem 3 times** - Miss one detail and your solution fails
- **Test edge cases** - Empty lists, single elements, all same values, negative numbers
- **Trace by hand first** - Don't code until you understand the pattern
- **Start simple** - Get a working solution first, optimize later
- **Use meaningful variable names** - `max_so_far` is better than `m`
- **Comment your logic** - Helps you debug and explains your thinking
- **Time yourself** - CCC problems have time limits, practice working efficiently

**Remember:** Every expert was once a beginner. Keep practicing! 🚀


