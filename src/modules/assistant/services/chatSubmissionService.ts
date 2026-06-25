import type { ChatMessage } from '../domain/chat';

export interface ChatSubmissionPort {
  send(messages: ChatMessage[]): Promise<string>;
}

interface ChatApiResponse {
  reply?: string;
  message?: string;
}

export class ChatApiSubmissionService implements ChatSubmissionPort {
  constructor(private readonly endpoint = '/api/chat') {}

  async send(messages: ChatMessage[]): Promise<string> {
    const response = await fetch(this.endpoint, {
      body: JSON.stringify({ messages }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const payload = (await response.json().catch(() => null)) as ChatApiResponse | null;

    if (!response.ok) {
      throw new Error(payload?.message ?? 'No se pudo obtener una respuesta.');
    }

    if (!payload?.reply) {
      throw new Error('No se pudo obtener una respuesta.');
    }

    return payload.reply;
  }
}
