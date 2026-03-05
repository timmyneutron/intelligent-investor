import os

import jwt
from fastapi import Request, HTTPException

JWT_SECRET = os.environ.get("JWT_SECRET", "intelligent-investor-secret")


def get_current_user(request: Request) -> dict:
    """Verify JWT from the Authorization header and return the user payload."""
    auth_header = request.headers.get("authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid Authorization header"
        )

    token = auth_header.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return {"user_id": payload["user_id"], "username": payload["username"]}
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def get_token_from_request(request: Request) -> str:
    """Extract the raw JWT token string from the Authorization header."""
    auth_header = request.headers.get("authorization", "")
    if auth_header.startswith("Bearer "):
        return auth_header.split(" ", 1)[1]
    return ""
