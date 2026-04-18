import { NextResponse } from 'next/server';
import { SendContactMessageUseCase } from '@/modules/portfolio/application/sendContactMessage';
import type { ContactMessage } from '@/modules/portfolio/domain/contact';
import {
  MissingEmailProviderConfigurationError,
  ResendEmailService,
} from '@/modules/portfolio/services/emailService';

export const runtime = 'nodejs';

const sendContactMessage = new SendContactMessageUseCase(new ResendEmailService());

const toContactMessage = (payload: Partial<Record<keyof ContactMessage, unknown>>): ContactMessage => ({
  email: typeof payload.email === 'string' ? payload.email : '',
  message: typeof payload.message === 'string' ? payload.message : '',
  name: typeof payload.name === 'string' ? payload.name : '',
});

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<Record<keyof ContactMessage, unknown>>;
    const result = await sendContactMessage.execute(toContactMessage(payload));

    if (!result.ok) {
      return NextResponse.json(
        {
          errors: result.errors,
          message: 'Revisa los campos marcados.',
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      message: 'Mensaje enviado correctamente.',
    });
  } catch (error) {
    if (error instanceof MissingEmailProviderConfigurationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'No se pudo enviar el mensaje. Intentalo nuevamente.' },
      { status: 500 },
    );
  }
}
