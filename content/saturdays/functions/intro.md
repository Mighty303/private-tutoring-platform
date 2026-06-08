# Functions — What & Why

Functions are **reusable blocks of code** you give a name to, so you can run them whenever you want without rewriting the same code.

---

## Without a Function (Repetitive)

```python
print("Welcome, Alex!")
print("Your adventure begins!")

print("Welcome, Sam!")
print("Your adventure begins!")

print("Welcome, Jordan!")
print("Your adventure begins!")
```

That's a lot of copy-paste! What if you want to change the message? You'd have to edit it 3 times.

## With a Function (Reusable)

```python
def welcome(name):
    print(f"Welcome, {name}!")
    print("Your adventure begins!")

welcome("Alex")
welcome("Sam")
welcome("Jordan")
```

Now if you want to change the message, you only change it **once** inside the function.

---

## Anatomy of a Function

```python
def function_name(parameter1, parameter2):
    # code goes here (indented!)
    return result
```

- **`def`** — keyword that says "I'm creating a function"
- **Function name** — what you call it (use snake_case)
- **Parameters** — inputs the function receives (in parentheses)
- **Body** — the indented code that runs when you call it
- **`return`** — sends a value back (optional)

---

## Return vs Print

This is the **most important** thing to understand:

```python
# This function PRINTS (shows text, but gives back nothing)
def greet(name):
    print(f"Hi {name}!")

# This function RETURNS (gives back a value you can use)
def double(number):
    return number * 2
```

**Why does it matter?**

```python
# With return — you can save and use the result
result = double(5)
print(result)        # 10
print(double(5) + 3) # 13

# With print — the value is gone after printing
result = greet("Alex")  # Prints "Hi Alex!" but...
print(result)            # None! There's nothing to save
```

**Rule of thumb:**
- Use **print** when you just want to display something
- Use **return** when you need to use the answer later

---

## Calling a Function

```python
def add(a, b):
    return a + b

# Calling the function:
answer = add(3, 5)
print(answer)  # 8

# You can also use it directly:
print(add(10, 20))  # 30
```

The values you pass in (`3, 5`) are called **arguments**. They get matched to the **parameters** (`a, b`) in order.
