## Exercise 3: Buying Items 🛒
`📖 Dictionaries` `🔀 Conditionals` `📥 Input`

![Roblox Logo](https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/7/8/1/0/7810d6e4343eea8b1f8f889402e433c1c8befa23.jpeg)

**Part A:** Set up:
- Create variable `robux = 30000`
- Create the `catalog` dictionary from Exercise 1
- Create an empty dictionary called `inventory = {}`
- Print your starting Robux

**Part B:** Print the catalog using a for loop

**Part C:** Ask the player what they want to buy:
- Use input: "What item do you want to buy? "
- Check if the item exists in catalog
- Check if player has enough Robux
- If both are true:
  - Subtract the price from robux
  - Add the item to inventory: `inventory[item] = catalog[item]`
  - Print "You bought [item] for [price] Robux!"
  - Print "You have [robux] Robux left"
- If not enough Robux: print "Not enough Robux!"
- If item doesn't exist: print "That item isn't in the catalog!"

**Part D:** Print your final inventory

**Example Output:**
```
You have 30000 Robux

=== CATALOG ===
Dominus: 50000 Robux
Sparkle Time Fedora: 15000 Robux
Valkyrie Helm: 25000 Robux
Rainbow Wings: 8000 Robux
Golden Crown: 12000 Robux

What item do you want to buy? Valkyrie Helm
You bought Valkyrie Helm for 25000 Robux!
You have 5000 Robux left

Your inventory: {'Valkyrie Helm': 25000}
```

---

