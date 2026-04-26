"use client";

import { useState } from "react";
import { loginUser } from "@/features/auth/thunks/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectLoading,
  selectLoginError,
} from "@/features/auth/selectors/authSelectors";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectLoginError);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ userName: false, password: false });

  const userNameError = touched.userName && !userName.trim() ? "Username is required" : null;
  const passwordError = touched.password && !password.trim() ? "Password is required" : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ userName: true, password: true });
    if (!userName.trim() || !password.trim()) return;
    dispatch(loginUser({ userName, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md px-6">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">WealthLedger</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to your personal finance dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl"
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 outline-none transition-all duration-200
                focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
                ${userNameError ? "border-red-500/70 ring-1 ring-red-500/30" : "border-slate-700 hover:border-slate-600"}`}
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, userName: true }))}
            />
            {userNameError && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {userNameError}
              </p>
            )}
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 outline-none transition-all duration-200
                focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
                ${passwordError ? "border-red-500/70 ring-1 ring-red-500/30" : "border-slate-700 hover:border-slate-600"}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            {passwordError && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {passwordError}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500">Hint: password is 1234</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-slate-950 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
