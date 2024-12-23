import React, { useState } from 'react';
import { Message, ModelResponse } from './types/chat';
import { fetchAllModels } from './utils/api';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Bot } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const responses = await fetchAllModels(content);
      
      // Add individual model responses
      Object.entries(responses).forEach(([model, response]) => {
        if (response) {
          const modelMessage: Message = {
            id: `${Date.now()}-${model}`,
            content: response,
            role: 'assistant',
            timestamp: Date.now(),
            model,
          };
          setMessages(prev => [...prev, modelMessage]);
        }
      });
    } catch (error) {
      console.error('Error fetching responses:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, there was an error processing your request.',
        role: 'assistant',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b">
            <Bot className="text-blue-500" size={24} />
            <h1 className="text-xl font-semibold">Multi-Model AI Chat</h1>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex justify-center">
                <div className="animate-pulse text-gray-400">AI is thinking...</div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <ChatInput onSend={handleSendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;