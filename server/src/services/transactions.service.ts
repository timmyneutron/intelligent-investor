import type Database from 'better-sqlite3';
import type { TransactionWithAccount, CategoryUpdate } from '../types/index.js';

interface GetTransactionsParams {
  userId: number;
  page: number;
  limit: number;
  category?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export function getTransactions(
  db: Database.Database,
  params: GetTransactionsParams
): { data: TransactionWithAccount[]; total: number } {
  const { userId, page, limit, category, search, startDate, endDate } = params;

  let whereClause = 'WHERE a.user_id = ?';
  const queryParams: (string | number)[] = [userId];

  if (category) {
    whereClause += ' AND t.category = ?';
    queryParams.push(category);
  }
  if (search) {
    whereClause += ' AND t.description LIKE ?';
    queryParams.push(`%${search}%`);
  }
  if (startDate) {
    whereClause += ' AND t.date >= ?';
    queryParams.push(startDate);
  }
  if (endDate) {
    whereClause += ' AND t.date <= ?';
    queryParams.push(endDate);
  }

  const countQuery = `
    SELECT COUNT(*) as total
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    ${whereClause}
  `;
  const { total } = db.prepare(countQuery).get(...queryParams) as { total: number };

  const offset = (page - 1) * limit;
  const dataQuery = `
    SELECT t.id, t.account_id, t.date, t.description, t.amount, t.category, a.name as account_name
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    ${whereClause}
    ORDER BY t.date DESC, t.id DESC
    LIMIT ? OFFSET ?
  `;

  const data = db.prepare(dataQuery).all(...queryParams, limit, offset) as TransactionWithAccount[];

  return { data, total };
}

export function categorizeTransactions(
  db: Database.Database,
  updates: CategoryUpdate[]
): number {
  const stmt = db.prepare('UPDATE transactions SET category = ? WHERE id = ?');

  const runUpdates = db.transaction((items: CategoryUpdate[]) => {
    let count = 0;
    for (const item of items) {
      const result = stmt.run(item.category, item.id);
      count += result.changes;
    }
    return count;
  });

  return runUpdates(updates);
}
