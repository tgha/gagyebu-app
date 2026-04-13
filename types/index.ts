export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  type: TransactionType;
  desc: string;
  amount: number;
  category: string;
  date: string;
}
