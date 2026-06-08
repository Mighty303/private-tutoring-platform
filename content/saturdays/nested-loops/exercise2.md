# Exercise 2: Times Table

Print the full times table for a given number (1 through 12).

**Example for number = 7:**
```
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
7 x 11 = 77
7 x 12 = 84
```

---

## Starter Code

```python
number = 7

for i in range(___):
    print(f"{number} x {i} = {___}")
```

---

## Hints

<details>
<summary>Hint 1 — What range?</summary>

You want `i` to go from 1 to 12. Use `range(1, 13)`.

</details>

<details>
<summary>Hint 2 — What to calculate?</summary>

The result is `number * i`. Use an f-string to format it nicely.

</details>

---

## Bonus Challenge

Print times tables for numbers 1 through 5, with a blank line between each:

```
--- 1 Times Table ---
1 x 1 = 1
1 x 2 = 2
...

--- 2 Times Table ---
2 x 1 = 2
...
```

<details>
<summary>Bonus Hint</summary>

Use a nested loop! Outer loop goes through each number (1-5), inner loop goes 1-12.

</details>

---

## Solution

<details>
<summary>Show Solution</summary>

```python
number = 7

for i in range(1, 13):
    print(f"{number} x {i} = {number * i}")
```

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
for number in range(1, 6):
    print(f"--- {number} Times Table ---")
    for i in range(1, 13):
        print(f"{number} x {i} = {number * i}")
    print()  # Blank line between tables
```

</details>
