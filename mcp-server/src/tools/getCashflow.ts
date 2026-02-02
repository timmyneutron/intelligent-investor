import { z } from 'zod';
import { apiGet } from '../utils/apiClient.js';

export const getCashflowTool = {
  name: 'get_cashflow' as const,
  description: 'Get total income, total expenses, and net cashflow for a user. Optionally filter by date range using start_date and end_date in YYYY-MM-DD format.',
  parameters: z.object({
    user_id: z.number().default(1).describe('The user ID'),
    start_date: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    end_date: z.string().optional().describe('End date (YYYY-MM-DD)'),
  }),
  execute: async (args: { user_id: number; start_date?: string; end_date?: string }) => {
    const params: Record<string, string> = { user_id: String(args.user_id) };
    if (args.start_date) params.start_date = args.start_date;
    if (args.end_date) params.end_date = args.end_date;

    const data = await apiGet('/api/cashflow', params);
    return JSON.stringify(data);
  },
};
