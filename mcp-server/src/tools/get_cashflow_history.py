import json
from typing import Literal

from fastmcp import FastMCP

from ..utils.api_client import api_get
from ..utils.auth import get_current_token


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Get cashflow data over time, grouped by week, month, or year. "
        "Returns income, expenses, and net for each period.",
    )
    async def get_cashflow_history(
        user_id: int = 1,
        granularity: Literal["week", "month", "year"] = "month",
        start_date: str | None = None,
        end_date: str | None = None,
    ) -> str:
        token = get_current_token()
        params: dict[str, str] = {
            "user_id": str(user_id),
            "granularity": granularity,
        }
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date

        data = await api_get("/api/cashflow/history", params, token)
        return json.dumps(data)
