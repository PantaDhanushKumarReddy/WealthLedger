import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

import { selectConvertedValue } from "@/features/portfolio/selectors/portfolioSelectors";

import { selectAlerts } from "@/features/notifications/selectors/notificationsSelectors";


// selectConvertedValue already handles the net worth calculation with memoization,
// so no createSelector wrapper is needed — that would just return its own input unchanged.
export const selectNetWorth = selectConvertedValue;

export const selectRecentAlerts = createSelector([selectAlerts], (alerts) =>
  alerts.slice(0, 3),
);

export const selectAssetBreakdown = createSelector(
  [
    (state: RootState) => state.portfolio.holdings,
    (state: RootState) => state.crypto.data,
    (state: RootState) => state.currency.rates,
    (state: RootState) => state.currency.preferred,
  ],
  (holdings, prices, rates, preferred) => {
    const rate = rates[preferred] ?? 1;
    return holdings.map((item) => ({
      symbol: item.symbol,
      value: item.quantity * (prices[item.symbol]?.price ?? 0) * rate,
    }));
  },
);
