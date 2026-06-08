# Exercise 1: Sum Each Row

Given a grid of numbers, print the sum of each row.

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

**Expected output:**
```
Row 0: 6
Row 1: 15
Row 2: 24
```

---

## Starter Code

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for r in range(len(grid)):
    total = ___
    for num in ___:
        total += ___
    print(f"Row {r}: {total}")
```

---

## Hints

<details>
<summary>Hint 1 — Initialize the total</summary>

Start each row's total at 0: `total = 0`

</details>

<details>
<summary>Hint 2 — What to loop over?</summary>

Loop over each number in the current row: `for num in grid[r]:`

</details>

<details>
<summary>Hint 3 — Adding up</summary>

Add each number to the total: `total += num`

</details>

---

## Solution

<details>
<summary>Show Solution</summary>

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for r in range(len(grid)):
    total = 0
    for num in grid[r]:
        total += num
    print(f"Row {r}: {total}")
```

**How it works:**
- Outer loop goes through each row index (0, 1, 2)
- For each row, reset `total` to 0
- Inner loop adds up every number in that row
- Print the row number and its sum

</details>
