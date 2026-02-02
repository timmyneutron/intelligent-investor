import { Router } from 'express';
import { getDatabase } from '../db/connection.js';
import { getExpensesByCategory } from '../services/expenses.service.js';

const router = Router();

router.get('/expenses/by-category', (req, res) => {
  const db = getDatabase();
  const userId = parseInt(req.query.user_id as string) || 1;
  const startDate = req.query.start_date as string | undefined;
  const endDate = req.query.end_date as string | undefined;

  const data = getExpensesByCategory(db, userId, startDate, endDate);
  res.json({ data });
});

export default router;
