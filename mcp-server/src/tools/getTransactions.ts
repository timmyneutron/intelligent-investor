import { z } from 'zod';
import { apiGet } from '../utils/apiClient.js';

export const getTransactionsTool = {
  name: 'get_transactions' as const,
  description: 'Get a paginated list of transactions. Can filter by category, search by description, and filter by date range. Returns transaction details including date, description, amount, category, and account name.',
  parameters: z.object({
    user_id: z.number().default(1).describe('The user ID'),
    page: z.number().default(1).describe('Page number (starts at 1)'),
    limit: z.number().default(20).describe('Number of results per page (max 100)'),
    category: z.string().optional().describe('Filter by category (e.g. groceries, dining, rent)'),
    search: z.string().optional().describe('Search transactions by description'),
    start_date: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    end_date: z.string().optional().describe('End date (YYYY-MM-DD)'),
  }),
  execute: async (args: {
    user_id: number;
    page: number;
    limit: number;
    category?: string;
    search?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    const params: Record<string, string> = {
      user_id: String(args.user_id),
      page: String(args.page),
      limit: String(args.limit),
    };
    if (args.category) params.category = args.category;
    if (args.search) params.search = args.search;
    if (args.start_date) params.start_date = args.start_date;
    if (args.end_date) params.end_date = args.end_date;

    const data = await apiGet('/api/transactions', params);
    return JSON.stringify(data);
  },
};
