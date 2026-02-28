# Tips & Common Mistakes

## Tip 1: Off-by-One Errors

The most common loop bug! Remember: `range(5)` gives `0, 1, 2, 3, 4` — it stops **before** 5.

```python
# ❌ Prints 0 to 4 (not 1 to 5)
for i in range(5):
    print(i)

# ✅ Prints 1 to 5
for i in range(1, 6):
    print(i)
```

---

## Tip 2: Infinite While Loops

If you forget to update the condition variable, the loop runs forever:

```python
# ❌ Infinite loop — count never changes!
count = 0
while count < 5:
    print(count)

# ✅ Fixed — count increases each time
count = 0
while count < 5:
    print(count)
    count += 1
```

If your program freezes, you probably have an infinite loop. Press **Ctrl+C** to stop it.

---

## Tip 3: Modifying a List While Looping

Don't add or remove items from a list while looping over it — this causes unexpected behavior:

```python
# ❌ Dangerous — skips items!
items = [1, 2, 3, 4, 5]
for item in items:
    if item % 2 == 0:
        items.remove(item)

# ✅ Safe — loop over a copy
items = [1, 2, 3, 4, 5]
for item in items[:]:
    if item % 2 == 0:
        items.remove(item)
```

---

## Tip 4: Using `for` vs `while`

- **Use `for`** when you know how many times to loop (or looping over a list)
- **Use `while`** when you're waiting for something to happen

```python
# for — known count
for i in range(10):
    print(i)

# while — unknown count (depends on user)
password = ""
while password != "secret":
    password = input("Password: ")
```

---

## Tip 5: The Accumulator Pattern

Start with an initial value and build it up inside the loop:

```python
# Sum of numbers
total = 0
for n in [10, 20, 30]:
    total += n
print(total)  # 60

# Building a string
message = ""
for word in ["Hello", "World"]:
    message += word + " "
print(message)  # "Hello World "

# Collecting into a list
evens = []
for i in range(10):
    if i % 2 == 0:
        evens.append(i)
print(evens)  # [0, 2, 4, 6, 8]
```

---

## Debugging Loops

When your loop isn't working right:

1. **Print the loop variable** to see what values it takes
2. **Add a counter** to check how many times it runs
3. **Check your range** — write out the first few values by hand
4. **Test with small inputs** — use `range(3)` instead of `range(100)` while debugging
