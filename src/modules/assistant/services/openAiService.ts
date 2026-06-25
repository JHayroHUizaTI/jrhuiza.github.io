import type { ChatMessage } from '../domain/chat';

export interface ChatCompletionPort {
  complete(messages: ChatMessage[]): Promise<string>;
}

export class MissingOpenAiConfigurationError extends Error {
  constructor() {
    super('Falta configurar OPENAI_API_KEY para usar el asistente.');
    this.name = 'MissingOpenAiConfigurationError';
  }
}

interface OpenAiChatResponse {
  choices?: Array<{ message?: { content?: string } }>;
}

export class OpenAiChatService implements ChatCompletionPort {
  private readonly endpoint = 'https://api.openai.com/v1/chat/completions';

  constructor(
    private readonly apiKey = process.env.OPENAI_API_KEY,
    private readonly model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  ) {}

  async complete(messages: ChatMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new MissingOpenAiConfigurationError();
    }

    const response = await fetch(this.endpoint, {
      body: JSON.stringify({
        max_tokens: 600,
        messages,
        model: this.model,
        temperature: 0.6,
      }),
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('El proveedor del asistente rechazo la solicitud.');
    }

    const payload = (await response.json()) as OpenAiChatResponse;
    const reply = payload.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('El proveedor del asistente devolvio una respuesta vacia.');
    }

    return reply;
  }
}
