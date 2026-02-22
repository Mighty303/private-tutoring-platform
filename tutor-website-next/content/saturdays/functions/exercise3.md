# Exercise 3: Username Checker

## Your Task

Games and apps have rules about what usernames are allowed. Write a function that checks if a username is valid.

Write a function `is_valid(username)` that returns `True` or `False`:
- Must be **at least 3 characters** long
- Must be **20 characters or less**
- Must **not contain any spaces**

---

## Starter Code

```python
def is_valid(username):
    # Your code here
    pass

# Test your function:
print(is_valid("CoolGamer"))       # Should print: True
print(is_valid("ab"))              # Should print: False  (too short)
print(is_valid("Cool Gamer"))      # Should print: False  (has a space)
print(is_valid("a" * 25))          # Should print: False  (too long)
print(is_valid("OK!"))             # Should print: True
```

---

## Hints

<details>
<summary>Hint 1</summary>

Use `len()` to check the length. Use `" " in username` to check for spaces.

</details>

<details>
<summary>Hint 2</summary>

You can check all conditions at once with `and`:

```python
if len(username) >= 3 and len(username) <= 20 and " " not in username:
    return True
else:
    return False
```

</details>

<details>
<summary>Solution</summary>

```python
def is_valid(username):
    if len(username) >= 3 and len(username) <= 20 and " " not in username:
        return True
    else:
        return False
```

Or even shorter:

```python
def is_valid(username):
    return len(username) >= 3 and len(username) <= 20 and " " not in username
```

</details>
