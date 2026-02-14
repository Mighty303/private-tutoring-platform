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

## Exercise 2: Username Validator 👤

**Difficulty:** Easy

Discord and Roblox have rules for usernames. Let's create a username validator!

**Your Task:**
Write a function `is_valid_username(username)` that checks if a username is valid:
- Must be between 3 and 20 characters long
- Cannot contain spaces
- Cannot be empty
- Return `True` if valid, `False` if not

**Examples:**
```python
print(is_valid_username("CoolGamer123"))  # Output: True
print(is_valid_username("ab"))  # Output: False (too short)
print(is_valid_username("Cool Gamer"))  # Output: False (has space)
print(is_valid_username("ThisUsernameIsWayTooLongForAnyone"))  # Output: False (too long)
print(is_valid_username(""))  # Output: False (empty)
```

---

## Exercise 3: Inventory Counter 🎒

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

## Exercise 4: Discord Member Name Filter 💬

**Difficulty:** Medium

You have a list of Discord server members and want to find all members whose names start with a certain letter.

**Your Task:**
Write a function `find_members_by_letter(members, letter)` that:
- Takes a list of member names and a letter
- Returns a new list with only members whose names start with that letter (case-insensitive)
- Keep the original order

**Examples:**
```python
server_members = ["Alex", "Jordan", "Sam", "Riley", "Casey", "Andy"]

a_names = find_members_by_letter(server_members, "A")
print(a_names)  
# Output: ["Alex", "Andy"]

s_names = find_members_by_letter(server_members, "s")
print(s_names)  
# Output: ["Sam"]

z_names = find_members_by_letter(server_members, "Z")
print(z_names)
# Output: []
```

---

## Exercise 5: Message Spam Detector 🚫

**Difficulty:** Medium

Discord bots often need to detect spam. Let's build a simple spam checker!

**Your Task:**
Write a function `is_spam(message)` that returns `True` if a message is spam:
- Message is longer than 100 characters
- Message has 5 or more repeated characters in a row (like "heyyyyy")
- Message is all uppercase and longer than 10 characters
- Otherwise return `False`

**Examples:**
```python
print(is_spam("Hey everyone!"))  # Output: False
print(is_spam("LOOK AT THIS NOW!!!"))  # Output: True (all caps, > 10 chars)
print(is_spam("heyyyyyy there"))  # Output: True (5+ repeated chars)
print(is_spam("a" * 101))  # Output: True (too long)
print(is_spam("HELLO"))  # Output: False (caps but only 5 chars)
```

**Hint:** To check for repeated characters, loop through the string and count consecutive identical characters.

---

## Exercise 6: Simple Command Parser 🤖

**Difficulty:** Medium

Discord bots respond to commands like `!help` or `!ping`. Let's parse simple commands!

**Your Task:**
Write a function `parse_simple_command(message)` that:
- Takes a message string
- If the message starts with `!`, return the command (the word after the `!`)
- If the message doesn't start with `!`, return `None`
- The command is just the first word (ignore everything after the first space)

**Examples:**
```python
print(parse_simple_command("!help"))  
# Output: "help"

print(parse_simple_command("!ping"))  
# Output: "ping"

print(parse_simple_command("!ban @user"))  
# Output: "ban"

print(parse_simple_command("hello everyone"))  
# Output: None

print(parse_simple_command("!"))  
# Output: "" (empty string, but still a command)
```

**Hint:** Use string slicing to check the first character, and use `split()` to separate words!
**Hint 2:** 
```python
Example: 
command = "!run ban all users"
command = command.split() # Output = ["!run", "ban", "all", "users"]
```

---

## 🎓 Challenge: Bot Greeter

**Difficulty:** Hard

Create a bot that greets Discord members differently based on how many messages they've sent!

**Your Task:**
Write a function `greet_member(username, message_count)` that:
- Takes a username and their message count
- Returns a greeting based on their activity:
  - 0 messages: "Welcome, [username]! Send your first message!"
  - 1-10 messages: "Hi [username]! You're new here!"
  - 11-50 messages: "Hey [username]! Good to see you!"
  - 51-100 messages: "Welcome back, [username]! You're a regular!"
  - 101+ messages: "Greetings, [username] the Veteran!"

**Examples:**
```python
print(greet_member("NewUser", 0))
# Output: "Welcome, NewUser! Send your first message!"

print(greet_member("Bob", 5))
# Output: "Hi Bob! You're new here!"

print(greet_member("Alice", 25))
# Output: "Hey Alice! Good to see you!"

print(greet_member("ProUser", 75))
# Output: "Welcome back, ProUser! You're a regular!"

print(greet_member("Veteran99", 250))
# Output: "Greetings, Veteran99 the Veteran!"
```

---

## 📝 Tips for Success

- **Start simple:** If an exercise seems hard, break it into smaller pieces
- **Test as you go:** Don't write everything at once. Test each part.
- **Use print statements:** Add `print()` statements to see what your code is doing
- **Ask for help:** If you're stuck for more than 10 minutes, ask questions!
- **Experiment:** Try changing the examples to see what happens