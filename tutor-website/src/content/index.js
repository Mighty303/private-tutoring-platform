// Import Saturday lessons
import cheatsheet from "./saturdays/Cheatsheet.md?raw";
import review from "./saturdays/Review.md?raw";
import review2 from "./saturdays/Review2.md?raw";
import functions from "./saturdays/Functions.md?raw";

// Import Dictionary exercises
import dictEx0 from "./saturdays/dictionaries/exercise0.md?raw";
import dictEx1 from "./saturdays/dictionaries/exercise1.md?raw";
import dictEx2 from "./saturdays/dictionaries/exercise2.md?raw";
import dictEx3 from "./saturdays/dictionaries/exercise3.md?raw";
import dictEx4 from "./saturdays/dictionaries/exercise4.md?raw";
import dictProjectA from "./saturdays/dictionaries/project-a.md?raw";
import dictProjectB from "./saturdays/dictionaries/project-b.md?raw";

// Import Sunday lessons
import algorithms from "./sundays/1. Algorithms.md?raw";
import dfsBfs from "./sundays/2. DFS_BFS.md?raw";
import graphs from "./sundays/3. Graphs.md?raw";

// Import Sunday answers
import algorithmsAnswer from "./sundays/answers/1. Algorithms_answer.md?raw";
import dfsBfsAnswers from "./sundays/answers/2. DFS_BFS_answers.md?raw";

const contentMap = {
  // Saturday lessons
  cheatsheet,
  review,
  review2,
  functions,

  // Dictionary exercises
  "dict-ex0": dictEx0,
  "dict-ex1": dictEx1,
  "dict-ex2": dictEx2,
  "dict-ex3": dictEx3,
  "dict-ex4": dictEx4,
  "dict-project-a": dictProjectA,
  "dict-project-b": dictProjectB,

  // Sunday lessons
  algorithms,
  "dfs-bfs": dfsBfs,
  graphs,

  // Sunday answers
  "algorithms-answers": algorithmsAnswer,
  "dfs-bfs-answers": dfsBfsAnswers,
};

export default contentMap;
