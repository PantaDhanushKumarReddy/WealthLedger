import { createSlice } from "@reduxjs/toolkit";
import { fetchCryptoPrices } from "@/features/crypto/thunks/cryptoThunk";

import type { PortfolioState } from "../types";
import { fetchRates } from "@/features/currency/thunks/currencyThunk";

const initialState: PortfolioState = {
  holdings: [
    { symbol: "BTC", quantity: 0.45 },
    { symbol: "ETH", quantity: 3.2 },
    { symbol: "SOL", quantity: 18 },
  ],
  totalValue: 0,
  convertedValue: 0,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        const prices = action.payload;

        state.totalValue = state.holdings.reduce((sum, asset) => {
          return sum + asset.quantity * prices[asset.symbol].price;
        }, 0);
      })
      .addCase(fetchCryptoPrices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch prices";
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        const rates = action.payload;
        const inr = rates["INR"] || 1;

        state.convertedValue = state.totalValue * inr;
      });
  },
});

export default portfolioSlice.reducer;
