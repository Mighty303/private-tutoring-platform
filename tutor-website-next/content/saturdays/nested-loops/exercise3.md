# Exercise 3: Coordinate Pairs

Print all coordinate pairs for a 3×3 grid:

```
(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)
```

---

## Starter Code

```python
# Print all (row, col) pairs for a 3x3 grid

for row in range(___):
    for col in range(___):
        print(f"(___,___)", end=" ")
    print()
```

---

## Hints

<details>
<summary>Hint 1 — What ranges?</summary>

Both the outer and inner loops should go from 0 to 2: `range(3)`

</details>

<details>
<summary>Hint 2 — How to format?</summary>

Use an f-string: `f"({row},{col})"` and print with `end=" "` to stay on the same line.

</details>

---

## Bonus Challenge

Make it work for any size grid! Ask the user for the size:

```python
size = int(input("Grid size: "))
# Print all coordinate pairs for that size
```

---

## Solution

<details>
<summary>Show Solution</summary>

```python
for row in range(3):
    for col in range(3):
        print(f"({row},{col})", end=" ")
    print()
```

</details>

<details>
<summary>Show Bonus Solution</summary>

```python
size = int(input("Grid size: "))

for row in range(size):
    for col in range(size):
        print(f"({row},{col})", end=" ")
    print()
```

</details>
