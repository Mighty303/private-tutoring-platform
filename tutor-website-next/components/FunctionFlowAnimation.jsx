"use client";

import CodeStepAnimation from "@/components/CodeStepAnimation";

const EXAMPLES = [
  {
    name: "Basic Function Call",
    code: [
      { line: 'def greet(name):', indent: 0, type: 'def' },
      { line: 'print(f"Hi {name}!")', indent: 1, type: 'body' },
      { line: 'print("Welcome!")', indent: 1, type: 'body' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'print("Start")', indent: 0, type: 'main' },
      { line: 'greet("Alex")', indent: 0, type: 'call' },
      { line: 'print("Done")', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 4, note: "Run line 5 → prints \"Start\"", output: "Start" },
      { lineIdx: 5, note: "Line 6 calls greet(\"Alex\") → jump into the function!", isCall: true },
      { lineIdx: 0, note: "Enter greet() — name = \"Alex\"", isInFunc: true },
      { lineIdx: 1, note: "Run line 2 inside greet() → prints \"Hi Alex!\"", output: "Hi Alex!", isInFunc: true },
      { lineIdx: 2, note: "Run line 3 inside greet() → prints \"Welcome!\"", output: "Welcome!", isInFunc: true },
      { lineIdx: 5, note: "Function done → jump back to where we called it", isReturn: true },
      { lineIdx: 6, note: "Continue to line 7 → prints \"Done\"", output: "Done" },
    ],
  },
  {
    name: "Return Value",
    code: [
      { line: 'def double(n):', indent: 0, type: 'def' },
      { line: 'result = n * 2', indent: 1, type: 'body' },
      { line: 'return result', indent: 1, type: 'body' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'x = 5', indent: 0, type: 'main' },
      { line: 'y = double(x)', indent: 0, type: 'call' },
      { line: 'print(y)', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 4, note: "Run line 5 → x = 5", vars: { x: 5 } },
      { lineIdx: 5, note: "Line 6 calls double(5) → jump in!", isCall: true, vars: { x: 5 } },
      { lineIdx: 0, note: "Enter double() — n = 5", isInFunc: true, vars: { x: 5, n: 5 } },
      { lineIdx: 1, note: "result = 5 * 2 = 10", isInFunc: true, vars: { x: 5, n: 5, result: 10 } },
      { lineIdx: 2, note: "return result → sends 10 back", isInFunc: true, isReturn: true, vars: { x: 5, n: 5, result: 10 } },
      { lineIdx: 5, note: "Back at line 6 → y = 10", vars: { x: 5, y: 10 } },
      { lineIdx: 6, note: "Run line 7 → prints 10", output: "10", vars: { x: 5, y: 10 } },
    ],
  },
  {
    name: "Two Function Calls",
    code: [
      { line: 'def add(a, b):', indent: 0, type: 'def' },
      { line: 'return a + b', indent: 1, type: 'body' },
      { line: '', indent: 0, type: 'blank' },
      { line: 'x = add(3, 4)', indent: 0, type: 'call' },
      { line: 'y = add(10, x)', indent: 0, type: 'call' },
      { line: 'print(y)', indent: 0, type: 'main' },
    ],
    steps: [
      { lineIdx: 3, note: "Line 4 calls add(3, 4) → jump in!", isCall: true },
      { lineIdx: 0, note: "Enter add() — a = 3, b = 4", isInFunc: true, vars: { a: 3, b: 4 } },
      { lineIdx: 1, note: "return 3 + 4 → sends 7 back", isInFunc: true, isReturn: true, vars: { a: 3, b: 4 } },
      { lineIdx: 3, note: "Back at line 4 → x = 7", vars: { x: 7 } },
      { lineIdx: 4, note: "Line 5 calls add(10, 7) → jump in again!", isCall: true, vars: { x: 7 } },
      { lineIdx: 0, note: "Enter add() — a = 10, b = 7", isInFunc: true, vars: { x: 7, a: 10, b: 7 } },
      { lineIdx: 1, note: "return 10 + 7 → sends 17 back", isInFunc: true, isReturn: true, vars: { x: 7, a: 10, b: 7 } },
      { lineIdx: 4, note: "Back at line 5 → y = 17", vars: { x: 7, y: 17 } },
      { lineIdx: 5, note: "Run line 6 → prints 17", output: "17", vars: { x: 7, y: 17 } },
    ],
  },
];

const LEGEND = [
  { color: "bg-violet-500/30 border border-violet-400", label: "Running this line" },
  { color: "bg-amber-500/30 border border-amber-400", label: "Jumping into function" },
  { color: "bg-emerald-500/30 border border-emerald-400", label: "Returning from function" },
];

export default function FunctionFlowAnimation() {
  return (
    <CodeStepAnimation
      title="How Function Calls Work"
      examples={EXAMPLES}
      accentColor="violet"
      legend={LEGEND}
    />
  );
}
