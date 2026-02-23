from fastmcp import FastMCP

from .tools import (
    categorize_transactions,
    get_cashflow,
    get_cashflow_history,
    get_expenses_by_category,
    get_transactions,
    get_transactions_total,
)

mcp = FastMCP(
    name="intelligent-investor-mcp",
    instructions="MCP server for the Intelligent Investor personal finance app. "
    "Provides tools to query cashflow, expenses, transactions, and update transaction categories.",
)

get_cashflow.register(mcp)
get_cashflow_history.register(mcp)
get_expenses_by_category.register(mcp)
get_transactions.register(mcp)
get_transactions_total.register(mcp)
categorize_transactions.register(mcp)


def main() -> None:
    mcp.run(
        transport="streamable-http",
        host="0.0.0.0",
        port=3001,
        path="/mcp",
    )


if __name__ == "__main__":
    main()
