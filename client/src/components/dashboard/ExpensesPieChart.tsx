import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getExpensesByCategory } from '../../api/expenses';
import type { ExpenseCategory } from '../../types';

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6',
  '#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16',
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(value));
}

export default function ExpensesPieChart() {
  const [data, setData] = useState<ExpenseCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getExpensesByCategory()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (data.length === 0) return <div className="loading"><div className="loading-spinner" /> Loading...</div>;

  const chartData = data.map((item) => ({
    name: item.category,
    value: Math.abs(item.total),
    percentage: item.percentage,
  }));

  return (
    <div className="card">
      <div className="chart-header">
        <h2>Expenses by Category</h2>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
            labelLine={true}
          >
            {chartData.map((_entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              background: '#1a1d27',
              border: '1px solid #2a2e3a',
              borderRadius: '8px',
              color: '#e4e6eb',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
