export interface CurrencyState {
  base: string;
  preferred: string;
  rates: Record<string, number>;
  loading: boolean;
  error: string | null;
}
