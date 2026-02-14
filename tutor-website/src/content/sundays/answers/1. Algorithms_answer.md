# Python Algorithm Practice - Solutions 🔑

Complete solutions with explanations for all exercises.

---

## Exercise 0: Find Maximum

```python
def find_maximum(numbers):
    # Handle edge case of empty list
    if len(numbers) == 0:
        return None  # or raise an error
    
    # Start with first element as maximum
    max_val = numbers[0]
    
    # Compare with each element
    for num in numbers:
        if num > max_val:
            max_val = num
    
    return max_val

# Test cases
print(find_maximum([3, 7, 2, 9, 1]))     # Output: 9
print(find_maximum([-5, -2, -10, -1]))   # Output: -1
print(find_maximum([42]))                 # Output: 42
```

**Explanation:** We initialize `max_val` with the first element, then scan through the list comparing each element. If we find a larger value, we update `max_val`. Time complexity: O(n).

---

## Exercise 1: Maximum of Two Arrays

```python
def compare_array_maxes(array1, array2):
    # Find maximum of each array
    max1 = array1[0]
    for num in array1:
        if num > max1:
            max1 = num
    
    max2 = array2[0]
    for num in array2:
        if num > max2:
            max2 = num
    
    # Compare and return result
    if max1 > max2:
        return "First"
    elif max2 > max1:
        return "Second"
    else:
        return "Tie"

# Test cases
print(compare_array_maxes([1, 5, 3], [2, 4, 6]))      # Output: "Second"
print(compare_array_maxes([10, 2, 8], [3, 9, 5]))     # Output: "First"
print(compare_array_maxes([7, 3], [5, 7]))            # Output: "Tie"
print(compare_array_maxes([-1, -5], [-2, -3]))        # Output: "Second"
```

**Explanation:** We find the maximum of each array separately using the same scanning technique, then compare the two maximums.

---

## Exercise 2: Second Largest Number

```python
def find_second_largest(numbers):
    # Initialize first and second largest
    if numbers[0] > numbers[1]:
        largest = numbers[0]
        second = numbers[1]
    else:
        largest = numbers[1]
        second = numbers[0]
    
    # Scan through remaining elements
    for i in range(2, len(numbers)):
        num = numbers[i]
        if num > largest:
            # New largest found, old largest becomes second
            second = largest
            largest = num
        elif num > second:
            # New second largest found
            second = num
    
    return second

# Test cases
print(find_second_largest([3, 7, 2, 9, 1]))      # Output: 7
print(find_second_largest([5, 5, 5, 5]))         # Output: 5
print(find_second_largest([10, 10, 9, 8]))       # Output: 10
print(find_second_largest([-3, -1, -5, -2]))     # Output: -2
```

**Explanation:** We track both the largest and second largest values. When we find a new largest, the old largest becomes second largest. When we find something larger than second but not largest, we update second.

---

## Exercise 3: Count Above Average

```python
def count_above_average(numbers):
    # First pass: calculate average
    total = 0
    for num in numbers:
        total += num
    average = total / len(numbers)
    
    # Second pass: count numbers above average
    count = 0
    for num in numbers:
        if num > average:
            count += 1
    
    return count

# Test cases
print(count_above_average([1, 2, 3, 4, 5]))          # Output: 2
print(count_above_average([10, 10, 10, 10]))         # Output: 0
print(count_above_average([5, 1, 9, 3, 7]))          # Output: 2
print(count_above_average([2, 8, 4, 6]))             # Output: 2
```

**Explanation:** This requires two passes. First, we calculate the sum and divide by count to get average. Second, we count how many numbers exceed this average.

---

## Exercise 4: Find Missing Number

```python
def find_missing(numbers):
    # Calculate what the sum should be
    n = len(numbers) + 1  # Total numbers including missing one
    expected_sum = n * (n + 1) // 2
    
    # Calculate actual sum
    actual_sum = 0
    for num in numbers:
        actual_sum += num
    
    # The difference is the missing number
    return expected_sum - actual_sum

# Test cases
print(find_missing([1, 2, 4, 5, 6]))        # Output: 3
print(find_missing([2, 3, 1, 5]))           # Output: 4
print(find_missing([1, 3, 2, 5, 6, 7, 8]))  # Output: 4
```

**Explanation:** We use the formula for sum of 1 to N: N×(N+1)÷2. The missing number is the difference between expected sum and actual sum. This is O(n) time and O(1) space.

---

## Exercise 5: Longest Increasing Sequence

