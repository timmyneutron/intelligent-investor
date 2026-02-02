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

export interface Transaction {
  id: number;
  account_id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  account_name: string;
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

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CategorizationSuggestion {
  id: number;
  description: string;
  suggested_category: string;
  approved: boolean;
}

export type Granularity = 'week' | 'month' | 'year';
