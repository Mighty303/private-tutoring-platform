export const saturdayLessons = [
  {
    id: "cheatsheet",
    title: "Python Basics Cheatsheet",
    emoji: "🐍",
    description: "Quick reference guide for all Python basics — variables, loops, functions, dictionaries, and more.",
    tags: ["Reference", "Beginner"],
    color: "indigo",
  },
  {
    id: "review",
    title: "Review Exercises",
    emoji: "🎮",
    description: "8 hands-on exercises covering character stats, math, input, conditionals, loops, lists, and functions.",
    tags: ["Exercises", "Review"],
    color: "emerald",
  },
  {
    id: "review2",
    title: "Review Exercises Part 2",
    emoji: "🎮",
    description: "More practice with conditionals, lists, loops, functions, and a bonus battle challenge.",
    tags: ["Exercises", "Review"],
    color: "teal",
  },
  {
    id: "functions",
    title: "Functions Practice",
    emoji: "⚙️",
    description: "Advanced function exercises with a problem-solving framework — XP calculators, health systems, spam detectors, and more.",
    tags: ["Functions", "Intermediate"],
    color: "violet",
  },
];

export const dictionaryExercises = [
  {
    id: "dict-ex0",
    title: "Dictionary Basics",
    emoji: "📚",
    description: "Game characters, pet stats, high scores, and a mini item shop project.",
    tags: ["Dictionaries", "Beginner"],
    color: "amber",
  },
  {
    id: "dict-ex1",
    title: "Roblox Catalog Shop",
    emoji: "🎮",
    description: "Create a catalog with Roblox items and prices, update and display them.",
    tags: ["Dictionaries", "Roblox"],
    color: "rose",
  },
  {
    id: "dict-ex2",
    title: "Robux Balance",
    emoji: "💰",
    description: "Use input, type conversion, and conditionals to check if you can afford items.",
    tags: ["Dictionaries", "Input"],
    color: "orange",
  },
  {
    id: "dict-ex3",
    title: "Buying Items",
    emoji: "🛒",
    description: "Build a buying system with inventory management and Robux tracking.",
    tags: ["Dictionaries", "Conditionals"],
    color: "sky",
  },
  {
    id: "dict-ex4",
    title: "Selling Items Back",
    emoji: "💸",
    description: "Add selling functionality with 50% resale value and inventory management.",
    tags: ["Dictionaries", "Conditionals"],
    color: "lime",
  },
  {
    id: "dict-project-a",
    title: "Project: Ultimate Roblox Shop",
    emoji: "🏪",
    description: "Build a complete shop with buying, selling, and stats tracking in a game loop.",
    tags: ["Project", "Dictionaries"],
    color: "fuchsia",
  },
  {
    id: "dict-project-b",
    title: "Project: Guess Who — Roblox Edition",
    emoji: "🎲",
    description: "Build a text-based Guess Who game using dictionaries and random selection.",
    tags: ["Project", "Game"],
    color: "cyan",
  },
];

export const sundayLessons = [
  {
    id: "algorithms",
    title: "Algorithms — CCC Prep",
    emoji: "🏆",
    description: "Algorithmic thinking for competitive programming — scanning, accumulation, two-pointer patterns.",
    tags: ["Algorithms", "CCC"],
    color: "blue",
  },
  {
    id: "dfs-bfs",
    title: "DFS & BFS — Grid Traversal",
    emoji: "🗺️",
    description: "2D arrays, grid traversal, and building toward CCC Question 5 problems.",
    tags: ["Algorithms", "Grids"],
    color: "purple",
  },
  {
    id: "graphs",
    title: "DFS Practice — Graph Exploration",
    emoji: "🌐",
    description: "Depth-First Search on grids — flood fill, island counting, and maze solving.",
    tags: ["DFS", "Recursion"],
    color: "red",
  },
];

export const sundayAnswers = [
  {
    id: "algorithms-answers",
    title: "Algorithms — Answer Key",
    emoji: "🔑",
    description: "Complete solutions with explanations for all algorithm exercises.",
    tags: ["Answers", "Algorithms"],
    color: "green",
  },
  {
    id: "dfs-bfs-answers",
    title: "DFS & BFS — Answer Key",
    emoji: "🔑",
    description: "Complete solutions for grid traversal and DFS/BFS exercises.",
    tags: ["Answers", "Grids"],
    color: "green",
  },
];

export const milestones = [
  {
    number: 1,
    title: "Python Fundamentals",
    status: "complete",
    lessons: 6,
    topics: [
      "Variables and data types",
      "Type casting",
      "Operators",
      "User input",
      "Strings (f-strings, slicing, methods)",
      "Lists (append, remove, indexing)",
      "Conditionals (if/elif/else)",
      "While loops",
      "For loops",
      "Functions (basics)",
    ],
  },
  {
    number: 2,
    title: "Intermediate Python",
    status: "active",
    lessons: 5,
    topics: [
      "Dictionaries",
      "List comprehensions",
      "String formatting",
      "Error handling",
      "File I/O",
      "Modules",
    ],
  },
  {
    number: 3,
    title: "Game Development",
    status: "upcoming",
    lessons: 7,
    topics: [
      "Classes & Objects",
      "Inheritance",
      "Game loops",
      "Random module",
      "Time module",
      "Simple graphics",
    ],
  },
  {
    number: 4,
    title: "Real-World Applications",
    status: "upcoming",
    lessons: 5,
    topics: [
      "APIs",
      "Web scraping",
      "Data analysis",
      "Discord bots",
      "Automation",
    ],
  },
  {
    number: 5,
    title: "Advanced Projects",
    status: "upcoming",
    lessons: 9,
    topics: [
      "GUI applications",
      "Databases",
      "Algorithms",
      "Data structures",
      "Final project",
    ],
  },
];

export function getLessonById(id) {
  const all = [
    ...saturdayLessons,
    ...dictionaryExercises,
    ...sundayLessons,
    ...sundayAnswers,
  ];
  return all.find((l) => l.id === id) || null;
}

export function getAllLessons() {
  return [
    ...saturdayLessons,
    ...dictionaryExercises,
    ...sundayLessons,
    ...sundayAnswers,
  ];
}
