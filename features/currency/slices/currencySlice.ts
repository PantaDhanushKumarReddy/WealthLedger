import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchRates } from "../thunks/currencyThunk";
import type { CurrencyState } from "../types";

const saved =
  typeof window !== "undefined" && localStorage.getItem("preferredCurrency");

const initialState: CurrencyState = {
  base: "USD",
  preferred: saved || "USD",
  rates: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "currency",
  initialState,

  reducers: {
    setPreferredCurrency: (state, action: PayloadAction<string>) => {
      state.preferred = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload;
      })

      .addCase(fetchRates.rejected, (state) => {
        state.loading = false;
        state.error = "Failed FX rates";
      });
  },
});

export const { setPreferredCurrency } = slice.actions;

export default slice.reducer;
