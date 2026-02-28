# Discord Bot Exercise 2: Dice Roller Bot

Build a dice roller that your Discord bot can use! This is a classic bot command — users type `!roll` and the bot rolls dice for them.

---

## Your Task

Write **three functions** that work together to simulate dice rolling.

### Function 1: `roll_die(sides)`
- Takes the number of sides on a die (e.g. 6 for a standard die)
- **Returns** a random number from 1 to `sides`
- Use `random.randint(1, sides)`

### Function 2: `roll_multiple(sides, count)`
- Takes the number of sides and how many dice to roll
- Uses a **loop** to call `roll_die()` multiple times
- **Returns** a **list** of all the roll results

### Function 3: `format_rolls(rolls)`
- Takes a list of roll results
- **Returns** a formatted string showing each roll and the total
- Format: `Rolls: 3, 5, 1 | Total: 9`

---

## Starter Code

```python
import random

def roll_die(sides):
    # Return a random number from 1 to sides
    pass

def roll_multiple(sides, count):
    # Roll the die 'count' times, collect results in a list
    pass

def format_rolls(rolls):
    # Format the rolls nicely: "Rolls: 3, 5, 1 | Total: 9"
    pass

# Test your functions:
random.seed(42)

single = roll_die(6)
print(f"Single roll: {single}")

rolls = roll_multiple(6, 4)
print(f"Multiple rolls: {rolls}")

print(format_rolls([3, 5, 1, 6]))  # Output: Rolls: 3, 5, 1, 6 | Total: 15
print(format_rolls([20]))  # Output: Rolls: 20 | Total: 20

# Final bot message:
random.seed(99)
my_rolls = roll_multiple(20, 3)
print(f"🎲 Dice Bot 🎲")
print(format_rolls(my_rolls))
```

---

## Expected Output (with seed 42 / 99)

Your exact numbers may differ when you remove the seed, but the format should match:

```
Single roll: 2
Multiple rolls: [1, 1, 6, 6]
Rolls: 3, 5, 1, 6 | Total: 15
Rolls: 20 | Total: 20
🎲 Dice Bot 🎲
Rolls: 5, 1, 9 | Total: 15
```

---

## Hints

<details>
<summary>Hint 1 — roll_die</summary>

One line is all you need:

```python
def roll_die(sides):
    return random.randint(1, sides)
```

</details>

<details>
<summary>Hint 2 — roll_multiple</summary>

Create an empty list, loop `count` times, and append each roll:

```python
results = []
for i in range(count):
    results.append(roll_die(sides))
return results
```

</details>

<details>
<summary>Hint 3 — format_rolls</summary>

To join a list of numbers into a string separated by commas:

```python
roll_str = ", ".join(str(r) for r in rolls)
total = sum(rolls)
return f"Rolls: {roll_str} | Total: {total}"
```

</details>

<details>
<summary>Solution</summary>

```python
import random

def roll_die(sides):
    return random.randint(1, sides)

def roll_multiple(sides, count):
    results = []
    for i in range(count):
        results.append(roll_die(sides))
    return results

def format_rolls(rolls):
    roll_str = ", ".join(str(r) for r in rolls)
    total = sum(rolls)
    return f"Rolls: {roll_str} | Total: {total}"
```

</details>

---

## Topics Practiced

- **Functions calling functions** — `roll_multiple` calls `roll_die`
- **Importing modules** — `import random`
- **Loops** — rolling multiple dice with `for`
- **Lists** — collecting results with `.append()`
- **String methods** — `.join()` to combine items
- **Return values** — each function returns something the next one uses
