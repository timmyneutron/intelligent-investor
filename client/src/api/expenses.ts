import apiClient from './client';
import type { ExpenseCategory } from '../types';

export async function getExpensesByCategory(
  startDate?: string,
  endDate?: string
): Promise<ExpenseCategory[]> {
  const params: Record<string, string> = {};
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const { data } = await apiClient.get<{ data: ExpenseCategory[] }>('/expenses/by-category', { params });
  return data.data;
}
