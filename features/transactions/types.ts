export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface TransactionFilters {
  category: string;
  minAmount: number;
  maxAmount: number;
  days: number;
}

export interface TransactionsState {
  data: Transaction[];
  loading: boolean;
  error: string | null;

  filters: TransactionFilters;
}
