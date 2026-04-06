"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClassroomSection({ classrooms, onRefreshClassrooms }) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  async function createClassroom(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    const res = await fetch("/api/classrooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, description: newDesc }),
    });
    if (res.ok) {
      setNewName("");
      setNewDesc("");
      onRefreshClassrooms();
    }
    setCreating(false);
  }

  async function selectClassroom(id) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    const [membersRes, invitesRes] = await Promise.all([
      fetch(`/api/classrooms/${id}/members`),
      fetch(`/api/classrooms/${id}/invite`),
    ]);
    setMembers(await membersRes.json());
    setInvites(await invitesRes.json());
  }

  async function generateInvite(classroomId) {
    const res = await fetch(`/api/classrooms/${classroomId}/invite`, { method: "POST" });
    if (res.ok) {
      const invite = await res.json();
      const invitesRes = await fetch(`/api/classrooms/${classroomId}/invite`);
      setInvites(await invitesRes.json());
      copyToClipboard(invite.url, invite.code);
    }
  }

  function copyToClipboard(text, code) {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  const expandedClassroom = classrooms.find((c) => c.id === expanded);

  return (
    <>
      {/* Create Classroom */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create New Classroom</h2>
        <form onSubmit={createClassroom} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Classroom Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Saturday Python — Spring 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="e.g. Python fundamentals for beginners"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {creating ? "Creating..." : "Create Classroom"}
          </button>
        </form>
      </div>

      {/* Classrooms card grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Your Classrooms ({classrooms.length})
        </h2>

        {classrooms.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No classrooms yet. Create one above!</p>
          </div>
        ) : (
          <>
            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {classrooms.map((c) => {
                const isSelected = expanded === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectClassroom(c.id)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`font-semibold truncate ${isSelected ? "text-indigo-800 dark:text-indigo-200" : "text-slate-800 dark:text-white"}`}>
                          {c.name}
                        </p>
                        {c.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{c.description}</p>
                        )}
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                        isSelected
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/50 dark:text-indigo-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        {c.member_count || 0} students
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded panel */}
            {expanded && expandedClassroom && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-5 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{expandedClassroom.name}</h3>
                  <button
                    onClick={() => setExpanded(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Invite Links */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Invite Links</h4>
                    <button
                      onClick={() => generateInvite(expanded)}
                      className="inline-flex items-center gap-1.5 text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Generate Invite
                    </button>
                  </div>
                  {invites.length === 0 ? (
                    <p className="text-sm text-slate-400">No invites generated yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {invites.map((inv) => {
                        const expired = new Date(inv.expires_at) < new Date();
                        const used = !!inv.used_by;
                        const url = `${window.location.origin}/invite/${inv.code}`;
                        return (
                          <div
                            key={inv.id}
                            className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg border ${
                              used
                                ? "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                                : expired
                                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                                : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <code className="text-xs text-slate-500 dark:text-slate-400 truncate block">
                                {inv.code.slice(0, 12)}...
                              </code>
                              {used && (
                                <span className="text-xs text-slate-500">
                                  Used by {inv.used_by_name || inv.used_by_email}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              {used ? (
                                <span className="text-xs font-medium text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                                  Used
                                </span>
                              ) : expired ? (
                                <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 px-2 py-0.5 rounded">
                                  Expired
                                </span>
                              ) : (
                                <>
                                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
                                    Active
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(url, inv.code)}
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                  >
                                    {copiedCode === inv.code ? "Copied!" : "Copy"}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Members */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Students ({members.length})
                  </h4>
                  {members.length === 0 ? (
                    <p className="text-sm text-slate-400">No students have joined yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {members.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                        >
                          {m.image ? (
                            <Image src={m.image} alt={m.name || ""} width={28} height={28} className="rounded-full" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              {m.name?.charAt(0) || "?"}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{m.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{m.email}</p>
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(m.joined_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
