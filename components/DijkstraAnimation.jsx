"use client";

import { useState, useCallback, useRef } from "react";

const SPEED = 750;

const PRESETS = {
  "Classic Graph": {
    nodes: ["A", "B", "C", "D", "E", "F"],
    edges: [
      [0, 1, 4],
      [0, 2, 2],
      [1, 2, 1],
      [1, 3, 5],
      [2, 3, 8],
      [2, 4, 10],
      [3, 4, 2],
      [3, 5, 6],
      [4, 5, 3],
    ],
    start: 0,
  },
  "City Roads": {
    nodes: ["Home", "Café", "Park", "Lib", "School", "Station"],
    edges: [
      [0, 1, 7],
      [0, 2, 9],
      [0, 5, 14],
      [1, 2, 10],
      [1, 3, 15],
      [2, 3, 11],
      [2, 5, 2],
      [3, 4, 6],
      [4, 5, 9],
    ],
    start: 0,
  },
  "Dense Graph": {
    nodes: ["S", "A", "B", "C", "D", "T"],
    edges: [
      [0, 1, 3],
      [0, 2, 6],
      [1, 2, 2],
      [1, 3, 5],
      [2, 3, 1],
      [2, 4, 8],
      [3, 4, 4],
      [3, 5, 7],
      [4, 5, 2],
    ],
    start: 0,
  },
};

const POSITIONS = [
  { x: 80, y: 165 },
  { x: 245, y: 68 },
  { x: 245, y: 262 },
  { x: 410, y: 165 },
  { x: 575, y: 68 },
  { x: 575, y: 262 },
];

const INF = Infinity;

function edgeMidpoint(p1, p2, offset = 0) {
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  if (offset === 0) return { x: mx, y: my };
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  return { x: mx + (offset * -dy) / len, y: my + (offset * dx) / len };
}

