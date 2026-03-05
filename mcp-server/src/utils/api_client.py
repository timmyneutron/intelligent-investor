from typing import Any

import httpx

from .config import API_BASE_URL


async def api_get(
    path: str, params: dict[str, str] | None = None, token: str | None = None
) -> Any:
    filtered_params = (
        {k: v for k, v in params.items() if v is not None and v != ""}
        if params
        else None
    )
    headers: dict[str, str] = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_BASE_URL}{path}", params=filtered_params, headers=headers
        )
        response.raise_for_status()
        return response.json()


async def api_post(path: str, body: Any, token: str | None = None) -> Any:
    headers: dict[str, str] = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{API_BASE_URL}{path}", json=body, headers=headers
        )
        response.raise_for_status()
        return response.json()
