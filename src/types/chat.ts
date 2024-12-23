export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  model?: string;
}

export interface ModelResponse {
  model: string;
  content: string;
}

export type SupportedModel = 'qwen-coder' | 'openai' | 'llama';