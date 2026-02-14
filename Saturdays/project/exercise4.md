## Exercise 4: Selling Items Back 💸
`📖 Dictionaries` `🔀 Conditionals` `📥 Input`

![Roblox Logo](https://i.ytimg.com/vi/7oeB_SC5Vuk/maxresdefault.jpg)

**Part A:** Set up:
- `robux = 20000`
- Create the `catalog` dictionary
- Create inventory with items you "already own": `inventory = {"Rainbow Wings": 8000, "Golden Crown": 12000}`
- Print starting Robux and inventory
<img width="993" height="493" alt="image" src="https://github.com/user-attachments/assets/32e979ae-71e8-439e-99bb-f582127a68a7" />
<img width="1040" height="525" alt="image" src="https://github.com/user-attachments/assets/07363cdf-418c-4d6c-9c4e-79cf12331205" />
)

**Part B:** Ask what item to sell:
- Use input: "What item do you want to sell? "
- Check `if item in inventory:`
- If yes:
  - Get the sell price (50% of original): `sell_price = inventory[item] // 2`
  - Add sell_price to robux
  - Remove item from inventory: `del inventory[item]`
  - Print "You sold [item] for [sell_price] Robux!"
  - Print "You now have [robux] Robux"
- If item not in inventory: print "You don't own that item!"

**Part C:** Print updated inventory

**Example Output:**
```
You have 20000 Robux
Your inventory: {'Rainbow Wings': 8000, 'Golden Crown': 12000}

What item do you want to sell? Rainbow Wings
You sold Rainbow Wings for 4000 Robux!
You now have 24000 Robux

Your inventory: {'Golden Crown': 12000}
```

---

