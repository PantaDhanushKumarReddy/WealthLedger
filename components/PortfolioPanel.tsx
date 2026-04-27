"use client";

import { useAppSelector } from "@/app/hooks";

import {
  selectPortfolioValue,
  selectHoldings,
} from "@/features/portfolio/selectors/portfolioSelectors";

export default function PortfolioPanel() {
  const total = useAppSelector(selectPortfolioValue);

  const holdings = useAppSelector(selectHoldings);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crypto Portfolio</h2>

      <div className="p-5 rounded-2xl bg-white/5 mb-4">
        <p className="text-slate-400">Total Value</p>

        <h3 className="text-3xl font-bold">${total.toFixed(2)}</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {holdings.map((item) => (
          <div key={item.symbol} className="p-4 rounded-2xl bg-white/5">
            <p>{item.symbol}</p>
            <h4 className="text-xl font-semibold">{item.quantity}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
