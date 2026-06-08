# Exercise 5: Find the Exit

You're exploring a dungeon with a series of rooms. Loop through the rooms and print what you find in each one. When you reach the room called `"exit"`, print a victory message and **stop exploring** using `break`.

Use this list of rooms:

```python
rooms = ["empty", "goblin", "empty", "treasure", "exit", "dragon", "empty"]
```

**Expected output:**
```
Room 1: empty
Room 2: goblin
Room 3: empty
Room 4: treasure
Room 5: exit - You found the exit!
Explored 5 rooms.
```

Notice that `"dragon"` and the last `"empty"` are never printed — the loop stopped at `"exit"`.

---

## Requirements

- Use a `for` loop to go through the rooms
- Use `break` to stop when you find `"exit"`
- Track how many rooms you explored
- No starter code — write the whole solution yourself!

---

## Hints

<details>
<summary>Hint 1 — How to number the rooms</summary>

You can use `enumerate()` to get both the index and the room name:

```python
for i, room in enumerate(rooms):
```

The room number for display is `i + 1` since `enumerate` starts at 0.

</details>

<details>
<summary>Hint 2 — When to break</summary>

Check if the current room is `"exit"` using an `if` statement. If it is, print the special message and `break`.

</details>

<details>
<summary>Hint 3 — Tracking rooms explored</summary>

You can use a counter variable that increments each loop, or you can use `i + 1` from `enumerate` after the loop ends (since `i` keeps its last value after a `for` loop).

</details>
