import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

const fileMap = {
  // Saturday lessons
  cheatsheet: "saturdays/Cheatsheet.md",
  review: "saturdays/Review.md",
  review2: "saturdays/Review2.md",
  "nested-loops": "saturdays/NestedLoops.md",
  "nested-lists": "saturdays/NestedLists.md",

  // Loop exercises
  "loop-intro": "saturdays/loops/intro.md",
  "loop-ex1": "saturdays/loops/exercise1.md",
  "loop-ex2": "saturdays/loops/exercise2.md",
  "loop-ex3": "saturdays/loops/exercise3.md",
  "loop-ex4": "saturdays/loops/exercise4.md",
  "loop-tips": "saturdays/loops/tips.md",

  // Loop Part 2 exercises (break & continue)
  "loop2-intro": "saturdays/loops-2/intro.md",
  "loop2-ex1": "saturdays/loops-2/exercise1.md",
  "loop2-ex2": "saturdays/loops-2/exercise2.md",
  "loop2-ex3": "saturdays/loops-2/exercise3.md",
  "loop2-ex4": "saturdays/loops-2/exercise4.md",
  "loop2-tips": "saturdays/loops-2/tips.md",

  // Nested loop exercises
  "nloop-intro": "saturdays/nested-loops/intro.md",
  "nloop-ex1": "saturdays/nested-loops/exercise1.md",
  "nloop-ex2": "saturdays/nested-loops/exercise2.md",
  "nloop-ex3": "saturdays/nested-loops/exercise3.md",
  "nloop-ex4": "saturdays/nested-loops/exercise4.md",
  "nloop-tips": "saturdays/nested-loops/tips.md",

  // Nested list exercises
  "nlist-intro": "saturdays/nested-lists/intro.md",
  "nlist-ex1": "saturdays/nested-lists/exercise1.md",
  "nlist-ex2": "saturdays/nested-lists/exercise2.md",
  "nlist-ex3": "saturdays/nested-lists/exercise3.md",
  "nlist-ex4": "saturdays/nested-lists/exercise4.md",
  "nlist-tips": "saturdays/nested-lists/tips.md",

  // Function exercises
  "func-intro": "saturdays/functions/intro.md",
  "func-ex1": "saturdays/functions/exercise1.md",
  "func-ex2": "saturdays/functions/exercise2.md",
  "func-ex3": "saturdays/functions/exercise3.md",
  "func-ex4": "saturdays/functions/exercise4.md",
  "func-tips": "saturdays/functions/tips.md",

  // Discord bot exercises
  "func-discord1": "saturdays/functions/discord1.md",
  "func-discord2": "saturdays/functions/discord2.md",
  "func-discord3": "saturdays/functions/discord3.md",
  "func-discord4": "saturdays/functions/discord4.md",

  // Dictionary exercises
  "dict-ex0": "saturdays/dictionaries/exercise0.md",
  "dict-ex1": "saturdays/dictionaries/exercise1.md",
  "dict-ex2": "saturdays/dictionaries/exercise2.md",
  "dict-ex3": "saturdays/dictionaries/exercise3.md",
  "dict-ex4": "saturdays/dictionaries/exercise4.md",
  "dict-project-a": "saturdays/dictionaries/project-a.md",
  "dict-project-b": "saturdays/dictionaries/project-b.md",

  // Sunday lessons
  algorithms: "sundays/1. Algorithms.md",
  "dfs-bfs": "sundays/2. DFS_BFS.md",
  graphs: "sundays/3. Graphs.md",

  // Heap exercises
  "heap-intro": "sundays/heaps/intro.md",
  "heap-ex1": "sundays/heaps/exercise1.md",
  "heap-ex2": "sundays/heaps/exercise2.md",
  "heap-ex3": "sundays/heaps/exercise3.md",
  "heap-ex4": "sundays/heaps/exercise4.md",
  "heap-tips": "sundays/heaps/tips.md",

  // Heap Part 2 exercises
  "heap2-ex1": "sundays/heaps-2/exercise1.md",
  "heap2-ex2": "sundays/heaps-2/exercise2.md",
  "heap2-ex3": "sundays/heaps-2/exercise3.md",

  // Graph Part 2 exercises
  "graph2-ex1": "sundays/graphs-2/exercise1.md",
  "graph2-ex2": "sundays/graphs-2/exercise2.md",
  "graph2-ex3": "sundays/graphs-2/exercise3.md",

  // Sunday answers
  "algorithms-answers": "sundays/answers/1. Algorithms_answer.md",
  "dfs-bfs-answers": "sundays/answers/2. DFS_BFS_answers.md",
};

export function getContent(id) {
  const relativePath = fileMap[id];
  if (!relativePath) return null;
  const fullPath = path.join(contentDir, relativePath);
  try {
    return fs.readFileSync(fullPath, "utf8");
  } catch {
    return null;
  }
}

export function getAllContentIds() {
  return Object.keys(fileMap);
}
