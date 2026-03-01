# Exercise 3: Build a Heap from Scratch 🔨

## Your Task

Implement a **MinHeap** class **without** using Python's `heapq` module. You need to write the core operations yourself:

1. **`bubble_up(i)`** — After inserting at the end, move the element up until the heap property is restored
2. **`bubble_down(i)`** — After removing the root, move the replacement element down until the heap property is restored
3. **`insert(val)`** — Add a value to the heap
4. **`extract_min()`** — Remove and return the smallest value
5. **`heapify(lst)`** — Turn an arbitrary list into a valid min-heap

**Heap property:** Every parent must be ≤ both of its children.

**Remember:** A heap is stored as a flat list where for index `i`:
- Parent: `(i - 1) // 2`
- Left child: `2 * i + 1`
- Right child: `2 * i + 2`

---

## Examples

```python
h = MinHeap()
h.insert(5)
h.insert(3)
h.insert(8)
h.insert(1)
print(h.extract_min())
# Output: 1
print(h.extract_min())
# Output: 3

h2 = MinHeap()
h2.heapify([9, 4, 7, 1, 3])
print(h2.extract_min())
# Output: 1
print(h2.extract_min())
# Output: 3
```

---

## Expected Complexity

| Operation | Time | Space |
|---|---|---|
| `insert` | O(log n) | O(1) |
| `extract_min` | O(log n) | O(1) |
| `bubble_up` | O(log n) | O(1) |
| `bubble_down` | O(log n) | O(1) |
| `heapify` | O(n) | O(1) |

**Why is heapify O(n)?** Most nodes are near the bottom and barely move. Only the few nodes near the top bubble down far. The math works out to O(n) total, not O(n log n).

---

## Starter Code

```python
class MinHeap:
    def __init__(self):
        self.data = []

    def bubble_up(self, i):
        # Your code here
        pass

    def bubble_down(self, i):
        # Your code here
        pass

    def insert(self, val):
        # Your code here
        pass

    def extract_min(self):
        # Your code here
        pass

    def heapify(self, lst):
        # Your code here
        pass

# Test insert + extract_min:
h = MinHeap()
for v in [5, 3, 8, 1, 4, 2, 7]:
    h.insert(v)
print(h.extract_min())
# Output: 1
print(h.extract_min())
# Output: 2
print(h.extract_min())
# Output: 3

# Test heapify:
h2 = MinHeap()
h2.heapify([9, 4, 7, 1, 3])
print(h2.extract_min())
# Output: 1
print(h2.extract_min())
# Output: 3
```

---

## Hints

<details>
<summary>💡 Hint 1 — bubble_up</summary>

Compare the node at index `i` with its parent at `(i - 1) // 2`. If the node is smaller, swap them and repeat from the parent's index. Stop when the node is >= its parent or you reach index 0.

</details>

<details>
<summary>💡 Hint 2 — bubble_down</summary>

From index `i`, find the left child (`2*i + 1`) and right child (`2*i + 2`). Find the smallest among the node and its children. If the smallest isn't the node itself, swap with the smallest child and repeat from that child's index.

</details>

<details>
<summary>💡 Hint 3 — insert and extract_min</summary>

**Insert:** Append to the end of the list, then `bubble_up` from the last index.

**Extract min:** Save `data[0]`, replace it with the last element (`data.pop()`), then `bubble_down` from index 0. Watch out for the empty heap case!

</details>

<details>
<summary>💡 Hint 4 — heapify</summary>

Set `self.data = lst`, then call `bubble_down` on every non-leaf node, **from the last non-leaf going backward to index 0**. The last non-leaf is at index `len(data) // 2 - 1`.

Why backwards? Because `bubble_down` assumes the subtrees below are already valid heaps. Going bottom-up guarantees this.

</details>

<details>
<summary>✅ Solution</summary>

```python
class MinHeap:
    def __init__(self):
        self.data = []

    def bubble_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.data[i] < self.data[parent]:
                self.data[i], self.data[parent] = self.data[parent], self.data[i]
                i = parent
            else:
                break

    def bubble_down(self, i):
        n = len(self.data)
        while True:
            smallest = i
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n and self.data[left] < self.data[smallest]:
                smallest = left
            if right < n and self.data[right] < self.data[smallest]:
                smallest = right

            if smallest != i:
                self.data[i], self.data[smallest] = self.data[smallest], self.data[i]
                i = smallest
            else:
                break

    def insert(self, val):
        self.data.append(val)
        self.bubble_up(len(self.data) - 1)

    def extract_min(self):
        if not self.data:
            return None
        if len(self.data) == 1:
            return self.data.pop()

        min_val = self.data[0]
        self.data[0] = self.data.pop()
        self.bubble_down(0)
        return min_val

    def heapify(self, lst):
        self.data = lst
        for i in range(len(self.data) // 2 - 1, -1, -1):
            self.bubble_down(i)
```

**Key insight:** `bubble_up` works upward (child → parent), `bubble_down` works downward (parent → children). Insert uses `bubble_up` because the new element is at the bottom. Extract uses `bubble_down` because the replacement is at the top.

</details>

---

## Bonus Challenge 🌟

Implement `peek()` (return min without removing) and `size()`, then convert your MinHeap into a **MaxHeap** by changing the comparison direction in `bubble_up` and `bubble_down`.
