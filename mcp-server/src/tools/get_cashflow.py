import json

from fastmcp import FastMCP

from ..utils.api_client import api_get
from ..utils.auth import get_current_token

def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Get total income, total expenses, and net cashflow for a user. "
        "Optionally filter by date range using start_date and end_date in YYYY-MM-DD format.",
    )
    async def get_cashflow(
        user_id: int = 1,
        start_date: str | None = None,
        end_date: str | None = None,
    ) -> str:
        token = get_current_token()
        params: dict[str, str] = {"user_id": str(user_id)}
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date

        data = await api_get("/api/cashflow", params, token)
        return json.dumps(data)