```python
def longest_increasing(numbers):
    if len(numbers) == 0:
        return 0
    
    max_length = 1  # At least one element
    current_length = 1
    
    for i in range(1, len(numbers)):
        if numbers[i] > numbers[i - 1]:
            # Continue the streak
            current_length += 1
            if current_length > max_length:
                max_length = current_length
        else:
            # Streak broken, reset
            current_length = 1
    
    return max_length

# Test cases
print(longest_increasing([1, 2, 3, 2, 3, 4, 5]))     # Output: 4
print(longest_increasing([5, 4, 3, 2, 1]))           # Output: 1
print(longest_increasing([1, 3, 2, 4, 5, 3, 6, 7]))  # Output: 3
print(longest_increasing([1, 1, 1, 1]))              # Output: 1
```

**Explanation:** We track the current streak and the maximum streak seen. When numbers increase, we extend the current streak. When they don't, we reset to 1.

---

## Exercise 6: Two Sum Problem

### Solution 1: Nested Loops (Simple)
```python
def find_two_sum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i, j]
    return []

# Test cases
print(find_two_sum([2, 7, 11, 15], 9))      # Output: [0, 1]
print(find_two_sum([3, 2, 4], 6))           # Output: [1, 2]
print(find_two_sum([3, 3], 6))              # Output: [0, 1]
print(find_two_sum([1, 2, 3], 7))           # Output: []
```

**Time Complexity:** O(n²)

### Solution 2: Dictionary (Optimized)
```python
def find_two_sum(numbers, target):
    seen = {}  # Dictionary to store {value: index}
    
    for i in range(len(numbers)):
        complement = target - numbers[i]
        if complement in seen:
            return [seen[complement], i]
        seen[numbers[i]] = i
    
    return []

# Test cases
print(find_two_sum([2, 7, 11, 15], 9))      # Output: [0, 1]
print(find_two_sum([3, 2, 4], 6))           # Output: [1, 2]
print(find_two_sum([3, 3], 6))              # Output: [0, 1]
print(find_two_sum([1, 2, 3], 7))           # Output: []
```

**Time Complexity:** O(n)

**Explanation:** The optimized solution uses a dictionary to remember values we've seen. For each number, we check if its complement (target - number) exists in the dictionary.

---

## Exercise 7: Peak Finder

```python
def find_all_peaks(numbers):
    peaks = []
    
    # Check elements from index 1 to len-2 (must have two neighbors)
    for i in range(1, len(numbers) - 1):
        if numbers[i] > numbers[i - 1] and numbers[i] > numbers[i + 1]:
            peaks.append(i)
    
    return peaks

# Test cases
print(find_all_peaks([1, 3, 2, 4, 1]))           # Output: [1, 3]
print(find_all_peaks([1, 2, 3, 4, 5]))           # Output: []
print(find_all_peaks([5, 4, 3, 2, 1]))           # Output: []
print(find_all_peaks([1, 5, 2, 3, 1, 4, 2]))     # Output: [1, 3, 5]
```

**Explanation:** We loop through indices 1 to len-2 (skipping first and last). For each element, we check if it's greater than both its left and right neighbors. If so, it's a peak.

---

## Challenge: Subarray with Target Sum

```python
def find_subarray_sum(numbers, target):
    start = 0
    current_sum = 0
    
    for end in range(len(numbers)):
        # Add current element to sum
        current_sum += numbers[end]
        
        # Shrink window from left while sum is too large
        while current_sum > target and start <= end:
            current_sum -= numbers[start]
            start += 1
        
        # Check if we found the target
        if current_sum == target:
            return (start, end)
    
    return None

# Test cases
print(find_subarray_sum([1, 2, 3, 4, 5], 9))
# Output: (1, 3)

print(find_subarray_sum([1, 4, 20, 3, 10, 5], 33))
# Output: (2, 4)

print(find_subarray_sum([1, 4, 0, 0, 3, 10, 5], 7))
# Output: (1, 4)

print(find_subarray_sum([1, 2, 3], 10))
# Output: None
```

**Explanation:** This uses the "sliding window" technique:
1. Start with `start=0` and expand `end` to the right
2. Add elements to `current_sum` as we expand
3. If sum exceeds target, shrink from left by moving `start` forward
4. If sum equals target, we found our answer!

**Time Complexity:** O(n) - each element is visited at most twice (once by end, once by start)

**Why it works:** Since all numbers are positive, adding a number increases the sum and removing decreases it. This property allows us to efficiently adjust the window.

---

## 🎯 Key Takeaways

1. **Scanning patterns** work for finding max, min, or tracking values (O(n))
2. **Two passes** are needed when you need to calculate something first (like average)
3. **Mathematical formulas** can solve problems elegantly (like missing number)
4. **Tracking state** (like current/max streak) solves sequence problems
5. **Dictionaries** can optimize searches from O(n²) to O(n)
6. **Sliding window** efficiently handles subarray problems

Practice these patterns - they appear frequently in CCC!