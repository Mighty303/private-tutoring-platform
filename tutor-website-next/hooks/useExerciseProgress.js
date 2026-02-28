"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_PREFIX = "exercise-completed:";

/**
 * Optimistic mark — writes to localStorage and triggers a re-fetch.
 * Also saves to the DB via /api/submissions (caller should do that separately).
 */
export function markExerciseComplete(exerciseId) {
  if (!exerciseId) return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${exerciseId}`, "1");
    window.dispatchEvent(new Event("exercise-progress"));
  } catch {
    // Storage unavailable
  }
}

function readLocalOptimistic(ids) {
  if (typeof window === "undefined") return new Set();
  const set = new Set();
  for (const id of ids) {
    try {
      if (localStorage.getItem(`${STORAGE_PREFIX}${id}`) === "1") set.add(id);
    } catch {
      // ignore
    }
  }
  return set;
}

let _cachedDbSlugs = null;
let _fetchPromise = null;

function fetchCompletedSlugs() {
  if (_fetchPromise) return _fetchPromise;
  _fetchPromise = fetch("/api/submissions/completed")
    .then((res) => res.json())
    .then((data) => {
      _cachedDbSlugs = new Set(data.slugs || []);
      _fetchPromise = null;
      return _cachedDbSlugs;
    })
    .catch(() => {
      _fetchPromise = null;
      return _cachedDbSlugs || new Set();
    });
  return _fetchPromise;
}

export function invalidateCompletedCache() {
  _cachedDbSlugs = null;
  _fetchPromise = null;
}

export default function useExerciseProgress(exerciseIds) {
  const [completedSet, setCompletedSet] = useState(() =>
    readLocalOptimistic(exerciseIds)
  );

  const refresh = useCallback(async () => {
    const local = readLocalOptimistic(exerciseIds);
    const db = await fetchCompletedSlugs();
    const merged = new Set([...local]);
    for (const slug of db) {
      if (exerciseIds.includes(slug)) merged.add(slug);
    }
    setCompletedSet(merged);
  }, [exerciseIds]);

  useEffect(() => {
    refresh();

    const handler = () => refresh();
    window.addEventListener("exercise-progress", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("exercise-progress", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  return {
    completedSet,
    completedCount: completedSet.size,
    total: exerciseIds.length,
    isComplete: (id) => completedSet.has(id),
  };
}
