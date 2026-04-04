# Exercise 4: Path Sum 🎯

## Your Task

Write a function `has_path_sum(root, target)` that returns `True` if the tree has a **root-to-leaf path** where all the values add up to `target`.

A **leaf** is a node with no left or right child.

---

## Examples

```python
#         5
#        / \
#       4   8
#      /   / \
#     11  13   4
#    /  \       \
#   7    2       1

print(has_path_sum(root, 22))  # True  (path: 5 → 4 → 11 → 2)
print(has_path_sum(root, 26))  # True  (path: 5 → 8 → 13)
print(has_path_sum(root, 100)) # False
```

```python
print(has_path_sum(None, 0))  # False
```

```python
#   1
#  / \
# 2   3

print(has_path_sum(root, 1))  # False  (leaf paths are 1+2=3, 1+3=4)
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) — may visit every node |
| **Space** | O(h) — recursion stack depth |

---

## Approach

A clever trick: instead of tracking the running sum, **subtract** the current node's value from the target as you go deeper.

1. **Base case (null):** return `False`
2. **Base case (leaf):** return `True` if `node.val == target` (used up exactly!)
3. Subtract `node.val` from `target`, then check left or right subtree

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target):
    # Your code here
    pass

# Build test tree:
#         5
#        / \
#       4   8
#      /   / \
#     11  13   4
#    /  \       \
#   7    2       1

root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.right.right = TreeNode(1)

print(has_path_sum(root, 22))   # True  (5→4→11→2)
print(has_path_sum(root, 26))   # True  (5→8→13)
print(has_path_sum(root, 100))  # False
print(has_path_sum(None, 0))    # False
```

---

## Hints

<details>
<summary>💡 Hint 1 — Two Base Cases</summary>

You need **two** base cases:
1. `root is None` → return `False` (fell off the tree, never hit a leaf)
2. `root` is a leaf (`root.left is None and root.right is None`) → return `root.val == target`

</details>

<details>
<summary>💡 Hint 2 — Shrinking the Target</summary>

As you walk down, subtract the current node's value from `target`:

```python
# After passing through this node, we need the remaining path
# to sum to (target - root.val)
remaining = target - root.val
return has_path_sum(root.left, remaining) or has_path_sum(root.right, remaining)
```

</details>

<details>
<summary>💡 Hint 3 — How to Check for Leaf</summary>

A leaf node has no children:
```python
is_leaf = root.left is None and root.right is None
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def has_path_sum(root, target):
    if root is None:
        return False

    # At a leaf: check if we've used up exactly the target
    if root.left is None and root.right is None:
        return root.val == target

    # Recurse: subtract current value, check both subtrees
    remaining = target - root.val
    return has_path_sum(root.left, remaining) or has_path_sum(root.right, remaining)
```

**Why this works:** We start with the full target and "spend" each node's value as we go deeper. When we hit a leaf, we check if we've spent exactly the right amount. If either the left or right subtree has a valid path, we return `True`.

</details>

---

## Bonus Challenge 🌟

Instead of just returning `True/False`, return the **actual path** (list of values) if it exists, or `None` if no such path exists.

```python
def path_sum(root, target):
    pass

print(path_sum(root, 22))  # [5, 4, 11, 2]
print(path_sum(root, 100)) # None
```
