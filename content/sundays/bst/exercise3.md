# Exercise 3: Validate a BST

## Your Task

Write a function `is_valid_bst(root)` that returns `True` if the binary tree is a valid Binary Search Tree, and `False` otherwise.

**BST property (strict):** for every node, all values in its left subtree must be **strictly less than** the node's value, and all values in its right subtree must be **strictly greater than** the node's value.

---

## Examples

```python
#   Valid BST:         Not a valid BST:
#       5                    5
#      / \                  / \
#     3   7                3   7
#    / \                  / \
#   1   4                1   6   ← 6 > 5, violates root constraint
#
print(is_valid_bst(valid_root))     # True
print(is_valid_bst(invalid_root))   # False
```

```python
#   Also invalid (left child > parent):
#       5
#      /
#     7    ← 7 > 5, but it's in the left subtree
print(is_valid_bst(root))   # False
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) — visit every node once |
| **Space** | O(h) — recursion stack |

---

## Approach

A common mistake is to only check that `node.left.val < node.val < node.right.val` at each node locally. This misses the **global** constraint: a node's value must be valid relative to all its ancestors, not just its direct parent.

The correct approach passes **bounds** down the recursion:

- Each node must satisfy `min_val < node.val < max_val`
- When you go left, the current node's value becomes the new upper bound
- When you go right, the current node's value becomes the new lower bound

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    # Your code here
    pass

# Test 1: valid BST
root1 = TreeNode(5)
root1.left = TreeNode(3)
root1.right = TreeNode(7)
root1.left.left = TreeNode(1)
root1.left.right = TreeNode(4)
print(is_valid_bst(root1))   # True

# Test 2: invalid — 6 is in left subtree of 5 but 6 > 5
root2 = TreeNode(5)
root2.left = TreeNode(3)
root2.right = TreeNode(7)
root2.left.left = TreeNode(1)
root2.left.right = TreeNode(6)
print(is_valid_bst(root2))   # False

# Test 3: invalid — left child is greater than parent
root3 = TreeNode(5)
root3.left = TreeNode(7)
print(is_valid_bst(root3))   # False

# Test 4: empty tree is valid
print(is_valid_bst(None))    # True
```

---

## Hints

<details>
<summary>💡 Hint 1 — Why local checks aren't enough</summary>

Consider this tree:

```
    5
   / \
  1   4
     / \
    3   6
```

At node 4: left child (3) < 4, right child (6) > 4 — looks valid locally. But 4 is in the RIGHT subtree of 5, so it must be > 5. It's not. This tree is **invalid**, but local checks would miss it.

</details>

<details>
<summary>💡 Hint 2 — Passing bounds down</summary>

```python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if root is None:
        return True
    if not (min_val < root.val < max_val):
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
```

Going left: the current node's value becomes the new `max_val` (all left descendants must be less than it).
Going right: the current node's value becomes the new `min_val` (all right descendants must be greater).

</details>

<details>
<summary>✅ Solution</summary>

```python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if root is None:
        return True
    if not (min_val < root.val < max_val):
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
```

**Why this works:** Each node carries the accumulated constraints from all its ancestors. A node fails validation the moment it falls outside the allowed range — which catches both direct parent violations and the trickier ancestor violations.

</details>

---

## Bonus Challenge 🌟

Write `fix_bst(root)` for the special case where exactly **two nodes** in an otherwise valid BST have been swapped. Restore the tree without changing its structure.

This is harder — think about what inorder traversal reveals about the swapped pair.
