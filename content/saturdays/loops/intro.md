# Loops — How They Work

A **loop** repeats a block of code multiple times. Python has two main types: `for` loops and `while` loops.

---

## The `for` Loop

Use `for` when you know **how many times** to repeat.

```python
for i in range(5):
    print(i)
```

**Output:**
```
0
1
2
3
4
```

`range(5)` gives you the numbers 0, 1, 2, 3, 4. The variable `i` takes each value, one at a time.

---

## `range()` Explained

| Code | Numbers produced |
|------|-----------------|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 |

Two forms:
- `range(stop)` — starts at 0, goes up to (but not including) stop
- `range(start, stop)` — starts at start, goes up to stop

---

## Looping Over a List

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")
```

**Output:**
```
I like apple
I like banana
I like cherry
```

The variable `fruit` takes each item in the list, one at a time.

---

## The `while` Loop

Use `while` when you want to repeat **until a condition becomes False**.

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

**Output:**
```
0
1
2
3
4
```

**Be careful:** if the condition never becomes False, you get an infinite loop!

---

## Accumulator Pattern

A very common pattern — start with a variable and build it up inside a loop:

```python
total = 0
for i in range(1, 11):
    total += i

print(total)  # 55
```

This adds 1 + 2 + 3 + ... + 10 = 55.

---

## `break` and `continue`

- `break` — **exits** the loop immediately
- `continue` — **skips** to the next iteration

```python
for i in range(10):
    if i == 5:
        break
    print(i)
# Prints: 0 1 2 3 4
```

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
# Prints: 0 1 3 4
```

---

## `for` vs `while` — When to Use Which?

| Use `for` when... | Use `while` when... |
|---|---|
| You know the number of iterations | You don't know when to stop |
| Looping over a list or range | Waiting for user input |
| Counting from A to B | Running until a condition is met |

---

## Key Takeaways

- `for` loops repeat a known number of times
- `while` loops repeat until a condition is False
- `range(n)` gives you numbers 0 to n-1
- You can loop over lists directly with `for item in list:`
- `break` exits, `continue` skips
- The accumulator pattern builds up a value over many iterations
