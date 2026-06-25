export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const MAX_CHAT_MESSAGE_LENGTH = 2000;

export interface ChatMessageValidationResult {
  isValid: boolean;
  error?: string;
  text: string;
}

export const validateChatMessage = (text: string): ChatMessageValidationResult => {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { error: 'Escribe un mensaje antes de enviar.', isValid: false, text: trimmed };
  }

  if (trimmed.length > MAX_CHAT_MESSAGE_LENGTH) {
    return {
      error: `El mensaje no debe superar ${MAX_CHAT_MESSAGE_LENGTH} caracteres.`,
      isValid: false,
      text: trimmed,
    };
  }

  return { isValid: true, text: trimmed };
};
