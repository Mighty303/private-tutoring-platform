# Exercise 8: Boss Battle

Time for a boss fight! You're battling a boss with **50 HP**. Your attack does **12 damage** per turn. But the boss raises a shield every **3rd turn** (turns 3, 6, 9, ...), blocking your attack.

Use a `while True` loop with `continue` for shield turns and `break` when the boss is defeated.

```python
boss_hp = 50
max_hp = 50
player_attack = 12
```

**Expected output:**
```
Turn 1: You attack! Boss HP: 38/50
Turn 2: You attack! Boss HP: 26/50
Turn 3: Boss shields! Attack blocked.
Turn 4: You attack! Boss HP: 14/50
Turn 5: You attack! Boss HP: 2/50
Turn 6: Boss shields! Attack blocked.
Turn 7: You attack! Boss defeated!
Boss defeated in 7 turns!
```

---

## Requirements

- Use a `while True` loop (infinite loop with `break` to exit)
- Track the turn number (starting from 1)
- Every 3rd turn (turn % 3 == 0), the boss shields — print the shield message and `continue`
- On attack turns, subtract `player_attack` from `boss_hp`
- If boss HP drops to 0 or below, print the defeat message and `break`
- After the loop, print how many turns it took
- No starter code — write the whole solution yourself!

---

## Hints

<details>
<summary>Hint 1 — Setting up the while True loop</summary>

```python
turn = 0
while True:
    turn += 1
    # ... your logic here
```

Increment the turn at the **start** of each iteration so Turn 1 is the first thing that happens.

</details>

<details>
<summary>Hint 2 — Shield check comes first</summary>

Check for the shield **before** attacking. If it's a shield turn, print the message and `continue` to skip the attack:

```python
if turn % 3 == 0:
    print(f"Turn {turn}: Boss shields! Attack blocked.")
    continue
```

</details>

<details>
<summary>Hint 3 — Defeat check</summary>

After reducing `boss_hp`, check if it's 0 or below. If so, print the defeat message (not the HP readout) and `break`:

```python
boss_hp -= player_attack
if boss_hp <= 0:
    print(f"Turn {turn}: You attack! Boss defeated!")
    break
```

Otherwise, print the normal attack message with the remaining HP.

</details>
