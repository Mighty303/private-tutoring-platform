# Exercise 9: Task Scheduler ⏰
`🎯 Functions` `📋 Lists` `🔀 Conditionals`

**Your Task:**
Write a function `process_tasks(tasks)` that:
- Takes a list of (priority, task_name) tuples
- Lower number = higher priority
- Returns list of task names in the order they should be processed

**Examples:**
```python
tasks = [(3, "Email"), (1, "Fire"), (2, "Meeting"), (1, "Crash")]
print(process_tasks(tasks))
# Output: ["Fire", "Crash", "Meeting", "Email"]
```

**Hint:** Push into a heap and pop in order!
