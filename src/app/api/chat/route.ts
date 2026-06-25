import { NextResponse } from 'next/server';
import { GenerateChatReplyUseCase } from '@/modules/assistant/application/generateChatReply';
import type { ChatMessage, ChatRole } from '@/modules/assistant/domain/chat';
import {
  MissingOpenAiConfigurationError,
  OpenAiChatService,
} from '@/modules/assistant/services/openAiService';

export const runtime = 'nodejs';

const generateChatReply = new GenerateChatReplyUseCase(new OpenAiChatService());

const isChatRole = (value: unknown): value is ChatRole =>
  value === 'user' || value === 'assistant' || value === 'system';

const toChatMessages = (payload: unknown): ChatMessage[] => {
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as { messages?: unknown }).messages)) {
    return [];
  }

  return (payload as { messages: unknown[] }).messages
    .filter(
      (item): item is { role: ChatRole; content: string } =>
        !!item &&
        typeof item === 'object' &&
        isChatRole((item as { role?: unknown }).role) &&
        typeof (item as { content?: unknown }).content === 'string',
    )
    .map((item) => ({ content: item.content, role: item.role }));
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const result = await generateChatReply.execute(toChatMessages(payload));

    if (!result.ok) {
      return NextResponse.json(
        {
          errors: result.errors,
          message: 'Revisa el mensaje e intentalo nuevamente.',
        },
        { status: 422 },
      );
    }

    return NextResponse.json({ reply: result.reply });
  } catch (error) {
    if (error instanceof MissingOpenAiConfigurationError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'No se pudo obtener una respuesta. Intentalo nuevamente.' },
      { status: 500 },
    );
  }
}
