import { FastMCP } from 'fastmcp';
import { getCashflowTool } from './tools/getCashflow.js';
import { getCashflowHistoryTool } from './tools/getCashflowHistory.js';
import { getExpensesByCategoryTool } from './tools/getExpensesByCategory.js';
import { getTransactionsTool } from './tools/getTransactions.js';
import { categorizeTransactionsTool } from './tools/categorizeTransactions.js';

const server = new FastMCP({
  name: 'intelligent-investor-mcp',
  version: '1.0.0',
  instructions: 'MCP server for the Intelligent Investor personal finance app. Provides tools to query cashflow, expenses, transactions, and update transaction categories.',
});

server.addTool(getCashflowTool);
server.addTool(getCashflowHistoryTool);
server.addTool(getExpensesByCategoryTool);
server.addTool(getTransactionsTool);
server.addTool(categorizeTransactionsTool);

server.start({
  transportType: 'httpStream',
  httpStream: {
    endpoint: '/mcp',
    port: 3001,
  },
});

console.log('MCP server running on http://localhost:3001/mcp');
