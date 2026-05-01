"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/app/hooks";

import { fetchCryptoPrices } from "@/features/crypto/thunks/cryptoThunk";
import { fetchRates } from "@/features/currency/thunks/currencyThunk";

export default function usePollingPrices() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const run = () => {
      dispatch(fetchCryptoPrices());

      dispatch(fetchRates());
    };

    run();

    const id = setInterval(run, 60000);

    return () => clearInterval(id);
  }, [dispatch]);
}
