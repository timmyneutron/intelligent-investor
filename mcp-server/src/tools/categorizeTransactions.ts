import { z } from 'zod';
import { apiPost } from '../utils/apiClient.js';

export const categorizeTransactionsTool = {
  name: 'categorize_transactions' as const,
  description: 'Batch update the categories of transactions. Provide an array of objects with transaction id and new category. Common categories: groceries, dining, transportation, utilities, rent, salary, entertainment, healthcare, shopping, subscriptions, travel, freelance, interest.',
  parameters: z.object({
    updates: z.array(z.object({
      id: z.number().describe('Transaction ID'),
      category: z.string().describe('New category for the transaction'),
    })).describe('Array of transaction updates'),
  }),
  execute: async (args: { updates: Array<{ id: number; category: string }> }) => {
    const data = await apiPost('/api/transactions/categorize', { updates: args.updates });
    return JSON.stringify(data);
  },
};
