import { useState } from 'react';
import SummaryCards from './components/dashboard/SummaryCards';
import ExpensesPieChart from './components/dashboard/ExpensesPieChart';
import CashflowTimeSeries from './components/dashboard/CashflowTimeSeries';
import TransactionTable from './components/dashboard/TransactionTable';
import ChatPanel from './components/chat/ChatPanel';
import apiClient from './api/client';
import './styles/globals.css';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (!confirm('Reset all data to the original seed? This cannot be undone.')) return;
    setResetting(true);
    try {
      await apiClient.post('/reset');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert(`Reset failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Intelligent Investor</h1>
        <div className="app-header-actions">
          <button
            className="btn btn-danger-outline"
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? 'Resetting...' : 'Reset Data'}
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <SummaryCards key={`summary-${refreshKey}`} />

        <div className="dashboard-row charts">
          <CashflowTimeSeries key={`cashflow-${refreshKey}`} />
          <ExpensesPieChart key={`expenses-${refreshKey}`} />
        </div>

        <TransactionTable key={`transactions-${refreshKey}`} />
      </div>

      {chatOpen ? (
        <ChatPanel onClose={() => setChatOpen(false)} />
      ) : (
        <button
          className="chat-fab"
          onClick={() => setChatOpen(true)}
          title="Open financial assistant"
        >
          ?
        </button>
      )}
    </div>
  );
}
