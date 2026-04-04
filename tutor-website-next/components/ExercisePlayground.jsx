"use client";

import { useMemo } from "react";
import PythonPlayground from "./PythonPlayground";

/**
 * Removes lines that are auto-run as hidden tests (LeetCode-style: tests not in editor).
 * Patterns must stay in sync with extractTestCases().
 */
/**
 * Strips legacy inline test patterns (e.g. # Should print:) from editor-only code.
 */
function stripLegacyPrintTests(code) {
  if (!code) return code;
  const lines = code.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineTrim = line.trim();
    if (/^#\s*Test your function/i.test(lineTrim)) continue;

    const inlineMatch = lineTrim.match(
      /^print\(.+\)\s*#\s*(?:Should print|Output|Expected|=>|→)\s*:\s*(.+)/i
    );
    if (inlineMatch) continue;

    if (lineTrim.startsWith("print(") && !lineTrim.includes("#")) {
      const nextLine = (lines[i + 1] || "").trim();
      const commentMatch = nextLine.match(
        /^#\s*(?:Should print|Output|Expected|=>|→)\s*:\s*(.+)/i
      );
      if (commentMatch) {
        i += 1;
        continue;
      }
    }
    out.push(line);
  }
  return out.join("\n").replace(/\n+$/, "");
}

function stripTestLinesFromStarter(code) {
  if (!code) return code;
  const lines = code.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const lineTrim = lines[i].trim();
    // Tree / multi-line exercises: "# Test 1: ..." through end of block are hidden tests
    if (/^#\s*Test\s*\d+\s*:/i.test(lineTrim)) {
      break;
    }
    out.push(lines[i]);
  }
  return stripLegacyPrintTests(out.join("\n"));
}

/**
 * Extracts starter code from exercise markdown.
 */
function extractStarterCode(markdown) {
  if (!markdown) return "# Write your code here\n";

  // 1. Explicit "Starter Code" section
  const starterMatch = markdown.match(
    /##\s*Starter\s*Code[\s\S]*?```python\n([\s\S]*?)```/i
  );
  if (starterMatch) return starterMatch[1].trim();

  // 2. Collect all Python code blocks
  const allBlocks = [];
  const blockRegex = /```python\n([\s\S]*?)```/g;
  let m;
  while ((m = blockRegex.exec(markdown)) !== null) {
    allBlocks.push(m[1].trim());
  }

  // Look for a block that contains a function/class stub (has "pass" or "# Your code")
  const stubBlock = allBlocks.find(
    (b) =>
      (b.includes("def ") || b.includes("class ")) &&
      (b.includes("pass") || b.toLowerCase().includes("your code"))
  );
  if (stubBlock) return stubBlock;

  // 3. Try to extract function name from the task description and build a stub
  const funcNameMatch = markdown.match(
    /(?:write|create|implement|define)\s+(?:a\s+)?function\s+`?(\w+)`?\s*\(([^)]*)\)/i
  );
  if (funcNameMatch) {
    const funcName = funcNameMatch[1];
    const params = funcNameMatch[2];
    const exampleBlock = allBlocks.find((b) => b.includes(`${funcName}(`));
    const testLines = exampleBlock
      ? "\n\n# Test your function:\n" +
        exampleBlock
          .split("\n")
          .filter((line) => line.trim() && !line.trim().startsWith("#"))
          .join("\n")
      : "";

    return `def ${funcName}(${params}):\n    # Your code here\n    pass${testLines}\n`;
  }

  // 4. Fallback
  return "# Write your code here\n";
}

/**
 * Extracts a concise exercise description from markdown for the AI hint prompt.
 */
function extractExerciseDescription(markdown) {
  if (!markdown) return "";

  const taskSection = markdown.split(/##\s*(?:Hints|Solution)|<details>/i)[0] || markdown;

  return taskSection
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 800);
}

/**
 * Extracts input lines for exercises that use input().
 * Looks for "## Input Lines (for browser)" section.
 * Returns: string[] or empty array
 */
