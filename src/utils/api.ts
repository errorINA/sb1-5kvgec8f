import { SupportedModel } from '../types/chat';

export async function fetchPollinationsResponse(prompt: string, model: SupportedModel): Promise<string> {
  const encodedPrompt = encodeURIComponent(prompt);
  const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=${model}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  const text = await response.text();
  return text;
}

export async function fetchAllModels(prompt: string): Promise<Record<SupportedModel, string>> {
  const models: SupportedModel[] = ['qwen-coder', 'openai', 'llama'];
  
  const responses = await Promise.all(
    models.map(async (model) => {
      try {
        const response = await fetchPollinationsResponse(prompt, model);
        return [model, response] as const;
      } catch (error) {
        console.error(`Error with ${model}:`, error);
        return [model, ''] as const;
      }
    })
  );

  return Object.fromEntries(responses) as Record<SupportedModel, string>;
}