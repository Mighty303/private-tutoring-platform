# Discord Bot Exercise 3: Poll Bot

Build a poll creator for your Discord server! Users give a question and options, and your bot formats a beautiful poll message.

---

## Your Task

Write **two functions** that work together to create formatted polls.

### Function 1: `format_option(index, text)`
- Takes a number (0, 1, 2...) and the option text
- **Returns** a string with an emoji number and the text
- Use this list of emoji numbers: `["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]`
- Example: `format_option(0, "Pizza")` → `"1️⃣ Pizza"`

### Function 2: `create_poll(question, options)`
- Takes a question string and a **list** of option strings
- Uses a **loop** and calls `format_option()` for each option
- **Returns** a complete formatted poll string

The poll should look like:

```
📊 POLL: What should we play?
━━━━━━━━━━━━━━━━━━━━
1️⃣ Minecraft
2️⃣ Roblox
3️⃣ Fortnite

Vote by reacting below!
```

---

## Starter Code

```python
EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]

def format_option(index, text):
    # Return the emoji + text for one option
    pass

def create_poll(question, options):
    # Build the full poll string
    # Start with the header, add each formatted option, end with footer
    pass

# Test your functions:
print(format_option(0, "Pizza"))
print(format_option(2, "Sushi"))
print("---")

poll1 = create_poll("What should we play?", ["Minecraft", "Roblox", "Fortnite"])
print(poll1)
print("===")

poll2 = create_poll("Best programming language?", ["Python", "JavaScript", "C++", "Scratch"])
print(poll2)
```

---

## Expected Output

```
1️⃣ Pizza
3️⃣ Sushi
---
📊 POLL: What should we play?
━━━━━━━━━━━━━━━━━━━━
1️⃣ Minecraft
2️⃣ Roblox
3️⃣ Fortnite

Vote by reacting below!
===
📊 POLL: Best programming language?
━━━━━━━━━━━━━━━━━━━━
1️⃣ Python
2️⃣ JavaScript
3️⃣ C++
4️⃣ Scratch

Vote by reacting below!
```

---

## Hints

<details>
<summary>Hint 1 — format_option</summary>

Use the EMOJIS list with the index:

```python
def format_option(index, text):
    return f"{EMOJIS[index]} {text}"
```

</details>

<details>
<summary>Hint 2 — Building the poll string</summary>

Build the string piece by piece. You can use `\n` for new lines:

```python
result = f"📊 POLL: {question}\n"
result += "━━━━━━━━━━━━━━━━━━━━\n"
# Add each option...
result += "\nVote by reacting below!"
```

</details>

<details>
<summary>Hint 3 — Looping with index</summary>

Use `enumerate()` or `range(len(...))` to get both the index and the item:

```python
for i, option in enumerate(options):
    result += format_option(i, option) + "\n"
```

</details>

<details>
<summary>Solution</summary>

```python
EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]

def format_option(index, text):
    return f"{EMOJIS[index]} {text}"

def create_poll(question, options):
    result = f"📊 POLL: {question}\n"
    result += "━━━━━━━━━━━━━━━━━━━━\n"
    for i, option in enumerate(options):
        result += format_option(i, option) + "\n"
    result += "\nVote by reacting below!"
    return result
```

</details>

---

## Topics Practiced

- **Functions calling functions** — `create_poll` calls `format_option`
- **Lists** — storing options and emoji characters
- **Indexing** — accessing list items by position
- **Loops with enumerate** — getting both index and value
- **String building** — concatenating with `+=` and `\n`
- **Return values** — building and returning a complex string
