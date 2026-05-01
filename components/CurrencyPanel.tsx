"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { setPreferredCurrency } from "@/features/currency/slices/currencySlice";

import { selectPreferredCurrency } from "@/features/currency/selectors/currencySelectors";

export default function CurrencyPanel() {
  const dispatch = useAppDispatch();

  const current = useAppSelector(selectPreferredCurrency);

  return (
    <div className="mt-8 p-5 rounded-2xl bg-white/5">
      <p className="text-sm text-slate-400 mb-2">Preferred Currency</p>

      <select
        value={current}
        onChange={(e) => dispatch(setPreferredCurrency(e.target.value))}
        className="bg-slate-900 px-4 py-2 rounded-xl"
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
}
