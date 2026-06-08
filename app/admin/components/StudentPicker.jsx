"use client";

import Image from "next/image";

export default function StudentPicker({ students, value, onChange, colorScheme = "amber" }) {
  const selectedCls =
    colorScheme === "amber"
      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200"
      : "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300";

  return (
    <div className="flex flex-wrap gap-2">
      {students.map((u) => {
        const selected = String(value) === String(u.id);
        return (
          <button
            key={u.id}
            type="button"
            onClick={() => onChange(selected ? "" : String(u.id))}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm transition-colors cursor-pointer ${
              selected
                ? selectedCls
                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            {u.image ? (
              <Image src={u.image} alt={u.name || ""} width={20} height={20} className="rounded-full shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                {u.name?.charAt(0) || "?"}
              </div>
            )}
            <span>{u.name || u.email}</span>
          </button>
        );
      })}
    </div>
  );
}
