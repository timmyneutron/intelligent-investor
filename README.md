# Intelligent Investor

A full-stack personal finance dashboard with an AI-powered chatbot and auto-categorization, built with React, Express, SQLite, and LangChain.

## Demo

Version 1: https://youtu.be/LUHECExDa5A
 - Includes chatbot, auto-categorization, and comparison of local vs. cloud LLMs
Version 2: https://youtu.be/JrqgGczul8Q
 - Includes an auth server and JWT authentication

## Architecture

![Architecture Diagram](docs/architecture.svg)

```
client/        React + Vite + TypeScript frontend (port 5173)
auth-server/   Express + TypeScript auth server (port 3002)
agent/         Python LangChain agent with FastAPI (port 8000)
mcp-server/    FastMCP tool server (port 3001)
server/        Express + TypeScript API with SQLite (port 3000)
```

The React frontend authenticates users via the auth server, which issues JWTs. The AI agent and MCP server both validate incoming JWTs by calling the auth server's `GET /auth/me` endpoint. The agent connects to the MCP server to query financial data, and exposes a FastAPI gateway that the React frontend calls for chat and auto-categorization.

## Prerequisites

- Node.js >= 18
- Python >= 3.11
- [Ollama](https://ollama.com) (only if using a local LLM)

## Install Dependencies

### Node (client, server, auth-server)

From the project root:

```bash
npm install
```

This installs dependencies for all three npm workspaces (`client`, `server`, `auth-server`).

### Python (agent, mcp-server)

```bash
cd agent
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

```bash
cd mcp-server
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Configuration

### Option A: Anthropic Cloud LLM (default)

1. Get an API key from [console.anthropic.com](https://console.anthropic.com/)
2. Create `agent/.env` and add your key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### Option B: Local LLM with Ollama

1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model with structured tool-calling support:

```bash
ollama pull qwen3:8b
```

3. Make sure Ollama is running (`ollama serve` or via the desktop app)

No API key is needed for local mode.

## Running the App

You need five terminals (or use a process manager). Start them in this order:

### 1. Auth Server
```bash
npm run dev:auth
```

### 2. API Server

```bash
npm run dev:server
```

### 3. MCP Server

```bash
npm run dev:mcp
```

### 4. AI Agent

Using Anthropic cloud LLM (default):

```bash
npm run dev:agent
```

Using local Ollama LLM:

```bash
npm run dev:agent:local
```

### 5. Frontend

```bash
npm run dev:client
```

Then open [http://localhost:5173](http://localhost:5173) in a web browser.

Test usernames/passwords:
- alex/alex123
- jordan/jordan123
- demo/demo123
- admin/admin123

Note: only `alex` and `jordan` have financial data seeded.

## Features

- **Dashboard** - Summary cards (income/expenses/net), expense breakdown pie chart, cashflow time series with week/month/year toggle
- **Transactions** - Paginated table with all transactions
- **AI Chatbot** - Ask natural language questions about your finances (e.g. "How much did I spend on groceries in December?")
- **Auto-categorize** - AI suggests categories for uncategorized transactions, which you can review and approve
- **Reset Data** - Button in the header to reset the database back to the sample seed data
