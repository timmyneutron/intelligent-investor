import apiClient from './client';
import type { Transaction, PaginatedResponse, CategoryUpdate } from '../types';

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export async function getTransactions(
  params: GetTransactionsParams = {}
): Promise<PaginatedResponse<Transaction>> {
  const queryParams: Record<string, string> = {};
  if (params.page) queryParams.page = String(params.page);
  if (params.limit) queryParams.limit = String(params.limit);
  if (params.category) queryParams.category = params.category;
  if (params.search) queryParams.search = params.search;
  if (params.startDate) queryParams.start_date = params.startDate;
  if (params.endDate) queryParams.end_date = params.endDate;

  const { data } = await apiClient.get<PaginatedResponse<Transaction>>('/transactions', {
    params: queryParams,
  });
  return data;
}

export async function categorizeTransactions(updates: CategoryUpdate[]): Promise<{ updated: number }> {
  const { data } = await apiClient.post<{ updated: number }>('/transactions/categorize', { updates });
  return data;
}
