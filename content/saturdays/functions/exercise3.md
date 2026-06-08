# Exercise 3: Item Counter

## Your Task

In a game inventory, you might have a list like `["sword", "potion", "shield", "potion"]`. Write a function that counts how many times a specific item appears.

Write a function `count_item(inventory, item)` that:
- Takes a list of items and the name of an item to search for
- Returns how many times that item appears
- Should be **case-insensitive** — "Sword" and "sword" count as the same thing

---

## Starter Code

```python
def count_item(inventory, item):
    # Your code here
    pass

# Test your function:
backpack = ["sword", "potion", "shield", "potion", "Sword"]

print(count_item(backpack, "potion"))  # Should print: 2
print(count_item(backpack, "sword"))   # Should print: 2
print(count_item(backpack, "bow"))     # Should print: 0
```

---

## Hints

<details>
<summary>Hint 1</summary>

Use a counter variable. Loop through the list and add 1 each time you find a match.

</details>

<details>
<summary>Hint 2</summary>

To compare case-insensitively, convert both strings to lowercase with `.lower()`:

```python
if thing.lower() == item.lower():
```

</details>

<details>
<summary>Solution</summary>

```python
def count_item(inventory, item):
    count = 0
    for thing in inventory:
        if thing.lower() == item.lower():
            count += 1
    return count
```

</details>
