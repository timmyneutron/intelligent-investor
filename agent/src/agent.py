from langchain_anthropic import ChatAnthropic
from langchain_ollama import ChatOllama
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

from . import config
from .config import MCP_SERVER_URL, OLLAMA_MODEL, OLLAMA_BASE_URL, ANTHROPIC_MODEL, USE_LOCAL_LLM
from .models import MessageItem
from .prompts import FINANCE_SYSTEM_PROMPT, SUMMARIZATION_PROMPT_TEMPLATE

CONTEXT_WINDOW_SIZE = 10

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


def get_mcp_config(token: str | None = None) -> dict:
    config: dict = {
        "finance": {
            "transport": "streamable_http",
            "url": MCP_SERVER_URL,
        }
    }
    if token:
        config["finance"]["headers"] = {"Authorization": f"Bearer {token}"}
    return config


def _build_message_tuples(
    history: list[MessageItem],
    summary: str | None,
    current_message: str,
) -> list[tuple[str, str]]:
    """Build the message list for the agent from summary + history + current message."""
    messages: list[tuple[str, str]] = []

    if summary:
        messages.append((
            "user",
            f"[Conversation summary so far: {summary}]",
        ))
        messages.append((
            "assistant",
            "Understood, I have the context from our previous conversation.",
        ))

    for msg in history:
        messages.append((msg.role, msg.content))

    messages.append(("user", current_message))
    return messages


async def _summarize_messages(
    llm,
    existing_summary: str | None,
    overflow_messages: list[MessageItem],
) -> str:
    """Summarize overflow messages into a rolling conversation summary."""
    overflow_text = "\n".join(
        f"{msg.role}: {msg.content}" for msg in overflow_messages
    )
    prompt = SUMMARIZATION_PROMPT_TEMPLATE.format(
        existing_summary=existing_summary or "No prior summary.",
        overflow_messages=overflow_text,
    )
    response = await llm.ainvoke(prompt)
    content = response.content
    if "</think>" in content:
        content = content.split("</think>")[-1].strip()
    return content


async def run_agent_query(
    message: str,
    token: str | None = None,
    history: list[MessageItem] | None = None,
    summary: str | None = None,
) -> tuple[str, str | None]:
    """Run a query through the finance agent with conversation context.

    Returns a tuple of (response, updated_summary).
    """
    llm = create_llm()
    history = history or []

    # If history exceeds the context window, summarize the overflow
    updated_summary = summary
    if len(history) > CONTEXT_WINDOW_SIZE:
        overflow = history[:-CONTEXT_WINDOW_SIZE]
        history = history[-CONTEXT_WINDOW_SIZE:]
        updated_summary = await _summarize_messages(llm, summary, overflow)

    messages = _build_message_tuples(history, updated_summary, message)

    client = MultiServerMCPClient(get_mcp_config(token))
    tools = await client.get_tools()

    agent = create_react_agent(
        model=llm,
        tools=tools,
        prompt=FINANCE_SYSTEM_PROMPT,
    )

    result = await agent.ainvoke({"messages": messages})

    # Extract the final text answer from the last AI message
    ai_message = result["messages"][-1]
    content = ai_message.content

    # qwen3 may wrap its answer in <think>...</think> tags; strip those
    if "</think>" in content:
        content = content.split("</think>")[-1].strip()

    return content, updated_summary
