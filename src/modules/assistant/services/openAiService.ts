import 'server-only';

import type { ChatMessage } from '../domain/chat';

export interface ChatCompletionPort {
  complete(messages: ChatMessage[], instructions?: string): Promise<string>;
}

export class MissingOpenAiConfigurationError extends Error {
  constructor() {
    super('Falta configurar OPENAI_API_KEY para usar el asistente.');
    this.name = 'MissingOpenAiConfigurationError';
  }
}

interface OpenAiChatResponse {
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
    role?: string;
    type?: string;
  }>;
}

export class OpenAiChatService implements ChatCompletionPort {
  private readonly endpoint = 'https://api.openai.com/v1/responses';

  constructor(
    private readonly apiKey = process.env.OPENAI_API_KEY,
    private readonly model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  ) {}

  async complete(messages: ChatMessage[], instructions?: string): Promise<string> {
    if (!this.apiKey) {
      throw new MissingOpenAiConfigurationError();
    }

    const response = await fetch(this.endpoint, {
      body: JSON.stringify({
        input: messages.map((message) => ({
          content: [{ text: message.content, type: 'input_text' }],
          role: message.role,
        })),
        instructions,
        max_output_tokens: 600,
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
    const reply = payload.output
      ?.flatMap((item) => item.content ?? [])
      .find((item) => item.type === 'output_text')
      ?.text
      ?.trim();

    if (!reply) {
      throw new Error('El proveedor del asistente devolvio una respuesta vacia.');
    }

    return reply;
  }
}
