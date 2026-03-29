import { useState, useCallback, useRef } from 'react';
import { sendChatMessage } from '../api/agent';
import type { ChatMessage } from '../types';

const CONTEXT_WINDOW_SIZE = 10;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Build history from all existing messages (before adding the new user message).
      // The current user message is sent separately as `message`.
      const currentMessages = [...messages, userMessage];
      const history = currentMessages.slice(-CONTEXT_WINDOW_SIZE, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const result = await sendChatMessage(content, history, summaryRef.current);

      if (result.summary !== null) {
        summaryRef.current = result.summary;
      }

      const assistantMessage: ChatMessage = { role: 'assistant', content: result.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err instanceof Error ? err.message : 'Unknown error'}. Make sure the AI agent is running on port 8000.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return { messages, loading, sendMessage };
}
