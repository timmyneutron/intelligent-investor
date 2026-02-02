import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';

interface Props {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: Props) {
  const { messages, loading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <h3>Financial Assistant</h3>
        <button className="chat-panel-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-message assistant">
            Hello! I can help you understand your finances. Try asking me things like
            "How much did I spend on groceries in December?" or "What was my largest expense?"
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <div className="chat-message assistant">
            <div className="loading-spinner" style={{ display: 'inline-block', width: 16, height: 16, borderWidth: 2, marginRight: 8, verticalAlign: 'middle' }} />
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
