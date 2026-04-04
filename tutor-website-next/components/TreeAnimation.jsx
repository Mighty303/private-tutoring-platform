"use client";

import { useState, useCallback } from "react";

const ANIMATION_SPEED = 500;

// --- BST helpers ---
function insertBST(nodes, edges, val) {
  if (nodes.length === 0) {
    return { nodes: [{ id: 0, val }], edges: [] };
  }
  const newNodes = nodes.map((n) => ({ ...n }));
  const newEdges = [...edges];
  let current = 0;
  while (true) {
    if (val < newNodes[current].val) {
      if (newNodes[current].left === undefined) {
        const newId = newNodes.length;
        newNodes[current].left = newId;
        newNodes.push({ id: newId, val });
        newEdges.push({ from: current, to: newId, side: "left" });
        break;
      }
      current = newNodes[current].left;
    } else {
      if (newNodes[current].right === undefined) {
        const newId = newNodes.length;
        newNodes[current].right = newId;
        newNodes.push({ id: newId, val });
        newEdges.push({ from: current, to: newId, side: "right" });
        break;
      }
      current = newNodes[current].right;
    }
  }
  return { nodes: newNodes, edges: newEdges };
}

function buildInitialBST(values) {
  let result = { nodes: [], edges: [] };
  for (const v of values) {
    result = insertBST(result.nodes, result.edges, v);
  }
  return result;
}

function getInorder(nodes, rootId = 0) {
  const node = nodes[rootId];
  if (!node) return [];
  return [
    ...(node.left !== undefined ? getInorder(nodes, node.left) : []),
    rootId,
    ...(node.right !== undefined ? getInorder(nodes, node.right) : []),
  ];
}

function getPreorder(nodes, rootId = 0) {
  const node = nodes[rootId];
  if (!node) return [];
  return [
    rootId,
    ...(node.left !== undefined ? getPreorder(nodes, node.left) : []),
    ...(node.right !== undefined ? getPreorder(nodes, node.right) : []),
  ];
}

function getPostorder(nodes, rootId = 0) {
  const node = nodes[rootId];
  if (!node) return [];
  return [
    ...(node.left !== undefined ? getPostorder(nodes, node.left) : []),
    ...(node.right !== undefined ? getPostorder(nodes, node.right) : []),
    rootId,
  ];
}

// --- Layout ---
function computeLayout(nodes, rootId = 0, x = 350, y = 50, spread = 160) {
  const node = nodes[rootId];
  if (!node) return {};
  const pos = { [rootId]: { x, y } };
  const nextSpread = Math.max(spread * 0.5, 30);
  const leftPos = node.left !== undefined ? computeLayout(nodes, node.left, x - spread, y + 80, nextSpread) : {};
  const rightPos = node.right !== undefined ? computeLayout(nodes, node.right, x + spread, y + 80, nextSpread) : {};
  return { ...pos, ...leftPos, ...rightPos };
}

const INITIAL_VALUES = [8, 4, 12, 2, 6, 10, 14];

const TRAVERSAL_DESCRIPTIONS = {
  inorder:   { label: "Inorder",   order: "Left → Root → Right", note: "Visits nodes in sorted order (for BSTs)" },
  preorder:  { label: "Preorder",  order: "Root → Left → Right", note: "Useful for copying or serializing a tree" },
  postorder: { label: "Postorder", order: "Left → Right → Root", note: "Useful for deleting nodes or evaluating expressions" },
};

