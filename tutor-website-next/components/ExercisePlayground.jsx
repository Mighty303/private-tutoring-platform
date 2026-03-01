"use client";

import { useMemo } from "react";
import PythonPlayground from "./PythonPlayground";

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
 * Extracts test cases from exercise markdown.
 * Looks for patterns like:
 *   print(func(args))  # Should print: value
 *   print(func(args))  # Output: value
 *   print(func(args))
 *   # Output: value
 *
 * Returns: Array<{ input: string, expected: string }>
 */
function extractTestCases(markdown) {
  if (!markdown) return [];

  const testCases = [];

  // Strip out Bonus Challenge section and <details> blocks (hints/solutions)
  // so we only extract test cases from Examples and Starter Code
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
  const starterCode = useMemo(() => extractStarterCode(content), [content]);
  const exerciseDescription = useMemo(
    () => extractExerciseDescription(content),
    [content]
  );
  const testCases = useMemo(() => extractTestCases(content), [content]);

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💻</span>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Try it yourself
        </h2>
      </div>
      <PythonPlayground
        starterCode={starterCode}
        title={title ? `Code: ${title}` : "Code Editor"}
        exerciseId={exerciseId}
        exerciseDescription={exerciseDescription}
        testCases={testCases}
      />
    </div>
  );
}
