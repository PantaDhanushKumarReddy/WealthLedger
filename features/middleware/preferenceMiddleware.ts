import type { Middleware } from "@reduxjs/toolkit";

import { setPreferredCurrency } from "@/features/currency/slices/currencySlice";

export const preferenceMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (setPreferredCurrency.match(action)) {
    localStorage.setItem("preferredCurrency", action.payload);
  }

  return result;
};
