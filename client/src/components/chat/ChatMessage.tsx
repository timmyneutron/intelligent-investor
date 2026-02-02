import type { ChatMessage as ChatMessageType } from '../../types';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  return (
    <div className={`chat-message ${message.role}`}>
      {message.content}
    </div>
  );
}
