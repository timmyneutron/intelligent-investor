import { z } from 'zod';
import { apiGet } from '../utils/apiClient.js';

export const getCashflowHistoryTool = {
  name: 'get_cashflow_history' as const,
  description: 'Get cashflow data over time, grouped by week, month, or year. Returns income, expenses, and net for each period.',
  parameters: z.object({
    user_id: z.number().default(1).describe('The user ID'),
    granularity: z.enum(['week', 'month', 'year']).default('month').describe('Time period grouping'),
    start_date: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    end_date: z.string().optional().describe('End date (YYYY-MM-DD)'),
  }),
  execute: async (args: { user_id: number; granularity: string; start_date?: string; end_date?: string }) => {
    const params: Record<string, string> = {
      user_id: String(args.user_id),
      granularity: args.granularity,
    };
    if (args.start_date) params.start_date = args.start_date;
    if (args.end_date) params.end_date = args.end_date;

    const data = await apiGet('/api/cashflow/history', params);
    return JSON.stringify(data);
  },
};
