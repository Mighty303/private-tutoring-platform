import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

const fileMap = {
  // Saturday lessons
  cheatsheet: "saturdays/Cheatsheet.md",
  review: "saturdays/Review.md",
  review2: "saturdays/Review2.md",
  functions: "saturdays/Functions.md",

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
