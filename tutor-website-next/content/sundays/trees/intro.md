# Binary Trees — Intro & Concepts 🌳

## What is a Binary Tree?

A **binary tree** is a data structure where each node has **at most two children** — a left child and a right child.

```
        1          ← root
       / \
      2   3        ← internal nodes
     / \   \
    4   5   6     ← leaf nodes (no children)
```

---

## The TreeNode Class

In Python, we represent each node as an object:

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val    # the value stored at this node
        self.left  = left   # left child (another TreeNode or None)
        self.right = right  # right child (another TreeNode or None)
```

**Building a tree manually:**

```python
root = TreeNode(1)
root.left  = TreeNode(2)
root.right = TreeNode(3)
root.left.left  = TreeNode(4)
root.left.right = TreeNode(5)
root.right.right = TreeNode(6)
```

This creates the tree shown above!

---

## Key Vocabulary

| Term | Meaning |
|---|---|
| **Root** | The top node (no parent) |
| **Leaf** | A node with no children |
| **Height** | Longest path from root to a leaf |
| **Depth** | Distance from root to a node |
| **Subtree** | A node and all its descendants |

---

## The Big Idea: Recursion on Trees

Almost every tree problem uses **recursion** — because trees are naturally recursive structures.

A tree is either:
1. `None` (empty)
2. A node with a **left subtree** and a **right subtree** (both of which are also trees!)

```python
def solve(node):
    # Base case: empty tree
    if node is None:
        return ...

    # Recursive case: solve for left and right subtrees
    left_result  = solve(node.left)
    right_result = solve(node.right)

    # Combine results with current node
    return ... (use node.val, left_result, right_result)
```

---

## Three Traversal Orders

You can visit all nodes in three classic orders:

```
        1
       / \
      2   3
     / \
    4   5
```

| Traversal | Order | Result |
|---|---|---|
| **Preorder** | Root → Left → Right | `[1, 2, 4, 5, 3]` |
| **Inorder** | Left → Root → Right | `[4, 2, 5, 1, 3]` |
| **Postorder** | Left → Right → Root | `[4, 5, 2, 3, 1]` |

```python
def inorder(node):
    if node is None:
        return []
    return inorder(node.left) + [node.val] + inorder(node.right)
```

> **Note:** For a **Binary Search Tree (BST)**, inorder traversal always gives values in **sorted order**!

---

## Binary Search Tree (BST) Property

A BST is a special binary tree where:
- All values in the **left subtree** are **less than** the node's value
- All values in the **right subtree** are **greater than** the node's value

```
        4
       / \
      2   6
     / \ / \
    1  3 5  7
```

This makes **search O(log n)** on a balanced BST — just like binary search!

---

## Quick Reference

```python
# Height of a tree
def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

# Count all nodes
def count(node):
    if node is None:
        return 0
    return 1 + count(node.left) + count(node.right)

# Check if a value exists (BST)
def search(node, target):
    if node is None:
        return False
    if node.val == target:
        return True
    if target < node.val:
        return search(node.left, target)
    return search(node.right, target)
```
