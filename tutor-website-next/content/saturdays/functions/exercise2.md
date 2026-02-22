# Exercise 2: Health System

## Your Task

In games, player health goes up (healing) or down (damage) — but it can never go below 0 or above a maximum.

Write a function `update_health(health, change, max_hp)` that:
- Takes the current health, the change (positive = heal, negative = damage), and the max health
- Returns the new health
- Health can't go below **0** or above **max_hp**

---

## Starter Code

```python
def update_health(health, change, max_hp):
    # Your code here
    pass

# Test your function:
print(update_health(50, 20, 100))    # Should print: 70
print(update_health(50, -30, 100))   # Should print: 20
print(update_health(90, 30, 100))    # Should print: 100  (capped!)
print(update_health(10, -50, 100))   # Should print: 0    (can't go negative!)
```

---

## Hints

<details>
<summary>Hint 1</summary>

Start by adding `change` to `health`. Then check if the result is too high or too low.

</details>

<details>
<summary>Hint 2</summary>

```python
new_health = health + change
if new_health > max_hp:
    new_health = max_hp
if new_health < 0:
    new_health = 0
return new_health
```

</details>

<details>
<summary>Solution</summary>

```python
def update_health(health, change, max_hp):
    new_health = health + change
    if new_health > max_hp:
        new_health = max_hp
    if new_health < 0:
        new_health = 0
    return new_health
```

</details>
