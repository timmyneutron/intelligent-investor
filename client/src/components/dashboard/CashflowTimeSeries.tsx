import { useEffect, useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { getCashflowHistory } from '../../api/cashflow';
import type { CashflowPeriod, Granularity } from '../../types';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CashflowTimeSeries() {
  const [data, setData] = useState<CashflowPeriod[]>([]);
  const [granularity, setGranularity] = useState<Granularity>('month');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    getCashflowHistory(granularity)
      .then((result) => setData(result.data))
      .catch((err) => setError(err.message));
  }, [granularity]);

  if (error) return <div className="error-message">{error}</div>;
  if (data.length === 0) return <div className="loading"><div className="loading-spinner" /> Loading...</div>;

  const chartData = data.map((item) => ({
    ...item,
    expenses: Math.abs(item.expenses),
  }));

  return (
    <div className="card">
      <div className="chart-header">
        <h2>Cashflow Over Time</h2>
        <div className="granularity-toggle">
          {(['week', 'month', 'year'] as Granularity[]).map((g) => (
            <button
              key={g}
              className={granularity === g ? 'active' : ''}
              onClick={() => setGranularity(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3a" />
          <XAxis
            dataKey="period"
            tick={{ fill: '#8b8fa3', fontSize: 12 }}
            tickLine={{ stroke: '#2a2e3a' }}
          />
          <YAxis
            tick={{ fill: '#8b8fa3', fontSize: 12 }}
            tickLine={{ stroke: '#2a2e3a' }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              background: '#1a1d27',
              border: '1px solid #2a2e3a',
              borderRadius: '8px',
              color: '#e4e6eb',
            }}
            labelStyle={{ color: '#8b8fa3' }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Line
            type="monotone"
            dataKey="net"
            name="Net Cashflow"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
