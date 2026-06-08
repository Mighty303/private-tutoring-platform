
"use client";

import CodeStepAnimation from "@/components/CodeStepAnimation";

const EXAMPLES = [
  {
    name: "For Loop (range)",
    code: [
      { line: 'for i in range(4):', indent: 0, type: 'outer-head' },
      { line: 'print(i)', indent: 1, type: 'outer' },
    ],
    steps: [
      { lineIdx: 0, note: "Loop starts → i = 0", isOuter: true, vars: { i: 0 } },
      { lineIdx: 1, note: "Print 0", output: "0", isOuter: true, vars: { i: 0 } },
      { lineIdx: 0, note: "Loop continues → i = 1", isOuter: true, vars: { i: 1 } },
      { lineIdx: 1, note: "Print 1", output: "1", isOuter: true, vars: { i: 1 } },
      { lineIdx: 0, note: "Loop continues → i = 2", isOuter: true, vars: { i: 2 } },
      { lineIdx: 1, note: "Print 2", output: "2", isOuter: true, vars: { i: 2 } },
      { lineIdx: 0, note: "Loop continues → i = 3", isOuter: true, vars: { i: 3 } },
      { lineIdx: 1, note: "Print 3", output: "3", isOuter: true, vars: { i: 3 } },
      { lineIdx: 0, note: "range(4) exhausted — loop ends! i went through 0, 1, 2, 3", isOuter: true, vars: { i: 3 } },
    ],
  },
  {
    name: "While Loop",
    code: [
      { line: 'health = 3', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'while health > 0:', indent: 0, type: 'outer-head' },
      { line: 'print(f"HP: {health}")', indent: 1, type: 'outer' },
      { line: 'health -= 1', indent: 1, type: 'outer' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'print("Game over!")', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 0, note: "Set health to 3", vars: { health: 3 } },
      { lineIdx: 2, note: "Check: health (3) > 0? ✅ Yes → enter loop", isOuter: true, vars: { health: 3 } },
      { lineIdx: 3, note: "Print current HP", output: "HP: 3", isOuter: true, vars: { health: 3 } },
      { lineIdx: 4, note: "Subtract 1 → health becomes 2", isOuter: true, vars: { health: 2 } },
      { lineIdx: 2, note: "Check: health (2) > 0? ✅ Yes → loop again", isOuter: true, vars: { health: 2 } },
      { lineIdx: 3, note: "Print current HP", output: "HP: 2", isOuter: true, vars: { health: 2 } },
      { lineIdx: 4, note: "Subtract 1 → health becomes 1", isOuter: true, vars: { health: 1 } },
      { lineIdx: 2, note: "Check: health (1) > 0? ✅ Yes → loop again", isOuter: true, vars: { health: 1 } },
      { lineIdx: 3, note: "Print current HP", output: "HP: 1", isOuter: true, vars: { health: 1 } },
      { lineIdx: 4, note: "Subtract 1 → health becomes 0", isOuter: true, vars: { health: 0 } },
      { lineIdx: 2, note: "Check: health (0) > 0? ❌ No → exit loop!", isOuter: true, vars: { health: 0 } },
      { lineIdx: 6, note: "Loop ended. Print game over!", output: "Game over!", vars: { health: 0 } },
    ],
  },
  {
    name: "Loop Over List",
    code: [
      { line: 'items = ["sword", "shield", "potion"]', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'for item in items:', indent: 0, type: 'outer-head' },
      { line: 'print(f"Found: {item}")', indent: 1, type: 'outer' },
    ],
    steps: [
      { lineIdx: 0, note: "Create a list with 3 items", vars: { items: '["sword","shield","potion"]' } },
      { lineIdx: 2, note: "Loop starts → item = \"sword\" (first in list)", isOuter: true, vars: { item: 'sword' } },
      { lineIdx: 3, note: "Print: Found: sword", output: "Found: sword", isOuter: true, vars: { item: 'sword' } },
      { lineIdx: 2, note: "Next item → item = \"shield\"", isOuter: true, vars: { item: 'shield' } },
      { lineIdx: 3, note: "Print: Found: shield", output: "Found: shield", isOuter: true, vars: { item: 'shield' } },
      { lineIdx: 2, note: "Next item → item = \"potion\"", isOuter: true, vars: { item: 'potion' } },
      { lineIdx: 3, note: "Print: Found: potion", output: "Found: potion", isOuter: true, vars: { item: 'potion' } },
      { lineIdx: 2, note: "No more items in list — loop ends!", isOuter: true, vars: { item: 'potion' } },
    ],
  },
  {
    name: "Accumulator Pattern",
    code: [
      { line: 'total = 0', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'for i in range(1, 5):', indent: 0, type: 'outer-head' },
      { line: 'total += i', indent: 1, type: 'outer' },
      { line: 'print(f"+{i} → total = {total}")', indent: 1, type: 'outer' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'print(f"Sum: {total}")', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 0, note: "Start with total = 0", vars: { total: 0 } },
      { lineIdx: 2, note: "Loop starts → i = 1", isOuter: true, vars: { i: 1, total: 0 } },
      { lineIdx: 3, note: "Add i to total: 0 + 1 = 1", isOuter: true, vars: { i: 1, total: 1 } },
      { lineIdx: 4, note: "Print progress", output: "+1 → total = 1", isOuter: true, vars: { i: 1, total: 1 } },
      { lineIdx: 2, note: "Loop continues → i = 2", isOuter: true, vars: { i: 2, total: 1 } },
      { lineIdx: 3, note: "Add i to total: 1 + 2 = 3", isOuter: true, vars: { i: 2, total: 3 } },
      { lineIdx: 4, note: "Print progress", output: "+2 → total = 3", isOuter: true, vars: { i: 2, total: 3 } },
      { lineIdx: 2, note: "Loop continues → i = 3", isOuter: true, vars: { i: 3, total: 3 } },
      { lineIdx: 3, note: "Add i to total: 3 + 3 = 6", isOuter: true, vars: { i: 3, total: 6 } },
      { lineIdx: 4, note: "Print progress", output: "+3 → total = 6", isOuter: true, vars: { i: 3, total: 6 } },
      { lineIdx: 2, note: "Loop continues → i = 4", isOuter: true, vars: { i: 4, total: 6 } },
      { lineIdx: 3, note: "Add i to total: 6 + 4 = 10", isOuter: true, vars: { i: 4, total: 10 } },
      { lineIdx: 4, note: "Print progress", output: "+4 → total = 10", isOuter: true, vars: { i: 4, total: 10 } },
      { lineIdx: 6, note: "Loop done! 1+2+3+4 = 10", output: "Sum: 10", vars: { i: 4, total: 10 } },
    ],
  },
];

const LEGEND = [
  { color: "bg-sky-500/30 border border-sky-400", label: "Loop running" },
];

export default function LoopAnimation() {
  return (
    <CodeStepAnimation
      title="How Loops Work"
      examples={EXAMPLES}
      accentColor="emerald"
      legend={LEGEND}
    />
  );
}
