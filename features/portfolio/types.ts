export interface PortfolioHolding {
  symbol: "BTC" | "ETH" | "SOL";
  quantity: number;
}

export interface PortfolioState {
  holdings: PortfolioHolding[];
  totalValue: number;
  convertedValue: number;
  loading: boolean;
  error: string | null;
}
