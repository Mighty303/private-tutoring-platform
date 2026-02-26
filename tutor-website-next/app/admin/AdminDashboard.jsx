"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState(null); // classroom id
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null); // user id

  // Submissions state
  const [submissions, setSubmissions] = useState([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subsLoaded, setSubsLoaded] = useState(false);
  const [exerciseFilter, setExerciseFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");
  const [expandedSub, setExpandedSub] = useState(null); // submission id
  const [analyzing, setAnalyzing] = useState(null); // submission id being analyzed
  const [analyses, setAnalyses] = useState({}); // { submissionId: analysis string }

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/classrooms").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json()),
    ]).then(([classroomsData, usersData]) => {
      if (!cancelled) {
        setClassrooms(classroomsData);
        setUsers(usersData);
        setLoading(false);
        setUsersLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  async function refreshClassrooms() {
    const res = await fetch("/api/classrooms");
    const data = await res.json();
    setClassrooms(data);
  }

  async function refreshUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  async function changeRole(userId, newRole) {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      refreshUsers();
    }
  }

  async function deleteUser(userId) {
    const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (res.ok) {
      setConfirmDelete(null);
      refreshUsers();
      refreshClassrooms();
    }
  }

  async function loadSubmissions() {
    setSubsLoading(true);
    const params = new URLSearchParams();
    if (exerciseFilter) params.set("exercise", exerciseFilter);
    if (studentFilter) params.set("student", studentFilter);

    try {
      const res = await fetch(`/api/submissions/all?${params.toString()}`);
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
      setSubsLoaded(true);
    } catch {
      setSubmissions([]);
    } finally {
      setSubsLoading(false);
    }
  }

  async function analyzeSubmission(sub) {
    setAnalyzing(sub.id);
    try {
      const res = await fetch("/api/submissions/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: sub.code,
          exerciseSlug: sub.exercise_slug,
          studentName: sub.user_name,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalyses((prev) => ({ ...prev, [sub.id]: data.analysis }));
      } else {
        setAnalyses((prev) => ({ ...prev, [sub.id]: "Failed to generate analysis." }));
      }
    } catch {
      setAnalyses((prev) => ({ ...prev, [sub.id]: "Failed to generate analysis." }));
    } finally {
      setAnalyzing(null);
    }
  }

  // Get unique exercise slugs from loaded submissions for the dropdown
  const exerciseSlugs = [...new Set(submissions.map((s) => s.exercise_slug))].sort();

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
      refreshClassrooms();
    }
    setCreating(false);
  }

  async function toggleExpand(id) {
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
    const res = await fetch(`/api/classrooms/${classroomId}/invite`, {
      method: "POST",
    });
    if (res.ok) {
      const invite = await res.json();
      // Refresh invites
      const invitesRes = await fetch(`/api/classrooms/${classroomId}/invite`);
      setInvites(await invitesRes.json());
      // Auto-copy
      copyToClipboard(invite.url, invite.code);
    }
  }

  function copyToClipboard(text, code) {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage classrooms and invite students
          </p>
        </div>

        {/* Create Classroom */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Create New Classroom
          </h2>
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

        {/* Classrooms List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Your Classrooms ({classrooms.length})
          </h2>

          {classrooms.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">No classrooms yet. Create one above!</p>
            </div>
          ) : (
            classrooms.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Classroom header */}
                <div
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => toggleExpand(c.id)}
                >
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{c.name}</h3>
                    {c.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{c.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-2.5 py-1 rounded-full">
                      {c.member_count || 0} students
                    </span>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${expanded === c.id ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                {expanded === c.id && (
                  <div className="border-t border-slate-100 dark:border-slate-700 p-5 space-y-6">
                    {/* Generate Invite */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Invite Links
                        </h4>
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
                                <Image
                                  src={m.image}
                                  alt={m.name || ""}
                                  width={28}
                                  height={28}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                  {m.name?.charAt(0) || "?"}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                                  {m.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {m.email}
                                </p>
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
              </div>
            ))
          )}
        </div>

        {/* User Management */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            All Users ({users.length})
          </h2>

          {usersLoading ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">No users found.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>User</span>
                <span className="w-32 text-center">Role</span>
                <span className="w-20 text-center">Actions</span>
              </div>

              {/* User rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {users.map((u) => {
                  const isAdmin = u.role === "admin";
                  const roleColors = {
                    admin: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
                    teacher: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
                    student: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
                  };

                  return (
                    <div
                      key={u.id}
                      className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-3 sm:gap-4 px-5 py-4 items-start sm:items-center"
                    >
                      {/* User info */}
                      <div className="flex items-center gap-3 min-w-0">
                        {u.image ? (
                          <Image
                            src={u.image}
                            alt={u.name || ""}
                            width={36}
                            height={36}
                            className="rounded-full shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                            {u.name?.charAt(0) || "?"}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {u.email}
                          </p>
                        </div>
                      </div>

                      {/* Role selector */}
                      <div className="w-32">
                        {isAdmin ? (
                          <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-lg ${roleColors.admin}`}>
                            Admin
                          </span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => changeRole(u.id, e.target.value)}
                            className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
                      </div>

                      {/* Delete button */}
                      <div className="w-20 flex justify-center">
                        {isAdmin ? (
                          <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                        ) : confirmDelete === u.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                              Confirm
                            </button>
                            <span className="text-slate-300 dark:text-slate-600">|</span>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs font-medium text-slate-500 hover:underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(u.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                            title="Delete user"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Code Submissions */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Code Submissions
            </h2>
            <button
              onClick={loadSubmissions}
              disabled={subsLoading}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {subsLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {subsLoaded ? "Refresh" : "Load Submissions"}
                </>
              )}
            </button>
          </div>

          {/* Filters */}
          {subsLoaded && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Filter by Exercise
                </label>
                <select
                  value={exerciseFilter}
                  onChange={(e) => setExerciseFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Exercises</option>
                  {exerciseSlugs.map((slug) => (
                    <option key={slug} value={slug}>{slug}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Filter by Student
                </label>
                <select
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Students</option>
                  {users.filter((u) => u.role !== "admin").map((u) => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={loadSubmissions}
                  disabled={subsLoading}
                  className="px-4 py-2 text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* Submissions list */}
          {!subsLoaded ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                Click &quot;Load Submissions&quot; to view student code.
              </p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">No submissions found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  {/* Submission header */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    onClick={() => setExpandedSub(expandedSub === sub.id ? null : sub.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {sub.user_image ? (
                        <Image
                          src={sub.user_image}
                          alt={sub.user_name || ""}
                          width={32}
                          height={32}
                          className="rounded-full shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                          {sub.user_name?.charAt(0) || "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                          {sub.user_name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {sub.user_email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span className="text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 px-2.5 py-1 rounded-full">
                        {sub.exercise_slug}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {new Date(sub.created_at).toLocaleString()}
                      </span>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${expandedSub === sub.id ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded: code + analysis */}
                  {expandedSub === sub.id && (
                    <div className="border-t border-slate-100 dark:border-slate-700 p-5 space-y-4">
                      {/* Code display */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Submitted Code
                        </h4>
                        <pre className="bg-slate-900 text-slate-100 text-sm p-4 rounded-xl overflow-x-auto font-mono leading-relaxed">
                          <code>{sub.code}</code>
                        </pre>
                      </div>

                      {/* Analyze button */}
                      <div>
                        <button
                          onClick={() => analyzeSubmission(sub)}
                          disabled={analyzing === sub.id}
                          className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {analyzing === sub.id ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Analyzing…
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {analyses[sub.id] ? "Re-analyze" : "Analyze with AI"}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Analysis result */}
                      {analyses[sub.id] && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">🤖</span>
                            <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                              AI Analysis
                            </h4>
                          </div>
                          <div className="text-sm text-purple-900 dark:text-purple-200 whitespace-pre-wrap leading-relaxed">
                            {analyses[sub.id]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
