# Exercise 2: CCC — Bronze Count 🥉

## Problem J3: Bronze Count

After completing a competition, you are struck with curiosity: **How many participants were awarded bronze level?**

- **Gold** is awarded to all participants who achieve the **highest** score.
- **Silver** is awarded to all participants who achieve the **second highest** score.
- **Bronze** is awarded to all participants who achieve the **third highest** score.

Given a list of all the scores, determine the score required for bronze level and how many participants achieved this score.

There will always be **at least three distinct scores**.

---

## Input / Output

**Input:** A list of integer scores (each between 0 and 1,000,000).

**Output:** Print the bronze score and the count, separated by a space.

---

## Examples

```python
print(bronze_count([70, 62, 58, 73]))
# Output: 62 1

print(bronze_count([75, 70, 60, 70, 70, 60, 75, 70]))
# Output: 60 2
```

**Example 1 explained:** The scores sorted descending are `[73, 70, 62, 58]`. Gold = 73, Silver = 70, Bronze = 62. One participant scored 62.

**Example 2 explained:** The unique scores sorted descending are `[75, 70, 60]`. Gold = 75, Silver = 70, Bronze = 60. Two participants scored 60.

---

## Expected Complexity

| | Complexity |
|---|---|
| **Time** | O(n) using a heap or set, or O(n log n) with sorting |
| **Space** | O(n) |

Where `n` is the number of participants.

**Heap approach:** Use a max-heap (negate trick) or `heapq.nlargest(3, set(scores))` to find the 3rd highest distinct score in O(n) time, then count its occurrences.

---

## Starter Code

```python
import heapq

def bronze_count(scores):
    # Your code here
    pass

# Test your function:
print(bronze_count([70, 62, 58, 73]))
# Output: 62 1

print(bronze_count([75, 70, 60, 70, 70, 60, 75, 70]))
# Output: 60 2

print(bronze_count([100, 90, 80, 80, 70, 70, 70]))
# Output: 80 2
```

---

## Hints

<details>
<summary>💡 Hint 1</summary>

You need the **3rd highest distinct score**. First, get the unique scores using `set()`.

</details>

<details>
<summary>💡 Hint 2</summary>

`heapq.nlargest(3, unique_scores)` gives you the top 3 distinct scores. The last one is bronze!

</details>

<details>
<summary>💡 Hint 3</summary>

Once you have the bronze score, use `scores.count(bronze_score)` or a `Counter` to find how many participants achieved it.

</details>

<details>
<summary>✅ Solution — Heap approach</summary>

```python
import heapq

def bronze_count(scores):
    unique = set(scores)
    top3 = heapq.nlargest(3, unique)
    bronze_score = top3[2]
    count = scores.count(bronze_score)
    return f"{bronze_score} {count}"
```

**Why this works:**
1. `set(scores)` removes duplicates — O(n)
2. `heapq.nlargest(3, unique)` finds the 3 highest distinct scores — O(n) since k=3 is constant
3. `scores.count(bronze_score)` counts occurrences — O(n)

**Total: O(n) time, O(n) space.**

</details>

<details>
<summary>✅ Solution — Sorting approach</summary>

```python
def bronze_count(scores):
    unique_sorted = sorted(set(scores), reverse=True)
    bronze_score = unique_sorted[2]
    count = scores.count(bronze_score)
    return f"{bronze_score} {count}"
```

**Time:** O(n log n) due to sorting. Simpler but less efficient for large inputs.

</details>

<details>
<summary>✅ Solution — CCC-style with stdin</summary>

```python
import heapq

n = int(input())
scores = [int(input()) for _ in range(n)]

unique = set(scores)
top3 = heapq.nlargest(3, unique)
bronze = top3[2]
print(f"{bronze} {scores.count(bronze)}")
```

This is how you'd submit it for CCC — reading from standard input.

</details>

---

## Bonus Challenge 🌟

Can you solve this **without** using `set()` or sorting? Use only a heap to track the top 3 distinct scores as you process the input.

```python
def bronze_count_stream(scores):
    # Process scores one at a time, maintaining top 3 distinct
    pass
```
