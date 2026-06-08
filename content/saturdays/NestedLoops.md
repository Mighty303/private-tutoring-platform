# Nested Loops

A **nested loop** is a loop inside another loop. The inner loop runs **completely** for each iteration of the outer loop.

---

## How It Works

```python
for i in range(3):        # Outer loop: runs 3 times
    for j in range(2):    # Inner loop: runs 2 times PER outer iteration
        print(f"i={i}, j={j}")
```

**Output:**
```
i=0, j=0
i=0, j=1
i=1, j=0
i=1, j=1
i=2, j=0
i=2, j=1
```

Think of it like clock hands — the **inner loop is the minute hand** (spins fast) and the **outer loop is the hour hand** (moves after the minute hand completes a full cycle).

---

## Counting Total Iterations

The total number of times the inner code runs = **outer × inner**.

```python
for i in range(4):       # 4 times
    for j in range(3):   # 3 times each
        print("*")       # Runs 4 × 3 = 12 times
```

---

## Common Pattern: Grid / Rectangle

```python
rows = 3
cols = 5

for r in range(rows):
    for c in range(cols):
        print("*", end=" ")
    print()  # New line after each row
```

**Output:**
```
* * * * *
* * * * *
* * * * *
```

The `end=" "` makes `print` stay on the same line. The `print()` after the inner loop moves to the next line.

---

## Common Pattern: Triangle

```python
for i in range(1, 6):
    for j in range(i):
        print("*", end=" ")
    print()
```

**Output:**
```
*
* *
* * *
* * * *
* * * * *
```

The inner loop runs `i` times — so row 1 gets 1 star, row 2 gets 2 stars, etc.

---

## Common Pattern: Multiplication Table

```python
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:4}", end="")
    print()
```

**Output:**
```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

---

## Nested Loop with a List

```python
teams = ["Red", "Blue"]
players = ["Alex", "Sam", "Jordan"]

for team in teams:
    for player in players:
        print(f"{player} joins {team} team")
```

**Output:**
```
Alex joins Red team
Sam joins Red team
Jordan joins Red team
Alex joins Blue team
Sam joins Blue team
Jordan joins Blue team
```

---

## Using `break` in Nested Loops

`break` only exits the **inner** loop, not the outer one:

```python
for i in range(3):
    for j in range(5):
        if j == 2:
            break       # Only breaks the inner loop
        print(f"i={i}, j={j}")
    print(f"--- Done with i={i} ---")
```

**Output:**
```
i=0, j=0
i=0, j=1
--- Done with i=0 ---
i=1, j=0
i=1, j=1
--- Done with i=1 ---
i=2, j=0
i=2, j=1
--- Done with i=2 ---
```

---

## Practice Exercises

### Exercise 1: Number Grid

Print this grid using nested loops:
```
1 2 3 4
1 2 3 4
1 2 3 4
```

<details>
<summary>Solution</summary>

```python
for row in range(3):
    for col in range(1, 5):
        print(col, end=" ")
    print()
```

</details>

### Exercise 2: Times Table

Print the times table for a given number:
```python
# For number = 7:
# 7 x 1 = 7
# 7 x 2 = 14
# ...
# 7 x 12 = 84
```

<details>
<summary>Solution</summary>

```python
number = 7
for i in range(1, 13):
    print(f"{number} x {i} = {number * i}")
```

</details>

### Exercise 3: Coordinate Pairs

Print all coordinate pairs for a 3×3 grid:
```
(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)
```

<details>
<summary>Solution</summary>

```python
for row in range(3):
    for col in range(3):
        print(f"({row},{col})", end=" ")
    print()
```

</details>

### Exercise 4: Matching Pairs

Given a list, print all unique pairs of items:
```python
items = ["sword", "shield", "potion"]
# Output:
# sword + shield
# sword + potion
# shield + potion
```

<details>
<summary>Hint</summary>

Start the inner loop at `i + 1` to avoid repeating pairs.

</details>

<details>
<summary>Solution</summary>

```python
items = ["sword", "shield", "potion"]

for i in range(len(items)):
    for j in range(i + 1, len(items)):
        print(f"{items[i]} + {items[j]}")
```

</details>

---

## Key Takeaways

- Nested loops = **a loop inside a loop**
- Inner loop runs completely for **each** outer iteration
- Total iterations = outer count × inner count
- `break` only exits the **innermost** loop
- Common uses: grids, tables, coordinate pairs, comparing all pairs
