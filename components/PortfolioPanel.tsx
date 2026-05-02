"use client";

import { useAppSelector } from "@/app/hooks";
import {
  selectHoldings,
  selectConvertedValue,
  selectPortfolioLoading,
} from "@/features/portfolio/selectors/portfolioSelectors";
import {
  selectPreferredCurrency,
  selectCurrencyLoading,
} from "@/features/currency/selectors/currencySelectors";

const assetMeta: Record<string, { color: string; label: string }> = {
  BTC: { color: "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400", label: "Bitcoin" },
  ETH: { color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400", label: "Ethereum" },
  SOL: { color: "from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400", label: "Solana" },
};

export default function PortfolioPanel() {
  const convertedValue = useAppSelector(selectConvertedValue);
  const preferred = useAppSelector(selectPreferredCurrency);
  const holdings = useAppSelector(selectHoldings);
  const portfolioLoading = useAppSelector(selectPortfolioLoading);
  const currencyLoading = useAppSelector(selectCurrencyLoading);

  const isLoading = portfolioLoading || currencyLoading;

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold">Crypto Portfolio</h2>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>

      {/* Total Value */}
      <div className="mb-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <p className="text-xs text-slate-400 mb-1">Portfolio Value</p>
        {isLoading ? (
          <div className="h-8 w-40 bg-slate-700 rounded-lg animate-pulse" />
        ) : (
          <p className="text-2xl font-bold">
            {preferred} {convertedValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        )}
      </div>

      {/* Holdings */}
      <div className="space-y-3">
        {holdings.map((item) => {
          const meta = assetMeta[item.symbol] ?? { color: "from-slate-700/40 to-slate-700/10 border-slate-700 text-slate-300", label: item.symbol };
          return (
            <div
              key={item.symbol}
              className={`flex items-center justify-between p-3 rounded-xl bg-linear-to-r ${meta.color} border`}
            >
              <div>
                <p className={`text-xs font-bold ${meta.color.split(" ").find(c => c.startsWith("text-"))}`}>{item.symbol}</p>
                <p className="text-slate-400 text-xs">{meta.label}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{item.quantity}</p>
                <p className="text-xs text-slate-400">units</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
