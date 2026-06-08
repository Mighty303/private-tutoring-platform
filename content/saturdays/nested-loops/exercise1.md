# Exercise 1: Number Grid

Print this grid using nested loops:

```
1 2 3 4
1 2 3 4
1 2 3 4
```

---

## Starter Code

```python
# Print a 3-row, 4-column number grid
# Each row should show: 1 2 3 4

for row in range(___):
    for col in range(___):
        print(___, end=" ")
    print()
```

---

## Hints

<details>
<summary>Hint 1 — How many rows?</summary>

You need 3 rows, so the outer loop should run 3 times: `range(3)`

</details>

<details>
<summary>Hint 2 — What numbers to print?</summary>

Each row prints 1, 2, 3, 4. Use `range(1, 5)` for the inner loop to get those numbers.

</details>

<details>
<summary>Hint 3 — How to stay on the same line?</summary>

Use `print(col, end=" ")` to print on the same line, then `print()` after the inner loop to move to the next line.

</details>

---

## Solution

<details>
<summary>Show Solution</summary>

```python
for row in range(3):
    for col in range(1, 5):
        print(col, end=" ")
    print()
```

**How it works:**
- Outer loop runs 3 times (3 rows)
- Inner loop runs with values 1, 2, 3, 4
- `end=" "` keeps everything on one line
- `print()` moves to the next line after each row

</details>
