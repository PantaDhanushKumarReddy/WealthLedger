import { createSelector } from "@reduxjs/toolkit";

import { selectRawTransactions } from "@/features/transactions/selectors/transactionSelectors";

const MONTH_LIMIT = 30000; // budget

export const selectMonthlySpendByCategory = createSelector(
  [selectRawTransactions],
  (transactions) => {
    const map: Record<string, number> = {};

    transactions.forEach((item) => {
      if (!map[item.category]) {
        map[item.category] = 0;
      }

      map[item.category] += item.amount;
    });

    return map;
  },
);

export const selectTotalMonthlySpend = createSelector(
  [selectRawTransactions],
  (transactions) => transactions.reduce((sum, item) => sum + item.amount, 0),
);

export const selectBudgetUtilization = createSelector(
  [selectTotalMonthlySpend],
  (total) => (total / MONTH_LIMIT) * 100,
);

export const selectIsOverBudget = createSelector(
  [selectTotalMonthlySpend],
  (total) => total > MONTH_LIMIT,
);
