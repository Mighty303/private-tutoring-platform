# 💡 Heap Tips & Reference

## Time Complexities

| Operation | Time |
|-----------|------|
| Push | O(log n) |
| Pop | O(log n) |
| Peek (min/max) | O(1) |
| Heapify | O(n) |

---

## When to Use a Heap

- ✅ Need the min/max repeatedly
- ✅ K smallest/largest problems
- ✅ Priority-based processing
- ✅ Merging sorted sequences
- ✅ Running median/statistics

---

## Common Mistakes

- ❌ Forgetting Python's `heapq` is min-heap only
- ❌ Not negating values for max-heap
- ❌ Accessing `heap[0]` on an empty heap
- ❌ Assuming heap is fully sorted (it's NOT!)

---

## Debug Checklist

- [ ] Am I using min-heap or max-heap?
- [ ] Did I heapify before operations?
- [ ] Am I checking for empty heap before popping?
- [ ] Is my bubble up/down comparing correctly?

---

## 🌟 What's Next?

After mastering heaps:
- **Dijkstra's Algorithm** — Shortest paths using heaps
- **Huffman Coding** — Data compression with heaps
- **A* Search** — Pathfinding in games
- **Advanced priority queues** — With decrease-key operations

**Heaps are everywhere in algorithms — keep practicing! 🚀**

---

## ✅ Quick Check

Test your understanding:
1. What is the heap property for a min-heap?
2. For a node at index `i`, where is its left child?
3. What's the time complexity of inserting into a heap?
4. How do you implement a max-heap in Python?
5. What's the difference between a heap and a sorted list?

**Answers:**
1. Parent ≤ both children
2. `2 * i + 1`
3. O(log n)
4. Negate values when pushing/popping with `heapq`
5. Heap only guarantees root is min/max; not fully sorted. Insert/delete is O(log n) vs O(n) for sorted list.