function extractInputLines(markdown) {
  if (!markdown) return [];
  const match = markdown.match(
    /##\s*Input\s*Lines\s*\(for\s*browser\)\s*\n([\s\S]*?)(?=\n##\s|$)/i
  );
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Extracts test cases from exercise markdown.
 * Looks for patterns like:
 *   print(func(args))  # Should print: value
 *   print(func(args))  # Output: value
 *   print(func(args))
 *   # Output: value
 *
 * Returns: Array<{ input: string, expected: string }>
 */
function extractExpectedOutput(markdown) {
  if (!markdown) return null;
  const match = markdown.match(
    /##\s*Example\s*Output\s*\n+```\s*\n([\s\S]*?)```/i
  );
  return match ? match[1].trim() : null;
}

/**
 * Parses "## Starter Code" blocks that use "# Test 1: ..." sections (trees, etc.).
 * Last line of each section must be `... # expected` (Python line comment).
 */
function extractSnippetTestsFromStarter(markdown) {
  const starterMatch = markdown.match(
    /##\s*Starter\s*Code[\s\S]*?```python\n([\s\S]*?)```/i
  );
  if (!starterMatch) return [];

  const block = starterMatch[1];
  const lines = block.split("\n");
  const tests = [];
  let i = 0;
  while (i < lines.length) {
    const lineTrim = lines[i].trim();
    if (!/^#\s*Test\s*\d+\s*:/i.test(lineTrim)) {
      i += 1;
      continue;
    }
    const title = lineTrim;
    i += 1;
    const chunkLines = [];
    while (i < lines.length && !/^#\s*Test\s*\d+\s*:/i.test(lines[i].trim())) {
      chunkLines.push(lines[i]);
      i += 1;
    }
    const chunk = chunkLines.join("\n").trim();
    if (!chunk) continue;

    const chunkLinesArray = chunk.split("\n");
    const lastLine = chunkLinesArray[chunkLinesArray.length - 1];
    const sep = lastLine.lastIndexOf(" # ");
    if (sep === -1) continue;

    const lastLineCode = lastLine.slice(0, sep).trimEnd();
    const expected = lastLine.slice(sep + 3).trim();
    const snippet =
      chunkLinesArray.length === 1
        ? lastLineCode
        : `${chunkLinesArray.slice(0, -1).join("\n")}\n${lastLineCode}`.trim();

    tests.push({
      type: "snippet",
      snippet,
      expected,
      input: title,
    });
  }
  return tests;
}

function extractTestCases(markdown, inputLines = []) {
  if (!markdown) return [];

  const snippetTests = extractSnippetTestsFromStarter(markdown);
  const testCases = [];

  // Output-based test from Example Output (for procedural exercises)
  const expectedOutput = extractExpectedOutput(markdown);
  if (expectedOutput) {
    testCases.push({
      type: "output",
      input: "(run full program)",
      expected: expectedOutput,
      inputLines,
    });
  }

  if (snippetTests.length > 0) {
    return [...testCases, ...snippetTests];
  }

  // Function-style tests
  let cleaned = markdown
    .replace(/##\s*Bonus\s*Challenge[\s\S]*/i, "")
    .replace(/<details>[\s\S]*?<\/details>/g, "");

  const allBlocks = [];
  const blockRegex = /```python\n([\s\S]*?)```/g;
  let m;
  while ((m = blockRegex.exec(cleaned)) !== null) {
    allBlocks.push(m[1]);
  }

  for (const block of allBlocks) {
    const lines = block.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Pattern 1: print(func(args))   # Should print: value
      //            print(func(args))   # Output: value
      const inlineMatch = line.match(
        /^(print\(.+\))\s*#\s*(?:Should print|Output|Expected|=>|→)\s*:\s*(.+)/i
      );
      if (inlineMatch) {
        testCases.push({
          input: inlineMatch[1].trim(),
          expected: inlineMatch[2].trim(),
        });
        continue;
      }

      // Pattern 2: print(func(args)) on one line, # Output: value on next line
      if (line.startsWith("print(") && !line.includes("#")) {
        const nextLine = (lines[i + 1] || "").trim();
        const commentMatch = nextLine.match(
          /^#\s*(?:Should print|Output|Expected|=>|→)\s*:\s*(.+)/i
        );
        if (commentMatch) {
          testCases.push({
            input: line,
            expected: commentMatch[1].trim(),
          });
          continue;
        }
      }
    }
  }

  return testCases;
}

export default function ExercisePlayground({ content, exerciseId, title }) {
  const starterCode = useMemo(
    () => stripTestLinesFromStarter(extractStarterCode(content)),
    [content]
  );
  const exerciseDescription = useMemo(
    () => extractExerciseDescription(content),
    [content]
  );
  const inputLines = useMemo(() => extractInputLines(content), [content]);
  const testCases = useMemo(
    () => extractTestCases(content, inputLines),
    [content, inputLines]
  );

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-slate-500 dark:text-slate-400" aria-hidden>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Try it yourself
        </h2>
      </div>
      <PythonPlayground
        starterCode={starterCode}
        stripEditorCode={stripTestLinesFromStarter}
        title={title ? `Code: ${title}` : "Code Editor"}
        exerciseId={exerciseId}
        exerciseDescription={exerciseDescription}
        testCases={testCases}
        inputLines={inputLines}
      />
    </div>
  );
}
