from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


class CategorizeRequest(BaseModel):
    transaction_ids: list[int]


class CategorySuggestion(BaseModel):
    id: int
    description: str
    suggested_category: str


class CategorizeResponse(BaseModel):
    suggestions: list[CategorySuggestion]
