import { useState } from 'react';
import SummaryCards from './components/dashboard/SummaryCards';
import ExpensesPieChart from './components/dashboard/ExpensesPieChart';
import CashflowTimeSeries from './components/dashboard/CashflowTimeSeries';
import TransactionTable from './components/dashboard/TransactionTable';
import ChatPanel from './components/chat/ChatPanel';
import './styles/globals.css';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Intelligent Investor</h1>
      </header>

      <div className="dashboard-grid">
        <SummaryCards />

        <div className="dashboard-row charts">
          <CashflowTimeSeries />
          <ExpensesPieChart />
        </div>

        <TransactionTable />
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
