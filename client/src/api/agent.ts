const AGENT_BASE_URL = 'http://localhost:8000';

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${AGENT_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Agent error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

export async function requestCategorization(
  transactionIds: number[]
): Promise<Array<{ id: number; description: string; suggested_category: string }>> {
  const response = await fetch(`${AGENT_BASE_URL}/categorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction_ids: transactionIds }),
  });

  if (!response.ok) {
    throw new Error(`Agent error: ${response.status}`);
  }

  const data = await response.json();
  return data.suggestions;
}
