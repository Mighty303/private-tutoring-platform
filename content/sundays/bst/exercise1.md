# Exercise 1: Search in a BST

## Your Task

Write a function `search_bst(root, target)` that searches a **Binary Search Tree** for `target`.

Return the **node** if found, or `None` if it is not in the tree.

**BST property:** for every node, all values in its left subtree are smaller, and all values in its right subtree are larger.

---

## Examples

```python
#       8
#      / \
#     3   10
#    / \    \
#   1   6    14
#      / \
#     4   7

print(search_bst(root, 6).val)    # 6
print(search_bst(root, 14).val)   # 14
print(search_bst(root, 5))        # None
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(h) — h is the height of the tree (O(log n) for balanced BSTs) |
| **Space** | O(1) iterative / O(h) recursive |

---

## Approach

At each node, compare `target` with `node.val`:

1. If `target == node.val` → found, return the node
2. If `target < node.val` → target must be in the left subtree
3. If `target > node.val` → target must be in the right subtree
4. If you reach `None` → target is not in the tree

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root, target):
    # Your code here
    pass

# Build the example BST
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)
root.right.right = TreeNode(14)
root.left.right.left = TreeNode(4)
root.left.right.right = TreeNode(7)

node = search_bst(root, 6)
print(node.val if node else None)    # 6

node = search_bst(root, 14)
print(node.val if node else None)    # 14

node = search_bst(root, 5)
print(node.val if node else None)    # None
```

---

## Hints

<details>
<summary>💡 Hint 1 — Recursive version</summary>

The structure mirrors binary search on a sorted array:

```python
if root is None or root.val == target:
    return root
if target < root.val:
    return search_bst(root.left, target)
else:
    return search_bst(root.right, target)
```

</details>

<details>
<summary>💡 Hint 2 — Iterative version</summary>

Walk down the tree with a pointer instead of recursion:

```python
node = root
while node is not None:
    if target == node.val:
        return node
    elif target < node.val:
        node = node.left
    else:
        node = node.right
return None
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def search_bst(root, target):
    node = root
    while node is not None:
        if target == node.val:
            return node
        elif target < node.val:
            node = node.left
        else:
            node = node.right
    return None
```

**Why this works:** The BST property guarantees that at each node, the target can only be on one side. We never need to check the other subtree, so the search halves the remaining tree at each step — just like binary search on a sorted array.

</details>

---

## Bonus Challenge 🌟

Write `search_path(root, target)` that returns a **list of values** along the search path from root to the target node (inclusive), or an empty list if not found.

```python
print(search_path(root, 4))   # [8, 3, 6, 4]
print(search_path(root, 5))   # []
```
