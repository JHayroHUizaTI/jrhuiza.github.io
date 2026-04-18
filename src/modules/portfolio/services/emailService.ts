import type { ContactMessage } from '../domain/contact';

const contactRecipient = 'jhayro.huiza@tecsup.edu.pe';

export interface EmailDeliveryPort {
  sendContactMessage(message: ContactMessage): Promise<void>;
}

export class MissingEmailProviderConfigurationError extends Error {
  constructor() {
    super('Falta configurar RESEND_API_KEY para enviar correos.');
    this.name = 'MissingEmailProviderConfigurationError';
  }
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export class ResendEmailService implements EmailDeliveryPort {
  private readonly endpoint = 'https://api.resend.com/emails';

  constructor(
    private readonly apiKey = process.env.RESEND_API_KEY,
    private readonly from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
  ) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    if (!this.apiKey) {
      throw new MissingEmailProviderConfigurationError();
    }

    const safeName = escapeHtml(message.name);
    const safeEmail = escapeHtml(message.email);
    const safeMessage = escapeHtml(message.message).replaceAll('\n', '<br />');

    const response = await fetch(this.endpoint, {
      body: JSON.stringify({
        from: this.from,
        html: `
          <h2>Nuevo mensaje desde el portfolio</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Correo:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage}</p>
        `,
        reply_to: message.email,
        subject: `Nuevo mensaje de ${message.name}`,
        text: `Nombre: ${message.name}\nCorreo: ${message.email}\n\n${message.message}`,
        to: contactRecipient,
      }),
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('El proveedor de correo rechazo el envio.');
    }
  }
}
