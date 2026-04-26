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

export default function TransactionsPanel() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectFilteredTransactions);

  const total = useAppSelector(selectTransactionTotal);

  const count = useAppSelector(selectTransactionCount);

  const categories = useAppSelector(selectCategories);

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Transactions</h2>

        <p className="text-sm text-slate-400 mt-1">
          {count} Results • ₹{total}
        </p>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-3 mb-6">
        {/* Category */}
        <select
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Min Amount */}
        <input
          type="number"
          placeholder="Min ₹"
          onChange={(e) =>
            dispatch(setMinAmountFilter(Number(e.target.value) || 0))
          }
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"
        />

        {/* Max Amount */}
        <input
          type="number"
          placeholder="Max ₹"
          onChange={(e) =>
            dispatch(setMaxAmountFilter(Number(e.target.value) || 100000))
          }
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"
        />

        {/* Days */}
        <select
          onChange={(e) => dispatch(setDaysFilter(Number(e.target.value)))}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"
        >
          <option value="30">Last 30 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="3">Last 3 Days</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => dispatch(resetFilters())}
          className="bg-cyan-500 text-black rounded-xl px-4 py-2 font-medium"
        >
          Reset
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 text-xs uppercase tracking-wider text-slate-400 px-4 mb-3">
        <p>Merchant</p>
        <p>Category</p>
        <p>Date</p>
        <p className="text-right">Amount</p>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-4 gap-2 items-center p-4 rounded-2xl bg-white/5 border border-white/5"
          >
            <div>
              <p className="font-medium">{item.title}</p>
            </div>

            <div>
              <p className="text-sm text-slate-300">{item.category}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right font-semibold">₹{item.amount}</div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-white/5 text-slate-400">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
}
