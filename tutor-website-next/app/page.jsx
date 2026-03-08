import Link from "next/link";
import Image from "next/image";
import { milestones } from "@/lib/lessons";

const statusColors = {
  complete: { bg: "bg-green-50 dark:bg-green-900/30", border: "border-green-300 dark:border-green-700", badge: "bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300", icon: "✅" },
  active: { bg: "bg-indigo-50 dark:bg-indigo-900/30", border: "border-indigo-300 dark:border-indigo-700", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/50 dark:text-indigo-300", icon: "📍" },
  upcoming: { bg: "bg-slate-50 dark:bg-slate-800/50", border: "border-slate-200 dark:border-slate-700", badge: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400", icon: "🔮" },
};

function QuickLink({ href, title, desc, color }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-linear-to-br ${color}`} />
      <div className="relative">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-white/80">{desc}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/assets/bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center">
            {/* Python logo */}
            <Image
              src="/assets/python.jpg"
              alt="Python"
              width={100}
              height={100}
              className="mx-auto mb-6 rounded-2xl shadow-lg"
              priority
            />
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
              Private Tutoring Resources
            </h1>
            <p className="text-xl text-slate-200 mb-2">
              Computer Science with Martin Wong
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Python fundamentals, data structures and algorithms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/grade-7"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                Grade 7 Lessons
              </Link>
              <Link
                href="/grade-10"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 px-6 py-3 rounded-xl font-semibold border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:-translate-y-0.5"
              >
                Grade 10 Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickLink
            href="/grade-7"
            title="Python Basics"
            desc="Cheatsheet, reviews, and practice"
            color="from-indigo-500 to-indigo-600"
          />
          <QuickLink
            href="/grade-7/dictionaries"
            title="Dictionaries"
            desc="Roblox-themed exercises & projects"
            color="from-amber-500 to-orange-500"
          />
          <QuickLink
            href="/grade-10/algorithms"
            title="Algorithms"
            desc="CCC prep & competitive programming"
            color="from-purple-500 to-purple-600"
          />
          <QuickLink
            href="/grade-7/cheatsheet"
            title="Cheatsheet"
            desc="Quick Python reference guide"
            color="from-emerald-500 to-teal-500"
          />
        </div>
      </div>

      {/* Schedule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Schedule</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Weekly session times</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📅</span>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Saturdays 12–2pm</h3>
            </div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Grade 7</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Basics: variables, conditionals, loops, lists, functions, strings, dictionaries, review exercises</p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📅</span>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Sundays 1:30–3:30pm</h3>
            </div>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">Grade 10</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Algorithms and data structures: scanning, accumulation, two-pointer, DFS, BFS, grids, graphs, heaps, topological sort</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Learning Roadmap</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Track progress across all milestones</p>

        <div className="space-y-4">
          {milestones.map((m) => {
            const s = statusColors[m.status];
            return (
              <div
                key={m.number}
                className={`${s.bg} border ${s.border} rounded-xl p-6 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        Milestone {m.number}: {m.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.badge}`}>
                        {m.status === "complete" ? "Completed" : m.status === "active" ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{m.lessons} lessons</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-white/70 text-slate-600 dark:bg-slate-800/70 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
          Martin Wong · Private Tutoring Resources · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
