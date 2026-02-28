# Exercise 4: Health Regen

Your character has taken damage and is regenerating health. Each turn they recover **5 HP**, but health can't go above the **max HP** of 100.

Write a `while` loop that heals the character until they're at full health, and track how many turns it takes.

**Example (starting at 72 HP):**
```
Turn 1: 72 → 77 HP
Turn 2: 77 → 82 HP
Turn 3: 82 → 87 HP
Turn 4: 87 → 92 HP
Turn 5: 92 → 97 HP
Turn 6: 97 → 100 HP
Fully healed in 6 turns!
```

Notice turn 6: 97 + 5 = 102, but it caps at 100.

---

## Starter Code

```python
health = 72
max_health = 100
regen = 5
turns = 0

while health < ___:
    old_health = health
    health += regen
    # Make sure health doesn't go above max
    if health > max_health:
        health = ___
    turns += 1
    print(f"Turn {turns}: {old_health} → {health} HP")

print(f"Fully healed in {turns} turns!")
```

---

## Hints

<details>
<summary>Hint 1 — The while condition</summary>

Keep healing while health is below max: `while health < max_health:`

</details>

<details>
<summary>Hint 2 — Capping the health</summary>

After adding regen, check if health went over max. If so, set it to max:

```python
if health > max_health:
    health = max_health
```

</details>

<details>
<summary>Hint 3 — Tracking old health</summary>

Save the current health **before** adding regen so you can show the "before → after" in the print statement.

</details>

