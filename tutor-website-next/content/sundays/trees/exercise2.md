# Exercise 2: Count All Nodes 🔢

## Your Task

Write a function `count_nodes(root)` that returns the **total number of nodes** in a binary tree.

---

## Examples

```python
#       1
#      / \
#     2   3
#    / \   \
#   4   5   6

print(count_nodes(root))  # 6
```

```python
#   1

print(count_nodes(TreeNode(1)))  # 1
```

```python
print(count_nodes(None))  # 0
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) — must visit every node |
| **Space** | O(h) — recursion stack depth |

---

## Approach

1. **Base case:** if `root` is `None`, return `0` (no nodes here)
2. Count nodes in the **left** subtree
3. Count nodes in the **right** subtree
4. Return `1 + left_count + right_count` (the `1` is for the current node)

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def count_nodes(root):
    # Your code here
    pass

# Test 1: 6 nodes
root1 = TreeNode(1)
root1.left = TreeNode(2)
root1.right = TreeNode(3)
root1.left.left = TreeNode(4)
root1.left.right = TreeNode(5)
root1.right.right = TreeNode(6)
print(count_nodes(root1))   # 6

# Test 2: single node
print(count_nodes(TreeNode(1)))  # 1

# Test 3: empty
print(count_nodes(None))    # 0

# Test 4: only left children (chain)
root4 = TreeNode(1)
root4.left = TreeNode(2)
root4.left.left = TreeNode(3)
print(count_nodes(root4))   # 3
```

---

## Hints

<details>
<summary>💡 Hint 1 — Think Small</summary>

Before writing code, answer these questions:
- How many nodes are in an empty tree? → `0`
- If I know the count of the left subtree and right subtree, how do I get the total? → add them, plus `1` for root

</details>

<details>
<summary>💡 Hint 2 — Template</summary>

This follows the exact same recursive template as `max_depth`:

```python
def count_nodes(root):
    if root is None:
        return ???
    left  = count_nodes(root.left)
    right = count_nodes(root.right)
    return ???
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def count_nodes(root):
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)
```

**Why this works:** Each node returns "I am 1, plus however many nodes are in my left and right subtrees." Leaf nodes return `1 + 0 + 0 = 1`. The total accumulates up to the root.

</details>

---

## Bonus Challenge 🌟

Count only the **leaf nodes** (nodes with no children).

```python
def count_leaves(root):
    pass

#       1
#      / \
#     2   3
#    / \
#   4   5

print(count_leaves(root))  # 3  (nodes 4, 5, and 3)
```
