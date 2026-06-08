# Exercise 4: Checkerboard

Create and print a 4×4 checkerboard pattern:

```
B W B W
W B W B
B W B W
W B W B
```

---

## Starter Code

```python
for r in range(4):
    for c in range(4):
        if ___:
            print("B", end=" ")
        else:
            print("W", end=" ")
    print()
```

---

## Hints

<details>
<summary>Hint 1 — Look at the pattern</summary>

Notice that B appears when `(row + col)` is **even**, and W when it's **odd**:
- (0,0) = 0+0 = 0 (even) → B
- (0,1) = 0+1 = 1 (odd) → W
- (1,0) = 1+0 = 1 (odd) → W
- (1,1) = 1+1 = 2 (even) → B

</details>

<details>
<summary>Hint 2 — How to check even/odd?</summary>

Use the modulo operator `%`. A number is even when `number % 2 == 0`.

```python
if (r + c) % 2 == 0:
```

</details>

---

## Bonus Challenge

Make it any size! Ask the user for the number of rows and columns:

```python
rows = int(input("Rows: "))
cols = int(input("Cols: "))
# Print the checkerboard
```

---

## Solution

<details>
<summary>Show Solution</summary>

```python
for r in range(4):
    for c in range(4):
        if (r + c) % 2 == 0:
            print("B", end=" ")
        else:
            print("W", end=" ")
    print()
```

**How it works:**
- For each position, add the row and column numbers
- If the sum is even → print B
- If the sum is odd → print W
- The `% 2 == 0` check tells us if a number is even

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
rows = int(input("Rows: "))
cols = int(input("Cols: "))

for r in range(rows):
    for c in range(cols):
        if (r + c) % 2 == 0:
            print("B", end=" ")
        else:
            print("W", end=" ")
    print()
```

</details>
