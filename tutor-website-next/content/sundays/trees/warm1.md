# Exercise: Collect All Values

## Your Task

Write a function `get_values(root)` that returns a **list of all node values** in the tree, visited in **preorder** order: root first, then left subtree, then right subtree.

---

## Examples

```python
#       1
#      / \
#     2   3
#    / \
#   4   5

print(get_values(root))  # [1, 2, 4, 5, 3]
```

```python
#   7
#    \
#     9

print(get_values(root))  # [7, 9]
```

```python
print(get_values(None))  # []
```

---

## Approach

This is almost identical to the `inorder` example from the intro — just change the order:

- **Preorder:** `[root.val]` + left values + right values

1. **Base case:** if `root` is `None`, return an empty list `[]`
2. Collect all values from the **left** subtree
3. Collect all values from the **right** subtree
4. Return `[root.val] + left_values + right_values`

---

## Hints

<details>
<summary>💡 Hint 1 — Base Case</summary>

What do you return when the tree is empty? There are no values to collect, so return an empty list.

```python
if root is None:
    return []
```

</details>

<details>
<summary>💡 Hint 2 — Build the List</summary>

After collecting the left and right values recursively, put them together with the current node's value first.

```python
left_vals  = get_values(root.left)
right_vals = get_values(root.right)
return [root.val] + left_vals + right_vals
```

</details>

<details>
<summary>✅ Solution</summary>

```python
def get_values(root):
    if root is None:
        return []
    left_vals  = get_values(root.left)
    right_vals = get_values(root.right)
    return [root.val] + left_vals + right_vals
```

**Why this works:** Each node returns a list starting with itself, followed by everything in its left subtree, then everything in its right subtree. Leaf nodes return `[leaf.val] + [] + []` = `[leaf.val]`. These lists get joined as the recursion unwinds.

</details>

