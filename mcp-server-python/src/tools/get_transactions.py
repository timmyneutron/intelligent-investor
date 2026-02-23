import json

from fastmcp import FastMCP

from ..utils.api_client import api_get


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Get a paginated list of transactions. Can filter by category, "
        "search by description, and filter by date range. Returns transaction details "
        "including date, description, amount, category, and account name.",
    )
    async def get_transactions(
        user_id: int = 1,
        page: int = 1,
        limit: int = 20,
        category: str | None = None,
        search: str | None = None,
        start_date: str | None = None,
        end_date: str | None = None,
    ) -> str:
        params: dict[str, str] = {
            "user_id": str(user_id),
            "page": str(page),
            "limit": str(limit),
        }
        if category:
            params["category"] = category
        if search:
            params["search"] = search
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date

        data = await api_get("/api/transactions", params)
        return json.dumps(data)
