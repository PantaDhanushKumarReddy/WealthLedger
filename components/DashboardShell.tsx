"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/slices/authSlice";
import { setPreferredCurrency } from "@/features/currency/slices/currencySlice";
import { selectPreferredCurrency } from "@/features/currency/selectors/currencySelectors";

import NetWorthPanel from "./NetWorthPanel";
import InsightsPanel from "./InsightsPanel";
import PortfolioPanel from "./PortfolioPanel";
import TransactionsPanel from "./TransactionsPanel";
import NotificationsPanel from "./NotificationsPanel";

const CURRENCIES = ["USD", "INR", "EUR", "GBP"];

export default function DashboardShell() {
  const dispatch = useAppDispatch();
  const preferred = useAppSelector(selectPreferredCurrency);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">WealthLedger</h1>
              <p className="text-xs text-slate-500">Personal Finance Dashboard</p>
            </div>
          </div>

          {/* Currency switcher + Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              {CURRENCIES.map((code) => (
                <button
                  key={code}
                  onClick={() => dispatch(setPreferredCurrency(code))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    preferred === code
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Hero: Net Worth */}
        <NetWorthPanel />

        {/* Row: Insights + Portfolio + Notifications */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <InsightsPanel />
          <PortfolioPanel />
          <NotificationsPanel />
        </div>

        {/* Transactions (full width) */}
        <div className="mt-6">
          <TransactionsPanel />
        </div>

      </div>
    </div>
  );
}
