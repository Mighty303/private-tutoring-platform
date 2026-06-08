# Exercise 1: XP Calculator

## Your Task

In many games, you earn XP (experience points) to level up. Write a function that calculates how much XP you need.

Write a function `xp_needed(level)` that:
- Takes a player's current level
- Returns the XP needed to reach the **next** level
- Formula: `level × 100`

---

## Starter Code

```python
def xp_needed(level):
    # Your code here
    pass

# Test your function:
print(xp_needed(1))   # Should print: 100
print(xp_needed(5))   # Should print: 500
print(xp_needed(10))  # Should print: 1000
```

---

## Hints

<details>
<summary>Hint 1</summary>

You just need one line inside the function — multiply `level` by `100` and return it.

</details>

<details>
<summary>Hint 2</summary>

```python
def xp_needed(level):
    return level * ___
```

</details>

<details>
<summary>Solution</summary>

```python
def xp_needed(level):
    return level * 100
```

</details>

---

## Bonus

Write a second function `xp_message(level)` that **prints** (not returns) a message like:

```
You need 500 XP to reach level 6
```

Use your `xp_needed` function inside it!

<details>
<summary>Bonus Solution</summary>

```python
def xp_message(level):
    xp = xp_needed(level)
    print(f"You need {xp} XP to reach level {level + 1}")
```

</details>
