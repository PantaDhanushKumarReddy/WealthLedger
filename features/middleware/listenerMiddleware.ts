import { createListenerMiddleware } from "@reduxjs/toolkit";

import { loginUser } from "@/features/auth/thunks/authThunk";

import { fetchTransactions } from "@/features/transactions/thunks/transactionsThunk";

export const listenerMiddleware = createListenerMiddleware();

// Fires once per login, immediately after loginUser.fulfilled.
// Only fetchTransactions is dispatched here because:
//   - fetchCryptoPrices and fetchRates are handled by usePollingPrices (initial fetch + every 60s)
//   - Dispatching them here too caused a double-fetch right after login,
//     which made the notificationsSlice add duplicate crypto price alerts.
listenerMiddleware.startListening({
  actionCreator: loginUser.fulfilled,

  effect: async (_, api) => {
    api.dispatch(fetchTransactions());
  },
});
