def get_current_token() -> str | None:
    """Get the JWT token from the current HTTP request context."""
    try:
        from fastmcp.server.dependencies import get_http_request

        request = get_http_request()
        auth = request.headers.get("authorization", "")
        if auth.startswith("Bearer "):
            return auth.split(" ", 1)[1]
    except Exception:
        pass
    return None
