# Discord Bot Exercise 1: Greeting Bot

Your Python Bot is connected to a real Discord server! Write functions, run your code, then click **Send to Discord** to see your bot post messages live.

---

## Your Task

Write **two functions** that generate greeting and farewell messages for users joining and leaving a server.

### Function 1: `greet(name)`
- Takes a player's name as a parameter
- **Returns** a welcome message string like: `Welcome to the server, Alex! Glad to have you here.`

### Function 2: `farewell(name, days_active)`
- Takes a player's name and how many days they were active
- **Returns** a goodbye message
- If `days_active` is **more than 30**, include `"You were a legendary member!"`
- Otherwise, include `"Hope to see you again soon!"`

---

## Starter Code

```python
def greet(name):
    # Return a welcome message using an f-string
    pass

def farewell(name, days_active):
    # Return a goodbye message
    # Use a conditional to check days_active
    pass

# Test your functions:
print(greet("Alex"))  # Output: Welcome to the server, Alex! Glad to have you here.
print(greet("Jordan"))  # Output: Welcome to the server, Jordan! Glad to have you here.
print(farewell("Sam", 45))  # Output: Goodbye Sam! You were a legendary member!
print(farewell("Riley", 10))  # Output: Goodbye Riley! Hope to see you again soon!
```

---

## Expected Output

```
Welcome to the server, Alex! Glad to have you here.
Welcome to the server, Jordan! Glad to have you here.
Goodbye Sam! You were a legendary member!
Goodbye Riley! Hope to see you again soon!
```

---

## Hints

<details>
<summary>Hint 1</summary>

For `greet`, you just need to **return** an f-string:

```python
return f"Welcome to the server, {name}! ..."
```

</details>

<details>
<summary>Hint 2</summary>

For `farewell`, use an `if/else` to pick the right message:

```python
if days_active > 30:
    return f"Goodbye {name}! You were a legendary member!"
else:
    return f"Goodbye {name}! Hope to see you again soon!"
```

</details>

<details>
<summary>Solution</summary>

```python
def greet(name):
    return f"Welcome to the server, {name}! Glad to have you here."

def farewell(name, days_active):
    if days_active > 30:
        return f"Goodbye {name}! You were a legendary member!"
    else:
        return f"Goodbye {name}! Hope to see you again soon!"
```

</details>

---

## Topics Practiced

- **Functions** with parameters and return values
- **f-strings** for string formatting
- **Conditionals** (if/else)
- **Return vs Print** — your functions return strings, then `print()` displays them
