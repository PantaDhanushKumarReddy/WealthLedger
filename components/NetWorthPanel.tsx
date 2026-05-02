"use client";

import { useAppSelector } from "@/app/hooks";
import usePollingPrices from "@/features/hooks/usePollingPrices";
import {
  selectNetWorth,
  selectAssetBreakdown,
} from "@/features/dashboard/selectors/dashboardSelector";
import { selectPreferredCurrency } from "@/features/currency/selectors/currencySelectors";

const assetColors: Record<string, string> = {
  BTC: "text-amber-400",
  ETH: "text-indigo-400",
  SOL: "text-purple-400",
};

export default function NetWorthPanel() {
  usePollingPrices();

  const netWorth = useAppSelector(selectNetWorth);
  const assets = useAppSelector(selectAssetBreakdown);
  const currency = useAppSelector(selectPreferredCurrency);

  return (
    <div className="rounded-2xl bg-linear-to-br from-cyan-500/10 via-slate-900 to-slate-900 border border-cyan-500/20 p-6">
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Net Worth */}
        <div>
          <p className="text-xs font-medium text-cyan-400 uppercase tracking-widest mb-1">Total Net Worth</p>
          <h2 className="text-4xl font-bold tracking-tight">
            {currency} {netWorth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p className="text-slate-400 text-sm mt-2">Live market value · updates every 60s</p>
        </div>

        {/* Asset Breakdown */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Asset Breakdown</p>
          <div className="space-y-2">
            {assets.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 ${assetColors[item.symbol] ?? "text-slate-300"}`}>
                  {item.symbol}
                </span>
                <span className="font-semibold text-sm">
                  {currency} {(item.value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
