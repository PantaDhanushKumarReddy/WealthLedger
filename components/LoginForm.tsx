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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({ userName, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5"
      >
        <h1 className="text-3xl font-bold mb-6">WealthLedger</h1>

        <input
          className="w-full mb-4 p-3 rounded bg-slate-900"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded bg-slate-900"
          placeholder="Password = 1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 text-black p-3 rounded font-bold">
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && <p className="mt-4 text-red-400">{error}</p>}
      </form>
    </div>
  );
}
