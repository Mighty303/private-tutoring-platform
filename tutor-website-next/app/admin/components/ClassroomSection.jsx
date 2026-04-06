"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ClassroomSection({ classrooms, onRefreshClassrooms }) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  // keyed by classroom id
  const [membersMap, setMembersMap] = useState({});
  const [invitesMap, setInvitesMap] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    if (classrooms.length === 0) return;
    async function loadAll() {
      const results = await Promise.all(
        classrooms.map(async (c) => {
          const [membersRes, invitesRes] = await Promise.all([
            fetch(`/api/classrooms/${c.id}/members`),
            fetch(`/api/classrooms/${c.id}/invite`),
          ]);
          return {
            id: c.id,
            members: await membersRes.json(),
            invites: await invitesRes.json(),
          };
        })
      );
      const mMap = {};
      const iMap = {};
      for (const r of results) {
        mMap[r.id] = r.members;
        iMap[r.id] = r.invites;
      }
      setMembersMap(mMap);
      setInvitesMap(iMap);
    }
    loadAll();
  }, [classrooms]);

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

  async function generateInvite(classroomId) {
    const res = await fetch(`/api/classrooms/${classroomId}/invite`, { method: "POST" });
    if (res.ok) {
      const invite = await res.json();
      const invitesRes = await fetch(`/api/classrooms/${classroomId}/invite`);
      const updated = await invitesRes.json();
      setInvitesMap((prev) => ({ ...prev, [classroomId]: updated }));
      copyToClipboard(invite.url, invite.code);
    }
  }

  function copyToClipboard(text, code) {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Create Classroom */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
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

      {/* Classroom cards */}
      {classrooms.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No classrooms yet. Create one above!</p>
        </div>
      ) : (
        classrooms.map((c) => {
          const members = membersMap[c.id] ?? [];
          const invites = invitesMap[c.id] ?? [];
          return (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{c.name}</h3>
                  {c.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.description}</p>
                  )}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 shrink-0">
                  {c.member_count || 0} students
                </span>
              </div>

              {/* Invite Links */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Invite Links</h4>
                  <button
                    onClick={() => generateInvite(c.id)}
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
          );
        })
      )}
    </div>
  );
}
