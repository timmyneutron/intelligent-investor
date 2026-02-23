import json

from fastmcp import FastMCP

from ..utils.api_client import api_get


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Get the sum of all transactions meeting the requested filter criteria. "
        "Can filter by category, search by description, and filter by date range. "
        "Returns a single number, which is the sum of all transactions that meet the filter criteria.",
    )
    async def get_transactions_total(
        user_id: int = 1,
        category: str | None = None,
        search: str | None = None,
        start_date: str | None = None,
        end_date: str | None = None,
    ) -> str:
        params: dict[str, str] = {"user_id": str(user_id)}
        if category:
            params["category"] = category
        if search:
            params["search"] = search
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date

        data = await api_get("/api/transactions/total", params)
        return json.dumps(data)
