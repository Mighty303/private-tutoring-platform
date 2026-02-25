"use client";

import { useMemo } from "react";
import PythonPlayground from "./PythonPlayground";

/**
 * Extracts starter code from exercise markdown.
 * Priority:
 *   1. Code block under a "## Starter Code" heading
 *   2. Code block that contains "def " or "class " (likely a template)
 *   3. A generated stub from the task description
 *   4. Generic placeholder
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
    // Find example print() calls to append as test code
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
 * Takes the title + task section, strips code blocks and HTML.
 */
function extractExerciseDescription(markdown) {
  if (!markdown) return "";

  // Get everything up to the first "## Hints" or "## Solution" or "<details>"
  const taskSection = markdown.split(/##\s*(?:Hints|Solution)|<details>/i)[0] || markdown;

  // Strip code blocks, HTML tags, image links, and excessive whitespace
  return taskSection
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 800); // Cap length for the prompt
}

export default function ExercisePlayground({ content, exerciseId, title }) {
  const starterCode = useMemo(() => extractStarterCode(content), [content]);
  const exerciseDescription = useMemo(
    () => extractExerciseDescription(content),
    [content]
  );

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
      />
    </div>
  );
}
