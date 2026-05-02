"use client";

import { useAppSelector } from "@/app/hooks";

import {
  selectMonthlySpendByCategory,
  selectBudgetUtilization,
  selectTotalMonthlySpend,
} from "@/features/insights/selectors/insightsSelectors";

export default function InsightsPanel() {
  const categorySpend = useAppSelector(selectMonthlySpendByCategory);

  const total = useAppSelector(selectTotalMonthlySpend);

  const utilization = useAppSelector(selectBudgetUtilization);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>

      {/* Total */}
      <div className="p-5 rounded-2xl bg-white/5 mb-4">
        <p className="text-slate-400">Total Spend</p>

        <h3 className="text-2xl font-bold">₹{total.toLocaleString("en-IN")}</h3>

        <p className="text-sm text-slate-400 mt-1">
          {utilization.toFixed(1)}% of monthly budget
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="p-5 rounded-2xl bg-white/5">
        <h3 className="mb-3 font-semibold">By Category</h3>

        <div className="space-y-2">
          {Object.entries(categorySpend).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span>{key}</span>
              <span>₹{value.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
