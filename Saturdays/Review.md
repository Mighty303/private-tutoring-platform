# Python Review Exercises 🎮
- Hope you had a good winter break

## Exercise 1: Character Stats 🎨
`📦 Variables` `🔄 Type Casting` `📝 Strings`

Create these variables for your Roblox character:
- `name` = your username (string)
- `level` = 5 (integer)
- `health` = 100.0 (float)
- `coins` = 250 (integer)

Then:
1. Print each variable
2. Add 50 to coins
3. Subtract 15.5 from health
4. Print: "**[name]** is level **[level]** with **[health]** HP and **[coins]** coins"

**Example Output:**
```
CoolGamer
5
100.0
250
CoolGamer is level 5 with 84.5 HP and 300 coins
```

---

## Exercise 2: Quick Math ⚡
`➕ Operators`

Calculate and print the answers:

```python
# 1. Complete 3 quests worth 50 XP each
total_xp = 

# 2. Start with 150 health, take 35 damage
health_left = 

# 3. Split 500 coins among 4 players (whole number)
coins_each = 

# 4. You have 25 gems. Need 7 for each craft. How many left over?
leftover = 

# 5. Can you enter? (Need level 10+, you're level 12)
can_enter = 
```

**Example Output:**
```
150
115
125
4
True
```

---

## Exercise 3: Player Sign Up 📝
`📥 Input` `📝 Strings` `🔄 Type Casting`

Ask the user:
1. "Enter username:" (save in variable)
2. "Enter age:" (convert to int)

Then print:
- Username in UPPERCASE
- Username in lowercase
- Length of username
- First letter of username
- A welcome message: "Welcome **[username]**! You are **[age]** years old."

**Example Output:**
```
Enter username: DragonKing
Enter age: 13
Enable notifications? (yes/no): yes

DRAGONKING
dragonking
10
D
Welcome DragonKing! You are 13 years old.
```

---

## Exercise 4: Backpack Manager 🎒
`📋 Lists` `🔂 For Loops`

Start with: `inventory = ["sword", "potion", "shield"]`

Do this in order:
1. Print the inventory
2. Add "helmet" to the end
3. Add "gem" to the beginning
4. Remove "potion"
5. Print the inventory
6. Print: How many items? What's the first item? What's the last item?
7. Use a for loop to print each item numbered (1. gem, 2. sword, etc.)

**Example Output:**
```
['sword', 'potion', 'shield']
['gem', 'sword', 'shield', 'helmet']
4 items
First: gem
Last: helmet
1. gem
2. sword
3. shield
4. helmet
```

---

## Exercise 5: VIP Check 🎫

**Part A:** 
```python
level = 15
has_pass = True
```
If level >= 10 AND has_pass, print "VIP Access!". Otherwise print "Access Denied"

**Part B:**
```python
score = 85
```
Print rank based on score:
- 90+: "A Rank"
- 80-89: "B Rank"  
- 70-79: "C Rank"
- Below 70: "Try Again"

**Part C:**
```python
coins = 120
item_cost = 100
in_shop = True
```
If in_shop is True:
  - If coins >= item_cost: Print "Bought!" and subtract cost from coins
  - Else: Print "Not enough coins!"
Else:
  - Print "Go to shop first!"

**Example Output:**
```
VIP Access!
B Rank
Bought! 20 coins left
```

---

## Exercise 6: Coin Hunt 💰

**Part A:** Start with 0 coins. Use a while loop to add 20 coins at a time until you have 100+. Print coins each time.

**Part B:** Start with 0 coins. Loop forever asking "Collect or stop?". If "collect", add 25 coins. If "stop", break. Print total at the end.

**Example Output:**
```
=== Part A ===
20
40
60
80
100
Done! 100 coins

=== Part B ===
Collect or stop? collect
25 coins
Collect or stop? collect
50 coins
Collect or stop? stop
Final: 50 coins
```

---

## Exercise 7: Top Players 🏆

**Part A:** 
```python
players = ["Steve", "Alex", "Notch", "Jeb", "Dinnerbone"]
```
Use a for loop to print the first 3 players with medals (🥇 🥈 🥉)

**Part B:**
```python
scores = [100, 150, 200, 250, 300]
```
Use a for loop to print each score. Then print the total.

**Part C:** Make a countdown from 5 to 1, then print "GO!"

**Example Output:**
```
=== Top 3 ===
🥇 Steve
🥈 Alex
🥉 Notch

=== Scores ===
100
150
200
250
300
Total: 1000

=== Countdown ===
5
4
3
2
1
GO!
```

---

## Exercise 8: Battle Time ⚔️

**Part A:** Make a function `show_health(name, hp)` that prints "[name] has [hp] HP". Call it 3 times.

**Part B:** Make a function `calc_damage(base, multiplier)` that **returns** base × multiplier. Call it and print the result.

**Part C:** 
```python
player_hp = 100
damage = calc_damage(15, 2)  # Calculate damage
player_hp = player_hp - damage  # Subtract it
show_health("Hero", player_hp)  # Show new health
```

**Example Output:**
```
=== Part A ===
Steve has 100 HP
Alex has 75 HP
Creeper has 20 HP

=== Part B ===
Damage: 30

=== Part C ===
Hero has 70 HP
```

---

## 🎮 BONUS: Simple Battle

Make a battle between Player (100 HP) and Goblin (60 HP).

Use a while loop:
- Print both healths
- Ask "Attack? (yes/no)"
- If yes: Goblin loses 20 HP, then Player loses 10 HP
- If no: break
- Loop until someone reaches 0 HP

Print who wins!

**Example Output:**
```
Player: 100 HP | Goblin: 60 HP
Attack? (yes/no): yes

Player: 90 HP | Goblin: 40 HP
Attack? (yes/no): yes

Player: 80 HP | Goblin: 20 HP
Attack? (yes/no): yes

Player: 70 HP | Goblin: 0 HP
You win!
```
