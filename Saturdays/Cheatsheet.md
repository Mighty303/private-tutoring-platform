# Python Basics Cheatsheet 🐍

Quick reference for Python syntax!

---

## 1. 📦 Variables

```python
name = "Alex"           # Text (string)
age = 15                # Whole number (integer)
height = 5.8            # Decimal (float)
is_student = True       # True/False (boolean)
```

**Rules:** Start with letter, no spaces, case-sensitive

---

## 2. 🔄 Type Casting (Converting Between Types)

Sometimes you need to convert data from one type to another!

```python
# Convert TO string (text)
str(42)         # "42"
str(3.14)       # "3.14"
str(True)       # "True"

# Convert TO integer (whole number)
int("42")       # 42
int(3.14)       # 3 (cuts off decimal!)
int("3.14")     # ERROR! Can't convert decimal text directly

# Convert TO float (decimal)
float("3.14")   # 3.14
float(42)       # 42.0
float("42")     # 42.0

# Check type
type(42)        # <class 'int'>
type("hello")   # <class 'str'>
type(3.14)      # <class 'float'>
```

**Why Type Casting Matters:**
```python
# ❌ WRONG - Can't do math with strings
age = "15"
age + 5         # ERROR! Can't add number to text

# ✅ CORRECT - Convert first!
age = "15"
age = int(age)  # Now age is 15 (number)
age + 5         # 20
```

**Common Uses:**
- `int(input())` - Convert user input to number
- `str(score)` - Convert number to text for printing
- `float(input())` - Convert input to decimal

---

## 3. ➕ Operators

```python
# Math
10 + 3      # Add: 13
10 - 3      # Subtract: 7
10 * 3      # Multiply: 30
10 / 3      # Divide: 3.33...
10 // 3     # Divide (whole number): 3
10 % 3      # Remainder: 1
10 ** 3     # Power: 1000

# Comparison (results in True/False)
5 == 5      # Equal
5 != 3      # Not equal
5 > 3       # Greater than
5 < 10      # Less than
5 >= 5      # Greater or equal
5 <= 10     # Less or equal

# Combine conditions
True and False    # Both must be True: False
True or False     # At least one True: True
not True          # Opposite: False
```

---

## 4. 📥 Input (Getting User Input)

```python
# Basic input (always gives you text/string)
name = input("What's your name? ")
print(name)

# Convert input to number (TYPE CASTING!)
age = int(input("How old are you? "))     # Convert to integer
height = float(input("Height in feet? ")) # Convert to decimal

# Using the input
answer = input("Type yes or no: ")
if answer == "yes":    # Compare the input
    print("You said yes!")
```

