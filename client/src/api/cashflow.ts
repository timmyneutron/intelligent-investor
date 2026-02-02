import apiClient from './client';
import type { CashflowSummary, CashflowHistory, Granularity } from '../types';

export async function getCashflow(startDate?: string, endDate?: string): Promise<CashflowSummary> {
  const params: Record<string, string> = {};
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const { data } = await apiClient.get<CashflowSummary>('/cashflow', { params });
  return data;
}

export async function getCashflowHistory(
  granularity: Granularity = 'month',
  startDate?: string,
  endDate?: string
): Promise<CashflowHistory> {
  const params: Record<string, string> = { granularity };
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const { data } = await apiClient.get<CashflowHistory>('/cashflow/history', { params });
  return data;
}
