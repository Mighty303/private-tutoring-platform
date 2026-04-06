"use client";

import { useState, useEffect } from "react";
import { exerciseSections } from "@/lib/lessons";
import ClassroomSection from "./components/ClassroomSection";
import HomeworkSection from "./components/HomeworkSection";
import StudentsSection from "./components/StudentsSection";
import ManualPassSection from "./components/ManualPassSection";
import AdminsSection from "./components/AdminsSection";

export default function AdminDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [hwAssignments, setHwAssignments] = useState([]);
  const [passing, setPassing] = useState(null);
  const [passSuccess, setPassSuccess] = useState(null);
  const [memberships, setMemberships] = useState([]); // [{user_id, classroom_id, classroom_name}]

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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage classrooms and invite students</p>
        </div>

        <ClassroomSection classrooms={classrooms} onRefreshClassrooms={refreshClassrooms} />

        <HomeworkSection
          classrooms={classrooms}
          users={users}
          hwAssignments={hwAssignments}
          submissions={submissions}
          allExerciseSlugs={allExerciseSlugs}
          onRefreshHomework={refreshHomework}
        />

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

        <ManualPassSection
          students={students}
          allExerciseSlugs={allExerciseSlugs}
          grantPass={grantPass}
          passing={passing}
          passSuccess={passSuccess}
        />

        <AdminsSection adminUsers={adminUsers} />
      </div>
    </div>
  );
}
