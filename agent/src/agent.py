from langchain_anthropic import ChatAnthropic
from langchain_ollama import ChatOllama
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

import json
import re

from . import config
from .config import MCP_SERVER_URL, OLLAMA_MODEL, OLLAMA_BASE_URL, ANTHROPIC_MODEL, USE_LOCAL_LLM
from .models import ConversationState, MessageItem
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
    conversation_state: ConversationState | None = None,
) -> list[tuple[str, str]]:
    """Build the message list for the agent from summary + state + history + current message."""
    messages: list[tuple[str, str]] = []

    context_parts: list[str] = []
    if summary:
        context_parts.append(f"Conversation summary so far: {summary}")
    if conversation_state:
        state_dict = conversation_state.model_dump(exclude_none=True)
        if state_dict:
            context_parts.append(f"Current conversation state: {json.dumps(state_dict)}")

    if context_parts:
        messages.append(("user", f"[{' | '.join(context_parts)}]"))
        messages.append((
            "assistant",
            "Understood, I have the context from our previous conversation.",
        ))

    for msg in history:
        messages.append((msg.role, msg.content))

    messages.append(("user", current_message))
    return messages


def _parse_conversation_state(content: str) -> tuple[str, ConversationState | None]:
    """Extract a <conversation_state> JSON block from the response, returning cleaned content and state."""
    match = re.search(
        r"<conversation_state>\s*(\{.*?\})\s*</conversation_state>",
        content,
        re.DOTALL,
    )
    if not match:
        return content, None

    cleaned = content[:match.start()] + content[match.end():]
    cleaned = cleaned.strip()

    try:
        state_data = json.loads(match.group(1))
        state = ConversationState(**state_data)
        return cleaned, state
    except (json.JSONDecodeError, ValueError):
        return cleaned, None


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
    conversation_state: ConversationState | None = None,
) -> tuple[str, str | None, ConversationState | None]:
    """Run a query through the finance agent with conversation context.

    Returns a tuple of (response, updated_summary, updated_conversation_state).
    """
    llm = create_llm()
    history = history or []

    # If history exceeds the context window, summarize the overflow
    updated_summary = summary
    if len(history) > CONTEXT_WINDOW_SIZE:
        overflow = history[:-CONTEXT_WINDOW_SIZE]
        history = history[-CONTEXT_WINDOW_SIZE:]
        updated_summary = await _summarize_messages(llm, summary, overflow)

    messages = _build_message_tuples(history, updated_summary, message, conversation_state)

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

    # Parse out conversation state update from the response
    content, updated_state = _parse_conversation_state(content)

    # Fall back to the incoming state if the LLM didn't produce an update
    if updated_state is None:
        updated_state = conversation_state

    return content, updated_summary, updated_state
