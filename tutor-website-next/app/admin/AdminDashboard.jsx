"use client";

import { useState, useEffect } from "react";
import { exerciseSections } from "@/lib/lessons";
import ClassroomSection from "./components/ClassroomSection";
import HomeworkSection from "./components/HomeworkSection";
import StudentsSection from "./components/StudentsSection";
import ManualPassSection from "./components/ManualPassSection";
import AdminsSection from "./components/AdminsSection";
import {
  Building2,
  BookOpen,
  Users,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "classrooms", label: "Classrooms", icon: Building2 },
  { id: "homework", label: "Homework", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "manual-pass", label: "Manual Pass", icon: BadgeCheck },
  { id: "admins", label: "Admins", icon: ShieldCheck },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("classrooms");
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [hwAssignments, setHwAssignments] = useState([]);
  const [passing, setPassing] = useState(null);
  const [passSuccess, setPassSuccess] = useState(null);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [classroomsData, usersData, subsData, hwData, studentStatusData, membershipsData] = await Promise.all([
        fetch("/api/classrooms").then((res) => res.json()),
        fetch("/api/users").then((res) => res.json()),
        fetch("/api/submissions/all").then((res) => res.json()),
        fetch("/api/homework/admin").then((res) => res.json()),
        fetch("/api/homework/student-status").then((res) => res.json()),
        fetch("/api/classrooms/memberships").then((res) => res.json()),
      ]);
      if (!cancelled) {
        setClassrooms(classroomsData);
        setUsers(usersData);
        setSubmissions(Array.isArray(subsData) ? subsData : []);
        setHwAssignments(Array.isArray(hwData) ? hwData : []);
        setStudentStatus(Array.isArray(studentStatusData) ? studentStatusData : []);
        setMemberships(Array.isArray(membershipsData) ? membershipsData : []);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function refreshClassrooms() {
    const [classroomsData, membershipsData] = await Promise.all([
      fetch("/api/classrooms").then((r) => r.json()),
      fetch("/api/classrooms/memberships").then((r) => r.json()),
    ]);
    setClassrooms(classroomsData);
    setMemberships(Array.isArray(membershipsData) ? membershipsData : []);
  }

  async function refreshUsers() {
    const data = await fetch("/api/users").then((r) => r.json());
    setUsers(data);
  }

  async function refreshStudentStatus() {
    const data = await fetch("/api/homework/student-status").then((r) => r.json());
    setStudentStatus(Array.isArray(data) ? data : []);
  }

  async function refreshSubmissions() {
    const [subsData, statusData] = await Promise.all([
      fetch("/api/submissions/all").then((r) => r.json()),
      fetch("/api/homework/student-status").then((r) => r.json()),
    ]);
    setSubmissions(Array.isArray(subsData) ? subsData : []);
    setStudentStatus(Array.isArray(statusData) ? statusData : []);
  }

  async function refreshHomework() {
    const [hwData, statusData] = await Promise.all([
      fetch("/api/homework/admin").then((r) => r.json()),
      fetch("/api/homework/student-status").then((r) => r.json()),
    ]);
    setHwAssignments(Array.isArray(hwData) ? hwData : []);
    setStudentStatus(Array.isArray(statusData) ? statusData : []);
  }

  async function changeRole(userId, newRole) {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) refreshUsers();
  }

  async function deleteUser(userId) {
    const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (res.ok) {
      refreshUsers();
      refreshClassrooms();
      refreshStudentStatus();
    }
  }

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
        setPassSuccess(exerciseSlug);
        setTimeout(() => setPassSuccess(null), 3000);
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

  const allExerciseSlugs = [...new Set([
    ...exerciseSections.flatMap((s) => s.exercises.map((e) => e.id)),
    ...submissions.map((s) => s.exercise_slug),
  ])].sort();

  const adminUsers = users.filter((u) => u.role === "admin");
  const students = users.filter((u) => u.role !== "admin");

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const activeLabel = NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? "";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage classrooms, homework, and students</p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar nav */}
          <nav className="w-52 shrink-0">
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => setActiveSection(id)}
                      className={[
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                        active
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white",
                      ].join(" ")}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">{activeLabel}</h2>

            {activeSection === "classrooms" && (
              <ClassroomSection classrooms={classrooms} onRefreshClassrooms={refreshClassrooms} />
            )}

            {activeSection === "homework" && (
              <HomeworkSection
                classrooms={classrooms}
                users={users}
                hwAssignments={hwAssignments}
                submissions={submissions}
                allExerciseSlugs={allExerciseSlugs}
                onRefreshHomework={refreshHomework}
              />
            )}

            {activeSection === "students" && (
              <StudentsSection
                studentStatus={studentStatus}
                users={users}
                submissions={submissions}
                classrooms={classrooms}
                memberships={memberships}
                grantPass={grantPass}
                passing={passing}
                onDeleteUser={deleteUser}
                onChangeRole={changeRole}
                onRefreshSubmissions={refreshSubmissions}
                onRefreshClassrooms={refreshClassrooms}
              />
            )}

            {activeSection === "manual-pass" && (
              <ManualPassSection
                students={students}
                allExerciseSlugs={allExerciseSlugs}
                grantPass={grantPass}
                passing={passing}
                passSuccess={passSuccess}
              />
            )}

            {activeSection === "admins" && (
              <AdminsSection adminUsers={adminUsers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
