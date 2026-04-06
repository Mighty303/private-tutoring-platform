"use client";

export default function ClassroomPicker({ classrooms, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("")}
        className={`px-3 py-1.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
          value === ""
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
            : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        None
      </button>
      {classrooms.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(String(c.id))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm transition-colors cursor-pointer ${
            String(value) === String(c.id)
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium"
              : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          <span>{c.name}</span>
          {c.member_count > 0 && (
            <span className="text-xs text-slate-400 dark:text-slate-500">{c.member_count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