**Common Mistakes:**
- ❌ Forgetting to convert: `age = input("Age? ")` then `age + 5` (can't add text!)
- ✅ Always convert numbers: `age = int(input("Age? "))`

---

## 5. 📝 Strings (Text)

```python
# Creating strings
name = "Alex"
message = 'Hello'      # Single or double quotes both work

# String length
len("hello")           # 5

# Combining strings
greeting = "Hello" + " " + "World"    # "Hello World"
full_name = "Alex" + " " + "Smith"

# Combining strings with variables
name = "Alex"
age = 15

# Need to convert numbers to strings first!
print("My name is " + name + " and I'm " + str(age))

# Going the other way - string to number for math
age_text = "15"
age_next_year = int(age_text) + 1   # Convert to int first!
print("Next year I'll be " + str(age_next_year))

# OR use f-string (easier!) ← RECOMMENDED!
print(f"My name is {name} and I'm {age}")

# Access characters by index (starts at 0!)
word = "Python"
print(word[0])    # P (first letter)
print(word[1])    # y (second letter)
print(word[-1])   # n (last letter)

# String slicing
word = "Python"
print(word[0:3])   # Pyt (index 0, 1, 2)
print(word[2:])    # thon (from index 2 to end)

# Useful string methods
text = "hello world"
text.upper()       # "HELLO WORLD"
text.lower()       # "hello world"
text.split()       # ["hello", "world"] (makes a list!)
"  hello  ".strip()  # "hello" (removes extra spaces)
```

**Common Mistakes:**
- ❌ `print("Hi {name}")` (missing the `f` before the quote)
- ✅ `print(f"Hi {name}")` (f-string needs `f` in front!)

---

## 6. 📋 Lists (Collections of Items)

```python
# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["Alex", 15, True]   # Can mix types!
empty = []                    # Empty list

# Access items by index (starts at 0!)
fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple (first item)
print(fruits[1])     # banana (second item)
print(fruits[-1])    # cherry (last item)

# Change an item
fruits[1] = "orange"
print(fruits)        # ["apple", "orange", "cherry"]

# Add items
fruits.append("mango")        # Add to end
# fruits is now ["apple", "orange", "cherry", "mango"]

fruits.insert(1, "grape")     # Add at index 1
# fruits is now ["apple", "grape", "orange", "cherry", "mango"]

# Remove items
fruits.remove("orange")       # Remove by value
# fruits is now ["apple", "grape", "cherry", "mango"]

fruits.pop()                  # Remove last item
# fruits is now ["apple", "grape", "cherry"]

fruits.pop(0)                 # Remove item at index 0
# fruits is now ["grape", "cherry"]

# List length
len(fruits)          # 2

# Check if item exists
if "grape" in fruits:    # ← COLON!
    print("Found it!")

# Loop through list
for fruit in fruits:     # ← COLON!
    print(fruit)
```

**Common Mistakes:**
- ❌ `fruits[3]` when list only has 3 items (IndexError! Remember: starts at 0)
- ❌ `fruits.append["mango"]` (should be parentheses `()` not brackets `[]`)
- ✅ `fruits.append("mango")` - append uses parentheses!

---

## 7. 📏 Indentation Levels (Visual Guide)

**Python uses indentation to show what code belongs together!**

### Level 0: No Indent (Main Code)
```python
print("This is at level 0")
x = 5
print("Still at level 0")
```

### Level 1: One Indent (Inside if/loop/function)
```python
if age >= 13:           # ← COLON!
    print("Teen")       # ← One indent (4 spaces or 1 Tab)
    print("Cool!")      # ← Same level, both inside if
```

### Level 2: Two Indents (Nested Inside)
```python
if age >= 13:                    # ← COLON!
    print("You're a teen")       # ← Level 1: inside if
    if age >= 16:                # ← COLON! Nested if
        print("Can drive!")      # ← Level 2: inside nested if
        print("Wow!")            # ← Level 2: still inside nested if
    print("Back to level 1")     # ← Level 1: inside first if
```

### Visual Breakdown with Lines:
```python
if age >= 13:                           # Level 0
|   print("Teen")                       # Level 1 (inside if)
|   
|   if has_license:                     # Level 1 (inside if)
|   |   print("Can drive!")             # Level 2 (inside nested if)
|   |   print("Be safe!")               # Level 2 (inside nested if)
|   
|   print("Still a teen")               # Level 1 (inside first if)

print("Outside if")                     # Level 0 (back to main)
```

### Real Example: Nested Game Logic
```python
# Level 0: Main code
score = 85
has_bonus = True

# Level 0: Start if
if score >= 80:
    # Level 1: Inside if
    print("Great job!")
    
    # Level 1: Nested if starts
    if has_bonus:
        # Level 2: Inside nested if
        score = score + 10
        print("Bonus added!")
    
    # Level 1: Back to first if
    print(f"Final score: {score}")

# Level 0: Outside everything
print("Game over")
```

### Common Indentation Mistakes:
```python
# ❌ WRONG - Not indented
if age >= 13:
print("Teen")        # ERROR! Must be indented

# ❌ WRONG - Inconsistent indentation
if age >= 13:
    print("Teen")
      print("Cool")  # ERROR! Different indent level

# ❌ WRONG - Nested if not indented enough
if age >= 13:
    print("Teen")
    if age >= 16:
    print("Drive")   # ERROR! Should be indented twice

# ✅ CORRECT
if age >= 13:
    print("Teen")
    if age >= 16:
        print("Drive")  # Indented twice - inside both ifs
```

**Rules:**
1. Every `:` means the next line MUST be indented
2. All code at the same level must have the SAME indentation
3. Use either spaces OR tabs, never mix them
4. Going back to a previous level means going back to that indentation

---

## 8. 🔀 Conditionals

### ⚠️ CRITICAL: Always use colon (:) and indent!

```python
# Basic if
if age >= 13:           # ← COLON HERE!
    print("Teen")       # ← INDENT (4 spaces or Tab)

# If-else
if age >= 18:           # ← COLON!
    print("Adult")      # ← INDENT!
else:                   # ← COLON!
    print("Minor")      # ← INDENT!

# If-elif-else
if score >= 90:         # ← COLON!
    print("A")          # ← INDENT!
elif score >= 80:       # ← COLON!
    print("B")          # ← INDENT!
else:                   # ← COLON!
    print("C")          # ← INDENT!

# Multiple conditions
if age >= 13 and age < 20:    # ← COLON!
    print("Teenager")          # ← INDENT!
```

**Common Mistakes:**
- ❌ `if age >= 13` (missing colon)
- ❌ `if age >= 13:` then `print("Teen")` (not indented)
- ✅ `if age >= 13:` then indent `print("Teen")`

---

## 9. 🔁 While Loops

### ⚠️ CRITICAL: Colon (:) after while, indent the body!

```python
# Basic while
count = 0
while count < 5:        # ← COLON!
    print(count)        # ← INDENT!
    count += 1          # ← INDENT! (Don't forget to update!)

# Break (exit loop early)
while True:             # ← COLON!
    answer = input("Exit? (yes/no): ")
    if answer == "yes":
        break           # Stops the loop
```

**Common Mistakes:**
- ❌ `while count < 5` (missing colon)
- ❌ Forgetting to update `count` (infinite loop!)
- ✅ Always have a colon and indent everything inside

---

## 10. 🔂 For Loops

### ⚠️ CRITICAL: Colon (:) after for, indent the body!

```python
# Loop through numbers
for i in range(5):      # ← COLON!
    print(i)            # ← INDENT!
# Prints: 0 1 2 3 4

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:    # ← COLON!
    print(fruit)        # ← INDENT!

# Loop with range(start, stop, step)
for i in range(2, 10, 2):   # ← COLON!
    print(i)                 # ← INDENT!
# Prints: 2 4 6 8
```

**Common Mistakes:**
- ❌ `for i in range(5)` (missing colon)
- ❌ Not indenting the loop body
- ✅ Colon after `range()` or list, then indent

---

## 11. 🎯 Functions

### ⚠️ CRITICAL: Colon (:) after def, indent the entire function!

```python
# Basic function
def greet():            # ← COLON!
    print("Hello!")     # ← INDENT!

greet()  # Call it

# Function with parameters
def greet(name):        # ← COLON!
    print(f"Hi {name}!")  # ← INDENT!

greet("Alex")

# Function that returns a value
def add(x, y):          # ← COLON!
    return x + y        # ← INDENT!

result = add(5, 3)
print(result)  # 8
```

**Return vs Print:**
- `print()` = shows on screen, function gives back nothing
- `return` = gives back a value you can save and use

**Common Mistakes:**
- ❌ `def greet()` (missing colon)
- ❌ Not indenting function body
- ✅ Colon after `()`, indent everything inside

---

## 12. 💡 Quick Reference

```python
# Useful functions
len("hello")        # Length: 5
len([1, 2, 3])      # List length: 3
str(42)             # Make text: "42"
int("42")           # Make number: 42
float("3.14")       # Make decimal: 3.14
type(x)             # Check what type something is
```

---

## 13. ✅ Syntax Checklist

Before running your code, check:
- [ ] Every `if`, `elif`, `else`, `while`, `for`, and `def` has a **colon (:)**
- [ ] Everything inside is **indented** (4 spaces or 1 Tab)
- [ ] Indentation is **consistent** (all spaces OR all tabs, not mixed)
- [ ] Nested code is indented **one more level** than its parent
- [ ] Strings use **matching quotes** (`"hello"` or `'hello'`)
- [ ] Variables **don't have spaces** in names
- [ ] User input is **converted to numbers** when doing math

**Remember: Python is picky about indentation and colons!** 🎯
