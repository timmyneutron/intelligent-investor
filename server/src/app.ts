import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cashflowRoutes from './routes/cashflow.js';
import expensesRoutes from './routes/expenses.js';
import transactionsRoutes from './routes/transactions.js';
import { getDatabase } from './db/connection.js';
import { resetDatabase } from './db/migrate.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', cashflowRoutes);
app.use('/api', expensesRoutes);
app.use('/api', transactionsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/reset', (_req, res) => {
  const db = getDatabase();
  resetDatabase(db);
  res.json({ status: 'ok', message: 'Database reset to seed data' });
});

export default app;
