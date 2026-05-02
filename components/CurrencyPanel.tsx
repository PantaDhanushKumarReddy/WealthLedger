"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setPreferredCurrency } from "@/features/currency/slices/currencySlice";
import { selectPreferredCurrency } from "@/features/currency/selectors/currencySelectors";

const currencies = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
];

export default function CurrencyPanel() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectPreferredCurrency);

  const selected = currencies.find((c) => c.code === current);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-base font-semibold mb-5">Preferred Currency</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {currencies.map((c) => (
          <button
            key={c.code}
            onClick={() => dispatch(setPreferredCurrency(c.code))}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
              current === c.code
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600"
            }`}
          >
            <span className="text-lg font-bold">{c.symbol}</span>
            <span className="text-xs">{c.code}</span>
          </button>
        ))}
      </div>

      {selected && (
        <p className="text-xs text-slate-500 mt-3 text-center">
          Displaying values in {selected.label} ({selected.symbol})
        </p>
      )}
    </div>
  );
}