export default function TreeAnimation() {
  const [tree, setTree] = useState(() => buildInitialBST(INITIAL_VALUES));
  const [inputValue, setInputValue] = useState("");
  const [layout, setLayout] = useState(() => computeLayout(buildInitialBST(INITIAL_VALUES).nodes));
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [traversalType, setTraversalType] = useState("inorder");
  const [newNodeId, setNewNodeId] = useState(null);
  const [message, setMessage] = useState("A BST: for every node, left < node < right");
  const [searchPath, setSearchPath] = useState(new Set());

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleInsert = useCallback(async () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || isAnimating) return;
    setInputValue("");
    setIsAnimating(true);
    setHighlightedNodes(new Set());
    setVisitedOrder([]);
    setSearchPath(new Set());

    // Animate search path
    const path = [];
    let current = 0;
    while (current !== undefined && current !== null && tree.nodes[current]) {
      path.push(current);
      setSearchPath(new Set(path));
      setMessage(`Comparing ${val} with ${tree.nodes[current].val}...`);
      await sleep(ANIMATION_SPEED);
      if (val < tree.nodes[current].val) {
        current = tree.nodes[current].left;
      } else if (val > tree.nodes[current].val) {
        current = tree.nodes[current].right;
      } else {
        setMessage(`${val} already exists in the tree!`);
        setIsAnimating(false);
        setSearchPath(new Set());
        return;
      }
    }

    const newTree = insertBST(tree.nodes, tree.edges, val);
    const newLayout = computeLayout(newTree.nodes);
    const addedId = newTree.nodes.length - 1;
    setTree(newTree);
    setLayout(newLayout);
    setNewNodeId(addedId);
    setSearchPath(new Set());
    setMessage(`Inserted ${val}! ✓`);
    await sleep(800);
    setNewNodeId(null);
    setMessage("A BST: for every node, left < node < right");
    setIsAnimating(false);
  }, [inputValue, isAnimating, tree]);

  const handleTraversal = useCallback(async (type) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTraversalType(type);
    setHighlightedNodes(new Set());
    setVisitedOrder([]);
    setSearchPath(new Set());

    const getOrder =
      type === "inorder" ? getInorder :
      type === "preorder" ? getPreorder :
      getPostorder;

    const order = getOrder(tree.nodes, 0);
    const desc = TRAVERSAL_DESCRIPTIONS[type];
    setMessage(`${desc.label}: ${desc.order}`);

    const visited = [];
    for (const nodeId of order) {
      visited.push(nodeId);
      setHighlightedNodes(new Set(visited));
      setVisitedOrder([...visited]);
      await sleep(ANIMATION_SPEED);
    }

    setMessage(`${desc.label} complete! ${desc.note}`);
    setIsAnimating(false);
  }, [isAnimating, tree]);

  const handleReset = useCallback(() => {
    if (isAnimating) return;
    const initial = buildInitialBST(INITIAL_VALUES);
    setTree(initial);
    setLayout(computeLayout(initial.nodes));
    setHighlightedNodes(new Set());
    setVisitedOrder([]);
    setSearchPath(new Set());
    setNewNodeId(null);
    setMessage("A BST: for every node, left < node < right");
  }, [isAnimating]);

  const positions = layout;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-8">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16M6 16l2-8h8l2 8M9 12h6M10 8h4" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Binary Search Tree — Interactive
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Insert nodes and watch traversals animate step-by-step
            </p>
          </div>
        </div>
      </div>

      {/* Message bar */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-800 px-6 py-2">
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 text-center min-h-5">
          {message}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
        {/* Insert */}
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            placeholder="Value"
            disabled={isAnimating}
            className="w-24 px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
          />
          <button
            onClick={handleInsert}
            disabled={isAnimating || inputValue === ""}
            className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-colors"
          >
            Insert
          </button>
        </div>

        {/* Traversal buttons */}
        <div className="flex gap-2">
          {["inorder", "preorder", "postorder"].map((t) => (
            <button
              key={t}
              onClick={() => handleTraversal(t)}
              disabled={isAnimating}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 ${
                traversalType === t && visitedOrder.length > 0
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              }`}
            >
              {TRAVERSAL_DESCRIPTIONS[t].label}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          disabled={isAnimating}
          className="ml-auto px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* SVG Tree */}
      <div className="px-4 py-4 overflow-x-auto">
        <svg
          viewBox="0 0 700 360"
          className="w-full max-w-2xl mx-auto"
          style={{ minHeight: 280 }}
        >
          {/* Edges */}
          {tree.edges.map((edge, i) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#cbd5e1"
                strokeWidth="2"
                className="dark:stroke-slate-600"
              />
            );
          })}

          {/* Nodes */}
          {tree.nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const isHighlighted = highlightedNodes.has(node.id);
            const isNew = newNodeId === node.id;
            const isOnSearchPath = searchPath.has(node.id);
            const visitIndex = visitedOrder.indexOf(node.id);

            let circleClass = "fill-white stroke-slate-300";
            let textClass = "fill-slate-700";

            if (isNew) {
              circleClass = "fill-green-400 stroke-green-600";
              textClass = "fill-white";
            } else if (isHighlighted) {
              circleClass = "fill-indigo-500 stroke-indigo-700";
              textClass = "fill-white";
            } else if (isOnSearchPath) {
              circleClass = "fill-amber-300 stroke-amber-500";
              textClass = "fill-amber-900";
            }

            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={22}
                  className={`${circleClass} stroke-2`}
                  style={{
                    transition: "fill 0.3s, stroke 0.3s",
                    filter: isNew ? "drop-shadow(0 0 6px rgba(34,197,94,0.6))" : "none",
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  className={textClass}
                >
                  {node.val}
                </text>
                {isHighlighted && visitIndex >= 0 && (
                  <text
                    x={pos.x + 18}
                    y={pos.y - 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#6366f1"
                  >
                    {visitIndex + 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal result */}
      {visitedOrder.length > 0 && (
        <div className="px-6 pb-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl px-4 py-3 border border-indigo-100 dark:border-indigo-800">
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wide">
              {TRAVERSAL_DESCRIPTIONS[traversalType].label} Order
            </p>
            <div className="flex flex-wrap gap-1.5">
              {visitedOrder.map((nodeId, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 text-sm font-bold px-2.5 py-0.5 rounded-full"
                >
                  <span className="text-xs text-indigo-400 dark:text-indigo-400">{i + 1}.</span>
                  {tree.nodes[nodeId]?.val}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-6 pb-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
          Visited (traversal)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-300 inline-block" />
          Search path (insert)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
          Newly inserted
        </span>
        <span className="flex items-center gap-1.5 ml-auto font-medium text-slate-400 dark:text-slate-500">
          Numbers = visit order
        </span>
      </div>
    </div>
  );
}
