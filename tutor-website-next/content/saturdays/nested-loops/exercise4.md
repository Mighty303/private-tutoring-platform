# Exercise 4: Matching Pairs

Given a list of items, print all **unique pairs** (no repeats, no pairing with itself).

```python
items = ["sword", "shield", "potion"]
```

**Expected output:**
```
sword + shield
sword + potion
shield + potion
```

---

## Starter Code

```python
items = ["sword", "shield", "potion"]

for i in range(len(items)):
    for j in range(___):
        print(f"{items[i]} + {items[j]}")
```

---

## Hints

<details>
<summary>Hint 1 — Why not start j at 0?</summary>

If `j` starts at 0, you'd get repeated pairs like "shield + sword" after already printing "sword + shield". Starting `j` later avoids this.

</details>

<details>
<summary>Hint 2 — Where should j start?</summary>

Start the inner loop at `i + 1`. This means j is always *after* i, so you never repeat a pair or pair something with itself.

```python
for j in range(i + 1, len(items)):
```

</details>

<details>
<summary>Hint 3 — Walk through it</summary>

- When `i = 0`: `j` goes 1, 2 → sword+shield, sword+potion
- When `i = 1`: `j` goes 2 → shield+potion
- When `i = 2`: `j` has nothing left → done

3 items = 3 unique pairs!

</details>

---

## Bonus Challenge

Try it with a longer list and count the total number of pairs:

```python
items = ["sword", "shield", "potion", "bow", "staff"]
# How many unique pairs?
```

---

## Solution

<details>
<summary>Show Solution</summary>

```python
items = ["sword", "shield", "potion"]

for i in range(len(items)):
    for j in range(i + 1, len(items)):
        print(f"{items[i]} + {items[j]}")
```

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
items = ["sword", "shield", "potion", "bow", "staff"]
count = 0

for i in range(len(items)):
    for j in range(i + 1, len(items)):
        print(f"{items[i]} + {items[j]}")
        count += 1

print(f"\nTotal unique pairs: {count}")
# 5 items → 10 pairs
```

</details>
