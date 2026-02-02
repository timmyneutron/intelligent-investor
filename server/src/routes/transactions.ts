import { Router } from 'express';
import { getDatabase } from '../db/connection.js';
import { getTransactions, getTransactionsTotal, categorizeTransactions } from '../services/transactions.service.js';
import type { CategoryUpdate } from '../types/index.js';

const router = Router();

router.get('/transactions', (req, res) => {
  const db = getDatabase();
  const userId = parseInt(req.query.user_id as string) || 1;
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  const startDate = req.query.start_date as string | undefined;
  const endDate = req.query.end_date as string | undefined;

  const { data, total } = getTransactions(db, {
    userId,
    page,
    limit,
    category,
    search,
    startDate,
    endDate,
  });

  res.json({
    data,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  });
});

router.get('/transactions/total', (req, res) => {
  const db = getDatabase();
  const userId = parseInt(req.query.user_id as string) || 1;
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  const startDate = req.query.start_date as string | undefined;
  const endDate = req.query.end_date as string | undefined;

  const total = getTransactionsTotal(db, {
    userId,
    category,
    search,
    startDate,
    endDate,
  });

  res.json({ total });
});

router.post('/transactions/categorize', (req, res) => {
  const db = getDatabase();
  const { updates } = req.body as { updates: CategoryUpdate[] };

  if (!Array.isArray(updates) || updates.length === 0) {
    res.status(400).json({ error: 'updates must be a non-empty array of {id, category}' });
    return;
  }

  for (const update of updates) {
    if (typeof update.id !== 'number' || typeof update.category !== 'string') {
      res.status(400).json({ error: 'Each update must have numeric id and string category' });
      return;
    }
  }

  const updated = categorizeTransactions(db, updates);
  res.json({ updated });
});

export default router;
