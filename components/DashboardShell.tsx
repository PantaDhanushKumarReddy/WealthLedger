"use client";

import { useAppDispatch } from "@/app/hooks";

import { logout } from "@/features/auth/slices/authSlice";

import TransactionsPanel from "./TransactionsPanel";

export default function DashboardShell() {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-2 bg-white/10 rounded"
        >
          Logout
        </button>
      </div>

      <TransactionsPanel />
    </div>
  );
}
