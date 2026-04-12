# Exercise 1: Maximum Depth of a Binary Tree 📏

## Your Task

Write a function `max_depth(root)` that returns the **maximum depth** (height) of a binary tree.

The depth is the number of nodes along the **longest path** from the root to a leaf node.

---

## Examples

```python
#     3
#    / \
#   9  20
#     /  \
#    15   7

root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20)
root.right.left = TreeNode(15)
root.right.right = TreeNode(7)

print(max_depth(root))  # 3
```

```python
#   1
#    \
#     2

root = TreeNode(1)
root.right = TreeNode(2)

print(max_depth(root))  # 2
```

```python
print(max_depth(None))  # 0
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) — visit every node once |
| **Space** | O(h) — recursion stack, h = height |

---

## Approach

1. **Base case:** if `root` is `None`, return `0`
2. Recursively find the depth of the **left** subtree
3. Recursively find the depth of the **right** subtree
4. Return `1 + max(left_depth, right_depth)`

---

## Hints

<details>
<summary>💡 Hint 1 — Base Case</summary>

What should you return when the node is `None`? An empty tree has no nodes, so its depth is `0`.

```python
if root is None:
    return 0
```

</details>

<details>
<summary>💡 Hint 2 — Recursive Case</summary>

The depth of a tree rooted at `root` is `1` (for the root itself) plus the maximum depth among its children.

```python
left_depth  = max_depth(root.left)
right_depth = max_depth(root.right)
return 1 + max(left_depth, right_depth)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def max_depth(root):
    if root is None:
        return 0
    left_depth  = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)
```

**Why this works:** Every node asks its children "how deep are you?" and adds 1 for itself. Leaf nodes hit the base case (children are `None` → return 0), so a leaf returns `1`. This bubbles up through the tree.

</details>

