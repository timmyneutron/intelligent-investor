import json

from fastmcp import FastMCP

from ..utils.api_client import api_get


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Get expenses grouped by category with totals and percentages. "
        "Only includes expense transactions (negative amounts). "
        "Optionally filter by date range.",
    )
    async def get_expenses_by_category(
        user_id: int = 1,
        start_date: str | None = None,
        end_date: str | None = None,
    ) -> str:
        params: dict[str, str] = {"user_id": str(user_id)}
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date

        data = await api_get("/api/expenses/by-category", params)
        return json.dumps(data)
