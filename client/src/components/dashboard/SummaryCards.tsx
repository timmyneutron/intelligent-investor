import { useEffect, useState } from 'react';
import { getCashflow } from '../../api/cashflow';
import type { CashflowSummary } from '../../types';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(value));
}

export default function SummaryCards() {
  const [data, setData] = useState<CashflowSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCashflow()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div className="loading"><div className="loading-spinner" /> Loading...</div>;

  return (
    <div className="dashboard-row summary">
      <div className="card summary-card">
        <div className="card-icon income">+</div>
        <div className="card-title">Total Income</div>
        <div className="card-value income">{formatCurrency(data.total_income)}</div>
      </div>
      <div className="card summary-card">
        <div className="card-icon expense">-</div>
        <div className="card-title">Total Expenses</div>
        <div className="card-value expense">{formatCurrency(data.total_expenses)}</div>
      </div>
      <div className="card summary-card">
        <div className="card-icon net">=</div>
        <div className="card-title">Net Cashflow</div>
        <div className="card-value net">{formatCurrency(data.net_cashflow)}</div>
      </div>
    </div>
  );
}
