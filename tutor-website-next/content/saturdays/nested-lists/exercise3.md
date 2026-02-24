# Exercise 3: Count a Value

Count how many times a specific value appears in a 2D grid.

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]
```

**Expected output:**
```
Number of X's: 4
```

---

## Starter Code

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]

count = ___

for row in grid:
    for cell in row:
        if ___:
            count += ___

print(f"Number of X's: {count}")
```

---

## Hints

<details>
<summary>Hint 1 — Initialize the counter</summary>

Start with `count = 0` before the loops.

</details>

<details>
<summary>Hint 2 — What to check?</summary>

Check if each cell equals "X": `if cell == "X":`

</details>

<details>
<summary>Hint 3 — Increment</summary>

Add 1 each time you find an "X": `count += 1`

</details>

---

## Bonus Challenge

Make it work for any value! Ask the user what to search for:

```python
target = input("What to search for? ")
# Count how many times target appears
```

---

## Solution

<details>
<summary>Show Solution</summary>

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]

count = 0
for row in grid:
    for cell in row:
        if cell == "X":
            count += 1

print(f"Number of X's: {count}")
```

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
grid = [
    [".", "X", "."],
    ["X", ".", "X"],
    [".", ".", "X"]
]

target = input("What to search for? ")
count = 0

for row in grid:
    for cell in row:
        if cell == target:
            count += 1

print(f"Number of '{target}': {count}")
```

</details>
