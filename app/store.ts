import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/slices/authSlice";
import transactionsReducer from "@/features/transactions/slices/transactionsSlice";
import cryptoReducer from "@/features/crypto/slices/cryptoSlice";
import portfolioReducer from "@/features/portfolio/slices/portfolioSlice";
import notificationsReducer from "@/features/notifications/slices/notificationsSlice";
import currencyReducer from "@/features/currency/slices/currencySlice";
import { listenerMiddleware } from "@/features/middleware/listenerMiddleware";
import { preferenceMiddleware } from "@/features/middleware/preferenceMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    crypto: cryptoReducer,
    portfolio: portfolioReducer,
    notifications: notificationsReducer,
    currency: currencyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(preferenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
