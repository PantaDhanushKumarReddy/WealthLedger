import { createSlice } from "@reduxjs/toolkit";
import { fetchCryptoPrices } from "../thunks/cryptoThunk";
import type { CryptoState } from "../types";

const initialState: CryptoState = {
  data: {},
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchCryptoPrices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed crypto";
      });
  },
});

export default cryptoSlice.reducer;