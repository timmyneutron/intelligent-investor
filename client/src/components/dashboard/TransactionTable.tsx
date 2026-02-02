import { useEffect, useState, useCallback } from 'react';
import { getTransactions } from '../../api/transactions';
import { requestCategorization } from '../../api/agent';
import { categorizeTransactions } from '../../api/transactions';
import CategorizationModal from '../categorize/CategorizationModal';
import type { Transaction, PaginatedResponse, CategorizationSuggestion } from '../../types';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TransactionTable() {
  const [result, setResult] = useState<PaginatedResponse<Transaction> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState<CategorizationSuggestion[]>([]);
  const [categorizing, setCategorizing] = useState(false);

  const fetchTransactions = useCallback(() => {
    getTransactions({ page, limit: 15 })
      .then(setResult)
      .catch((err) => setError(err.message));
  }, [page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAutoCategorize = async () => {
    setCategorizing(true);
    try {
      const uncategorized = await getTransactions({ category: 'uncategorized', limit: 100 });
      if (uncategorized.data.length === 0) {
        alert('No uncategorized transactions found.');
        return;
      }

      const ids = uncategorized.data.map((t) => t.id);
      const results = await requestCategorization(ids);

      setSuggestions(
        results.map((r) => ({
          id: r.id,
          description: r.description,
          suggested_category: r.suggested_category,
          approved: true,
        }))
      );
      setShowModal(true);
    } catch (err) {
      alert(`Auto-categorization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setCategorizing(false);
    }
  };

  const handleApplySuggestions = async (approved: CategorizationSuggestion[]) => {
    const updates = approved
      .filter((s) => s.approved)
      .map((s) => ({ id: s.id, category: s.suggested_category }));

    if (updates.length > 0) {
      await categorizeTransactions(updates);
      fetchTransactions();
    }
    setShowModal(false);
    setSuggestions([]);
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!result) return <div className="loading"><div className="loading-spinner" /> Loading...</div>;

  const { data, pagination } = result;

  return (
    <div className="card">
      <div className="table-header">
        <h2>Transactions</h2>
        <button
          className="btn btn-outline"
          onClick={handleAutoCategorize}
          disabled={categorizing}
        >
          {categorizing ? 'Categorizing...' : 'Auto-categorize'}
        </button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Account</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr key={tx.id}>
              <td>{formatDate(tx.date)}</td>
              <td>{tx.description}</td>
              <td className={tx.amount >= 0 ? 'amount-positive' : 'amount-negative'}>
                {formatCurrency(tx.amount)}
              </td>
              <td>
                <span className={`category-badge ${tx.category === 'uncategorized' ? 'uncategorized' : ''}`}>
                  {tx.category}
                </span>
              </td>
              <td style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                {tx.account_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={pagination.page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.total_pages}
        </span>
        <button
          disabled={pagination.page >= pagination.total_pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <CategorizationModal
          suggestions={suggestions}
          onApply={handleApplySuggestions}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
