"use client";

import { useMemo } from "react";
import DiscordPlayground from "@/components/DiscordPlayground";

function extractStarterCode(markdown) {
  if (!markdown) return "# Write your code here\n";

  const starterMatch = markdown.match(
    /##\s*Starter\s*Code[\s\S]*?```python\n([\s\S]*?)```/i
  );
  if (starterMatch) return starterMatch[1].trim();

  const allBlocks = [];
  const blockRegex = /```python\n([\s\S]*?)```/g;
  let m;
  while ((m = blockRegex.exec(markdown)) !== null) {
    allBlocks.push(m[1].trim());
  }

  const stubBlock = allBlocks.find(
    (b) =>
      (b.includes("def ") || b.includes("class ")) &&
      (b.includes("pass") || b.toLowerCase().includes("your code"))
  );
  if (stubBlock) return stubBlock;

  return "# Write your code here\n";
}

export default function DiscordExercisePlayground({ content, exerciseId, title }) {
  const starterCode = useMemo(() => extractStarterCode(content), [content]);

  return (
    <div className="mt-8 pt-6 border-t border-[#5865F2]/20">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.02.01.05 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.05.02.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
        </svg>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Try it — then send to Discord!
        </h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Write your code below. Click <strong>Run</strong> to test locally, then click{" "}
        <strong className="text-[#5865F2]">Send to Discord</strong> to have the bot post your output to the server!
      </p>
      <DiscordPlayground
        starterCode={starterCode}
        title={title ? `Code: ${title}` : "Discord Bot Code"}
        exerciseId={exerciseId}
      />
    </div>
  );
}
