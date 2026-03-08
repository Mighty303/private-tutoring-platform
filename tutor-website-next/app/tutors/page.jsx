import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Your Tutor — CS Tutor",
};

const experiences = [
  {
    company: "Safety CLI Cybersecurity",
    role: "Software Engineer Intern",
    date: "May 2026 — August 2026",
    logo: "/assets/safety-logo.svg",
    logoBg: "bg-black",
    metric: null,
    description: "Incoming intern on the cybersecurity platform team.",
    color: "emerald",
  },
  {
    company: "Electronic Arts",
    role: "Software Engineer Intern",
    date: "May 2025 — August 2025",
    logo: "/assets/ea-logo.png",
    logoBg: "bg-black",
    metric: "Boosted positive user feedback from 29% to 85%",
    description:
      "Built an intelligent internal tooling system with LLM RAG pipeline using Python and AWS, serving 30+ engineers.",
    color: "blue",
  },
  {
    company: "Rivian & Volkswagen Group Technologies",
    role: "Software Engineer Intern",
    date: "September 2024 — April 2025",
    logo: "/assets/rivian-logo.jpg",
    logoBg: "bg-black",
    metric: "Led mobile feature directly affecting 10,000+ customers",
    description:
      "Developed a 2FA-secured driving feature on iOS and Android enabling secure remote commands across all Rivian vehicles.",
    color: "amber",
  },
  {
    company: "Avena Tech Corporation",
    role: "Software Developer (Part-Time)",
    date: "July 2023 — September 2024",
    logo: "/assets/avena-logo.jpg",
    logoBg: "bg-black",
    metric: "Reduced development time by 50% with CI/CD automation",
    description:
      "Architected microservices platform and CI/CD pipelines, migrating 60+ WordPress blogs to a new efficient system.",
    color: "indigo",
  },
  {
    company: "Simon Fraser University iXLab",
    role: "Undergraduate Research Assistant",
    date: "April 2023 — September 2023",
    logo: "/assets/sfu-logo.png",
    logoBg: "bg-black",
    metric: "Validated ML models with IMU sensor simulation",
    description:
      "Developed sensor simulation systems in Python for machine learning model validation using motion-generated data.",
    color: "rose",
  },
];

const skills = [
  { label: "Python", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" },
  { label: "Java", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  { label: "Go", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300" },
  { label: "JavaScript", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  { label: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  { label: "SQL", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" },
  { label: "Swift", color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" },
  { label: "Kotlin", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
  { label: "React", color: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300" },
  { label: "Next.js", color: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300" },
  { label: "Docker", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  { label: "AWS", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  { label: "PostgreSQL", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300" },
  { label: "Kubernetes", color: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300" },
  { label: "GraphQL", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300" },
  { label: "Git", color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" },
];

const metricColors = {
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

function ExperienceCard({ exp }) {
  return (
    <div className="group relative flex gap-4 sm:gap-6">
      {/* Timeline line */}
      <div className="hidden sm:flex flex-col items-center">
        <div className={`w-16 h-16 rounded-xl ${exp.logoBg} flex items-center justify-center shrink-0 shadow-md overflow-hidden`}>
          <Image
            src={exp.logo}
            alt={exp.company}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-3" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 mb-6 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
        {/* Mobile logo */}
        <div className="flex sm:hidden items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg ${exp.logoBg} flex items-center justify-center shrink-0 shadow-sm overflow-hidden`}>
            <Image
              src={exp.logo}
              alt={exp.company}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              {exp.company}
            </h3>
          </div>
        </div>

        <h3 className="hidden sm:block font-bold text-lg text-slate-800 dark:text-white mb-1">
          {exp.company}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {exp.role}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {exp.date}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          {exp.description}
        </p>
        {exp.metric && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${metricColors[exp.color]}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {exp.metric}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          ← Back to Home
        </Link>

        {/* Profile hero */}
        <div className="relative text-center mb-16">
          {/* Subtle glow behind photo */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/20 dark:bg-indigo-400/10 rounded-full blur-3xl" />

          <Image
            src="/assets/martin.png"
            alt="Martin Wong"
            width={144}
            height={144}
            className="relative mx-auto mb-8 rounded-full shadow-2xl ring-[3px] ring-indigo-500/20 dark:ring-indigo-400/20"
            priority
          />

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Martin Wong
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            B.Sc. Computer Science &middot; Simon Fraser University
          </p>

          {/* Highlight stat */}
          <div className="mt-6 mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 px-6 py-2">
              <span className="text-lg font-black tabular-nums text-indigo-600 dark:text-indigo-400">2+</span>
              <span className="text-sm font-medium text-indigo-600/80 dark:text-indigo-300/80">
                years tutoring Python, CS fundamentals &amp; DSA
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-2.5">
            <a
              href="https://github.com/Mighty303"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-white shadow-sm transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/martin-wong303"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-500/30 dark:hover:bg-blue-900/20 shadow-sm transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:martinwong303@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-white shadow-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Coursework */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full" />
            Teaching Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Python Basics", "Object-Oriented Programming", "Data Structures & Algorithms", "Web Development", "Software Engineering"].map((course) => (
              <span
                key={course}
                className="text-sm px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
              >
                {course}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full" />
            Experience
          </h2>
          <div>
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} exp={exp} />
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full" />
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.label}
                className={`text-sm font-medium px-3 py-1.5 rounded-lg ${skill.color}`}
              >
                {skill.label}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Writing */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full" />
            Featured Writing
          </h2>
          <a
            href="https://theevreport.com/rivian-software-boosts-energy-security"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <Image
                  src="/assets/rivian-logo.jpg"
                  alt="Rivian"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                  Rivian Software Boosts Energy Security
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Published on The EV Report
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Read article
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </section>
      </div>
    </div>
  );
}
