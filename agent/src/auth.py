import httpx
from fastapi import Request, HTTPException

from .config import AUTH_SERVER_URL


async def get_current_user(request: Request) -> dict:
    """Validate JWT by calling the auth server's /auth/me endpoint."""
    auth_header = request.headers.get("authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid Authorization header"
        )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{AUTH_SERVER_URL}/auth/me",
                headers={"Authorization": auth_header},
            )
    except httpx.ConnectError:
        raise HTTPException(status_code=502, detail="Auth server unavailable")

    if response.status_code == 401:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Auth server error")

    data = response.json()
    return {"user_id": data["user_id"], "username": data["username"]}


def get_token_from_request(request: Request) -> str:
    """Extract the raw JWT token string from the Authorization header."""
    auth_header = request.headers.get("authorization", "")
    if auth_header.startswith("Bearer "):
        return auth_header.split(" ", 1)[1]
    return ""
