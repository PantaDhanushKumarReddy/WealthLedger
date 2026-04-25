import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCryptoPrices =
  createAsyncThunk(
    "crypto/fetchPrices",
    async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
      );

      if (!response.ok) {
        throw new Error("Failed prices");
      }

      const data = await response.json();

      return {
        BTC: {
          price: data.bitcoin.usd,
          change24h:
            data.bitcoin.usd_24h_change,
        },
        ETH: {
          price: data.ethereum.usd,
          change24h:
            data.ethereum.usd_24h_change,
        },
        SOL: {
          price: data.solana.usd,
          change24h:
            data.solana.usd_24h_change,
        },
      };
    }
  );