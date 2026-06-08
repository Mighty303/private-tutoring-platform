"use client";

import CodeStepAnimation from "@/components/CodeStepAnimation";

const EXAMPLES = [
  {
    name: "3×3 Grid",
    code: [
      { line: 'for row in range(3):', indent: 0, type: 'outer-head' },
      { line: 'for col in range(3):', indent: 1, type: 'inner-head' },
      { line: 'print(f"({row},{col})", end=" ")', indent: 2, type: 'inner' },
      { line: 'print()  # new line', indent: 1, type: 'outer' },
    ],
    steps: [
      { lineIdx: 0, note: "Outer loop starts → row = 0", isOuter: true, vars: { row: 0 } },
      { lineIdx: 1, note: "Inner loop starts → col = 0", isInner: true, vars: { row: 0, col: 0 } },
      { lineIdx: 2, note: "Print (0,0)", output: "(0,0) ", isInner: true, vars: { row: 0, col: 0 } },
      { lineIdx: 1, note: "Inner loop continues → col = 1", isInner: true, vars: { row: 0, col: 1 } },
      { lineIdx: 2, note: "Print (0,1)", output: "(0,1) ", isInner: true, vars: { row: 0, col: 1 } },
      { lineIdx: 1, note: "Inner loop continues → col = 2", isInner: true, vars: { row: 0, col: 2 } },
      { lineIdx: 2, note: "Print (0,2)", output: "(0,2) ", isInner: true, vars: { row: 0, col: 2 } },
      { lineIdx: 3, note: "Inner loop done → print newline", isOuter: true, vars: { row: 0 }, output: "\n" },
      { lineIdx: 0, note: "Outer loop continues → row = 1", isOuter: true, vars: { row: 1 } },
      { lineIdx: 1, note: "Inner loop restarts → col = 0", isInner: true, vars: { row: 1, col: 0 } },
      { lineIdx: 2, note: "Print (1,0)", output: "(1,0) ", isInner: true, vars: { row: 1, col: 0 } },
      { lineIdx: 1, note: "Inner loop → col = 1", isInner: true, vars: { row: 1, col: 1 } },
      { lineIdx: 2, note: "Print (1,1)", output: "(1,1) ", isInner: true, vars: { row: 1, col: 1 } },
      { lineIdx: 1, note: "Inner loop → col = 2", isInner: true, vars: { row: 1, col: 2 } },
      { lineIdx: 2, note: "Print (1,2)", output: "(1,2) ", isInner: true, vars: { row: 1, col: 2 } },
      { lineIdx: 3, note: "Inner done → newline", isOuter: true, vars: { row: 1 }, output: "\n" },
      { lineIdx: 0, note: "Outer loop continues → row = 2", isOuter: true, vars: { row: 2 } },
      { lineIdx: 1, note: "Inner loop restarts → col = 0", isInner: true, vars: { row: 2, col: 0 } },
      { lineIdx: 2, note: "Print (2,0)", output: "(2,0) ", isInner: true, vars: { row: 2, col: 0 } },
      { lineIdx: 1, note: "Inner loop → col = 1", isInner: true, vars: { row: 2, col: 1 } },
      { lineIdx: 2, note: "Print (2,1)", output: "(2,1) ", isInner: true, vars: { row: 2, col: 1 } },
      { lineIdx: 1, note: "Inner loop → col = 2", isInner: true, vars: { row: 2, col: 2 } },
      { lineIdx: 2, note: "Print (2,2)", output: "(2,2) ", isInner: true, vars: { row: 2, col: 2 } },
      { lineIdx: 3, note: "All done! The outer loop ran 3 times, inner ran 3 times each = 9 prints", isOuter: true, vars: { row: 2 }, output: "\n" },
    ],
  },
  {
    name: "Triangle Pattern",
    code: [
      { line: 'for i in range(1, 4):', indent: 0, type: 'outer-head' },
      { line: 'for j in range(i):', indent: 1, type: 'inner-head' },
      { line: 'print("*", end="")', indent: 2, type: 'inner' },
      { line: 'print()  # new line', indent: 1, type: 'outer' },
    ],
    steps: [
      { lineIdx: 0, note: "Outer loop starts → i = 1", isOuter: true, vars: { i: 1 } },
      { lineIdx: 1, note: "Inner loop: range(1) → j goes 0", isInner: true, vars: { i: 1, j: 0 } },
      { lineIdx: 2, note: "Print one star", output: "*", isInner: true, vars: { i: 1, j: 0 } },
      { lineIdx: 3, note: "Newline → first row: *", isOuter: true, vars: { i: 1 }, output: "\n" },
      { lineIdx: 0, note: "Outer loop → i = 2", isOuter: true, vars: { i: 2 } },
      { lineIdx: 1, note: "Inner loop: range(2) → j goes 0, 1", isInner: true, vars: { i: 2, j: 0 } },
      { lineIdx: 2, note: "Print star #1", output: "*", isInner: true, vars: { i: 2, j: 0 } },
      { lineIdx: 1, note: "Inner loop → j = 1", isInner: true, vars: { i: 2, j: 1 } },
      { lineIdx: 2, note: "Print star #2", output: "*", isInner: true, vars: { i: 2, j: 1 } },
      { lineIdx: 3, note: "Newline → second row: **", isOuter: true, vars: { i: 2 }, output: "\n" },
      { lineIdx: 0, note: "Outer loop → i = 3", isOuter: true, vars: { i: 3 } },
      { lineIdx: 1, note: "Inner loop: range(3) → j goes 0, 1, 2", isInner: true, vars: { i: 3, j: 0 } },
      { lineIdx: 2, note: "Print star #1", output: "*", isInner: true, vars: { i: 3, j: 0 } },
      { lineIdx: 1, note: "Inner loop → j = 1", isInner: true, vars: { i: 3, j: 1 } },
      { lineIdx: 2, note: "Print star #2", output: "*", isInner: true, vars: { i: 3, j: 1 } },
      { lineIdx: 1, note: "Inner loop → j = 2", isInner: true, vars: { i: 3, j: 2 } },
      { lineIdx: 2, note: "Print star #3", output: "*", isInner: true, vars: { i: 3, j: 2 } },
      { lineIdx: 3, note: "Done! Triangle complete: *, **, ***", isOuter: true, vars: { i: 3 }, output: "\n" },
    ],
  },
  {
    name: "Teams & Players",
    code: [
      { line: 'teams = ["Red", "Blue"]', indent: 0, type: 'main' },
      { line: 'players = ["Ana", "Ben"]', indent: 0, type: 'main' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'for team in teams:', indent: 0, type: 'outer-head' },
      { line: 'for player in players:', indent: 1, type: 'inner-head' },
      { line: 'print(f"{player} → {team}")', indent: 2, type: 'inner' },
    ],
    steps: [
      { lineIdx: 0, note: "Create teams list", vars: { teams: '["Red","Blue"]' } },
      { lineIdx: 1, note: "Create players list", vars: { teams: '["Red","Blue"]', players: '["Ana","Ben"]' } },
      { lineIdx: 3, note: "Outer loop → team = \"Red\"", isOuter: true, vars: { team: '"Red"' } },
      { lineIdx: 4, note: "Inner loop → player = \"Ana\"", isInner: true, vars: { team: '"Red"', player: '"Ana"' } },
      { lineIdx: 5, note: "Print: Ana → Red", output: "Ana → Red", isInner: true, vars: { team: '"Red"', player: '"Ana"' } },
      { lineIdx: 4, note: "Inner loop → player = \"Ben\"", isInner: true, vars: { team: '"Red"', player: '"Ben"' } },
      { lineIdx: 5, note: "Print: Ben → Red", output: "Ben → Red", isInner: true, vars: { team: '"Red"', player: '"Ben"' } },
      { lineIdx: 3, note: "Outer loop → team = \"Blue\"", isOuter: true, vars: { team: '"Blue"' } },
      { lineIdx: 4, note: "Inner loop restarts → player = \"Ana\"", isInner: true, vars: { team: '"Blue"', player: '"Ana"' } },
      { lineIdx: 5, note: "Print: Ana → Blue", output: "Ana → Blue", isInner: true, vars: { team: '"Blue"', player: '"Ana"' } },
      { lineIdx: 4, note: "Inner loop → player = \"Ben\"", isInner: true, vars: { team: '"Blue"', player: '"Ben"' } },
      { lineIdx: 5, note: "Done! Every player paired with every team", output: "Ben → Blue", isInner: true, vars: { team: '"Blue"', player: '"Ben"' } },
    ],
  },
];

const LEGEND = [
  { color: "bg-sky-500/30 border border-sky-400", label: "Outer loop running" },
  { color: "bg-amber-500/30 border border-amber-400", label: "Inner loop running" },
];

export default function NestedLoopAnimation() {
  return (
    <CodeStepAnimation
      title="How Nested Loops Work"
      examples={EXAMPLES}
      accentColor="sky"
      legend={LEGEND}
    />
  );
}
