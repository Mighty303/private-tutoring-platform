# Exercise 5: Greeting Bot

## Your Task

Write a function that returns a different greeting depending on how many messages a player has sent.

Write a function `greet(name, messages)` that **returns** a greeting string:

| Messages | Greeting |
|----------|----------|
| 0 | `"Welcome, [name]!"` |
| 1 to 10 | `"Hi [name], you're new here!"` |
| 11 to 50 | `"Hey [name], good to see you!"` |
| 51 or more | `"[name] the Veteran, welcome back!"` |

---

## Starter Code

```python
def greet(name, messages):
    # Your code here
    pass

# Test your function:
print(greet("Alex", 0))     # Should print: Welcome, Alex!
print(greet("Sam", 5))      # Should print: Hi Sam, you're new here!
print(greet("Jordan", 30))  # Should print: Hey Jordan, good to see you!
print(greet("Casey", 100))  # Should print: Casey the Veteran, welcome back!
```

---

## Hints

<details>
<summary>Hint 1</summary>

Use `if / elif / else` to check which range `messages` falls into.

</details>

<details>
<summary>Hint 2</summary>

```python
if messages == 0:
    return f"Welcome, {name}!"
elif messages <= 10:
    ...
```

</details>

<details>
<summary>Solution</summary>

```python
def greet(name, messages):
    if messages == 0:
        return f"Welcome, {name}!"
    elif messages <= 10:
        return f"Hi {name}, you're new here!"
    elif messages <= 50:
        return f"Hey {name}, good to see you!"
    else:
        return f"{name} the Veteran, welcome back!"
```

</details>
