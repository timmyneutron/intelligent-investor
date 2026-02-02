import { Router } from 'express';
import { getDatabase } from '../db/connection.js';
import { getCashflow, getCashflowHistory } from '../services/cashflow.service.js';

const router = Router();

router.get('/cashflow', (req, res) => {
  const db = getDatabase();
  const userId = parseInt(req.query.user_id as string) || 1;
  const startDate = req.query.start_date as string | undefined;
  const endDate = req.query.end_date as string | undefined;

  const result = getCashflow(db, userId, startDate, endDate);
  res.json(result);
});

router.get('/cashflow/history', (req, res) => {
  const db = getDatabase();
  const userId = parseInt(req.query.user_id as string) || 1;
  const granularity = (req.query.granularity as string) || 'month';

  if (!['week', 'month', 'year'].includes(granularity)) {
    res.status(400).json({ error: 'granularity must be one of: week, month, year' });
    return;
  }

  const startDate = req.query.start_date as string | undefined;
  const endDate = req.query.end_date as string | undefined;

  const data = getCashflowHistory(
    db,
    userId,
    granularity as 'week' | 'month' | 'year',
    startDate,
    endDate
  );
  res.json({ granularity, data });
});

export default router;
