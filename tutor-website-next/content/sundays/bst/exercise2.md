# Exercise 2: Insert into a BST

## Your Task

Write a function `insert_bst(root, val)` that inserts `val` into a BST and returns the **root** of the updated tree.

You can assume `val` does not already exist in the tree.

---

## Examples

```python
#   Before:        After inserting 5:
#       8                  8
#      / \                / \
#     3   10             3   10
#    / \                / \
#   1   6              1   6
#                         /
#                        5

root = insert_bst(root, 5)
# inorder should now give [1, 3, 5, 6, 8, 10]
```

```python
# Insert into empty tree
root = insert_bst(None, 7)
print(root.val)  # 7
```

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(h) — walk down to the insertion point |
| **Space** | O(1) iterative / O(h) recursive |

---

## Approach

Walk down the tree the same way as search, but when you reach `None`, that is the insertion point:

1. If `val < node.val` → go left. If left is `None`, insert there.
2. If `val > node.val` → go right. If right is `None`, insert there.
3. Return the original `root` (the structure above the new node is unchanged).

---

## Starter Code

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def insert_bst(root, val):
    # Your code here
    pass

# Test 1: insert into existing tree
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

root = insert_bst(root, 5)
print(inorder(root))   # [1, 3, 5, 6, 8, 10]

root = insert_bst(root, 12)
print(inorder(root))   # [1, 3, 5, 6, 8, 10, 12]

# Test 2: insert into empty tree
root2 = insert_bst(None, 7)
print(root2.val)       # 7
```

---

## Hints

<details>
<summary>💡 Hint 1 — Recursive version</summary>

At each node, decide left or right, and let the recursion handle the rest. The key insight is that the recursive call returns the (possibly new) subtree root, which you assign back:

```python
def insert_bst(root, val):
    if root is None:
        return TreeNode(val)   # insertion point reached
    if val < root.val:
        root.left = insert_bst(root.left, val)
    else:
        root.right = insert_bst(root.right, val)
    return root
```

</details>

<details>
<summary>💡 Hint 2 — Iterative version</summary>

Keep a `parent` pointer so you know where to attach the new node:

```python
if root is None:
    return TreeNode(val)
node = root
while True:
    if val < node.val:
        if node.left is None:
            node.left = TreeNode(val)
            break
        node = node.left
    else:
        if node.right is None:
            node.right = TreeNode(val)
            break
        node = node.right
return root
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def insert_bst(root, val):
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_bst(root.left, val)
    else:
        root.right = insert_bst(root.right, val)
    return root
```

**Why this works:** The recursive call descends until it hits `None` (the gap where the new value belongs) and returns a fresh node. Each frame on the way back up re-assigns `root.left` or `root.right` to stitch the new node in. Because the BST property is maintained at every step, inorder traversal of the result is still sorted.

</details>

---

## Bonus Challenge 🌟

Build a BST from scratch by inserting values one at a time:

```python
values = [5, 3, 7, 1, 4, 6, 8]
root = None
for v in values:
    root = insert_bst(root, v)
print(inorder(root))   # [1, 3, 4, 5, 6, 7, 8]
```

Then try: what happens if you insert values in sorted order `[1, 2, 3, 4, 5]`? Draw the resulting tree and explain why it is slow to search.
