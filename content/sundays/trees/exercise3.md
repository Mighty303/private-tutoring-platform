# Exercise 3: Inorder Traversal 📋

## Your Task

Write a function `inorder(root)` that returns a **list of node values** in inorder order.

**Inorder = Left → Root → Right**

For a Binary Search Tree (BST), this always produces a **sorted list**!

---

## Examples

```python
#       4
#      / \
#     2   6
#    / \ / \
#   1  3 5  7

root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(6)
root.left.left = TreeNode(1)
root.left.right = TreeNode(3)
root.right.left = TreeNode(5)
root.right.right = TreeNode(7)

print(inorder(root))  # [1, 2, 3, 4, 5, 6, 7]
```

```python
#     1
#      \
#       2
#        \
#         3

root = TreeNode(1)
root.right = TreeNode(2)
root.right.right = TreeNode(3)

print(inorder(root))  # [1, 2, 3]
```

```python
print(inorder(None))  # []
```

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    # Your code here
    pass

# Test 1: balanced BST
root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(6)
root.left.left = TreeNode(1)
root.left.right = TreeNode(3)
root.right.left = TreeNode(5)
root.right.right = TreeNode(7)
print(inorder(root))  # [1, 2, 3, 4, 5, 6, 7]

# Test 2: right-skewed
root = TreeNode(1)
root.right = TreeNode(2)
root.right.right = TreeNode(3)
print(inorder(root))  # [1, 2, 3]

# Test 3: empty tree
print(inorder(None))  # []
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) — visit every node once |
| **Space** | O(n) — output list + recursion stack |

---

## Approach

1. **Base case:** if `root` is `None`, return `[]`
2. Recursively collect values from the **left** subtree
3. Add the **current node's value**
4. Recursively collect values from the **right** subtree
5. Return `left_values + [root.val] + right_values`

---

## Hints

<details>
<summary>💡 Hint 1 — The Order Matters</summary>

Inorder visits in this order: **Left, then Root, then Right**.

Think of walking through the tree: always go left as far as possible, visit the node, then go right.

</details>

<details>
<summary>💡 Hint 2 — Building the List</summary>

Recursively build lists for the left and right subtrees, then combine:

```python
left_vals  = inorder(root.left)   # list from left subtree
right_vals = inorder(root.right)  # list from right subtree
# combine: left + current + right
return left_vals + [root.val] + right_vals
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)
```

**Why this works:** Each call to `inorder` returns the sorted sub-list for that subtree. Concatenating left + root + right merges them in sorted order — exactly like merging in merge sort!

</details>

