import httpx
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

from .utils.config import AUTH_SERVER_URL


class AuthMiddleware(BaseHTTPMiddleware):
    """Validates JWT tokens by calling the auth server's /auth/me endpoint."""

    async def dispatch(self, request: Request, call_next):
        auth_header = request.headers.get("authorization", "")
        if not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={"error": "Missing or invalid Authorization header"},
            )

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{AUTH_SERVER_URL}/auth/me",
                    headers={"Authorization": auth_header},
                )
        except httpx.ConnectError:
            return JSONResponse(
                status_code=502,
                content={"error": "Auth server unavailable"},
            )

        if response.status_code == 401:
            return JSONResponse(
                status_code=401,
                content={"error": "Invalid or expired token"},
            )

        if response.status_code != 200:
            return JSONResponse(
                status_code=502,
                content={"error": "Auth server error"},
            )

        return await call_next(request)
