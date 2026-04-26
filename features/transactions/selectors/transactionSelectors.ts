import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

const selectTransactionsState = (state: RootState) => state.transactions;

export const selectRawTransactions = createSelector(
  [selectTransactionsState],
  (state) => state.data,
);

export const selectFilters = createSelector(
  [selectTransactionsState],
  (state) => state.filters,
);
export const selectFilteredTransactions = createSelector(
  [selectRawTransactions, selectFilters],
  (data, filters) => {
    return data.filter((item) => {
      const categoryMatch =
        filters.category === "All" || item.category === filters.category;

      const amountMatch =
        item.amount >= filters.minAmount && item.amount <= filters.maxAmount;

      const cutoff = Date.now() - filters.days * 24 * 60 * 60 * 1000;

      const dateMatch = new Date(item.date).getTime() >= cutoff;

      return categoryMatch && amountMatch && dateMatch;
    });
  },
);

export const selectTransactionTotal = createSelector(
  [selectFilteredTransactions],
  (items) => items.reduce((sum, item) => sum + item.amount, 0),
);

export const selectTransactionCount = createSelector(
  [selectFilteredTransactions],
  (items) => items.length,
);

export const selectCategories = createSelector(
  [selectRawTransactions],
  (items) => ["All", ...new Set(items.map((item) => item.category))],
);
