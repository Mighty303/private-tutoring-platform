# Python Homework: Dictionaries 📚

## Exercise 1: Game Character (Teacher Example) 👤
`📖 Dictionaries` `🔑 Keys & Values`

**Part A:** Create a dictionary called `hero` with these keys and values:
- "name": "Link"
- "hearts": 3
- "rupees": 100
- "weapon": "sword"

Print the entire dictionary.

**Part B:** Print individual values:
- Print the hero's name
- Print how many hearts they have
- Print how many rupees they have

**Part C:** Update the dictionary:
- Add 2 to hearts (hero found a heart container!)
- Subtract 50 from rupees (hero bought something)
- Change weapon to "master sword"
- Print the updated dictionary

**Example Output:**
```
=== Part A ===
{'name': 'Link', 'hearts': 3, 'rupees': 100, 'weapon': 'sword'}

=== Part B ===
Name: Link
Hearts: 3
Rupees: 100

=== Part C ===
{'name': 'Link', 'hearts': 5, 'rupees': 50, 'weapon': 'master sword'}
```

---

## Exercise 2: Pet Stats 🐱
`📖 Dictionaries` `🔑 Keys & Values`

**Part A:** Create a dictionary called `pet` with:
- "name": your choice
- "type": "cat" or "dog" or any animal
- "age": any number
- "hunger": 50

Print the dictionary.

**Part B:** Print a sentence using the values:
"[name] is a [age] year old [type]"

**Part C:** 
- Increase hunger by 20
- Add a new key "happy" with value True
- Print the updated dictionary

**Example Output:**
```
=== Part A ===
{'name': 'Whiskers', 'type': 'cat', 'age': 3, 'hunger': 50}

=== Part B ===
Whiskers is a 3 year old cat

=== Part C ===
{'name': 'Whiskers', 'type': 'cat', 'age': 3, 'hunger': 70, 'happy': True}
```

---

## Exercise 3: High Scores 🏆
`📖 Dictionaries` `🔂 For Loops`

**Part A:** Create a dictionary called `scores` with:
- "Alice": 250
- "Bob": 180
- "Charlie": 320
- "Diana": 200

**Part B:** Use a for loop to print each player and their score:
"[player]: [score] points"

**Part C:** Find and print the highest score (you can do this manually by looking at the values - no need for max() function)

**Example Output:**
```
=== Part A & B ===
Alice: 250 points
Bob: 180 points
Charlie: 320 points
Diana: 200 points

=== Part C ===
Highest score: 320
```

---

## 🎮 MINI PROJECT: Item Shop 🛒
`📖 Dictionaries` `🔂 For Loops` `📥 Input` `🔀 Conditionals`

Build a simple shop where you can buy items!

**Step 1:** Create a dictionary called `shop`:
- "apple": 5
- "bread": 10
- "fish": 15
- "cake": 20

**Step 2:** Create a variable `money = 50` and print "You have [money] coins"

**Step 3:** Print all items and prices using a for loop

**Step 4:** Use a while loop to let the player shop:
- Ask "Buy what? (or type 'quit'): "
- Check if the item is in the shop using `if item in shop:`
- Check if player has enough money: `if money >= shop[item]:`
- If yes: subtract price, print "Bought [item]! You have [money] coins left"
- If not enough money: print "Not enough coins!"
- If item not in shop: print "We don't sell that!"
- If they type "quit": break the loop

**Step 5:** Print final money amount

**Example Output:**
```
You have 50 coins

=== SHOP ITEMS ===
apple: 5 coins
bread: 10 coins
fish: 15 coins
cake: 20 coins

Buy what? (or type 'quit'): apple
Bought apple! You have 45 coins left

Buy what? (or type 'quit'): cake
Bought cake! You have 25 coins left

Buy what? (or type 'quit'): fish
Bought fish! You have 10 coins left

Buy what? (or type 'quit'): bread
Bought bread! You have 0 coins left

Buy what? (or type 'quit'): apple
Not enough coins!

Buy what? (or type 'quit'): sword
We don't sell that!

Buy what? (or type 'quit'): quit

Final coins: 0
```

---

**💡 Tips:**
- Access dictionary values with: `dict_name[key]`
- Update values with: `dict_name[key] = new_value`
- Check if key exists: `if key in dict_name:`
- Loop through keys: `for key in dict_name:`
- Happy coding! 🎮
