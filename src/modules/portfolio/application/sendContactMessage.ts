import {
  ContactMessage,
  ContactValidationErrors,
  validateContactMessage,
} from '../domain/contact';
import type { EmailDeliveryPort } from '../services/emailService';

export type SendContactMessageResult =
  | {
      ok: true;
    }
  | {
      errors: ContactValidationErrors;
      ok: false;
    };

export class SendContactMessageUseCase {
  constructor(private readonly emailDelivery: EmailDeliveryPort) {}

  async execute(message: ContactMessage): Promise<SendContactMessageResult> {
    const validation = validateContactMessage(message);

    if (!validation.isValid) {
      return {
        errors: validation.errors,
        ok: false,
      };
    }

    await this.emailDelivery.sendContactMessage(validation.data);

    return {
      ok: true,
    };
  }
}
