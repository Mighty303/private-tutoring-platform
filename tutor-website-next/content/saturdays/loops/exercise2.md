# Exercise 2: XP Grinder

Your game character earns **XP** for each monster defeated. Use a `while` loop to keep grinding until you reach a target XP level.

Each monster gives you **15 XP**. Keep fighting until your total XP reaches **100 or more**.

**Expected output:**
```
Monster defeated! +15 XP (Total: 15)
Monster defeated! +15 XP (Total: 30)
Monster defeated! +15 XP (Total: 45)
Monster defeated! +15 XP (Total: 60)
Monster defeated! +15 XP (Total: 75)
Monster defeated! +15 XP (Total: 90)
Monster defeated! +15 XP (Total: 105)
Level up! You reached 105 XP in 7 fights!
```

---

## Starter Code

```python
xp = 0
fights = 0
xp_per_fight = 15
target = 100

while ___:
    xp += xp_per_fight
    fights += ___
    print(f"Monster defeated! +{xp_per_fight} XP (Total: {xp})")

print(f"Level up! You reached {xp} XP in {fights} fights!")
```

---

## Hints

<details>
<summary>Hint 1 — What's the while condition?</summary>

The loop should keep running **while** XP is less than the target: `while xp < target:`

</details>

<details>
<summary>Hint 2 — Counting fights</summary>

Each time through the loop is one fight. Increment `fights` by 1 each time: `fights += 1`

</details>

<details>
<summary>Hint 3 — Why while and not for?</summary>

We don't know ahead of time how many fights it'll take — we just keep going until we hit the target. That's exactly when you use a `while` loop!

</details>

