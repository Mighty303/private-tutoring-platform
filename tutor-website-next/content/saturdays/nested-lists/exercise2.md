# Exercise 2: Find the Largest

Find the largest number in a 2D grid.

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]
```

**Expected output:**
```
The largest number is 9
```

---

## Starter Code

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]

largest = ___

for row in grid:
    for num in row:
        if ___:
            largest = ___

print(f"The largest number is {largest}")
```

---

## Hints

<details>
<summary>Hint 1 — Starting value</summary>

Start with the first element: `largest = grid[0][0]`. This way you're comparing against an actual value from the grid.

</details>

<details>
<summary>Hint 2 — When to update?</summary>

Update `largest` whenever you find a number bigger than the current largest: `if num > largest:`

</details>

<details>
<summary>Hint 3 — Full logic</summary>

```python
largest = grid[0][0]
for row in grid:
    for num in row:
        if num > largest:
            largest = num
```

</details>

---

## Bonus Challenge

Also print **where** the largest number is (its row and column):

```
The largest number is 9 at row 1, col 0
```

<details>
<summary>Bonus Hint</summary>

You'll need to use `range(len(...))` so you know the row and column indices. Save them when you find a new largest.

</details>

---

## Solution

<details>
<summary>Show Solution</summary>

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]

largest = grid[0][0]
for row in grid:
    for num in row:
        if num > largest:
            largest = num

print(f"The largest number is {largest}")
```

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
grid = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 8, 6]
]

largest = grid[0][0]
largest_r = 0
largest_c = 0

for r in range(len(grid)):
    for c in range(len(grid[r])):
        if grid[r][c] > largest:
            largest = grid[r][c]
            largest_r = r
            largest_c = c

print(f"The largest number is {largest} at row {largest_r}, col {largest_c}")
```

</details>
