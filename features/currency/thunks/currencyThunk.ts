import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRates = createAsyncThunk("currency/fetchRates", async () => {
  const response = await fetch("https://open.er-api.com/v6/latest/USD");

  if (!response.ok) {
    throw new Error("Failed rates");
  }

  const data = await response.json();

  return data.rates;
});
