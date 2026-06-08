"use client";

import { useMemo } from "react";
import useExerciseProgress from "@/hooks/useExerciseProgress";
import ProgressBar from "./ProgressBar";

export default function ExerciseProgressTracker({
  exercises,
  label,
  color = "indigo",
  className = "",
}) {
  const ids = useMemo(() => exercises.map((e) => e.id), [exercises]);
  const { completedCount, total } = useExerciseProgress(ids);

  return (
    <ProgressBar
      completed={completedCount}
      total={total}
      label={label}
      color={color}
      className={className}
    />
  );
}

export function ExerciseCheckmark({ exerciseId }) {
  const ids = useMemo(() => [exerciseId], [exerciseId]);
  const { isComplete } = useExerciseProgress(ids);

  if (!isComplete(exerciseId)) return null;

  return (
    <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center" title="Completed">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
