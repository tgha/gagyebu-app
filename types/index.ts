export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  type: TransactionType;
  desc: string;       // UI에서 사용하는 필드명 (DB의 description과 매핑)
  amount: number;
  category: string;
  date: string;
}
