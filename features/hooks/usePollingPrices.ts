"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/app/hooks";

import { fetchCryptoPrices } from "@/features/crypto/thunks/cryptoThunk";
import { fetchRates } from "@/features/currency/thunks/currencyThunk";

// Single source of truth for fetching crypto prices and currency rates.
// Runs immediately on mount (so the dashboard has data right after login),
// then repeats every 60 seconds to keep values live.
//
// fetchTransactions is NOT dispatched here — it is triggered once by
// listenerMiddleware when loginUser.fulfilled fires, because transactions
// are static faker data that never need to be re-fetched on a poll cycle.
export default function usePollingPrices() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const run = () => {
      dispatch(fetchCryptoPrices());

      dispatch(fetchRates());
    };

    // Immediate fetch so UI isn't blank while waiting for the first interval tick
    run();

    const id = setInterval(run, 60000);

    return () => clearInterval(id);
  }, [dispatch]);
}
