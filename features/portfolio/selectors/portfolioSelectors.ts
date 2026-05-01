import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export const selectPortfolioValue = (state: RootState) =>
  state.portfolio.totalValue;

export const selectPortfolioLoading = (state: RootState) =>
  state.portfolio.loading;

export const selectHoldings = (state: RootState) => state.portfolio.holdings;

export const selectConvertedValue = createSelector(
  [
    (state: RootState) => state.portfolio.totalValue,
    (state: RootState) => state.currency.rates,
    (state: RootState) => state.currency.preferred,
  ],
  (totalValue, rates, preferred) => {
    const rate = rates[preferred] ?? 1;
    return totalValue * rate;
  },
);
