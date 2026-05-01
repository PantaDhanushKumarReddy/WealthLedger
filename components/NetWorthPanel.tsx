"use client";

import { useAppSelector } from "@/app/hooks";

import usePollingPrices from "@/features/hooks/usePollingPrices";
import {
  selectNetWorth,
  selectRecentAlerts,
  selectAssetBreakdown,
} from "@/features/dashboard/selectors/dashboardSelector";

import { selectPreferredCurrency } from "@/features/currency/selectors/currencySelectors";

export default function NetWorthPanel() {
  usePollingPrices();

  const netWorth = useAppSelector(selectNetWorth);

  const alerts = useAppSelector(selectRecentAlerts);

  const assets = useAppSelector(selectAssetBreakdown);

  const currency = useAppSelector(selectPreferredCurrency);

  return (
    <div className="mt-8 space-y-6">
      {/* Net Worth */}
      <div className="p-6 rounded-2xl bg-white/5">
        <p className="text-slate-400">Net Worth</p>

        <h2 className="text-4xl font-bold">
          {currency} {netWorth.toFixed(2)}
        </h2>
      </div>

      {/* Asset Breakdown */}
      <div className="p-6 rounded-2xl bg-white/5">
        <h3 className="text-xl font-semibold mb-4">Asset Breakdown</h3>

        <div className="space-y-3">
          {assets.map((item) => (
            <div key={item.symbol} className="flex justify-between">
              <span>{item.symbol}</span>

              <span>
                {currency} {(item.value || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="p-6 rounded-2xl bg-white/5">
        <h3 className="text-xl font-semibold mb-4">Recent Alerts</h3>

        <div className="space-y-2">
          {alerts.map((item) => (
            <div key={item.id} className="text-sm text-slate-300">
              {item.message}
            </div>
          ))}

          {alerts.length === 0 && <p className="text-slate-400">No alerts</p>}
        </div>
      </div>
    </div>
  );
}
