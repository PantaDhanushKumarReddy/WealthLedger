import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disabled because React Strict Mode double-invokes useEffect in development,
  // which causes usePollingPrices to dispatch fetchCryptoPrices and fetchRates
  // twice on mount — resulting in duplicate notifications from notificationsSlice.
  reactStrictMode: false,
};

export default nextConfig;
