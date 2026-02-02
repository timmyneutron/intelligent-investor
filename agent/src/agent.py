from langchain_anthropic import ChatAnthropic
from langchain_ollama import ChatOllama
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

from . import config
from .config import MCP_SERVER_URL, OLLAMA_MODEL, OLLAMA_BASE_URL, ANTHROPIC_MODEL, USE_LOCAL_LLM
from .prompts import FINANCE_SYSTEM_PROMPT


def create_llm():
    if USE_LOCAL_LLM:
        # Return ChatOllama() to use a local LLM.
        # FYI if you run it locally on a CPU it's slow.
        return ChatOllama(
            model=OLLAMA_MODEL,
            base_url=OLLAMA_BASE_URL,
            temperature=0,
            num_ctx=32768,
        )
    else:
        # Return ChatAnthropic() to use a cloud LLM (Claude Haiku)
        # Requires ANTHROPIC_API_KEY to be set in local env
        return ChatAnthropic(
            model=ANTHROPIC_MODEL,
            temperature=0
        )


def get_mcp_config() -> dict:
    return {
        "finance": {
            "transport": "streamable_http",
            "url": MCP_SERVER_URL,
        }
    }


async def run_agent_query(message: str) -> str:
    """Run a single query through the finance agent and return the response."""
    llm = create_llm()

    client = MultiServerMCPClient(get_mcp_config())
    tools = await client.get_tools()

    agent = create_react_agent(
        model=llm,
        tools=tools,
        prompt=FINANCE_SYSTEM_PROMPT,
    )

    result = await agent.ainvoke({"messages": [("user", message)]})

    # Extract the final text answer from the last AI message
    ai_message = result["messages"][-1]
    content = ai_message.content

    # qwen3 may wrap its answer in <think>...</think> tags; strip those
    if "</think>" in content:
        content = content.split("</think>")[-1].strip()

    return content
