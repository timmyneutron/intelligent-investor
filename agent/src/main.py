import json
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_ollama import ChatOllama
from langchain_mcp_adapters.client import MultiServerMCPClient

from .models import (
    ChatRequest,
    ChatResponse,
    CategorizeRequest,
    CategorizeResponse,
    CategorySuggestion,
)
from .agent import run_agent_query, get_mcp_config, create_llm
from .prompts import CATEGORIZATION_PROMPT_TEMPLATE

app = FastAPI(title="Intelligent Investor Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await run_agent_query(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/categorize", response_model=CategorizeResponse)
async def categorize(request: CategorizeRequest):
    try:
        # Use MCP to fetch the uncategorized transactions
        client = MultiServerMCPClient(get_mcp_config())
        tools = await client.get_tools()

        # Find the get_transactions tool
        get_tx_tool = None
        for tool in tools:
            if tool.name == "get_transactions":
                get_tx_tool = tool
                break

        if not get_tx_tool:
            raise HTTPException(
                status_code=500, detail="get_transactions tool not found"
            )

        # Fetch uncategorized transactions
        result = await get_tx_tool.ainvoke(
            {"user_id": 1, "category": "uncategorized", "limit": 100, "page": 1}
        )

        # MCP tools return content blocks like [{"type": "text", "text": "..."}]
        if isinstance(result, list):
            raw = next(
                (item["text"] for item in result if isinstance(item, dict) and "text" in item),
                str(result),
            )
        else:
            raw = str(result)

        tx_data = json.loads(raw)
        transactions = tx_data.get("data", [])

        if not transactions:
            return CategorizeResponse(suggestions=[])

        # Filter to only requested IDs if specified
        if request.transaction_ids:
            transactions = [
                t for t in transactions if t["id"] in request.transaction_ids
            ]

        # Use LLM to suggest categories
        llm = create_llm()

        tx_list = "\n".join(
            f'- ID {t["id"]}: "{t["description"]}"' for t in transactions
        )
        prompt = CATEGORIZATION_PROMPT_TEMPLATE.format(transactions=tx_list)

        response = await llm.ainvoke(prompt)
        content = response.content

        # qwen3 may wrap its answer in <think>...</think> tags; strip those
        if "</think>" in content:
            content = content.split("</think>")[-1].strip()

        # Parse JSON from LLM response
        json_match = re.search(r"\[.*\]", content, re.DOTALL)
        if not json_match:
            raise HTTPException(
                status_code=500, detail="Failed to parse categorization response"
            )

        suggested = json.loads(json_match.group())

        # Build response with descriptions
        tx_map = {t["id"]: t["description"] for t in transactions}
        suggestions = []
        for s in suggested:
            tx_id = s["id"]
            if tx_id in tx_map:
                suggestions.append(
                    CategorySuggestion(
                        id=tx_id,
                        description=tx_map[tx_id],
                        suggested_category=s["suggested_category"],
                    )
                )

        return CategorizeResponse(suggestions=suggestions)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
