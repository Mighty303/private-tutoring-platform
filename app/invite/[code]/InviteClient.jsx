"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InviteClient({ code }) {
  const { data: session, status } = useSession();
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/invite/${code}/join`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          if (data.error) {
            setError(data.error);
          } else {
            setInvite(data);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load invite");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [code]);

  async function handleJoin() {
    setJoining(true);
    try {
      const res = await fetch(`/api/invite/${code}/join`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Something went wrong");
    }
    setJoining(false);
  }

  if (loading || status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          {/* Error State */}
          {error && !result && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Invalid Invite
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Go Home
              </Link>
            </>
          )}

          {/* Success State */}
          {result && (
            <>
              <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {result.already_member ? "Already a Member" : "Welcome!"}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                {result.message}
              </p>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
                {result.classroom_name}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </Link>
            </>
          )}

          {/* Join State */}
          {invite && !result && !error && (
            <>
              <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                You&apos;re Invited!
              </h1>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                {invite.classroom_name}
              </p>
              {invite.classroom_description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {invite.classroom_description}
                </p>
              )}

              {!invite.valid ? (
                <p className="text-sm text-red-500 mb-6">
                  {invite.used ? "This invite has already been used." : "This invite has expired."}
                </p>
              ) : !session ? (
                <div className="mt-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Sign in with Google to join this classroom.
                  </p>
                  <Link
                    href={`/login?callbackUrl=/invite/${code}`}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Sign In to Join
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {joining ? "Joining..." : "Join Classroom"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
