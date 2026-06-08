# Function Tips & Common Mistakes

## Quick Checklist

Before running your function, check:
- [ ] Did you use `def` and end the line with a **colon `:`**?
- [ ] Is the function body **indented**?
- [ ] Did you **call** the function after defining it?
- [ ] Did you use `return` if you need to **use the result** later?
- [ ] Are your **parameter names** matching inside the function?

---

## Common Mistakes

### 1. Forgetting to call the function

```python
# Wrong — this just defines it, never runs it
def say_hi():
    print("Hi!")

# Right — call it!
def say_hi():
    print("Hi!")

say_hi()
```

### 2. Forgetting return

```python
# Wrong — prints but doesn't give back the value
def add(a, b):
    print(a + b)

result = add(3, 5)  # result is None!

# Right — return gives the value back
def add(a, b):
    return a + b

result = add(3, 5)  # result is 8
```

### 3. Putting code after return

```python
# Wrong — anything after return is skipped
def add(a, b):
    return a + b
    print("Done!")   # This NEVER runs

# Right — put print before return
def add(a, b):
    print("Done!")
    return a + b
```

### 4. Wrong number of arguments

```python
def greet(name, age):
    print(f"Hi {name}, you are {age}")

greet("Alex")        # Error! Missing age
greet("Alex", 15)    # Correct
```

### 5. Mixing up print and return

```python
# If you PRINT inside the function:
def double(n):
    print(n * 2)

double(5)                    # Shows: 10
result = double(5)           # Shows: 10, but result is None
print(f"Answer: {result}")   # Shows: Answer: None  (oops!)

# If you RETURN inside the function:
def double(n):
    return n * 2

result = double(5)           # Nothing printed, result is 10
print(f"Answer: {result}")   # Shows: Answer: 10
```

---

## When to Use Print vs Return

| Situation | Use |
|-----------|-----|
| You need to **use the result** in more code | `return` |
| You just want to **display** something | `print` |
| You want to **save** the result in a variable | `return` |
| You want to **do math** with the result | `return` |
| You're making a **message** to show the user | `print` |

---

## How to Read Error Messages

```
TypeError: greet() takes 1 positional argument but 2 were given
```
You called the function with too many arguments.

```
TypeError: greet() missing 1 required positional argument: 'name'
```
You called the function without enough arguments.

```
NameError: name 'my_function' is not defined
```
You either misspelled the function name or forgot to define it above where you're calling it.
