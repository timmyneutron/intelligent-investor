import { z } from 'zod';
import { apiGet } from '../utils/apiClient.js';

export const getTransactionsTotalTool = {
  name: 'get_transactions_total' as const,
  description: 'Get the sum of all transactions meeting the requested filter criteria. Can filter by category, search by description, and filter by date range. Returns a single number, which is the sum of all transactions that meet the filter criteria.',
  parameters: z.object({
    user_id: z.number().default(1).describe('The user ID'),
    category: z.string().optional().describe('Filter by category (e.g. groceries, dining, rent)'),
    search: z.string().optional().describe('Search transactions by description'),
    start_date: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    end_date: z.string().optional().describe('End date (YYYY-MM-DD)'),
  }),
  execute: async (args: {
    user_id: number;
    category?: string;
    search?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    const params: Record<string, string> = {
      user_id: String(args.user_id),
    };
    if (args.category) params.category = args.category;
    if (args.search) params.search = args.search;
    if (args.start_date) params.start_date = args.start_date;
    if (args.end_date) params.end_date = args.end_date;

    const data = await apiGet('/api/transactions/total', params);
    return JSON.stringify(data);
  },
};
