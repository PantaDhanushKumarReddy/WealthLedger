import type { RootState } from "@/app/store";

export const selectPortfolioValue = (state: RootState) =>
  state.portfolio.totalValue;

export const selectHoldings = (state: RootState) => state.portfolio.holdings;
