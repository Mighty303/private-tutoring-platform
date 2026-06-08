# Python Heaps Practice 🏔️
## Priority Queues & Heap Data Structure

Welcome! Learn how heaps work — the data structure behind priority queues, scheduling, and finding min/max efficiently!

---

## 🎯 What is a Heap?

**A Heap** is a special tree-based data structure where the parent is always smaller (min-heap) or larger (max-heap) than its children.

**Real-World Examples:**
- 🏥 **Emergency room** — Most critical patients are seen first
- 📋 **Task scheduler** — Highest priority tasks run first
- 🎮 **Leaderboard** — Quickly find top scores
- 📦 **Shipping** — Process urgent packages first

**Key Idea:** Always access the smallest (or largest) element in O(1) time!

---

## 📊 How a Heap is Stored

A heap is a **complete binary tree** stored as a **list/array**!

```
        1           Index:  0
       / \
      3   5         Index:  1, 2
     / \ / \
    7  4 8  6       Index:  3, 4, 5, 6
```

**As a list:** `[1, 3, 5, 7, 4, 8, 6]`

**Parent-Child Relationships (0-indexed):**
```python
parent(i)      = (i - 1) // 2
left_child(i)  = 2 * i + 1
right_child(i) = 2 * i + 2
```

**Example:**
```python
heap = [1, 3, 5, 7, 4, 8, 6]

# Node at index 1 (value 3):
#   Parent: (1-1)//2 = 0 → value 1 ✓ (1 < 3)
#   Left child: 2*1+1 = 3 → value 7
#   Right child: 2*1+2 = 4 → value 4
```

---

## 🔄 Heap Operations Visualized

> 💡 **Try the interactive animation on this page!** Watch how insert and extract work step by step.

### Insert (Push) — Bubble Up ⬆️

When inserting, add to the end and **bubble up** to maintain heap property:

```python
import heapq

heap = [1, 3, 5, 7, 4]
heapq.heappush(heap, 2)
print(heap)  # [1, 3, 2, 7, 4, 5]

# Step by step:
# 1. Add 2 at end:    [1, 3, 5, 7, 4, 2]
# 2. Compare with parent (5): 2 < 5, swap!
#    [1, 3, 2, 7, 4, 5]
# 3. Compare with parent (1): 2 > 1, stop!
```

### Extract Min (Pop) — Bubble Down ⬇️

When removing the min, replace root with last element and **bubble down**:

```python
import heapq

heap = [1, 3, 2, 7, 4, 5]
smallest = heapq.heappop(heap)
print(smallest)  # 1
print(heap)      # [2, 3, 5, 7, 4]

# Step by step:
# 1. Remove root (1), move last (5) to root:
#    [5, 3, 2, 7, 4]
# 2. Compare with children (3, 2): 2 is smallest, swap!
#    [2, 3, 5, 7, 4]
# 3. No more children, stop!
```

---

## 🐍 Python's `heapq` Module

Python has a built-in **min-heap** module!

```python
import heapq

# Create a heap from a list
nums = [5, 3, 8, 1, 4]
heapq.heapify(nums)
print(nums)  # [1, 3, 8, 5, 4]

# Push (insert)
heapq.heappush(nums, 2)
print(nums)  # [1, 3, 2, 5, 4, 8]

# Pop (extract min)
smallest = heapq.heappop(nums)
print(smallest)  # 1

# Peek at min without removing
print(nums[0])  # 2 (just access index 0!)

# Push and pop in one step
result = heapq.heappushpop(nums, 6)
print(result)  # 2 (pushed 6, popped smallest)
```

---

## 🔀 Max-Heap Trick

Python only has min-heap. For max-heap, **negate the values**!

```python
import heapq

# Max-heap using negation
max_heap = []
values = [3, 1, 5, 2, 4]

for val in values:
    heapq.heappush(max_heap, -val)  # Negate!

# Get max value
largest = -heapq.heappop(max_heap)  # Negate back!
print(largest)  # 5
```
