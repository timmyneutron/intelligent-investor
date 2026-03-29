from pydantic import BaseModel


class MessageItem(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ConversationState(BaseModel):
    current_category: str | None = None
    current_time_range: str | None = None
    last_query_type: str | None = None


class ChatRequest(BaseModel):
    message: str
    history: list[MessageItem] = []
    summary: str | None = None
    conversation_state: ConversationState | None = None


class ChatResponse(BaseModel):
    response: str
    summary: str | None = None
    conversation_state: ConversationState | None = None


class CategorizeRequest(BaseModel):
    transaction_ids: list[int]


class CategorySuggestion(BaseModel):
    id: int
    description: str
    suggested_category: str


class CategorizeResponse(BaseModel):
    suggestions: list[CategorySuggestion]
