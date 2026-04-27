import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/slices/authSlice";
import transactionsReducer from "@/features/transactions/slices/transactionsSlice";
import cryptoReducer from "@/features/crypto/slices/cryptoSlice";
import portfolioReducer from "@/features/portfolio/slices/portfolioSlice";
import notificationsReducer from "@/features/notifications/slices/notificationsSlice";

import { listenerMiddleware } from "@/features/middleware/listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    crypto: cryptoReducer,
    portfolio: portfolioReducer,
    notifications: notificationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
