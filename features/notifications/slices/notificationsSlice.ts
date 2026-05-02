import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCryptoPrices } from "@/features/crypto/thunks/cryptoThunk";

import type { NotificationsState, AlertItem } from "../types";

const initialState: NotificationsState = {
  alerts: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertItem>) => {
      state.alerts.unshift(action.payload);
      state.alerts = state.alerts.slice(0, 5);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        const prices = action.payload;

        const assets = ["BTC", "ETH", "SOL"] as const;

        assets.forEach((symbol) => {
          const move = prices[symbol].change24h;

          if (Math.abs(move) > 5) {
            state.alerts.unshift({
              id: Date.now() + symbol,

              message: `${symbol} moved ${move.toFixed(2)}% today`,
              timestamp: Date.now(),
            });
          }
        });

        state.alerts = state.alerts.slice(0, 5);
      })
      .addCase(fetchCryptoPrices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load prices";
      });
  },
});

export const { addAlert } = slice.actions;
export default slice.reducer;
