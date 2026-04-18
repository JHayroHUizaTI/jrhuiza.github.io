import type { ContactMessage } from '../domain/contact';

export interface ContactSubmissionPort {
  send(message: ContactMessage): Promise<void>;
}

interface ContactApiResponse {
  message?: string;
}

export class ContactApiSubmissionService implements ContactSubmissionPort {
  constructor(private readonly endpoint = '/api/contact') {}

  async send(message: ContactMessage): Promise<void> {
    const response = await fetch(this.endpoint, {
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as ContactApiResponse | null;
      throw new Error(payload?.message ?? 'No se pudo enviar el mensaje.');
    }
  }
}
