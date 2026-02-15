## Exercise 2: Your Robux Balance 💰
`📖 Dictionaries` `📥 Input` `🔢 Type Conversion`

![Roblox Logo](https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/3/2/a/32a005028e04b7e6ba31de37f43edc69004cc61f.png)

**Part A:** Use `input()` to ask "How much Robux do you have? "
- Convert the input to an integer
- Store it in a variable called `robux`
- Print: "You have [robux] Robux!"

**Part B:** Create the same `catalog` dictionary from Exercise 1.

**Part C:** Print all items with a for loop:
- Format: "[item]: [price] Robux"

**Part D:** Check if you can afford an item:
- Ask with input: "Which item do you want to check? "
- Use an if statement to check `if item in catalog:`
- If yes, check `if robux >= catalog[item]:`
  - Print "You CAN afford [item]!" or "You CANNOT afford [item]!"
- If item not in catalog, print "That item doesn't exist!"

**Example Output:**
```
How much Robux do you have? 20000
You have 20000 Robux!

=== CATALOG ===
Dominus: 50000 Robux
Sparkle Time Fedora: 15000 Robux
Valkyrie Helm: 25000 Robux
Rainbow Wings: 8000 Robux
Golden Crown: 12000 Robux

Which item do you want to check? Golden Crown
You CAN afford Golden Crown!
```

---

