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

export default function PortfolioPanel() {
  const convertedValue = useAppSelector(selectConvertedValue);
  const preferred = useAppSelector(selectPreferredCurrency);
  const holdings = useAppSelector(selectHoldings);
  const portfolioLoading = useAppSelector(selectPortfolioLoading);
  const currencyLoading = useAppSelector(selectCurrencyLoading);

  const isLoading = portfolioLoading || currencyLoading;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crypto Portfolio</h2>

      <div className="p-5 rounded-2xl bg-white/5 mb-4">
        <p className="text-slate-400">Total Value</p>

        {isLoading ? (
          <div className="h-9 w-48 bg-white/10 rounded-lg animate-pulse mt-1" />
        ) : (
          <h3 className="text-3xl font-bold">
            {preferred} {convertedValue.toFixed(2)}
          </h3>
        )}
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
