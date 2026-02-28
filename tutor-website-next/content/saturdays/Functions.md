# Python Practice Exercises 🐍

Welcome! These exercises will help you practice variables, conditionals, loops, lists, strings, and functions by building game features and Discord bot commands.

---

## 📖 Function Review

Functions are reusable blocks of code that can take inputs (parameters) and optionally give back outputs (return values).

### Functions WITHOUT Return (Just Do Something)
```python
def greet_player(name):
    print(f"Welcome, {name}!")

greet_player("Steve")  # Prints: Welcome, Steve!
# This function just prints, it doesn't give us back any value
```

### Functions WITH Return (Give Back a Value)
```python
def calculate_damage(base_damage, multiplier):
    total = base_damage * multiplier
    return total

damage = calculate_damage(10, 2)  # damage is now 20
print(damage)  # Prints: 20
# This function calculates AND gives back the result
```

### Key Difference
- **No return:** Function does something (like print), but you can't save or use the result
- **With return:** Function gives back a value you can save in a variable or use elsewhere

---

## 🎯 How to Approach Each Problem

Before you start coding, follow these steps:

1. **Read the problem carefully** - What are the inputs? What should the output be?
2. **Plan your solution** - Write down the steps in plain English (pseudocode)
3. **Break it down** - What variables do you need? What loops? What conditions?
4. **Then code** - Turn your plan into Python code
5. **Test it** - Try the examples given and create your own test cases

---

## 📚 Model Problem: Team Selector (EXAMPLE)

Let's walk through one complete problem together to see how to think before coding.

**Problem:**
Write a function `select_team(all_players, team_size)` that takes a list of player names and selects the first `team_size` players for a team. Return the selected team as a list and print how many players are waiting.

**Example:**
```python
select_team(["Alex", "Jordan", "Sam", "Riley", "Casey"], 3)
# Output: ["Alex", "Jordan", "Sam"]
# Prints: "2 players waiting"
```

### Step 1: Understand the Problem
- **Input:** A list of names, and a number (how many to select)
- **Output:** A list of selected players
- **Side effect:** Print how many aren't selected

### Step 2: Plan the Solution (Pseudocode)
```
1. Take the first team_size players from the list (use slicing!)
2. Calculate how many players are left (total - team_size)
3. Print the waiting message
4. Return the selected team
```

### Step 3: Break It Down
- **Variable for selected team:** Use slicing `all_players[:team_size]`
- **Variable for waiting:** `len(all_players) - team_size`
- **Print statement:** Use the waiting count variable
- **Return:** The sliced list

### Step 4: Write the Code
```python
def select_team(all_players, team_size):
    # Select the first team_size players
    team = all_players[:team_size]
    
    # Calculate how many are waiting
    waiting = len(all_players) - team_size
    
    # Print the message
    print(f"{waiting} players waiting")
    
    # Return the team
    return team
```

### Step 5: Test It
```python
result = select_team(["Alex", "Jordan", "Sam", "Riley", "Casey"], 3)
print(result)  # Should print: ["Alex", "Jordan", "Sam"]
# Should also print: "2 players waiting"
```

**Now try the exercises below using this same process!**

---

## Exercise 0: Warm Up - XP Calculator 🌟

**Difficulty:** Easy

Let's practice functions with a simple XP (experience points) calculator for a game.

**Your Task:**
Write a function `calculate_xp(level)` that:
- Takes a player's level as input
- Returns the XP needed to reach the next level
- Formula: XP needed = level × 100

**Examples:**
```python
xp = calculate_xp(1)
print(xp)  # Output: 100

xp = calculate_xp(5)
print(xp)  # Output: 500

xp = calculate_xp(10)
print(xp)  # Output: 1000
```

**Bonus:** Write another function `print_xp_message(level)` that prints "You need [XP] XP to reach level [next_level]" but doesn't return anything.

---

## Exercise 1: Player Health System 🎮

**Difficulty:** Easy

In many games, players have health that can increase or decrease. Create a function that manages player health.

**Your Task:**
Write a function `update_health(current_health, change, max_health)` that:
- Takes the player's current health, the change amount (positive for healing, negative for damage), and maximum health
- Returns the new health value
- Health cannot go below 0 or above max_health

**Examples:**
```python
print(update_health(50, 20, 100))  # Output: 70
print(update_health(50, -30, 100))  # Output: 20
print(update_health(90, 30, 100))  # Output: 100 (capped at max)
print(update_health(10, -50, 100))  # Output: 0 (can't go negative)
```

---

## Exercise 2: Inventory Counter 🎒

**Difficulty:** Easy-Medium

In games like Roblox, players collect items. Let's count how many of each item they have!

**Your Task:**
Write a function `count_items(inventory, item_name)` that:
- Takes a list of item names and a specific item to count
- Returns how many times that item appears in the inventory
- Should be case-insensitive (treat "Sword" and "sword" as the same)

**Examples:**
```python
backpack = ["sword", "potion", "shield", "potion", "Sword", "gem"]

print(count_items(backpack, "potion"))  # Output: 2
print(count_items(backpack, "sword"))  # Output: 2
print(count_items(backpack, "bow"))  # Output: 0
```

---

## Exercise 3: Shop Calculator 🛒

**Difficulty:** Medium

Build a function for a Roblox shop that calculates the total cost of buying multiple items, with a bulk discount.

**Your Task:**
Write a function `shop_total(price, quantity)` that:
- Takes the price of one item and how many the player wants to buy
- Returns the total cost
- If buying **5 or more**, apply a **10% discount** to the total

**Examples:**
```python
print(shop_total(100, 3))   # Output: 300
print(shop_total(100, 5))   # Output: 450.0  (10% off 500)
print(shop_total(200, 10))  # Output: 1800.0 (10% off 2000)
print(shop_total(50, 1))    # Output: 50
```

**Bonus:** Write another function `receipt(item_name, price, quantity)` that **prints** a receipt and uses your `shop_total` function inside it!

---

## 📝 Tips for Success

- **Start simple:** If an exercise seems hard, break it into smaller pieces
- **Test as you go:** Don't write everything at once. Test each part.
- **Use print statements:** Add `print()` statements to see what your code is doing
- **Ask for help:** If you're stuck for more than 10 minutes, ask questions!
- **Experiment:** Try changing the examples to see what happens