"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Triggers a re-fetch of progress from the DB.
 * Call after saving a submission to /api/submissions.
 */
export function markExerciseComplete(exerciseId) {
  if (!exerciseId) return;
  window.dispatchEvent(new Event("exercise-progress"));
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

/** Extract short slug from DB value — handles full URLs (e.g. from admin-pass) vs short slugs */
function normalizeSlug(slug) {
  if (!slug || typeof slug !== "string") return slug;
  if (slug.startsWith("http")) {
    const parts = slug.split("/").filter(Boolean);
    return parts[parts.length - 1] || slug;
  }
  return slug;
}

export default function useExerciseProgress(exerciseIds) {
  const [completedSet, setCompletedSet] = useState(() => new Set());

  const refresh = useCallback(async () => {
    const db = await fetchCompletedSlugs();
    const completed = new Set();
    for (const slug of db) {
      const normalized = normalizeSlug(slug);
      if (exerciseIds.includes(normalized)) completed.add(normalized);
    }
    setCompletedSet(completed);
  }, [exerciseIds]);

  useEffect(() => {
    refresh();

    const handler = () => refresh();
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        invalidateCompletedCache();
        refresh();
      }
    };
    const pollInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        invalidateCompletedCache();
        refresh();
      }
    }, 60_000); // Refetch every 60s when tab visible (catches admin-passed exercises)
    window.addEventListener("exercise-progress", handler);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("exercise-progress", handler);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [refresh]);

  return {
    completedSet,
    completedCount: completedSet.size,
    total: exerciseIds.length,
    isComplete: (id) => completedSet.has(id),
  };
}
