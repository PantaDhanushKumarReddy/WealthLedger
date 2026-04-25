import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchTransactions } from "../thunks/transactionsThunk";

import type { Transaction, TransactionsState } from "../types";

const initialState: TransactionsState = {
  data: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )

      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = "Failed transactions";
      });
  },
});

export default transactionsSlice.reducer;
