# Exercise 4: Shop Calculator

## Your Task

Build a function for a Roblox shop that calculates the total cost of buying multiple items, with a bulk discount.

Write a function `shop_total(price, quantity)` that:
- Takes the price of one item and how many the player wants to buy
- Returns the total cost
- If buying **5 or more**, apply a **10% discount** to the total

---

## Starter Code

```python
def shop_total(price, quantity):
    # Your code here
    pass

# Test your function:
print(shop_total(100, 3))   # Should print: 300
print(shop_total(100, 5))   # Should print: 450.0  (10% off 500)
print(shop_total(200, 10))  # Should print: 1800.0 (10% off 2000)
print(shop_total(50, 1))    # Should print: 50
```

---

## Hints

<details>
<summary>Hint 1</summary>

First calculate `total = price * quantity`. Then check if `quantity >= 5` to apply the discount.

</details>

<details>
<summary>Hint 2</summary>

10% discount means the player pays 90% of the total: `total * 0.9`

</details>

<details>
<summary>Solution</summary>

```python
def shop_total(price, quantity):
    total = price * quantity
    if quantity >= 5:
        total = total * 0.9
    return total
```

</details>

---

## Bonus

Write a function `receipt(item_name, price, quantity)` that **prints** a receipt like:

```
--- Receipt ---
Item: Diamond Sword
Price: 100 each
Quantity: 5
Total: 450.0 (10% discount applied!)
```

Use your `shop_total` function inside it!

<details>
<summary>Bonus Solution</summary>

```python
def receipt(item_name, price, quantity):
    total = shop_total(price, quantity)
    print("--- Receipt ---")
    print(f"Item: {item_name}")
    print(f"Price: {price} each")
    print(f"Quantity: {quantity}")
    if quantity >= 5:
        print(f"Total: {total} (10% discount applied!)")
    else:
        print(f"Total: {total}")
```

</details>
