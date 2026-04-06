"use client";

import Image from "next/image";

export default function AdminsSection({ adminUsers }) {
  return (
    <div className="mt-10 space-y-3">
      <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Admins</h2>
      <div className="space-y-2">
        {adminUsers.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {admin.image ? (
              <Image src={admin.image} alt={admin.name || ""} width={32} height={32} className="rounded-full shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400 shrink-0">
                {admin.name?.charAt(0) || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{admin.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{admin.email}</p>
            </div>
            <span className="text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 px-2.5 py-1 rounded-full shrink-0">
              Admin
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
