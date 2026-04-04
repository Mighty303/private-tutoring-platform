"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { exerciseSections } from "@/lib/lessons";

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
  const [passStudent, setPassStudent] = useState(""); // userId for grant pass
  const [passExercise, setPassExercise] = useState(""); // exercise slug
  const [passExerciseCustom, setPassExerciseCustom] = useState(""); // custom slug when not in list
  const [passing, setPassing] = useState(null); // userId when granting pass
  const [passAnotherExercise, setPassAnotherExercise] = useState(null); // submission id when showing pass-another form

  // Homework state
  const [hwAssignments, setHwAssignments] = useState([]);
  const [hwTitle, setHwTitle] = useState("");
  const [hwSlugs, setHwSlugs] = useState([]);
  const [hwDueDate, setHwDueDate] = useState("");
  const [hwClassroomId, setHwClassroomId] = useState("");
  const [hwStudentIds, setHwStudentIds] = useState([]);
  const [hwCreating, setHwCreating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [classroomsData, usersData, subsData, hwData] = await Promise.all([
        fetch("/api/classrooms").then((res) => res.json()),
        fetch("/api/users").then((res) => res.json()),
        fetch("/api/submissions/all").then((res) => res.json()),
        fetch("/api/homework/admin").then((res) => res.json()),
      ]);
      if (!cancelled) {
        setClassrooms(classroomsData);
        setUsers(usersData);
        setSubmissions(Array.isArray(subsData) ? subsData : []);
        setSubsLoaded(true);
        setLoading(false);
        setUsersLoading(false);
        setHwAssignments(Array.isArray(hwData) ? hwData : []);
      }
    }
    load();
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

  async function refreshSubmissions() {
    setSubsLoading(true);
    try {
      const res = await fetch("/api/submissions/all");
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
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

  async function refreshHomework() {
    const res = await fetch("/api/homework/admin");
    const data = await res.json();
    setHwAssignments(Array.isArray(data) ? data : []);
  }

  async function createHomework(e) {
    e.preventDefault();
    if (!hwTitle || !hwSlugs.length || !hwDueDate) return;
    setHwCreating(true);
    try {
      const res = await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: hwTitle,
          exerciseSlugs: hwSlugs,
          dueDate: hwDueDate,
          classroomId: hwClassroomId ? Number(hwClassroomId) : null,
          studentIds: hwStudentIds.map(Number),
        }),
      });
      if (res.ok) {
        setHwTitle("");
        setHwSlugs([]);
        setHwDueDate("");
        setHwClassroomId("");
        setHwStudentIds([]);
        await refreshHomework();
      }
    } finally {
      setHwCreating(false);
    }
  }

  async function deleteHomeworkRow(id) {
    await fetch(`/api/homework/${id}`, { method: "DELETE" });
    await refreshHomework();
  }

  // Get unique exercise slugs from loaded submissions for the dropdown
  const exerciseSlugs = [...new Set(submissions.map((s) => s.exercise_slug))].sort();

  // Filter submissions client-side for the code list
  const filteredSubmissions = submissions.filter((s) => {
    if (exerciseFilter && s.exercise_slug !== exerciseFilter) return false;
    if (studentFilter && s.user_id !== Number(studentFilter)) return false;
    return true;
  });

  // Group submissions by student for progress view; include all students (from users)
  const students = users.filter((u) => u.role !== "admin");
  const progressByStudent = submissions.reduce((acc, sub) => {
    const id = sub.user_id;
    if (!acc[id]) acc[id] = { exercises: [] };
    acc[id].exercises.push({ exercise_slug: sub.exercise_slug, created_at: sub.created_at, id: sub.id });
    return acc;
  }, {});
  const studentProgressList = students.map((u) => {
    const prog = progressByStudent[u.id] || { exercises: [] };
    return {
      user_id: u.id,
      user_name: u.name,
      user_email: u.email,
      user_image: u.image,
      exercises: [...prog.exercises].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    };
  }).sort((a, b) => (a.user_name || "").localeCompare(b.user_name || ""));

  async function grantPass(userId, exerciseSlug, code) {
    if (!userId || !exerciseSlug) return;
    setPassing(userId);
    try {
      const res = await fetch("/api/submissions/admin-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, exerciseSlug, code }),
      });
      if (res.ok) {
        setPassStudent("");
        setPassExercise("");
        setPassExerciseCustom("");
        refreshSubmissions();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to grant pass");
      }
    } catch {
      alert("Failed to grant pass");
    } finally {
      setPassing(null);
    }
  }

  function handleGrantPass(e) {
    e.preventDefault();
    const slug = passExerciseCustom.trim() || passExercise;
    if (!passStudent || !slug) return;
    grantPass(Number(passStudent), slug);
  }

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

        {/* Homework Assignments */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Assign Homework
          </h2>

          {/* Create form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-medium text-slate-700 dark:text-slate-200 mb-4">
              New Assignment
            </h3>
            <form onSubmit={createHomework} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                    placeholder="e.g. Week 3 Homework"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Due date */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={hwDueDate}
                    onChange={(e) => setHwDueDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Classroom */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Classroom (optional)
                  </label>
                  <select
                    value={hwClassroomId}
                    onChange={(e) => setHwClassroomId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">— None (individual only) —</option>
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Individual students */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Individual Students (optional, hold Ctrl/Cmd to select multiple)
                  </label>
                  <select
                    multiple
                    value={hwStudentIds}
                    onChange={(e) => setHwStudentIds([...e.target.selectedOptions].map((o) => o.value))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                  >
                    {users.filter((u) => u.role !== "admin").map((u) => (
                      <option key={u.id} value={u.id}>{u.name || u.email}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exercise selector — sectioned checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Exercises
                  </label>
                  {hwSlugs.length > 0 && (
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {hwSlugs.length} selected
                    </span>
                  )}
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-y-auto max-h-96 divide-y divide-slate-200 dark:divide-slate-700">
                  {exerciseSections.map((section) => {
                    const sectionSlugs = section.exercises.map((e) => e.id);
                    const allSelected = sectionSlugs.every((s) => hwSlugs.includes(s));
                    const someSelected = sectionSlugs.some((s) => hwSlugs.includes(s));

                    function toggleSection() {
                      if (allSelected) {
                        setHwSlugs((prev) => prev.filter((s) => !sectionSlugs.includes(s)));
                      } else {
                        setHwSlugs((prev) => [...new Set([...prev, ...sectionSlugs])]);
                      }
                    }

                    return (
                      <div key={section.label}>
                        {/* Section header */}
                        <button
                          type="button"
                          onClick={toggleSection}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            {section.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            allSelected
                              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                              : someSelected
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                              : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                          }`}>
                            {allSelected ? "All selected" : someSelected ? `${sectionSlugs.filter((s) => hwSlugs.includes(s)).length}/${sectionSlugs.length}` : "Select all"}
                          </span>
                        </button>

                        {/* Exercise checkboxes */}
                        <div className="px-4 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {section.exercises.map((ex) => {
                            const checked = hwSlugs.includes(ex.id);
                            return (
                              <label
                                key={ex.id}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                                  checked
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200"
                                    : "hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setHwSlugs((prev) => [...prev, ex.id]);
                                    } else {
                                      setHwSlugs((prev) => prev.filter((s) => s !== ex.id));
                                    }
                                  }}
                                  className="accent-indigo-600 w-4 h-4 shrink-0"
                                />
                                <span className="text-base leading-none">{ex.emoji}</span>
                                <span className="truncate">{ex.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={hwCreating || !hwTitle || !hwSlugs.length || !hwDueDate}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {hwCreating ? "Creating…" : "Create Assignment"}
              </button>
            </form>
          </div>

          {/* Existing assignments */}
          {hwAssignments.length > 0 && (() => {
            // Group by title
            const groups = hwAssignments.reduce((acc, row) => {
              if (!acc[row.title]) acc[row.title] = [];
              acc[row.title].push(row);
              return acc;
            }, {});

            return (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Existing Assignments ({Object.keys(groups).length})
                </h3>
                {Object.entries(groups).map(([title, rows]) => (
                  <div
                    key={title}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-white">{title}</span>
                        <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                          Due {new Date(rows[0].due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {rows[0].classroom_name && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            {rows[0].classroom_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="px-5 py-3 flex flex-wrap gap-2">
                      {rows.map((row) => (
                        <div key={row.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
                          <span>{row.exercise_slug}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{row.completion_count} done</span>
                          <button
                            onClick={() => deleteHomeworkRow(row.id)}
                            className="ml-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Remove this exercise"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
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

        {/* Student Progress */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Student Progress
            </h2>
            <button
              onClick={refreshSubmissions}
              disabled={subsLoading}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {!subsLoaded ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
            </div>
          ) : studentProgressList.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">No student submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {studentProgressList.map((student) => (
                <div
                  key={student.user_id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-4 flex items-center gap-3">
                    {student.user_image ? (
                      <Image
                        src={student.user_image}
                        alt={student.user_name || ""}
                        width={40}
                        height={40}
                        className="rounded-full shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {student.user_name?.charAt(0) || "?"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-white truncate">
                        {student.user_name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {student.user_email}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                      {student.exercises.length} submitted
                    </span>
                  </div>
                  <div className="px-4 pb-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {student.exercises.map((ex) => (
                        <span
                          key={ex.id}
                          className="inline-flex items-center gap-1.5 text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 px-2.5 py-1 rounded-lg"
                        >
                          {ex.exercise_slug}
                          <span className="text-violet-500 dark:text-violet-400">
                            {new Date(ex.created_at).toLocaleDateString()}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Code Submissions */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Code Submissions
          </h2>

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
            </div>
          )}

          {/* Grant pass (when grader has a bug) */}
          {subsLoaded && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-3">
                Grant pass (when grader has a bug)
              </h4>
              <form onSubmit={handleGrantPass} className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Student</label>
                  <select
                    value={passStudent}
                    onChange={(e) => setPassStudent(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select student</option>
                    {users.filter((u) => u.role !== "admin").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Exercise slug</label>
                  <select
                    value={passExercise}
                    onChange={(e) => setPassExercise(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select or type below</option>
                    {exerciseSlugs.map((slug) => (
                      <option key={slug} value={slug}>{slug}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Or custom slug</label>
                  <input
                    type="text"
                    value={passExerciseCustom}
                    onChange={(e) => setPassExerciseCustom(e.target.value)}
                    placeholder="e.g. basics-2-exercise1"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!passStudent || (!passExercise && !passExerciseCustom.trim()) || passing}
                  className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {passing ? "Passing…" : "Pass student"}
                </button>
              </form>
            </div>
          )}

          {/* Submissions list */}
          {!subsLoaded ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                {submissions.length === 0 ? "No submissions yet." : "No submissions match the filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubmissions.map((sub) => (
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

                      {/* Pass for another exercise */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                        {passAnotherExercise === sub.id ? (
                          <div className="flex flex-wrap gap-2 items-center">
                            <select
                              id={`pass-another-${sub.id}`}
                              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                              {exerciseSlugs.filter((slug) => slug !== sub.exercise_slug).length > 0 ? (
                                exerciseSlugs.filter((slug) => slug !== sub.exercise_slug).map((slug) => (
                                  <option key={slug} value={slug}>{slug}</option>
                                ))
                              ) : (
                                <option value="">—</option>
                              )}
                            </select>
                            <input
                              type="text"
                              id={`pass-another-custom-${sub.id}`}
                              placeholder="Or type exercise slug"
                              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-48"
                            />
                            <button
                              onClick={async () => {
                                const custom = document.getElementById(`pass-another-custom-${sub.id}`);
                                const slug = custom?.value?.trim() || document.getElementById(`pass-another-${sub.id}`)?.value;
                                if (slug) {
                                  await grantPass(sub.user_id, slug, sub.code);
                                  setPassAnotherExercise(null);
                                }
                              }}
                              disabled={passing === sub.user_id}
                              className="px-3 py-1.5 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer disabled:opacity-50"
                            >
                              Pass
                            </button>
                            <button
                              onClick={() => setPassAnotherExercise(null)}
                              className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPassAnotherExercise(sub.id)}
                            className="text-sm text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-medium"
                          >
                            Pass student for another exercise (grader bug)
                          </button>
                        )}
                      </div>
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