export default function DijkstraAnimation() {
  const [presetKey, setPresetKey] = useState("Classic Graph");
  const [dist, setDist] = useState({});
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [heap, setHeap] = useState([]);
  const [message, setMessage] = useState('Press "Run Dijkstra\'s" to start');
  const [isAnimating, setIsAnimating] = useState(false);
  const [done, setDone] = useState(false);
  const cancelRef = useRef(false);

  const preset = PRESETS[presetKey];

  const sleep = (ms) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cancelRef.current) reject(new Error("cancelled"));
        else resolve();
      }, ms);
    });

  const resetState = useCallback(() => {
    setDist({});
    setVisited(new Set());
    setCurrent(null);
    setActiveEdge(null);
    setHeap([]);
    setMessage('Press "Run Dijkstra\'s" to start');
    setDone(false);
  }, []);

  const handlePresetChange = useCallback(
    (key) => {
      if (isAnimating) return;
      setPresetKey(key);
      // Reset with a slight delay so the new preset is rendered first
      setTimeout(() => {
        setDist({});
        setVisited(new Set());
        setCurrent(null);
        setActiveEdge(null);
        setHeap([]);
        setMessage('Press "Run Dijkstra\'s" to start');
        setDone(false);
      }, 0);
    },
    [isAnimating]
  );

  const runDijkstra = useCallback(async () => {
    if (isAnimating) return;
    cancelRef.current = false;
    setIsAnimating(true);

    // Snapshot preset at the time the button is clicked
    const snap = PRESETS[presetKey];
    const { nodes, edges, start } = snap;
    const n = nodes.length;

    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
      adj[u].push({ to: v, weight: w });
      adj[v].push({ to: u, weight: w });
    }

    // Initialize
    const d = {};
    for (let i = 0; i < n; i++) d[i] = INF;
    d[start] = 0;

    const vis = new Set();
    let pq = [[0, start]];

    setDist({ ...d });
    setHeap([[0, start]]);
    setVisited(new Set());
    setCurrent(null);
    setActiveEdge(null);
    setDone(false);
    setMessage(
      `Initialized: dist[${nodes[start]}] = 0, all others = ∞. Push (0, ${nodes[start]}) to heap.`
    );

    try {
      await sleep(SPEED);

      while (pq.length > 0) {
        if (cancelRef.current) break;

        pq.sort((a, b) => a[0] - b[0]);
        const [currDist, u] = pq.shift();
        setHeap([...pq]);

        if (vis.has(u)) {
          setMessage(
            `Popped ${nodes[u]} (dist=${currDist}) — already settled, skip.`
          );
          await sleep(SPEED * 0.5);
          continue;
        }

        vis.add(u);
        const snapVis = new Set(vis);
        setCurrent(u);
        setVisited(snapVis);
        setMessage(
          `Settled ${nodes[u]} — shortest distance confirmed: ${currDist}`
        );
        await sleep(SPEED);

        for (const { to, weight } of adj[u]) {
          if (cancelRef.current) break;
          if (vis.has(to)) continue;

          setActiveEdge([u, to]);
          const candidate = d[u] + weight;
          setMessage(
            `Edge ${nodes[u]} → ${nodes[to]}: ${d[u]} + ${weight} = ${candidate}  (current dist[${nodes[to]}] = ${
              d[to] === INF ? "∞" : d[to]
            })`
          );
          await sleep(SPEED * 0.8);

          if (candidate < d[to]) {
            d[to] = candidate;
            setDist({ ...d });
            pq.push([candidate, to]);
            setHeap([...pq].sort((a, b) => a[0] - b[0]));
            setMessage(
              `Relaxed! dist[${nodes[to]}] updated to ${candidate} (via ${nodes[u]})`
            );
            await sleep(SPEED * 0.7);
          } else {
            setMessage(
              `No improvement — dist[${nodes[to]}] stays ${
                d[to] === INF ? "∞" : d[to]
              }`
            );
            await sleep(SPEED * 0.4);
          }

          setActiveEdge(null);
        }

        setCurrent(null);
      }

      if (!cancelRef.current) {
        setDone(true);
        setMessage(
          `Done! Shortest distances from ${nodes[start]}: ` +
            nodes
              .map((name, i) => `${name}=${d[i] === INF ? "∞" : d[i]}`)
              .join(" · ")
        );
      }
    } catch {
      resetState();
    }

    setIsAnimating(false);
  }, [isAnimating, presetKey, resetState]);

  const stopAnimation = useCallback(() => {
    cancelRef.current = true;
    setIsAnimating(false);
    resetState();
  }, [resetState]);

  const getNodeClass = (i) => {
    if (i === current) return "fill-amber-400 stroke-amber-600";
    if (visited.has(i)) return "fill-emerald-400 stroke-emerald-600";
    if (dist[i] !== undefined && dist[i] < INF)
      return "fill-sky-300 stroke-sky-500";
    return "fill-slate-100 stroke-slate-400";
  };

  const getNodeTextClass = (i) => {
    if (i === current || visited.has(i)) return "fill-white";
    return "fill-slate-700";
  };

  const isActiveEdge = (u, v) =>
    activeEdge &&
    ((activeEdge[0] === u && activeEdge[1] === v) ||
      (activeEdge[0] === v && activeEdge[1] === u));

  const getEdgeClass = (u, v) => {
    if (isActiveEdge(u, v)) return "stroke-indigo-500 stroke-[2.5]";
    if (visited.has(u) && visited.has(v)) return "stroke-emerald-400 stroke-[2]";
    return "stroke-slate-300 stroke-[1.5]";
  };

  const getWeightBg = (u, v) => {
    if (isActiveEdge(u, v))
      return { bg: "fill-indigo-100", text: "fill-indigo-700" };
    if (visited.has(u) && visited.has(v))
      return { bg: "fill-emerald-50", text: "fill-emerald-700" };
    return { bg: "fill-white", text: "fill-slate-500" };
  };

  const sortedHeap = [...heap].sort((a, b) => a[0] - b[0]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="bg-linear-to-r from-yellow-500 to-amber-500 px-6 py-4">
        <h3 className="text-white font-bold text-lg">
          Dijkstra&apos;s Algorithm
        </h3>
        <p className="text-white/70 text-sm mt-1">
          Shortest paths from a source node — step by step with priority queue
        </p>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center gap-3">
        <select
          value={presetKey}
          onChange={(e) => handlePresetChange(e.target.value)}
          disabled={isAnimating}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
        >
          {Object.keys(PRESETS).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <button
          onClick={runDijkstra}
          disabled={isAnimating}
          className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Run Dijkstra&apos;s
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
          onClick={() => !isAnimating && resetState()}
          disabled={isAnimating}
          className="px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Message */}
      <div
        className={`px-6 py-3 border-b ${
          done
            ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800"
            : "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-100 dark:border-yellow-800"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            done
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-yellow-700 dark:text-yellow-300"
          }`}
        >
          {message}
        </p>
      </div>

      {/* Graph + Panels */}
      <div className="flex flex-col lg:flex-row">
        {/* SVG Graph */}
        <div className="flex-1 px-4 py-4">
          <svg viewBox="0 0 680 340" className="w-full max-w-2xl mx-auto">
            {/* Edges */}
            {preset.edges.map(([u, v, w]) => {
              const p1 = POSITIONS[u];
              const p2 = POSITIONS[v];
              const mid = edgeMidpoint(p1, p2);
              const wc = getWeightBg(u, v);
              return (
                <g key={`edge-${u}-${v}`}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    className={`${getEdgeClass(u, v)} transition-all duration-300`}
                  />
                  <circle
                    cx={mid.x}
                    cy={mid.y}
                    r="12"
                    className={`${wc.bg} dark:fill-slate-800 transition-colors duration-300`}
                  />
                  <text
                    x={mid.x}
                    y={mid.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`${wc.text} dark:fill-slate-300 font-bold transition-colors duration-300`}
                    style={{ fontSize: "11px" }}
                  >
                    {w}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {preset.nodes.map((name, i) => {
              const pos = POSITIONS[i];
              const d = dist[i];
              const distLabel =
                d === undefined ? "" : d === INF ? "∞" : String(d);
              return (
                <g key={`node-${i}`} className="transition-all duration-300">
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={30}
                    className={`${getNodeClass(i)} stroke-2 transition-all duration-300`}
                  />
                  <text
                    x={pos.x}
                    y={pos.y - (distLabel ? 6 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`${getNodeTextClass(i)} font-bold transition-colors duration-300`}
                    style={{ fontSize: "13px" }}
                  >
                    {name}
                  </text>
                  {distLabel && (
                    <text
                      x={pos.x}
                      y={pos.y + 13}
                      textAnchor="middle"
                      className={`${getNodeTextClass(i)} opacity-80 transition-colors duration-300`}
                      style={{ fontSize: "10px" }}
                    >
                      d={distLabel}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right panel: distance table + priority queue */}
        <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700 px-5 py-4 bg-slate-50 dark:bg-slate-900">
          {/* Distance table */}
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
            Distance Table
          </h4>
          <div className="space-y-1.5 mb-5">
            {preset.nodes.map((name, i) => {
              const d = dist[i];
              const distLabel =
                d === undefined ? "—" : d === INF ? "∞" : d;
              const isCurr = i === current;
              const isVis = visited.has(i);
              const isReachable = d !== undefined && d < INF && !isVis && !isCurr;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-300 ${
                    isCurr
                      ? "bg-amber-100 dark:bg-amber-900/30 ring-1 ring-amber-400"
                      : isVis
                      ? "bg-emerald-100 dark:bg-emerald-900/30 ring-1 ring-emerald-400"
                      : isReachable
                      ? "bg-sky-50 dark:bg-sky-900/20 ring-1 ring-sky-300"
                      : "bg-white dark:bg-slate-800"
                  }`}
                >
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {name}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-bold ${
                        isCurr
                          ? "text-amber-700 dark:text-amber-300"
                          : isVis
                          ? "text-emerald-700 dark:text-emerald-300"
                          : isReachable
                          ? "text-sky-700 dark:text-sky-300"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {distLabel}
                    </span>
                    {isVis && (
                      <span className="text-emerald-500 text-xs">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Priority Queue */}
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
            Priority Queue
          </h4>
          {sortedHeap.length === 0 ? (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
              empty
            </p>
          ) : (
            <div className="space-y-1">
              {sortedHeap.map(([d, node], idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-mono ${
                    idx === 0
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {idx === 0 && (
                    <span className="text-[9px] font-bold text-yellow-600 dark:text-yellow-400 shrink-0">
                      MIN
                    </span>
                  )}
                  <span>
                    (d={d}, {preset.nodes[node]})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-400 inline-block" />
          Unvisited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-300 border border-sky-500 inline-block" />
          In queue (tentative dist)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
          Current node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          Settled (shortest confirmed)
        </span>
      </div>

      {/* How it works */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          How Dijkstra&apos;s Works
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
              1. Initialize
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              dist[start] = 0, all others = ∞. Push (0, start) to the min-heap.
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">
              2. Pop minimum
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pull the unvisited node with the smallest tentative distance.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
            <p className="text-[10px] font-bold text-yellow-700 dark:text-yellow-300 uppercase tracking-wide mb-1">
              3. Relax edges
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              For each neighbor v: if dist[u] + w {"<"} dist[v], update dist[v] and push to heap.
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
            <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-1">
              4. Settle
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mark the node visited — its distance is now final. Repeat until the heap is empty.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
            Why does it work?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All edge weights are non-negative. When we pop a node, its tentative distance is already
            the shortest possible — no future relaxation through other nodes (which have equal or
            larger distances) can improve it. This greedy argument guarantees correctness.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
            <strong>Python:</strong> use{" "}
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">heapq.heappush</code> /{" "}
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">heapq.heappop</code> for
            an O(log V) priority queue. The algorithm runs in{" "}
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">O((V + E) log V)</code>.
          </p>
        </div>
      </div>

      {/* Complexity */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          Complexity
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4 font-bold text-slate-600 dark:text-slate-300">
                  Operation
                </th>
                <th className="text-left py-2 pr-4 font-bold text-slate-600 dark:text-slate-300">
                  Complexity
                </th>
                <th className="text-left py-2 font-bold text-slate-600 dark:text-slate-300">
                  Why
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">Time (binary heap)</td>
                <td className="py-2.5 pr-4">
                  <code className="text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O((V+E) log V)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Each edge triggers at most one heap push (O(log V))
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
                  Adjacency list + dist array + heap
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
