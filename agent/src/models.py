from pydantic import BaseModel


class MessageItem(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[MessageItem] = []
    summary: str | None = None


class ChatResponse(BaseModel):
    response: str
    summary: str | None = None


class CategorizeRequest(BaseModel):
    transaction_ids: list[int]


class CategorySuggestion(BaseModel):
    id: int
    description: str
    suggested_category: str


class CategorizeResponse(BaseModel):
    suggestions: list[CategorySuggestion]
