"use client";

import { useState, useCallback, useRef } from "react";

const ANIMATION_SPEED = 700;

const PRESETS = {
  "Course Schedule (Has Cycle)": {
    numCourses: 4,
    prerequisites: [[1, 0], [2, 1], [3, 2], [0, 3]],
    labels: ["CS101", "CS201", "CS301", "CS401"],
  },
  "Course Schedule (No Cycle)": {
    numCourses: 6,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3], [5, 4]],
    labels: ["Math", "CS101", "CS102", "CS201", "CS301", "CS401"],
  },
  "Diamond (No Cycle)": {
    numCourses: 4,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
    labels: ["Intro", "Track A", "Track B", "Capstone"],
  },
  "Self Loop": {
    numCourses: 3,
    prerequisites: [[1, 0], [1, 1], [2, 1]],
    labels: ["CS100", "CS200", "CS300"],
  },
  "Complex (Has Cycle)": {
    numCourses: 5,
    prerequisites: [[1, 0], [2, 1], [3, 2], [1, 3], [4, 2]],
    labels: ["CS100", "CS200", "CS300", "CS400", "CS500"],
  },
};

const WHITE = "white";
const GRAY = "gray";
const BLACK = "black";

function buildAdjList(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
  }
  return adj;
}

function getNodePositions(n) {
  if (n <= 1) return [{ x: 350, y: 160 }];

  const positions = [];
  const cx = 350, cy = 160, rx = 200, ry = 120;

  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    positions.push({
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    });
  }
  return positions;
}

function getArrowPath(x1, y1, x2, y2, nodeRadius) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return null;

  const ux = dx / dist;
  const uy = dy / dist;

  const sx = x1 + ux * nodeRadius;
  const sy = y1 + uy * nodeRadius;
  const ex = x2 - ux * (nodeRadius + 8);
  const ey = y2 - uy * (nodeRadius + 8);

  return { sx, sy, ex, ey, ux, uy };
}

