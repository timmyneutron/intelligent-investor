import os

MCP_SERVER_URL = os.environ.get("MCP_SERVER_URL", "http://localhost:3001/mcp")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "qwen3:8b")
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")