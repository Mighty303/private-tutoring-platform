"use client";

import CodeStepAnimation from "@/components/CodeStepAnimation";

const EXAMPLES = [
  {
    name: "Accessing Elements",
    code: [
      { line: 'grid = [', indent: 0, type: 'main' },
      { line: '[1, 2, 3],', indent: 1, type: 'main' },
      { line: '[4, 5, 6],', indent: 1, type: 'main' },
      { line: '[7, 8, 9]', indent: 1, type: 'main' },
      { line: ']', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'print(grid[0])', indent: 0, type: 'main' },
      { line: 'print(grid[0][1])', indent: 0, type: 'main' },
      { line: 'print(grid[2][0])', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 0, note: "Create a 2D grid (a list of lists)", vars: { grid: "[[1,2,3],[4,5,6],[7,8,9]]" } },
      { lineIdx: 6, note: "grid[0] → the entire first row: [1, 2, 3]", output: "[1, 2, 3]", vars: { grid: "[[1,2,3],[4,5,6],[7,8,9]]" } },
      { lineIdx: 7, note: "grid[0][1] → row 0, column 1 → 2", output: "2", vars: { grid: "[[1,2,3],[4,5,6],[7,8,9]]" } },
      { lineIdx: 8, note: "grid[2][0] → row 2, column 0 → 7", output: "7", vars: { grid: "[[1,2,3],[4,5,6],[7,8,9]]" } },
    ],
  },
  {
    name: "Looping Through Grid",
    code: [
      { line: 'grid = [[1, 2], [3, 4]]', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'for row in grid:', indent: 0, type: 'outer-head' },
      { line: 'for item in row:', indent: 1, type: 'inner-head' },
      { line: 'print(item, end=" ")', indent: 2, type: 'inner' },
      { line: 'print()  # new line', indent: 1, type: 'outer' },
    ],
    steps: [
      { lineIdx: 0, note: "Create a 2×2 grid", vars: { grid: "[[1,2],[3,4]]" } },
      { lineIdx: 2, note: "Outer loop → row = [1, 2] (first row)", isOuter: true, vars: { row: "[1, 2]" } },
      { lineIdx: 3, note: "Inner loop → item = 1", isInner: true, vars: { row: "[1, 2]", item: 1 } },
      { lineIdx: 4, note: "Print 1", output: "1 ", isInner: true, vars: { row: "[1, 2]", item: 1 } },
      { lineIdx: 3, note: "Inner loop → item = 2", isInner: true, vars: { row: "[1, 2]", item: 2 } },
      { lineIdx: 4, note: "Print 2", output: "2 ", isInner: true, vars: { row: "[1, 2]", item: 2 } },
      { lineIdx: 5, note: "Row done → newline", isOuter: true, output: "\n" },
      { lineIdx: 2, note: "Outer loop → row = [3, 4] (second row)", isOuter: true, vars: { row: "[3, 4]" } },
      { lineIdx: 3, note: "Inner loop → item = 3", isInner: true, vars: { row: "[3, 4]", item: 3 } },
      { lineIdx: 4, note: "Print 3", output: "3 ", isInner: true, vars: { row: "[3, 4]", item: 3 } },
      { lineIdx: 3, note: "Inner loop → item = 4", isInner: true, vars: { row: "[3, 4]", item: 4 } },
      { lineIdx: 4, note: "Print 4", output: "4 ", isInner: true, vars: { row: "[3, 4]", item: 4 } },
      { lineIdx: 5, note: "Done! We visited every item in the 2D list", isOuter: true, output: "\n" },
    ],
  },
  {
    name: "Searching a Grid",
    code: [
      { line: 'grid = [["A", "B"], ["C", "D"]]', indent: 0, type: 'main' },
      { line: 'target = "C"', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'for r in range(len(grid)):', indent: 0, type: 'outer-head' },
      { line: 'for c in range(len(grid[r])):', indent: 1, type: 'inner-head' },
      { line: 'if grid[r][c] == target:', indent: 2, type: 'inner' },
      { line: 'print(f"Found at ({r},{c})")', indent: 3, type: 'inner' },
    ],
    steps: [
      { lineIdx: 0, note: "Create 2×2 grid of letters", vars: { grid: '[["A","B"],["C","D"]]' } },
      { lineIdx: 1, note: "We're searching for \"C\"", vars: { target: '"C"' } },
      { lineIdx: 3, note: "Outer loop → r = 0 (row 0)", isOuter: true, vars: { r: 0 } },
      { lineIdx: 4, note: "Inner loop → c = 0", isInner: true, vars: { r: 0, c: 0 } },
      { lineIdx: 5, note: "grid[0][0] = \"A\" — not \"C\", skip", isInner: true, vars: { r: 0, c: 0, "grid[r][c]": '"A"' } },
      { lineIdx: 4, note: "Inner loop → c = 1", isInner: true, vars: { r: 0, c: 1 } },
      { lineIdx: 5, note: "grid[0][1] = \"B\" — not \"C\", skip", isInner: true, vars: { r: 0, c: 1, "grid[r][c]": '"B"' } },
      { lineIdx: 3, note: "Outer loop → r = 1 (row 1)", isOuter: true, vars: { r: 1 } },
      { lineIdx: 4, note: "Inner loop → c = 0", isInner: true, vars: { r: 1, c: 0 } },
      { lineIdx: 5, note: "grid[1][0] = \"C\" — MATCH!", isInner: true, vars: { r: 1, c: 0, "grid[r][c]": '"C"' } },
      { lineIdx: 6, note: "Found \"C\" at position (1, 0)!", output: "Found at (1,0)", isInner: true, vars: { r: 1, c: 0 } },
      { lineIdx: 4, note: "Inner loop → c = 1", isInner: true, vars: { r: 1, c: 1 } },
      { lineIdx: 5, note: "grid[1][1] = \"D\" — not \"C\". Done searching!", isInner: true, vars: { r: 1, c: 1, "grid[r][c]": '"D"' } },
    ],
  },
];

const LEGEND = [
  { color: "bg-rose-500/30 border border-rose-400", label: "Outer loop (rows)" },
  { color: "bg-amber-500/30 border border-amber-400", label: "Inner loop (columns/items)" },
];

export default function NestedListAnimation() {
  return (
    <CodeStepAnimation
      title="How Nested Lists Work"
      examples={EXAMPLES}
      accentColor="rose"
      legend={LEGEND}
    />
  );
}