export default function GraphAnimation() {
  const [presetKey, setPresetKey] = useState("Course Schedule (Has Cycle)");
  const preset = PRESETS[presetKey];
  const adjList = buildAdjList(preset.numCourses, preset.prerequisites);
  const positions = getNodePositions(preset.numCourses);

  const [nodeColors, setNodeColors] = useState({});
  const [activeEdge, setActiveEdge] = useState(null);
  const [cycleEdge, setCycleEdge] = useState(null);
  const [cyclePath, setCyclePath] = useState(null);
  const [message, setMessage] = useState("Choose a preset and run DFS cycle detection");
  const [isAnimating, setIsAnimating] = useState(false);
  const [dfsStack, setDfsStack] = useState([]);
  const [result, setResult] = useState(null);
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [showAdjList, setShowAdjList] = useState(true);
  const cancelRef = useRef(false);

  const nodeRadius = 28;

  const sleep = (ms) =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        if (cancelRef.current) reject(new Error("cancelled"));
        else resolve();
      }, ms);
    });

  const resetState = useCallback(() => {
    setNodeColors({});
    setActiveEdge(null);
    setCycleEdge(null);
    setCyclePath(null);
    setDfsStack([]);
    setResult(null);
    setVisitedOrder([]);
    setMessage("Choose a preset and run DFS cycle detection");
  }, []);

  const handlePresetChange = useCallback(
    (key) => {
      if (isAnimating) return;
      setPresetKey(key);
      resetState();
    },
    [isAnimating, resetState]
  );

  const runCycleDetection = useCallback(async () => {
    if (isAnimating) return;
    cancelRef.current = false;
    setIsAnimating(true);
    resetState();

    const colors = {};
    const parent = {};
    const order = [];
    let foundCycle = false;
    let cycleFrom = -1;
    let cycleTo = -1;

    for (let i = 0; i < preset.numCourses; i++) {
      colors[i] = WHITE;
    }
    setNodeColors({ ...colors });

    try {
      await sleep(ANIMATION_SPEED);

      async function dfs(node, stack) {
        if (foundCycle || cancelRef.current) return;

        colors[node] = GRAY;
        stack.push(node);
        order.push(node);
        setNodeColors({ ...colors });
        setDfsStack([...stack]);
        setVisitedOrder([...order]);
        setMessage(`Visiting ${preset.labels[node]} (node ${node}) — marked GRAY (in progress)`);
        await sleep(ANIMATION_SPEED);

        for (const neighbor of adjList[node]) {
          if (foundCycle || cancelRef.current) return;

          setActiveEdge({ from: node, to: neighbor });
          setMessage(`Checking edge ${preset.labels[node]} → ${preset.labels[neighbor]}`);
          await sleep(ANIMATION_SPEED * 0.6);

          if (colors[neighbor] === GRAY) {
            foundCycle = true;
            cycleFrom = node;
            cycleTo = neighbor;

            const cycleNodes = [];
            let idx = stack.length - 1;
            while (idx >= 0 && stack[idx] !== neighbor) {
              cycleNodes.unshift(stack[idx]);
              idx--;
            }
            if (idx >= 0) cycleNodes.unshift(stack[idx]);
            cycleNodes.push(node);

            setCycleEdge({ from: node, to: neighbor });
            setCyclePath(cycleNodes);
            setMessage(
              `CYCLE FOUND! ${preset.labels[node]} → ${preset.labels[neighbor]} is a back edge! ` +
              `Cycle: ${cycleNodes.map((n) => preset.labels[n]).join(" → ")} → ${preset.labels[neighbor]}`
            );
            setResult("cycle");
            setActiveEdge(null);
            await sleep(ANIMATION_SPEED * 2);
            return;
          }

          if (colors[neighbor] === WHITE) {
            parent[neighbor] = node;
            await dfs(neighbor, stack);
            if (foundCycle) return;
          } else {
            setMessage(`${preset.labels[neighbor]} is BLACK (done) — skip`);
            await sleep(ANIMATION_SPEED * 0.4);
          }

          setActiveEdge(null);
        }

        if (!foundCycle && !cancelRef.current) {
          colors[node] = BLACK;
          stack.pop();
          setNodeColors({ ...colors });
          setDfsStack([...stack]);
          setMessage(`${preset.labels[node]} finished — marked BLACK (all neighbors explored)`);
          await sleep(ANIMATION_SPEED * 0.6);
        }
      }

      for (let i = 0; i < preset.numCourses; i++) {
        if (colors[i] === WHITE && !foundCycle && !cancelRef.current) {
          setMessage(`Starting DFS from ${preset.labels[i]} (node ${i})`);
          await sleep(ANIMATION_SPEED * 0.6);
          await dfs(i, []);
        }
      }

      if (!foundCycle && !cancelRef.current) {
        setActiveEdge(null);
        setResult("no-cycle");
        setMessage("No cycle detected! All courses can be completed.");
        await sleep(ANIMATION_SPEED);
      }
    } catch {
      resetState();
    }

    setIsAnimating(false);
  }, [isAnimating, preset, adjList, resetState]);

  const stopAnimation = useCallback(() => {
    cancelRef.current = true;
    setIsAnimating(false);
    resetState();
  }, [resetState]);

  const getNodeFill = (i) => {
    if (cyclePath && cyclePath.includes(i)) return "fill-red-400 stroke-red-600";
    const c = nodeColors[i];
    if (c === GRAY) return "fill-amber-400 stroke-amber-600";
    if (c === BLACK) return "fill-slate-500 stroke-slate-700";
    return "fill-sky-200 stroke-sky-400";
  };

  const getNodeTextFill = (i) => {
    if (cyclePath && cyclePath.includes(i)) return "fill-white";
    const c = nodeColors[i];
    if (c === GRAY) return "fill-amber-900";
    if (c === BLACK) return "fill-white";
    return "fill-slate-700";
  };

  const getEdgeClass = (from, to) => {
    if (cycleEdge && cycleEdge.from === from && cycleEdge.to === to)
      return "stroke-red-500 stroke-[3]";
    if (activeEdge && activeEdge.from === from && activeEdge.to === to)
      return "stroke-indigo-500 stroke-[2.5]";
    if (cyclePath) {
      for (let k = 0; k < cyclePath.length - 1; k++) {
        if (cyclePath[k] === from && cyclePath[k + 1] === to)
          return "stroke-red-400 stroke-[2.5]";
      }
    }
    return "stroke-slate-300 stroke-[1.5]";
  };

  const getMarkerColor = (from, to) => {
    if (cycleEdge && cycleEdge.from === from && cycleEdge.to === to) return "#ef4444";
    if (activeEdge && activeEdge.from === from && activeEdge.to === to) return "#6366f1";
    if (cyclePath) {
      for (let k = 0; k < cyclePath.length - 1; k++) {
        if (cyclePath[k] === from && cyclePath[k + 1] === to) return "#f87171";
      }
    }
    return "#94a3b8";
  };

  const selfLoopEdges = [];
  const normalEdges = [];
  for (const [course, prereq] of preset.prerequisites) {
    if (prereq === course) selfLoopEdges.push({ from: prereq, to: course });
    else normalEdges.push({ from: prereq, to: course });
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg">Directed Graph — Cycle Detection</h3>
          <p className="text-white/70 text-sm mt-1">
            DFS with WHITE / GRAY / BLACK coloring for course prerequisites
          </p>
        </div>
      </div>

      {/* Preset selector + controls */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={presetKey}
            onChange={(e) => handlePresetChange(e.target.value)}
            disabled={isAnimating}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
          >
            {Object.keys(PRESETS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button
            onClick={runCycleDetection}
            disabled={isAnimating}
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Run Cycle Detection
          </button>
          {isAnimating && (
            <button
              onClick={stopAnimation}
              className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-lg hover:bg-rose-600 transition-colors"
            >
              Stop
            </button>
          )}
          <button
            onClick={() => {
              if (!isAnimating) resetState();
            }}
            disabled={isAnimating}
            className="px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 ml-auto">
            <input
              type="checkbox"
              checked={showAdjList}
              onChange={(e) => setShowAdjList(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-600"
            />
            Show Adj List
          </label>
        </div>
      </div>

      {/* Message */}
      <div
        className={`px-6 py-3 border-b ${
          result === "cycle"
            ? "bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800"
            : result === "no-cycle"
              ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800"
              : "bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-800"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            result === "cycle"
              ? "text-red-700 dark:text-red-300"
              : result === "no-cycle"
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-teal-700 dark:text-teal-300"
          }`}
        >
          {message}
        </p>
      </div>

      {/* Main content: graph + adjacency list side by side */}
      <div className="flex flex-col lg:flex-row">
        {/* Graph visualization */}
        <div className={`px-6 py-4 ${showAdjList ? "lg:flex-1" : "flex-1"}`}>
          <svg viewBox="0 0 700 320" className="w-full max-w-2xl mx-auto">
            <defs>
              {/* Dynamic markers for each edge color */}
              {[...normalEdges, ...selfLoopEdges].map(({ from, to }) => {
                const color = getMarkerColor(from, to);
                return (
                  <marker
                    key={`arrow-${from}-${to}`}
                    id={`arrow-${from}-${to}`}
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                  </marker>
                );
              })}
            </defs>

            {/* Normal edges */}
            {normalEdges.map(({ from, to }) => {
              const p1 = positions[from];
              const p2 = positions[to];
              const arrow = getArrowPath(p1.x, p1.y, p2.x, p2.y, nodeRadius);
              if (!arrow) return null;

              return (
                <line
                  key={`edge-${from}-${to}`}
                  x1={arrow.sx}
                  y1={arrow.sy}
                  x2={arrow.ex}
                  y2={arrow.ey}
                  className={`${getEdgeClass(from, to)} transition-all duration-300`}
                  markerEnd={`url(#arrow-${from}-${to})`}
                />
              );
            })}

            {/* Self-loop edges */}
            {selfLoopEdges.map(({ from }) => {
              const p = positions[from];
              const loopR = 20;
              const cx = p.x;
              const cy = p.y - nodeRadius - loopR;
              return (
                <g key={`self-${from}`}>
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={loopR}
                    ry={loopR}
                    fill="none"
                    className={`${getEdgeClass(from, from)} transition-all duration-300`}
                    markerEnd={`url(#arrow-${from}-${from})`}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {positions.map((pos, i) => (
              <g key={`node-${i}`} className="transition-all duration-300">
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius}
                  className={`${getNodeFill(i)} stroke-2 transition-all duration-300`}
                />
                <text
                  x={pos.x}
                  y={pos.y - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`${getNodeTextFill(i)} font-bold`}
                  style={{ fontSize: "11px" }}
                >
                  {preset.labels[i]}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 12}
                  textAnchor="middle"
                  className={`${getNodeTextFill(i)} opacity-60`}
                  style={{ fontSize: "9px" }}
                >
                  [{i}]
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Adjacency list panel */}
        {showAdjList && (
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700 px-5 py-4 bg-slate-50 dark:bg-slate-900">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Adjacency List
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {adjList.map((neighbors, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                    nodeColors[i] === GRAY
                      ? "bg-amber-100 dark:bg-amber-900/30 ring-1 ring-amber-400"
                      : nodeColors[i] === BLACK
                        ? "bg-slate-200 dark:bg-slate-700/60 opacity-60"
                        : cyclePath && cyclePath.includes(i)
                          ? "bg-red-100 dark:bg-red-900/30 ring-1 ring-red-400"
                          : "bg-white dark:bg-slate-800"
                  }`}
                >
                  <span className="font-bold text-slate-600 dark:text-slate-300 shrink-0 w-14 text-right">
                    {preset.labels[i]}:
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    [{neighbors.map((n) => preset.labels[n]).join(", ")}]
                  </span>
                </div>
              ))}
            </div>

            {/* Code representation */}
            <div className="mt-4 bg-slate-800 dark:bg-slate-950 rounded-lg p-3 text-[10px] font-mono text-slate-300 leading-relaxed overflow-x-auto">
              <div className="text-teal-400 mb-1"># Build adjacency list</div>
              <div>
                adj = {"{"}{preset.numCourses} empty lists{"}"}
              </div>
              {preset.prerequisites.map(([c, p], idx) => (
                <div key={idx}>
                  <span className="text-slate-500">adj[</span>
                  <span className="text-amber-300">{p}</span>
                  <span className="text-slate-500">].append(</span>
                  <span className="text-emerald-300">{c}</span>
                  <span className="text-slate-500">)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DFS Stack */}
      {dfsStack.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1.5">
            DFS Stack (recursion):
          </p>
          <div className="flex flex-wrap gap-1">
            {dfsStack.map((node, i) => (
              <span
                key={i}
                className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded text-xs font-mono font-bold"
              >
                {preset.labels[node]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-sky-200 border border-sky-400 inline-block" />
          WHITE (unvisited)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
          GRAY (in progress)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-slate-500 inline-block" />
          BLACK (finished)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          Cycle
        </span>
      </div>

      {/* Algorithm explanation */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          How Cycle Detection Works
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3 border border-sky-200 dark:border-sky-800">
            <p className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wide mb-1">
              1. WHITE
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Node hasn&apos;t been visited yet. We start DFS from it.
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">
              2. GRAY
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Node is being processed (on the call stack). If we reach a GRAY
              node, we found a <strong>back edge = cycle!</strong>
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
              3. BLACK
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Node and all its descendants are fully explored. Safe to skip.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-2">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Why does finding a GRAY neighbor mean a cycle?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            GRAY nodes are on the current DFS path. If node A is GRAY and we
            reach A again from one of its descendants, that means there&apos;s a
            path from A back to A — a cycle. This is called a{" "}
            <strong>back edge</strong> in graph terminology.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Course Schedule meaning:</strong> If course A requires B,
            and B (directly or indirectly) requires A, you can never complete
            either — that&apos;s a cycle in the prerequisite graph.
          </p>
        </div>
      </div>

      {/* Complexity */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          Time Complexity
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4 font-bold text-slate-600 dark:text-slate-300">
                  Operation
                </th>
                <th className="text-left py-2 pr-4 font-bold text-slate-600 dark:text-slate-300">
                  Time
                </th>
                <th className="text-left py-2 font-bold text-slate-600 dark:text-slate-300">
                  Why
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">Build adj list</td>
                <td className="py-2.5 pr-4">
                  <code className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(E)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  One pass through all edges
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">DFS cycle detection</td>
                <td className="py-2.5 pr-4">
                  <code className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(V + E)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Visit each node once, check each edge once
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Space</td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(V + E)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Adjacency list + color array + recursion stack
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
