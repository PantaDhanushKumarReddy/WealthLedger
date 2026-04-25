export interface Asset {
  price: number;
  change24h: number;
}

export interface CryptoState {
  data: {
    BTC?: Asset;
    ETH?: Asset;
    SOL?: Asset;
  };
  loading: boolean;
  error: string | null;
}