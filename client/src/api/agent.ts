const AGENT_BASE_URL = 'http://localhost:8000';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function handleUnauthorized(response: Response): void {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}

export interface ConversationState {
  current_category: string | null;
  current_time_range: string | null;
  last_query_type: string | null;
}

export interface ChatApiResponse {
  response: string;
  summary: string | null;
  conversation_state: ConversationState | null;
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: string; content: string }>,
  summary: string | null,
  conversationState: ConversationState | null,
): Promise<ChatApiResponse> {
  const response = await fetch(`${AGENT_BASE_URL}/chat`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      message,
      history,
      summary,
      conversation_state: conversationState,
    }),
  });

  if (!response.ok) {
    handleUnauthorized(response);
    throw new Error(`Agent error: ${response.status}`);
  }

  const data = await response.json();
  return {
    response: data.response,
    summary: data.summary ?? null,
    conversation_state: data.conversation_state ?? null,
  };
}

export async function requestCategorization(
  transactionIds: number[]
): Promise<Array<{ id: number; description: string; suggested_category: string }>> {
  const response = await fetch(`${AGENT_BASE_URL}/categorize`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ transaction_ids: transactionIds }),
  });

  if (!response.ok) {
    handleUnauthorized(response);
    throw new Error(`Agent error: ${response.status}`);
  }

  const data = await response.json();
  return data.suggestions;
}
