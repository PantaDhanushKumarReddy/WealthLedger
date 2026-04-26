import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchTransactions } from "../thunks/transactionsThunk";

import type { TransactionsState, Transaction } from "../types";

const initialState: TransactionsState = {
  data: [],
  loading: false,
  error: null,

  filters: {
    category: "All",
    minAmount: 0,
    maxAmount: 100000,
    days: 30,
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },

    setMinAmountFilter: (state, action: PayloadAction<number>) => {
      state.filters.minAmount = action.payload;
    },

    setMaxAmountFilter: (state, action: PayloadAction<number>) => {
      state.filters.maxAmount = action.payload;
    },

    setDaysFilter: (state, action: PayloadAction<number>) => {
      state.filters.days = action.payload;
    },

    resetFilters: (state) => {
      state.filters = {
        category: "All",
        minAmount: 0,
        maxAmount: 100000,
        days: 30,
      };
    },
  },

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
        state.error = "Failed loading transactions";
      });
  },
});

export const {
  setCategoryFilter,
  setMinAmountFilter,
  setMaxAmountFilter,
  setDaysFilter,
  resetFilters,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
