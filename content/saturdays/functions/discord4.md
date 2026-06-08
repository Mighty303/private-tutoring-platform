# Discord Bot Exercise 4: RPG Profile Card

Build the ultimate bot command — a profile card generator! This combines everything you've learned into one project with **multiple functions working together**.

---

## Your Task

Write **four functions** that build a player's RPG profile card for Discord.

### Function 1: `xp_bar(current_xp, max_xp)`
- Takes current XP and max XP
- **Returns** a visual progress bar string
- Calculate how many filled blocks out of 10: `filled = int((current_xp / max_xp) * 10)`
- Use `"█"` for filled and `"░"` for empty
- Example: `xp_bar(75, 100)` → `"███████░░░ 75/100"`

### Function 2: `get_rank(level)`
- Takes a player's level
- **Returns** a rank title string based on the level:
  - Level 1–10: `"🌱 Beginner"`
  - Level 11–25: `"⚔️ Warrior"`
  - Level 26–50: `"🔮 Mage"`
  - Level 51+: `"👑 Legend"`

### Function 3: `format_badges(badge_list)`
- Takes a list of badge names
- If the list is **empty**, return `"No badges yet"`
- Otherwise, **return** the badges joined with ` • ` (bullet separator)
- Example: `format_badges(["PvP", "Explorer"])` → `"PvP • Explorer"`

### Function 4: `create_profile(username, level, current_xp, max_xp, badges)`
- Takes all the player info
- **Calls the other three functions** to assemble the full card
- **Returns** a formatted profile string

The profile should look like:

```
╔══════════════════════════╗
  👤 DragonSlayer99
  🔮 Mage — Level 30
  ━━━━━━━━━━━━━━━━━━━━
  XP: ███████░░░ 350/500
  🏅 PvP Champ • Explorer • Builder
╚══════════════════════════╝
```

---

## Starter Code

```python
def xp_bar(current_xp, max_xp):
    # Calculate filled blocks (out of 10)
    # Return the bar + "current/max"
    pass

def get_rank(level):
    # Return a rank based on level ranges
    pass

def format_badges(badge_list):
    # Return badges joined with " • " or "No badges yet"
    pass

def create_profile(username, level, current_xp, max_xp, badges):
    # Use the other 3 functions to build the profile
    pass

# Test individual functions:
print(xp_bar(75, 100))  # Output: ███████░░░ 75/100
print(xp_bar(30, 200))  # Output: █░░░░░░░░░ 30/200
print(get_rank(5))  # Output: 🌱 Beginner
print(get_rank(30))  # Output: 🔮 Mage
print(format_badges(["PvP Champ", "Explorer"]))  # Output: PvP Champ • Explorer
print(format_badges([]))  # Output: No badges yet
print("---")

# Test the full profile:
print(create_profile("DragonSlayer99", 30, 350, 500, ["PvP Champ", "Explorer", "Builder"]))
print()
print(create_profile("NewPlayer42", 3, 50, 100, []))
```

---

## Expected Output

```
███████░░░ 75/100
█░░░░░░░░░ 30/200
🌱 Beginner
🔮 Mage
PvP Champ • Explorer
No badges yet
---
╔══════════════════════════╗
  👤 DragonSlayer99
  🔮 Mage — Level 30
  ━━━━━━━━━━━━━━━━━━━━
  XP: ███████░░░ 350/500
  🏅 PvP Champ • Explorer • Builder
╚══════════════════════════╝

╔══════════════════════════╗
  👤 NewPlayer42
  🌱 Beginner — Level 3
  ━━━━━━━━━━━━━━━━━━━━
  XP: █████░░░░░ 50/100
  🏅 No badges yet
╚══════════════════════════╝
```

---

## Hints

<details>
<summary>Hint 1 — xp_bar</summary>

Calculate the proportion, multiply by 10, and build the bar:

```python
filled = int((current_xp / max_xp) * 10)
empty = 10 - filled
bar = "█" * filled + "░" * empty
return f"{bar} {current_xp}/{max_xp}"
```

</details>

<details>
<summary>Hint 2 — get_rank</summary>

Use if/elif/else to check level ranges:

```python
if level <= 10:
    return "🌱 Beginner"
elif level <= 25:
    return "⚔️ Warrior"
# ...
```

</details>

<details>
<summary>Hint 3 — format_badges</summary>

Check if the list is empty first, then use `.join()`:

```python
if len(badge_list) == 0:
    return "No badges yet"
return " • ".join(badge_list)
```

</details>

<details>
<summary>Hint 4 — create_profile</summary>

Call your other functions and build the string:

```python
rank = get_rank(level)
bar = xp_bar(current_xp, max_xp)
badge_str = format_badges(badges)
# Now build the profile string with these values
```

</details>

<details>
<summary>Solution</summary>

```python
def xp_bar(current_xp, max_xp):
    filled = int((current_xp / max_xp) * 10)
    empty = 10 - filled
    bar = "█" * filled + "░" * empty
    return f"{bar} {current_xp}/{max_xp}"

def get_rank(level):
    if level <= 10:
        return "🌱 Beginner"
    elif level <= 25:
        return "⚔️ Warrior"
    elif level <= 50:
        return "🔮 Mage"
    else:
        return "👑 Legend"

def format_badges(badge_list):
    if len(badge_list) == 0:
        return "No badges yet"
    return " • ".join(badge_list)

def create_profile(username, level, current_xp, max_xp, badges):
    rank = get_rank(level)
    bar = xp_bar(current_xp, max_xp)
    badge_str = format_badges(badges)

    profile = "╔══════════════════════════╗\n"
    profile += f"  👤 {username}\n"
    profile += f"  {rank} — Level {level}\n"
    profile += "  ━━━━━━━━━━━━━━━━━━━━\n"
    profile += f"  XP: {bar}\n"
    profile += f"  🏅 {badge_str}\n"
    profile += "╚══════════════════════════╝"
    return profile
```

</details>

---

## Topics Practiced

- **Function composition** — `create_profile` calls three other functions
- **Conditionals** — if/elif/else for rank tiers
- **Lists** — badge list, checking empty, `.join()`
- **Math** — calculating proportions for the XP bar
- **String multiplication** — `"█" * filled` to build the progress bar
- **String building** — assembling a complex multi-line output
- **Return values** — every function returns a piece the main function uses
