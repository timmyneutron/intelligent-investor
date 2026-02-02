export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Account {
  id: number;
  user_id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit_card' | 'investment' | 'cash';
}

export interface Transaction {
  id: number;
  account_id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface TransactionWithAccount extends Transaction {
  account_name: string;
}

export interface CashflowSummary {
  total_income: number;
  total_expenses: number;
  net_cashflow: number;
}

export interface CashflowPeriod {
  period: string;
  income: number;
  expenses: number;
  net: number;
}

export interface CashflowHistory {
  granularity: string;
  data: CashflowPeriod[];
}

export interface ExpenseCategory {
  category: string;
  total: number;
  percentage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface CategoryUpdate {
  id: number;
  category: string;
}
