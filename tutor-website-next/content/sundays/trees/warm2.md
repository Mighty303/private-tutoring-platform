# Exercise: Search for a Value

## Your Task

Write a function `has_value(root, target)` that returns `True` if `target` exists **anywhere** in the binary tree, or `False` if it doesn't.

---

## Examples

```python
#       1
#      / \
#     2   3
#    / \
#   4   5

print(has_value(root, 4))   # True
print(has_value(root, 3))   # True
print(has_value(root, 99))  # False
```

```python
print(has_value(None, 5))   # False
```

---

## Approach

1. **Base case:** if `root` is `None`, the value is not here — return `False`
2. **Match:** if `root.val == target`, we found it — return `True`
3. Otherwise, search the **left** subtree, then the **right** subtree
4. Return `True` if it was found in either side

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_value(root, target):
    # Your code here
    pass

# Test 1: value exists
root1 = TreeNode(1)
root1.left = TreeNode(2)
root1.right = TreeNode(3)
root1.left.left = TreeNode(4)
root1.left.right = TreeNode(5)
print(has_value(root1, 4))    # True
print(has_value(root1, 3))    # True
print(has_value(root1, 99))   # False

# Test 2: empty tree
print(has_value(None, 5))     # False

# Test 3: single node
print(has_value(TreeNode(7), 7))   # True
print(has_value(TreeNode(7), 0))   # False
```

---

## Hints

<details>
<summary>💡 Hint 1 — Base Cases</summary>

There are two base cases to handle before recursing:

```python
if root is None:
    return False        # ran off the tree — not found
if root.val == target:
    return True         # found it!
```

</details>

<details>
<summary>💡 Hint 2 — Recursive Case</summary>

If the current node isn't the target, check both subtrees. The value is in this tree if it's in the **left OR right** subtree.

```python
return has_value(root.left, target) or has_value(root.right, target)
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def has_value(root, target):
    if root is None:
        return False
    if root.val == target:
        return True
    return has_value(root.left, target) or has_value(root.right, target)
```

**Why this works:** We check the current node first. If it's not a match, we ask: "Is it in my left subtree OR my right subtree?" If either side says `True`, the whole call returns `True`. If both sides reach `None` without finding it, they return `False`, and `False or False` = `False`.

</details>

---

## Bonus Challenge 🌟

Write `find_all(root, target)` that returns a **count** of how many times `target` appears in the tree (a value could appear in multiple nodes).

```python
#     5
#    / \
#   3   5
#      / \
#     2   5

print(find_all(root, 5))  # 3
print(find_all(root, 3))  # 1
```
