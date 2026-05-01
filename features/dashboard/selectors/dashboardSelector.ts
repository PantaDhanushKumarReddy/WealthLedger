import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

import { selectConvertedValue } from "@/features/portfolio/selectors/portfolioSelectors";

import { selectAlerts } from "@/features/notifications/selectors/notificationsSelectors";


export const selectNetWorth = createSelector(
  [selectConvertedValue],
  (portfolioValue) => portfolioValue,
);

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
