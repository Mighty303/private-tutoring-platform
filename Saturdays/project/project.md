## 🎮 MINI PROJECT: Ultimate Roblox Catalog Shop 🏪

![Roblox Logo](https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/d/10dc22fa0338808635d50a08d25afa7704c0553a.jpeg)

Build a complete Roblox shop where you can buy AND sell items repeatedly!

### **Step 1: Setup** 🎯
Create these variables:
```python
catalog = {
    "Dominus": 50000,
    "Sparkle Time Fedora": 15000,
    "Valkyrie Helm": 25000,
    "Rainbow Wings": 8000,
    "Golden Crown": 12000,
    "Bloxy Cola": 500
}

inventory = {}
```
- Ask user with input: "How much Robux do you have? "
- Convert to integer and store in `robux`

### **Step 2: Display Shop Menu** 📋
Create a function or section that prints:
```
=== ROBLOX CATALOG SHOP ===
[List all catalog items and prices]

Your Robux: [robux]
Your Inventory: [inventory]
```

### **Step 3: Main Action Loop** 🔄
Create a `while True:` loop that:
- Asks: "What do you want to do? (buy/sell/quit): "
- Stores answer in variable `action`

### **Step 4: Buy Action** 🛒
Inside the loop, add:
```python
if action == "buy":
```
- Ask: "What item do you want to buy? "
- Check if item exists in catalog
- Check if player has enough Robux
- If both true:
  - Subtract price from robux
  - Add item to inventory with its price
  - Print success message
- Handle errors (not enough robux, item doesn't exist)
- Show updated robux and inventory

### **Step 5: Sell Action** 💰
Inside the loop, add:
```python
elif action == "sell":
```
- Ask: "What item do you want to sell? "
- Check if item exists in inventory
- If yes:
  - Calculate sell price (50% of original value)
  - Add sell_price to robux
  - Remove item from inventory using `del`
  - Print success message
- If item not in inventory, print error
- Show updated robux and inventory

### **Step 6: Quit Action** 🚪
Inside the loop, add:
```python
elif action == "quit":
```
- Print final Robux amount
- Print final inventory
- Use `break` to exit the loop

### **Step 7: Invalid Action** ⚠️
Add an `else:` statement:
- Print "Invalid action! Please type buy, sell, or quit"

---

### **Example Output:**
```
How much Robux do you have? 30000

=== ROBLOX CATALOG SHOP ===
Dominus: 50000 Robux
Sparkle Time Fedora: 15000 Robux
Valkyrie Helm: 25000 Robux
Rainbow Wings: 8000 Robux
Golden Crown: 12000 Robux
Bloxy Cola: 500 Robux

Your Robux: 30000
Your Inventory: {}

What do you want to do? (buy/sell/quit): buy
What item do you want to buy? Valkyrie Helm
You bought Valkyrie Helm for 25000 Robux!
You now have 5000 Robux
Your Inventory: {'Valkyrie Helm': 25000}

What do you want to do? (buy/sell/quit): buy
What item do you want to buy? Bloxy Cola
You bought Bloxy Cola for 500 Robux!
You now have 4500 Robux
Your Inventory: {'Valkyrie Helm': 25000, 'Bloxy Cola': 500}

What do you want to do? (buy/sell/quit): sell
What item do you want to sell? Bloxy Cola
You sold Bloxy Cola for 250 Robux!
You now have 4750 Robux
Your Inventory: {'Valkyrie Helm': 25000}

What do you want to do? (buy/sell/quit): buy
What item do you want to buy? Dominus
Not enough Robux! Dominus costs 50000 Robux

What do you want to do? (buy/sell/quit): quit
Final Robux: 4750
Final Inventory: {'Valkyrie Helm': 25000}
Thanks for shopping!
```

---

## 💡 Tips for the Mini Project:
- Use `while True:` for infinite loop
- Use `break` to exit the loop
- Access dict values: `catalog[item]`
- Add to dict: `inventory[item] = price`
- Remove from dict: `del inventory[item]`
- Check if key exists: `if item in catalog:`
- Integer division for 50%: `price // 2`

## 🌟 Bonus Challenges:
1. Add more items to the catalog
2. Make selling give 75% back instead of 50%
3. Add a "view" action to see catalog without buying
4. Track how many times you've bought/sold
5. Add special "limited" items that increase in price after purchase

**Happy coding, future Roblox developer! 🎮✨**
