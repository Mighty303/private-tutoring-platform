"use client";

import { useState, useCallback } from "react";

const ANIMATION_SPEED = 600;

const BUILD_HEAP_PRESETS = [
  [9, 7, 8, 3, 2, 6, 1, 5, 4],
  [15, 10, 12, 4, 8, 6, 2, 11, 3],
  [7, 3, 9, 1, 6, 5, 8, 2, 4],
];

const MIN_DEFAULT = [1, 3, 5, 7, 4, 8, 6];
const MAX_DEFAULT = [9, 7, 6, 5, 4, 3, 1];

function getTreeLayout(heap) {
  if (heap.length === 0) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];
  const totalWidth = 700;
  const levelHeight = 70;
  const startY = 40;

  for (let i = 0; i < heap.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const spacing = totalWidth / (nodesInLevel + 1);
    const x = spacing * (posInLevel + 1);
    const y = startY + level * levelHeight;

    nodes.push({ index: i, value: heap[i], x, y });

    if (i > 0) {
      const parentIdx = Math.floor((i - 1) / 2);
      edges.push({ from: parentIdx, to: i });
    }
  }

  return { nodes, edges };
}

export default function HeapAnimation() {
  const [heapType, setHeapType] = useState("min");
  const [heap, setHeap] = useState(MIN_DEFAULT);
  const [inputValue, setInputValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [swappingNodes, setSwappingNodes] = useState(null);
  const [processingNode, setProcessingNode] = useState(null);
  const [message, setMessage] = useState("Min-Heap: Parent ≤ Children");
  const [isAnimating, setIsAnimating] = useState(false);
  const [buildStats, setBuildStats] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const isMin = heapType === "min";
  const label = isMin ? "Min-Heap" : "Max-Heap";
  const property = isMin ? "Parent ≤ Children" : "Parent ≥ Children";
  const idleMessage = `${label}: ${property}`;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const shouldBubbleUp = useCallback(
    (child, parent) => (isMin ? child < parent : child > parent),
    [isMin]
  );

  const isBetterChild = useCallback(
    (candidate, current) => (isMin ? candidate < current : candidate > current),
    [isMin]
  );

  const switchHeapType = useCallback(() => {
    if (isAnimating) return;
    const next = isMin ? "max" : "min";
    setHeapType(next);
    setHeap(next === "min" ? MIN_DEFAULT : MAX_DEFAULT);
    setHighlightedNodes(new Set());
    setSwappingNodes(null);
    setProcessingNode(null);
    setBuildStats(null);
    setSelectedNode(null);
    setMessage(
      next === "min"
        ? "Min-Heap: Parent ≤ Children"
        : "Max-Heap: Parent ≥ Children"
    );
  }, [isAnimating, isMin]);

  const animateInsert = useCallback(
    async (value) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setBuildStats(null);
      setSelectedNode(null);

      const newHeap = [...heap, value];
      setHeap([...newHeap]);
      let idx = newHeap.length - 1;
      setHighlightedNodes(new Set([idx]));
      setMessage(`Inserted ${value} at index ${idx}. Now bubble up!`);
      await sleep(ANIMATION_SPEED);

      while (idx > 0) {
        const parentIdx = Math.floor((idx - 1) / 2);
        setSwappingNodes({ a: idx, b: parentIdx });
        setHighlightedNodes(new Set([idx, parentIdx]));

        if (shouldBubbleUp(newHeap[idx], newHeap[parentIdx])) {
          const sym = isMin ? "<" : ">";
          setMessage(
            `${newHeap[idx]} ${sym} ${newHeap[parentIdx]} → Swap!`
          );
          await sleep(ANIMATION_SPEED);

          [newHeap[idx], newHeap[parentIdx]] = [
            newHeap[parentIdx],
            newHeap[idx],
          ];
          setHeap([...newHeap]);
          idx = parentIdx;
          await sleep(ANIMATION_SPEED / 2);
        } else {
          const sym = isMin ? "≥" : "≤";
          setMessage(
            `${newHeap[idx]} ${sym} ${newHeap[parentIdx]} → Stop! Heap property satisfied.`
          );
          break;
        }
      }

      if (idx === 0) {
        setMessage(`${value} bubbled to the root!`);
      }

      setSwappingNodes(null);
      setHighlightedNodes(new Set());
      await sleep(ANIMATION_SPEED);
      setMessage(idleMessage);
      setIsAnimating(false);
    },
    [heap, isAnimating, isMin, idleMessage, shouldBubbleUp]
  );

  const animateExtract = useCallback(async () => {
    if (isAnimating || heap.length === 0) return;
    setIsAnimating(true);
    setBuildStats(null);
    setSelectedNode(null);

    const newHeap = [...heap];
    const rootValue = newHeap[0];
    const extractLabel = isMin ? "min" : "max";
    setHighlightedNodes(new Set([0]));
    setMessage(`Extracting ${extractLabel}: ${rootValue}`);
    await sleep(ANIMATION_SPEED);

    if (newHeap.length === 1) {
      setHeap([]);
      setMessage(`Extracted ${rootValue}. Heap is now empty.`);
      setHighlightedNodes(new Set());
      await sleep(ANIMATION_SPEED);
      setMessage(idleMessage);
      setIsAnimating(false);
      return;
    }

    const lastVal = newHeap.pop();
    newHeap[0] = lastVal;
    setHeap([...newHeap]);
    setHighlightedNodes(new Set([0]));
    setMessage(`Moved ${lastVal} to root. Now bubble down!`);
    await sleep(ANIMATION_SPEED);

    let idx = 0;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let best = idx;

      if (left < newHeap.length && isBetterChild(newHeap[left], newHeap[best])) {
        best = left;
      }
      if (right < newHeap.length && isBetterChild(newHeap[right], newHeap[best])) {
        best = right;
      }

      if (best !== idx) {
        setSwappingNodes({ a: idx, b: best });
        setHighlightedNodes(new Set([idx, best]));
        const childLabel = isMin ? "smaller" : "larger";
        const cmp = isMin ? ">" : "<";
        setMessage(
          `${newHeap[idx]} ${cmp} ${newHeap[best]} → Swap with ${childLabel} child!`
        );
        await sleep(ANIMATION_SPEED);

        [newHeap[idx], newHeap[best]] = [newHeap[best], newHeap[idx]];
        setHeap([...newHeap]);
        idx = best;
        await sleep(ANIMATION_SPEED / 2);
      } else {
        const sym = isMin ? "≤" : "≥";
        setMessage(
          `${newHeap[idx]} ${sym} both children → Stop! Heap restored.`
        );
        break;
      }
    }

    setSwappingNodes(null);
    setHighlightedNodes(new Set());
    await sleep(ANIMATION_SPEED);
    setMessage(`Extracted ${rootValue}. ${idleMessage}`);
    setIsAnimating(false);
  }, [heap, isAnimating, isMin, idleMessage, isBetterChild]);

  const animateBuildHeap = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBuildStats(null);
    setSelectedNode(null);

    const preset =
      BUILD_HEAP_PRESETS[Math.floor(Math.random() * BUILD_HEAP_PRESETS.length)];
    const arr = [...preset];
    const n = arr.length;
    let totalSwaps = 0;
    let totalComparisons = 0;

    setHeap([...arr]);
    setMessage(
      `Starting array: [${arr.join(", ")}] — not a valid ${label.toLowerCase()} yet!`
    );
    await sleep(ANIMATION_SPEED * 1.5);

    const lastNonLeaf = Math.floor(n / 2) - 1;
    setMessage(
      `Heapify: bubble down from index ${lastNonLeaf} to 0 (skip leaves — they're already valid)`
    );
    await sleep(ANIMATION_SPEED * 1.5);

    for (let i = lastNonLeaf; i >= 0; i--) {
      setProcessingNode(i);
      setHighlightedNodes(new Set([i]));
      setMessage(`Processing index ${i} (value ${arr[i]}) — bubble down`);
      await sleep(ANIMATION_SPEED);

      let idx = i;
      while (true) {
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        let best = idx;

        if (left < n && isBetterChild(arr[left], arr[best])) best = left;
        if (right < n && isBetterChild(arr[right], arr[best])) best = right;
        totalComparisons++;

        if (best !== idx) {
          setSwappingNodes({ a: idx, b: best });
          setHighlightedNodes(new Set([i, idx, best]));
          const cmp = isMin ? ">" : "<";
          setMessage(
            `${arr[idx]} ${cmp} ${arr[best]} → Swap! (processing node ${i})`
          );
          await sleep(ANIMATION_SPEED);

          [arr[idx], arr[best]] = [arr[best], arr[idx]];
          totalSwaps++;
          setHeap([...arr]);
          idx = best;
          await sleep(ANIMATION_SPEED / 2);
        } else {
          break;
        }
      }

      setSwappingNodes(null);
    }

    setProcessingNode(null);
    setHighlightedNodes(new Set());
    const nLogN = Math.ceil(n * Math.log2(n));
    setBuildStats({ swaps: totalSwaps, comparisons: totalComparisons, n, nLogN });
    setMessage(
      `${label} built! ${totalSwaps} swaps for ${n} elements (O(n) — much less than n log n ≈ ${nLogN})`
    );
    setIsAnimating(false);
  }, [isAnimating, isMin, label, isBetterChild]);

  const resetHeap = useCallback(() => {
    if (isAnimating) return;
    setHeap(isMin ? MIN_DEFAULT : MAX_DEFAULT);
    setHighlightedNodes(new Set());
    setSwappingNodes(null);
    setProcessingNode(null);
    setBuildStats(null);
    setSelectedNode(null);
    setMessage(idleMessage);
  }, [isAnimating, isMin, idleMessage]);

  const { nodes, edges } = getTreeLayout(heap);

  const rootColorClass = isMin
    ? "fill-emerald-400 stroke-emerald-600"
    : "fill-violet-400 stroke-violet-600";
  const rootBgClass = isMin
    ? "bg-emerald-100 dark:bg-emerald-900/50"
    : "bg-violet-100 dark:bg-violet-900/50";
  const rootDotClass = isMin ? "bg-emerald-400" : "bg-violet-400";

  const getNodeColor = (index) => {
    if (
      swappingNodes &&
      (index === swappingNodes.a || index === swappingNodes.b)
    ) {
      return "fill-amber-400 stroke-amber-600";
    }
    if (index === processingNode) {
      return "fill-rose-400 stroke-rose-600";
    }
    if (highlightedNodes.has(index)) {
      return "fill-indigo-400 stroke-indigo-600";
    }
    if (index === 0) {
      return rootColorClass;
    }
    return "fill-sky-200 stroke-sky-400";
  };

  const getNodeTextColor = (index) => {
    if (
      swappingNodes &&
      (index === swappingNodes.a || index === swappingNodes.b)
    ) {
      return "fill-amber-900";
    }
    if (index === processingNode || highlightedNodes.has(index)) {
      return "fill-white";
    }
    if (index === 0 && !isMin) {
      return "fill-white";
    }
    return "fill-slate-700";
  };

  const gradientClass = isMin
    ? "bg-linear-to-r from-indigo-500 to-purple-500"
    : "bg-linear-to-r from-violet-500 to-fuchsia-500";

  const selParentIdx =
    selectedNode !== null && selectedNode > 0
      ? Math.floor((selectedNode - 1) / 2)
      : null;
  const selLeftIdx =
    selectedNode !== null && 2 * selectedNode + 1 < heap.length
      ? 2 * selectedNode + 1
      : null;
  const selRightIdx =
    selectedNode !== null && 2 * selectedNode + 2 < heap.length
      ? 2 * selectedNode + 2
      : null;
  const lastNonLeaf = Math.floor(heap.length / 2) - 1;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className={`${gradientClass} px-6 py-4 flex items-center justify-between`}>
        <div>
          <h3 className="text-white font-bold text-lg">🏔️ Heap Animation</h3>
          <p className="text-white/70 text-sm mt-1">
            Watch insert, extract, and build heap in action!
          </p>
        </div>
        {/* Min / Max toggle */}
        <div className="flex items-center bg-white/20 rounded-lg p-0.5">
          <button
            onClick={() => heapType !== "min" && switchHeapType()}
            disabled={isAnimating}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              isMin
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-white/80 hover:text-white disabled:opacity-50"
            }`}
          >
            Min-Heap
          </button>
          <button
            onClick={() => heapType !== "max" && switchHeapType()}
            disabled={isAnimating}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              !isMin
                ? "bg-white text-violet-700 shadow-sm"
                : "text-white/80 hover:text-white disabled:opacity-50"
            }`}
          >
            Max-Heap
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-20 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={isAnimating}
            />
            <button
              onClick={() => {
                const val = parseInt(inputValue);
                if (!isNaN(val)) {
                  animateInsert(val);
                  setInputValue("");
                }
              }}
              disabled={isAnimating || !inputValue}
              className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ⬆️ Insert
            </button>
          </div>
          <button
            onClick={animateExtract}
            disabled={isAnimating || heap.length === 0}
            className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ⬇️ Extract {isMin ? "Min" : "Max"}
          </button>
          <button
            onClick={animateBuildHeap}
            disabled={isAnimating}
            className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            🔨 Build Heap
          </button>
          <button
            onClick={resetHeap}
            disabled={isAnimating}
            className="px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Message */}
      <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          {message}
        </p>
      </div>

      {/* Tree Visualization */}
      <div className="px-6 py-4">
        {heap.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 dark:text-slate-500">
            <p>Heap is empty. Insert a value to begin!</p>
          </div>
        ) : (
          <svg viewBox="0 0 700 320" className="w-full max-w-2xl mx-auto">
            {edges.map((edge, i) => {
              const fromNode = nodes[edge.from];
              const toNode = nodes[edge.to];
              const isHighlighted =
                swappingNodes &&
                ((edge.from === swappingNodes.a &&
                  edge.to === swappingNodes.b) ||
                  (edge.from === swappingNodes.b &&
                    edge.to === swappingNodes.a));
              return (
                <line
                  key={`edge-${i}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`${
                    isHighlighted
                      ? "stroke-amber-400 stroke-3"
                      : "stroke-slate-300 stroke-2"
                  } transition-all duration-300`}
                />
              );
            })}

            {nodes.map((node) => (
              <g
                key={`node-${node.index}`}
                className="transition-all duration-300"
                onClick={() =>
                  !isAnimating &&
                  setSelectedNode(
                    selectedNode === node.index ? null : node.index
                  )
                }
                style={{ cursor: isAnimating ? "default" : "pointer" }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  className={`${getNodeColor(node.index)} stroke-2 transition-all duration-300`}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`${getNodeTextColor(node.index)} text-sm font-bold`}
                  style={{ fontSize: "14px" }}
                >
                  {node.value}
                </text>
                <text
                  x={node.x}
                  y={node.y + 32}
                  textAnchor="middle"
                  className="fill-slate-400"
                  style={{ fontSize: "10px" }}
                >
                  [{node.index}]
                </text>
              </g>
            ))}

            {selectedNode !== null && !isAnimating && nodes[selectedNode] && (
              <>
                <circle
                  cx={nodes[selectedNode].x}
                  cy={nodes[selectedNode].y}
                  r={27}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  strokeDasharray="5,3"
                />
                {selParentIdx !== null && nodes[selParentIdx] && (
                  <>
                    <circle
                      cx={nodes[selParentIdx].x}
                      cy={nodes[selParentIdx].y}
                      r={27}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="4,3"
                    />
                    <text
                      x={
                        (nodes[selectedNode].x + nodes[selParentIdx].x) / 2 +
                        (nodes[selectedNode].x <= nodes[selParentIdx].x
                          ? -22
                          : 22)
                      }
                      y={
                        (nodes[selectedNode].y + nodes[selParentIdx].y) / 2 - 2
                      }
                      textAnchor="middle"
                      fill="#10b981"
                      style={{ fontSize: "9px", fontWeight: 700 }}
                    >
                      ⌊(i−1)/2⌋
                    </text>
                  </>
                )}
                {selLeftIdx !== null && nodes[selLeftIdx] && (
                  <>
                    <circle
                      cx={nodes[selLeftIdx].x}
                      cy={nodes[selLeftIdx].y}
                      r={27}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth={2}
                      strokeDasharray="4,3"
                    />
                    <text
                      x={
                        (nodes[selectedNode].x + nodes[selLeftIdx].x) / 2 - 22
                      }
                      y={
                        (nodes[selectedNode].y + nodes[selLeftIdx].y) / 2 + 2
                      }
                      textAnchor="middle"
                      fill="#d97706"
                      style={{ fontSize: "9px", fontWeight: 700 }}
                    >
                      2i+1
                    </text>
                  </>
                )}
                {selRightIdx !== null && nodes[selRightIdx] && (
                  <>
                    <circle
                      cx={nodes[selRightIdx].x}
                      cy={nodes[selRightIdx].y}
                      r={27}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth={2}
                      strokeDasharray="4,3"
                    />
                    <text
                      x={
                        (nodes[selectedNode].x + nodes[selRightIdx].x) / 2 + 22
                      }
                      y={
                        (nodes[selectedNode].y + nodes[selRightIdx].y) / 2 + 2
                      }
                      textAnchor="middle"
                      fill="#d97706"
                      style={{ fontSize: "9px", fontWeight: 700 }}
                    >
                      2i+2
                    </text>
                  </>
                )}
              </>
            )}
          </svg>
        )}
      </div>

      {/* Index Relationships */}
      {heap.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-3">
              🔢 Array Index Formulas
            </h4>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-emerald-200 dark:border-emerald-800">
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                  Parent
                </p>
                <code className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
                  ⌊(i − 1) / 2⌋
                </code>
                {selectedNode !== null && selectedNode > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 font-mono">
                    ⌊({selectedNode} − 1) / 2⌋ = {Math.floor((selectedNode - 1) / 2)}
                    {selParentIdx !== null && selParentIdx < heap.length && (
                      <span className="text-slate-500 dark:text-slate-400">
                        {" "}→ {heap[selParentIdx]}
                      </span>
                    )}
                  </p>
                )}
                {selectedNode === 0 && (
                  <p className="text-xs text-slate-400 mt-1.5">
                    Root — no parent
                  </p>
                )}
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800">
                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                  Left Child
                </p>
                <code className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
                  2 × i + 1
                </code>
                {selectedNode !== null && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 font-mono">
                    2×{selectedNode} + 1 = {2 * selectedNode + 1}
                    {selLeftIdx !== null ? (
                      <span className="text-slate-500 dark:text-slate-400">
                        {" "}→ {heap[selLeftIdx]}
                      </span>
                    ) : (
                      <span className="text-slate-400"> (none)</span>
                    )}
                  </p>
                )}
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800">
                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                  Right Child
                </p>
                <code className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
                  2 × i + 2
                </code>
                {selectedNode !== null && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 font-mono">
                    2×{selectedNode} + 2 = {2 * selectedNode + 2}
                    {selRightIdx !== null ? (
                      <span className="text-slate-500 dark:text-slate-400">
                        {" "}→ {heap[selRightIdx]}
                      </span>
                    ) : (
                      <span className="text-slate-400"> (none)</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            {selectedNode === null && (
              <p className="text-xs text-indigo-500 dark:text-indigo-400 text-center">
                👆 Click any node in the tree to see the formulas in action
              </p>
            )}
          </div>
        </div>
      )}

      {/* Array representation */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          Array Representation:
        </p>
        <div className="flex flex-wrap gap-1">
          {heap.map((val, i) => (
            <div
              key={i}
              className={`flex flex-col items-center min-w-9 rounded-lg px-2 py-1 transition-all duration-300 ${
                swappingNodes &&
                (i === swappingNodes.a || i === swappingNodes.b)
                  ? "bg-amber-100 ring-2 ring-amber-400"
                  : i === processingNode
                    ? "bg-rose-100 ring-2 ring-rose-400"
                    : highlightedNodes.has(i)
                      ? "bg-indigo-100 ring-2 ring-indigo-400"
                      : i === 0
                        ? rootBgClass
                        : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              }`}
            >
              <span className="text-sm font-bold text-slate-700 dark:text-white">
                {val}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                [{i}]
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Build Heap Order */}
      {heap.length > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700">
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-rose-700 dark:text-rose-300 mb-2">
              🔨 Build Heap — Process Order
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              Start from index{" "}
              <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-rose-600 dark:text-rose-400 text-[11px]">
                ⌊n/2⌋ − 1 = {lastNonLeaf}
              </code>{" "}
              and bubble down each node going left to index{" "}
              <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-rose-600 dark:text-rose-400 text-[11px]">
                0
              </code>
              . Leaves (indices {lastNonLeaf + 1}–{heap.length - 1}) are already
              valid heaps — skip them!
            </p>
            <div className="flex flex-wrap gap-1.5">
              {heap.map((val, i) => {
                const isLeaf = i > lastNonLeaf;
                const processOrder = isLeaf ? null : lastNonLeaf - i + 1;
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center min-w-10 rounded-lg px-2 py-1.5 transition-all ${
                      isLeaf
                        ? "bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 opacity-60"
                        : "bg-rose-100 dark:bg-rose-900/40 border-2 border-rose-300 dark:border-rose-700"
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-white">
                      {val}
                    </span>
                    <span className="text-[10px] text-slate-400">[{i}]</span>
                    {!isLeaf ? (
                      <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                        #{processOrder}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-400 mt-0.5">
                        leaf
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="w-3 h-3 rounded bg-rose-200 dark:bg-rose-800 border border-rose-300 dark:border-rose-700 inline-block" />
                Bubble down (#order)
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 inline-block opacity-60" />
                Leaf (skipped)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Build heap stats */}
      {buildStats && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/20">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {buildStats.swaps}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Swaps
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-400 dark:text-slate-500">
                {buildStats.nLogN}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                n log n
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Only {buildStats.swaps} swaps for {buildStats.n} elements!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Heapify is O(n) — much better than inserting one-by-one which is
                O(n log n ≈ {buildStats.nLogN})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span
            className={`w-3 h-3 rounded-full ${rootDotClass} inline-block`}
          />
          Root ({isMin ? "Min" : "Max"})
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
          Processing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block" />
          Comparing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
          Swapping
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-sky-200 inline-block" />
          Normal
        </span>
      </div>

      {/* Time Complexity Table */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          📐 Time Complexity
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
                <th className="text-left py-2 pr-4 font-bold text-slate-600 dark:text-slate-300">
                  Space
                </th>
                <th className="text-left py-2 font-bold text-slate-600 dark:text-slate-300">
                  Why
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">Insert</td>
                <td className="py-2.5 pr-4">
                  <code className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(log n)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Bubble up through at most log n levels
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">
                  Extract {isMin ? "Min" : "Max"}
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(log n)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Bubble down through at most log n levels
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">
                  Peek ({isMin ? "min" : "max"})
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  {isMin ? "Min" : "Max"} is always at index 0 (root)
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">
                  Heapify (build)
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(n)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Bottom-up — most nodes are leaves and don&apos;t move
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2.5 pr-4 font-medium">
                  Insert n items
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(n log n)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(n)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Each of n inserts costs O(log n)
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Search</td>
                <td className="py-2.5 pr-4">
                  <code className="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded text-xs font-bold">
                    O(n)
                  </code>
                </td>
                <td className="py-2.5 pr-4">
                  <code className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    O(1)
                  </code>
                </td>
                <td className="py-2.5 text-xs">
                  Heap is not sorted — must check every element
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Heapify explanation */}
        <div className="mt-4 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Why is heapify O(n) and not O(n log n)?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Heapify works <strong>bottom-up</strong>: it calls bubble_down from
            the last non-leaf to the root. Most nodes are near the{" "}
            <strong>bottom</strong> of the tree and move very little:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2.5 text-center border border-emerald-200 dark:border-emerald-800">
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                Leaves (bottom)
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                n/2 nodes
              </p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                0 moves
              </p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-2.5 text-center border border-sky-200 dark:border-sky-800">
              <p className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wide">
                Level above
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                n/4 nodes
              </p>
              <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                ≤ 1 move
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2.5 text-center border border-amber-200 dark:border-amber-800">
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                Next level
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                n/8 nodes
              </p>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                ≤ 2 moves
              </p>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-2.5 text-center border border-rose-200 dark:border-rose-800">
              <p className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wide">
                Root (top)
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                1 node
              </p>
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                ≤ log n moves
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Total work:</strong> n/4 · 1 + n/8 · 2 + n/16 · 3 + ... ≈{" "}
            <strong>n</strong> (geometric series). Half the nodes do zero work, a
            quarter do one swap — it adds up to O(n), not O(n log n).
          </p>
        </div>
      </div>
    </div>
  );
}
