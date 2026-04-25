import { createListenerMiddleware } from "@reduxjs/toolkit";

import { loginUser } from "@/features/auth/thunks/authThunk";

import { fetchTransactions } from "@/features/transactions/thunks/transactionsThunk";

import { fetchCryptoPrices } from "@/features/crypto/thunks/cryptoThunk";

export const listenerMiddleware =
  createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: loginUser.fulfilled,

  effect: async (_, api) => {
    api.dispatch(fetchTransactions());
    api.dispatch(fetchCryptoPrices());
  },
});