# Exercise 3: Inventory Lister

You have a list of items in your game inventory. Use a `for` loop to print each item with its **position number**.

**Given inventory:**
```python
inventory = ["sword", "shield", "potion", "bow", "helmet"]
```

**Expected output:**
```
1. sword
2. shield
3. potion
4. bow
5. helmet

You have 5 items.
```

---

## Starter Code

```python
inventory = ["sword", "shield", "potion", "bow", "helmet"]

for i in range(___):
    print(f"{}. {inventory[___]}")

print(f"\nYou have {___} items.")
```

---

## Hints

<details>
<summary>Hint 1 — How many times to loop?</summary>

Loop through all items: `range(len(inventory))` gives you indices 0, 1, 2, 3, 4.

</details>

<details>
<summary>Hint 2 — Numbering starts at 1, not 0</summary>

The display number is `i + 1` (since `i` starts at 0), but the list index is just `i`.

```python
print(f"{i + 1}. {inventory[i]}")
```

</details>

<details>
<summary>Hint 3 — Total count</summary>

Use `len(inventory)` to get the number of items.

</details>

