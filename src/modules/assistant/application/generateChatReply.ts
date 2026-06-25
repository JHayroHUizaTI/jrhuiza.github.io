import { ChatMessage, validateChatMessage } from '../domain/chat';
import { CHAT_SYSTEM_PROMPT } from '../domain/systemPrompt';
import type { ChatCompletionPort } from '../services/openAiService';

const MAX_HISTORY_MESSAGES = 12;

export type GenerateChatReplyResult =
  | {
      ok: true;
      reply: string;
    }
  | {
      errors: string[];
      ok: false;
    };

export class GenerateChatReplyUseCase {
  constructor(private readonly chatCompletion: ChatCompletionPort) {}

  async execute(messages: ChatMessage[]): Promise<GenerateChatReplyResult> {
    const conversation = messages.filter((message) => message.role !== 'system');
    const latest = conversation.at(-1);

    if (!latest || latest.role !== 'user') {
      return { errors: ['No se recibio un mensaje del usuario.'], ok: false };
    }

    const validation = validateChatMessage(latest.content);

    if (!validation.isValid && validation.error) {
      return { errors: [validation.error], ok: false };
    }

    const recent = conversation.slice(-MAX_HISTORY_MESSAGES);
    const payload: ChatMessage[] = [
      { content: CHAT_SYSTEM_PROMPT, role: 'system' },
      ...recent,
    ];

    const reply = await this.chatCompletion.complete(payload);

    return { ok: true, reply };
  }
}
