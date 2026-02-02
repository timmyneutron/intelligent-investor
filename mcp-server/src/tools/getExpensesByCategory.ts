import { z } from 'zod';
import { apiGet } from '../utils/apiClient.js';

export const getExpensesByCategoryTool = {
  name: 'get_expenses_by_category' as const,
  description: 'Get expenses grouped by category with totals and percentages. Only includes expense transactions (negative amounts). Optionally filter by date range.',
  parameters: z.object({
    user_id: z.number().default(1).describe('The user ID'),
    start_date: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    end_date: z.string().optional().describe('End date (YYYY-MM-DD)'),
  }),
  execute: async (args: { user_id: number; start_date?: string; end_date?: string }) => {
    const params: Record<string, string> = { user_id: String(args.user_id) };
    if (args.start_date) params.start_date = args.start_date;
    if (args.end_date) params.end_date = args.end_date;

    const data = await apiGet('/api/expenses/by-category', params);
    return JSON.stringify(data);
  },
};
