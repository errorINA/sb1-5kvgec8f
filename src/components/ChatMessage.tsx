import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? <MessageCircle size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        <p className="text-sm">{message.content}</p>
        {message.model && (
          <span className="text-xs opacity-70 mt-1 block">
            Model: {message.model}
          </span>
        )}
      </div>
    </div>
  );
}