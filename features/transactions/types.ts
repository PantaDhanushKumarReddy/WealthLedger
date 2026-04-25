export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface TransactionsState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}
