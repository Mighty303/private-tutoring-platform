# 🎮 PROJECT 6: Guess Who - Roblox Edition

<img width="498" height="280" alt="image" src="https://github.com/user-attachments/assets/36619ef3-cf63-4630-a717-76f73356cd7f" />

In Guess Who, you'll be building a text version of the classic board game with a Roblox twist! Dictionaries will be the key to this project.

---

## Overview 📋

1. The game should store information on at least 5 different Roblox characters.
2. Each character should have a name, gender, outfit type, accessory, and face.
3. When the game begins, a character should be randomly selected by the computer.
4. The player can ask for 2 pieces of information about the random character, and then has to make a guess as to who was picked.

---

## Behavior/Commands 🎯

- **list**: list out all the character's names and their details
- **gender/outfit/accessory/face**: asks for a piece of information
- **guess [name]**: guess a character
- **help**: displays all commands
- **quit**: exits the game

---

## Implementation Details 💡

To store and access the information you'll need to use dictionaries, which will allow for quick and direct access.

**Suggested Character Dictionary Structure:**
```python
characters = {
    "noob": ["Male", "Classic Noob", "None", "Smile"],
    "bacon": ["Male", "Bacon Hair", "None", "Happy"],
    "guest": ["Female", "Guest", "Shades", "Cool"],
    "robby": ["Male", "Superhero", "Cape", "Determined"],
    "victoria": ["Female", "Princess", "Crown", "Sweet"]
}
```

**Character Attributes:**
- **Gender**: Male/Female
- **Outfit Type**: Classic Noob, Bacon Hair, Guest, Superhero, Princess, etc.
- **Accessory**: None, Shades, Cape, Crown, Wings, Hat, etc.
- **Face**: Smile, Happy, Cool, Determined, Sweet, Silly, etc.

---

## Example Output 📺
```
🎮 WELCOME TO ROBLOX GUESS WHO! 🎮
I've picked a random character. You can ask for 2 clues, then make your guess!

What would you like to do? help
Commands:
- list: show all characters
- gender: ask about gender
- outfit: ask about outfit type
- accessory: ask about accessory
- face: ask about face type
- guess [name]: make your guess
- quit: exit game

What would you like to do? list
noob: ['Male', 'Classic Noob', 'None', 'Smile']
bacon: ['Male', 'Bacon Hair', 'None', 'Happy']
guest: ['Female', 'Guest', 'Shades', 'Cool']
robby: ['Male', 'Superhero', 'Cape', 'Determined']
victoria: ['Female', 'Princess', 'Crown', 'Sweet']

What would you like to do? gender
Clue 1: Female
Clues remaining: 1

What would you like to do? accessory
Clue 2: Crown
Clues remaining: 0

What would you like to do? guess victoria
🎉 YOU WIN! The character was victoria! 🎉

Play again? (yes/no): no
Thanks for playing Roblox Guess Who!
```

**Example of Losing:**
```
What would you like to do? gender
Clue 1: Male
Clues remaining: 1

What would you like to do? outfit
Clue 2: Bacon Hair
Clues remaining: 0

What would you like to do? guess robby
❌ YOU LOST! The character was bacon, not robby! ❌

Play again? (yes/no): yes
I've picked a new character. You can ask for 2 clues, then make your guess!
```

---

## Step-by-Step Guide 🛠️

### **Step 1: Setup**
- Import `random` module
- Create a dictionary with at least 5 Roblox characters (name as key, list of attributes as value)
- Create a variable `clues_remaining = 2`

### **Step 2: Random Selection**
- Use `random.choice(list(characters.keys()))` to pick a random character
- Store the selected character name

### **Step 3: Main Game Loop**
- Create a `while True:` loop
- Ask user: "What would you like to do? "
- Store input in variable `command`

### **Step 4: Handle Commands**
- **list**: Loop through dictionary and print all characters and their info
- **gender/outfit/accessory/face**: 
  - Check if `clues_remaining > 0`
  - Print the corresponding attribute from the selected character
  - Decrease `clues_remaining` by 1
  - If `clues_remaining == 0`, remind player they must guess now
- **guess [name]**: 
  - Extract the character name from the command
  - Compare with the selected character
  - Print win or lose message
  - Ask if player wants to play again
- **help**: Print all available commands
- **quit**: Exit the game with `break`

### **Step 5: Play Again Feature**
- After a guess, ask: "Play again? (yes/no): "
- If yes: reset `clues_remaining = 2` and pick a new random character
- If no: exit the game

---

## 🌟 Bonus Challenges:

1. Add more characters (try to get 10!)
2. Allow 3 clues instead of 2
3. Add a scoring system (track wins/losses)
4. Add more attributes (e.g., body color, shirt color, pants color)
5. Create difficulty levels (Easy = 3 clues, Medium = 2 clues, Hard = 1 clue)
6. Add a hint system that costs a clue
7. Track and display the fastest win (fewest clues used)

---

## 💡 Python Tips:

- Access dictionary: `characters["noob"]` → `['Male', 'Classic Noob', 'None', 'Smile']`
- Access specific attribute: `characters["noob"][0]` → `'Male'`
- Random choice: `import random` then `random.choice(list(characters.keys()))`
- Check if key exists: `if name in characters:`
- String splitting: `command.split()` to separate "guess victoria" into ["guess", "victoria"]

---

## 🎯 Required Features Checklist:

- [ ] At least 5 characters stored in a dictionary
- [ ] Random character selection at game start
- [ ] 2 clues allowed before guessing
- [ ] list, gender, outfit, accessory, face, guess, help, and quit commands
- [ ] Win/lose messages
- [ ] Play again option
