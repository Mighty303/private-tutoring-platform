# Exercise 4: Kth Smallest in a BST

## Your Task

Write a function `kth_smallest(root, k)` that returns the **kth smallest value** in a BST (1-indexed, so `k=1` returns the minimum).

---

## Examples

```python
#       5
#      / \
#     3   6
#    / \
#   2   4
#  /
# 1
# Inorder: [1, 2, 3, 4, 5, 6]

print(kth_smallest(root, 1))   # 1
print(kth_smallest(root, 3))   # 3
print(kth_smallest(root, 6))   # 6
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(h + k) — traverse to the leftmost node, then visit k nodes |
| **Space** | O(h) — recursion stack or explicit stack |

---

## Approach

**Key insight:** Inorder traversal of a BST visits nodes in **sorted ascending order**.

So the kth smallest element is simply the kth value produced by inorder traversal.

Two ways to implement this:

1. **Collect all values** with inorder, then return `values[k-1]`. Simple but O(n) space.
2. **Stop early** — keep a counter and return as soon as you've seen k nodes. O(h) space, stops before visiting the whole tree.

Try the early-stop version.

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root, k):
    # Your code here
    pass

# Build the example tree
root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(6)
root.left.left = TreeNode(2)
root.left.right = TreeNode(4)
root.left.left.left = TreeNode(1)

print(kth_smallest(root, 1))   # 1
print(kth_smallest(root, 3))   # 3
print(kth_smallest(root, 6))   # 6
```

---

## Hints

<details>
<summary>💡 Hint 1 — Simple approach: collect then index</summary>

```python
def kth_smallest(root, k):
    def inorder(node):
        if node is None:
            return []
        return inorder(node.left) + [node.val] + inorder(node.right)
    
    return inorder(root)[k - 1]
```

This works but builds the full list. Can you stop as soon as you've counted k values?

</details>

<details>
<summary>💡 Hint 2 — Early-stop with a counter</summary>

Use a mutable counter (a list with one element, so it can be modified inside the nested function):

```python
count = [0]
result = [None]

def inorder(node):
    if node is None or result[0] is not None:
        return
    inorder(node.left)
    count[0] += 1
    if count[0] == k:
        result[0] = node.val
        return
    inorder(node.right)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def kth_smallest(root, k):
    count = [0]
    result = [None]

    def inorder(node):
        if node is None or result[0] is not None:
            return
        inorder(node.left)
        count[0] += 1
        if count[0] == k:
            result[0] = node.val
            return
        inorder(node.right)

    inorder(root)
    return result[0]
```

**Why this works:** Inorder traversal visits BST nodes smallest-first. The counter tracks how many nodes have been visited. The moment the counter reaches k, we record the current value and stop. We never visit nodes beyond the kth smallest.

</details>

---

## Bonus Challenge 🌟

Write `kth_largest(root, k)` that returns the kth **largest** value.

**Hint:** Reverse inorder traversal visits nodes in descending order (Right → Root → Left).

```python
print(kth_largest(root, 1))   # 6  (largest)
print(kth_largest(root, 2))   # 5
print(kth_largest(root, 3))   # 4
```
