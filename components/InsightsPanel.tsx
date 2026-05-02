"use client";

import { useAppSelector } from "@/app/hooks";
import {
  selectMonthlySpendByCategory,
  selectBudgetUtilization,
  selectTotalMonthlySpend,
  selectIsOverBudget,
} from "@/features/insights/selectors/insightsSelectors";

const MONTH_LIMIT = 30000;

const categoryColors: Record<string, string> = {
  Food: "bg-orange-500/20 text-orange-300 border-orange-500/20",
  Travel: "bg-blue-500/20 text-blue-300 border-blue-500/20",
  Shopping: "bg-purple-500/20 text-purple-300 border-purple-500/20",
  Bills: "bg-red-500/20 text-red-300 border-red-500/20",
  Health: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
};

export default function InsightsPanel() {
  const categorySpend = useAppSelector(selectMonthlySpendByCategory);
  const total = useAppSelector(selectTotalMonthlySpend);
  const utilization = useAppSelector(selectBudgetUtilization);
  const isOverBudget = useAppSelector(selectIsOverBudget);

  const clampedUtil = Math.min(utilization, 100);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold">Spending Insights</h2>
        {isOverBudget && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            Over Budget
          </span>
        )}
      </div>

      {/* Total Spend */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Monthly Spend</p>
            <p className="text-2xl font-bold">₹{total.toLocaleString("en-IN")}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs mb-0.5">Budget</p>
            <p className="text-sm font-medium text-slate-300">₹{MONTH_LIMIT.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${isOverBudget ? "bg-red-500" : "bg-cyan-500"}`}
            style={{ width: `${clampedUtil}%` }}
          />
        </div>
        <p className={`text-xs mt-1.5 ${isOverBudget ? "text-red-400" : "text-slate-400"}`}>
          {utilization.toFixed(1)}% of monthly budget used
        </p>
      </div>

      {/* Category Breakdown */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">By Category</p>
        <div className="space-y-2.5">
          {Object.entries(categorySpend).map(([key, value]) => {
            const pct = Math.min((value / total) * 100, 100);
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${categoryColors[key] ?? "bg-slate-700 text-slate-300 border-slate-600"}`}>
                    {key}
                  </span>
                  <span className="text-sm font-semibold">₹{value.toLocaleString("en-IN")}</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${categoryColors[key]?.includes("orange") ? "bg-orange-500" : categoryColors[key]?.includes("blue") ? "bg-blue-500" : categoryColors[key]?.includes("purple") ? "bg-purple-500" : categoryColors[key]?.includes("red") ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
