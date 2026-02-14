import { Link } from "react-router-dom";
import { milestones } from "../data/lessons";

const statusColors = {
  complete: { bg: "bg-green-50", border: "border-green-300", badge: "bg-green-100 text-green-700", icon: "✅" },
  active: { bg: "bg-indigo-50", border: "border-indigo-300", badge: "bg-indigo-100 text-indigo-700", icon: "📍" },
  upcoming: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-500", icon: "🔮" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
              Private Tutoring Resources
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Computer Science with Martin Wong 📚
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
              Python fundamentals, dictionaries, algorithms, and more — all through gamified, Roblox-themed exercises.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/saturdays"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                🐍 Saturday Lessons
              </Link>
              <Link
                to="/sundays"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:-translate-y-0.5"
              >
                🏆 Sunday Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickLink
            to="/saturdays"
            emoji="🐍"
            title="Python Basics"
            desc="Cheatsheet, reviews, and practice"
            color="from-indigo-500 to-indigo-600"
          />
          <QuickLink
            to="/dictionaries"
            emoji="📖"
            title="Dictionaries"
            desc="Roblox-themed exercises & projects"
            color="from-amber-500 to-orange-500"
          />
          <QuickLink
            to="/sundays"
            emoji="🏆"
            title="Algorithms"
            desc="CCC prep & competitive programming"
            color="from-purple-500 to-purple-600"
          />
          <QuickLink
            to="/saturdays/cheatsheet"
            emoji="📋"
            title="Cheatsheet"
            desc="Quick Python reference guide"
            color="from-emerald-500 to-teal-500"
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Learning Roadmap</h2>
        <p className="text-slate-500 mb-8">Track progress across all milestones</p>

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
                      <h3 className="font-bold text-lg text-slate-800">
                        Milestone {m.number}: {m.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.badge}`}>
                        {m.status === "complete" ? "Completed" : m.status === "active" ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500">{m.lessons} lessons</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-white/70 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200"
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
      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-400">
          Martin Wong · Private Tutoring Resources · Last Updated: January 2025
        </div>
      </footer>
    </div>
  );
}

function QuickLink({ to, emoji, title, desc, color }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="relative">
        <span className="text-3xl mb-3 block">{emoji}</span>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-white/80">{desc}</p>
      </div>
    </Link>
  );
}
