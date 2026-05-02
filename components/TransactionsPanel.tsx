"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setCategoryFilter,
  setMinAmountFilter,
  setMaxAmountFilter,
  setDaysFilter,
  resetFilters,
} from "@/features/transactions/slices/transactionsSlice";
import {
  selectFilteredTransactions,
  selectTransactionTotal,
  selectTransactionCount,
  selectCategories,
} from "@/features/transactions/selectors/transactionSelectors";

const categoryColors: Record<string, string> = {
  Food: "bg-orange-500/15 text-orange-300",
  Travel: "bg-blue-500/15 text-blue-300",
  Shopping: "bg-purple-500/15 text-purple-300",
  Bills: "bg-red-500/15 text-red-300",
  Health: "bg-emerald-500/15 text-emerald-300",
};

export default function TransactionsPanel() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectFilteredTransactions);
  const total = useAppSelector(selectTransactionTotal);
  const count = useAppSelector(selectTransactionCount);
  const categories = useAppSelector(selectCategories);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold">Transactions</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {count} results · ₹{total.toLocaleString("en-IN")} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <select
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500 transition-colors"
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          onChange={(e) => dispatch(setMinAmountFilter(Number(e.target.value) || 0))}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500 transition-colors placeholder-slate-500"
        />

        <input
          type="number"
          placeholder="Max ₹"
          onChange={(e) => dispatch(setMaxAmountFilter(Number(e.target.value) || 100000))}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500 transition-colors placeholder-slate-500"
        />

        <select
          onChange={(e) => dispatch(setDaysFilter(Number(e.target.value)))}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="30">Last 30 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="3">Last 3 Days</option>
        </select>

        <button
          onClick={() => dispatch(resetFilters())}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-4 text-xs font-medium uppercase tracking-wider text-slate-500 px-4 mb-2">
        <p>Merchant</p>
        <p>Category</p>
        <p>Date</p>
        <p className="text-right">Amount</p>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="grid lg:grid-cols-4 gap-3 items-center px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 hover:border-slate-700 transition-all"
          >
            <p className="font-medium text-sm truncate">{item.title}</p>

            <div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${categoryColors[item.category] ?? "bg-slate-700 text-slate-300"}`}>
                {item.category}
              </span>
            </div>

            <p className="text-sm text-slate-400">
              {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>

            <p className="text-right font-semibold text-sm">
              ₹{item.amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            No transactions match your filters
          </div>
        )}
      </div>
    </div>
  );
}
