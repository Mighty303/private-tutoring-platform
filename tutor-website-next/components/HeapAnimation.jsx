"use client";

import { useState, useCallback } from "react";

const ANIMATION_SPEED = 600;

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
  const [heap, setHeap] = useState([1, 3, 5, 7, 4, 8, 6]);
  const [inputValue, setInputValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [swappingNodes, setSwappingNodes] = useState(null);
  const [message, setMessage] = useState("Min-Heap: Parent ≤ Children");
  const [isAnimating, setIsAnimating] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animateInsert = useCallback(
    async (value) => {
      if (isAnimating) return;
      setIsAnimating(true);

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

        if (newHeap[idx] < newHeap[parentIdx]) {
          setMessage(`${newHeap[idx]} < ${newHeap[parentIdx]} → Swap!`);
          await sleep(ANIMATION_SPEED);

          [newHeap[idx], newHeap[parentIdx]] = [
            newHeap[parentIdx],
            newHeap[idx],
          ];
          setHeap([...newHeap]);
          idx = parentIdx;
          await sleep(ANIMATION_SPEED / 2);
        } else {
          setMessage(
            `${newHeap[idx]} ≥ ${newHeap[parentIdx]} → Stop! Heap property satisfied.`
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
      setMessage("Min-Heap: Parent ≤ Children");
      setIsAnimating(false);
    },
    [heap, isAnimating]
  );

  const animateExtractMin = useCallback(async () => {
    if (isAnimating || heap.length === 0) return;
    setIsAnimating(true);

    const newHeap = [...heap];
    const minValue = newHeap[0];
    setHighlightedNodes(new Set([0]));
    setMessage(`Extracting min: ${minValue}`);
    await sleep(ANIMATION_SPEED);

    if (newHeap.length === 1) {
      setHeap([]);
      setMessage(`Extracted ${minValue}. Heap is now empty.`);
      setHighlightedNodes(new Set());
      await sleep(ANIMATION_SPEED);
      setMessage("Min-Heap: Parent ≤ Children");
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
      let smallest = idx;

      if (left < newHeap.length && newHeap[left] < newHeap[smallest]) {
        smallest = left;
      }
      if (right < newHeap.length && newHeap[right] < newHeap[smallest]) {
        smallest = right;
      }

      if (smallest !== idx) {
        setSwappingNodes({ a: idx, b: smallest });
        setHighlightedNodes(new Set([idx, smallest]));
        setMessage(
          `${newHeap[idx]} > ${newHeap[smallest]} → Swap with smaller child!`
        );
        await sleep(ANIMATION_SPEED);

        [newHeap[idx], newHeap[smallest]] = [newHeap[smallest], newHeap[idx]];
        setHeap([...newHeap]);
        idx = smallest;
        await sleep(ANIMATION_SPEED / 2);
      } else {
        setMessage(`${newHeap[idx]} ≤ both children → Stop! Heap restored.`);
        break;
      }
    }

    setSwappingNodes(null);
    setHighlightedNodes(new Set());
    await sleep(ANIMATION_SPEED);
    setMessage(`Extracted ${minValue}. Min-Heap: Parent ≤ Children`);
    setIsAnimating(false);
  }, [heap, isAnimating]);

  const resetHeap = useCallback(() => {
    if (isAnimating) return;
    setHeap([1, 3, 5, 7, 4, 8, 6]);
    setHighlightedNodes(new Set());
    setSwappingNodes(null);
    setMessage("Min-Heap: Parent ≤ Children");
  }, [isAnimating]);

  const { nodes, edges } = getTreeLayout(heap);

  const getNodeColor = (index) => {
    if (
      swappingNodes &&
      (index === swappingNodes.a || index === swappingNodes.b)
    ) {
      return "fill-amber-400 stroke-amber-600";
    }
    if (highlightedNodes.has(index)) {
      return "fill-indigo-400 stroke-indigo-600";
    }
    if (index === 0) {
      return "fill-emerald-400 stroke-emerald-600";
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
    if (highlightedNodes.has(index)) {
      return "fill-white";
    }
    return "fill-slate-700";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden my-6">
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-4">
        <h3 className="text-white font-bold text-lg">🏔️ Heap Animation</h3>
        <p className="text-indigo-100 text-sm mt-1">
          Watch how insert (bubble up) and extract-min (bubble down) work!
        </p>
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
            onClick={animateExtractMin}
            disabled={isAnimating || heap.length === 0}
            className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ⬇️ Extract Min
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
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{message}</p>
      </div>

      {/* Tree Visualization */}
      <div className="px-6 py-4">
        {heap.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 dark:text-slate-500">
            <p>Heap is empty. Insert a value to begin!</p>
          </div>
        ) : (
          <svg viewBox="0 0 700 320" className="w-full max-w-2xl mx-auto">
            {/* Edges */}
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

            {/* Nodes */}
            {nodes.map((node) => (
              <g
                key={`node-${node.index}`}
                className="transition-all duration-300"
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
                {/* Index label */}
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
          </svg>
        )}
      </div>

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
                highlightedNodes.has(i)
                  ? "bg-indigo-100 ring-2 ring-indigo-400"
                  : swappingNodes &&
                      (i === swappingNodes.a || i === swappingNodes.b)
                    ? "bg-amber-100 ring-2 ring-amber-400"
                    : i === 0
                      ? "bg-emerald-100 dark:bg-emerald-900/50"
                      : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              }`}
            >
              <span className="text-sm font-bold text-slate-700 dark:text-white">{val}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          Root (Min)
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
    </div>
  );
}
