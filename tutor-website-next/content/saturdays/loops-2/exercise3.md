# Exercise 7: Loot Filter

You're looting treasure chests in a dungeon. Each item has a name and a gold value. You only want **valuable items** (worth 10 gold or more), and your bag can only hold **50 gold** worth of loot before it's full.

Use `continue` to skip cheap items and `break` to stop when your bag is full.

```python
loot = [("sword", 25), ("potion", 5), ("shield", 30), ("arrow", 3), ("helmet", 20), ("ring", 50)]
bag_limit = 50
```

**Expected output:**
```
Looted sword (25 gold) - Bag: 25/50
Skipped potion (5 gold) - not valuable enough
Bag full! Looted shield but bag is now 55/50
Stopped looting - bag is full!
Total loot: 55 gold (2 items)
```

---

## Requirements

- Use a `for` loop to go through the loot list
- Use `continue` to skip items worth less than 10 gold (print a skip message first)
- Add valuable items to a running total
- After adding an item, check if you've exceeded the bag limit — if so, print the full message and `break`
- Print the final total and item count
- No starter code — write the whole solution yourself!

---

## Hints

<details>
<summary>Hint 1 — Unpacking tuples</summary>

Each item in the loot list is a tuple with two values. You can unpack them in the `for` loop:

```python
for name, value in loot:
```

</details>

<details>
<summary>Hint 2 — Order of checks</summary>

Inside the loop:
1. First check if value < 10 → print skip message → `continue`
2. Add value to your bag total, increment item count
3. Check if bag total >= bag_limit → print full message → `break`
4. Otherwise print the normal loot message

</details>

<details>
<summary>Hint 3 — Watch the print order</summary>

When the bag becomes full, you print a different message than the normal loot message. You'll need an `if/else` after adding the item:

```python
if bag_total >= bag_limit:
    print(f"Bag full! Looted {name} but bag is now {bag_total}/{bag_limit}")
    print("Stopped looting - bag is full!")
    break
else:
    print(f"Looted {name} ({value} gold) - Bag: {bag_total}/{bag_limit}")
```

</details>
