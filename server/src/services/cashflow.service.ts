import type Database from 'better-sqlite3';
import type { CashflowSummary, CashflowPeriod } from '../types/index.js';

export function getCashflow(
  db: Database.Database,
  userId: number,
  startDate?: string,
  endDate?: string
): CashflowSummary {
  let query = `
    SELECT
      COALESCE(SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END), 0) as total_income,
      COALESCE(SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END), 0) as total_expenses,
      COALESCE(SUM(t.amount), 0) as net_cashflow
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    WHERE a.user_id = ?
  `;

  const params: (string | number)[] = [userId];

  if (startDate) {
    query += ' AND t.date >= ?';
    params.push(startDate);
  }
  if (endDate) {
    query += ' AND t.date <= ?';
    params.push(endDate);
  }

  const row = db.prepare(query).get(...params) as CashflowSummary;
  return {
    total_income: Math.round(row.total_income * 100) / 100,
    total_expenses: Math.round(row.total_expenses * 100) / 100,
    net_cashflow: Math.round(row.net_cashflow * 100) / 100,
  };
}

export function getCashflowHistory(
  db: Database.Database,
  userId: number,
  granularity: 'week' | 'month' | 'year',
  startDate?: string,
  endDate?: string
): CashflowPeriod[] {
  let dateFormat: string;
  switch (granularity) {
    case 'week':
      dateFormat = '%Y-W%W';
      break;
    case 'month':
      dateFormat = '%Y-%m';
      break;
    case 'year':
      dateFormat = '%Y';
      break;
  }

  let query = `
    SELECT
      strftime('${dateFormat}', t.date) as period,
      COALESCE(SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END), 0) as income,
      COALESCE(SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END), 0) as expenses,
      COALESCE(SUM(t.amount), 0) as net
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    WHERE a.user_id = ?
  `;

  const params: (string | number)[] = [userId];

  if (startDate) {
    query += ' AND t.date >= ?';
    params.push(startDate);
  }
  if (endDate) {
    query += ' AND t.date <= ?';
    params.push(endDate);
  }

  query += ` GROUP BY period ORDER BY period ASC`;

  const rows = db.prepare(query).all(...params) as CashflowPeriod[];
  return rows.map((row) => ({
    period: row.period,
    income: Math.round(row.income * 100) / 100,
    expenses: Math.round(row.expenses * 100) / 100,
    net: Math.round(row.net * 100) / 100,
  }));
}
