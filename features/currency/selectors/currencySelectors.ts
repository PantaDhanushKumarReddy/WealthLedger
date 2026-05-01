import type { RootState } from "@/app/store";

export const selectPreferredCurrency = (state: RootState) =>
  state.currency.preferred;

export const selectRates = (state: RootState) => state.currency.rates;

export const selectCurrencyLoading = (state: RootState) =>
  state.currency.loading;
