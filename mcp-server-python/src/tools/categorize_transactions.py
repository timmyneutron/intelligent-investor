import json
from typing import Annotated

from fastmcp import FastMCP
from pydantic import Field

from ..utils.api_client import api_post


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Batch update the categories of transactions. Provide an array of "
        "objects with transaction id and new category. Common categories: groceries, "
        "dining, transportation, utilities, rent, salary, entertainment, healthcare, "
        "shopping, subscriptions, travel, freelance, interest.",
    )
    async def categorize_transactions(
        updates: Annotated[
            list[dict[str, int | str]],
            Field(
                description="Array of transaction updates, each with 'id' (number) and 'category' (string)",
            ),
        ],
    ) -> str:
        data = await api_post("/api/transactions/categorize", {"updates": updates})
        return json.dumps(data)
