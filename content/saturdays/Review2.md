# Python Review Exercises Part 2 🎮

## Exercise 1: VIP Check 🎫
`🔀 Conditionals` `📏 Indentation`

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

## Exercise 2: Backpack Manager 🎒
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

## Exercise 3: Coin Hunt 💰
`🔄 While Loops` `📥 Input` `🔀 Conditionals`

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
120
Done! 120 coins

=== Part B ===
Collect or stop? collect
25 coins
Collect or stop? collect
50 coins
Collect or stop? stop
Final: 50 coins
```

---

## Exercise 4: Top Players 🏆
`🔂 For Loops` `📋 Lists` `➕ Operators`

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

## Exercise 5: Battle Time ⚔️
`⚙️ Functions` `📥 Parameters` `↩️ Return`

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
`🔄 While Loops` `🔀 Conditionals` `📥 Input`

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
