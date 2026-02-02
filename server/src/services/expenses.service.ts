import type Database from 'better-sqlite3';
import type { ExpenseCategory } from '../types/index.js';

export function getExpensesByCategory(
  db: Database.Database,
  userId: number,
  startDate?: string,
  endDate?: string
): ExpenseCategory[] {
  let query = `
    SELECT
      t.category,
      SUM(t.amount) as total
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    WHERE a.user_id = ? AND t.amount < 0
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

  query += ' GROUP BY t.category ORDER BY total ASC';

  const rows = db.prepare(query).all(...params) as { category: string; total: number }[];

  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

  return rows.map((row) => ({
    category: row.category,
    total: Math.round(row.total * 100) / 100,
    percentage: grandTotal !== 0
      ? Math.round((row.total / grandTotal) * 10000) / 100
      : 0,
  }));
}
