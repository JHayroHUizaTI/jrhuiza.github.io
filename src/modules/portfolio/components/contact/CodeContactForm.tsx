'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  ContactMessage,
  ContactValidationErrors,
  validateContactMessage,
} from '../../domain/contact';
import {
  ContactApiSubmissionService,
  ContactSubmissionPort,
} from '../../services/contactSubmissionService';
import { CodeEditorShell } from './CodeEditorShell';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

interface CodeContactFormProps {
  submissionService?: ContactSubmissionPort;
}

const emptyMessage: ContactMessage = {
  email: '',
  message: '',
  name: '',
};

const codeFieldBaseClass =
  'inline-flex h-8 min-w-[11rem] items-center border-b border-[rgba(57,255,20,0.12)] bg-transparent px-1 text-on-surface/80 outline-none transition-colors placeholder:text-on-surface/25 focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60';

export const CodeContactForm = ({ submissionService }: CodeContactFormProps) => {
  const service = useMemo(
    () => submissionService ?? new ContactApiSubmissionService(),
    [submissionService],
  );
  const [message, setMessage] = useState<ContactMessage>(emptyMessage);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isLoading = submitState === 'loading';

  const updateField = (field: keyof ContactMessage, value: string) => {
    setMessage((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateContactMessage(message);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setSubmitState('error');
      setStatusMessage('Revisa los campos antes de ejecutar el script.');
      return;
    }

    try {
      setSubmitState('loading');
      setStatusMessage('Enviando mensaje...');
      await service.send(validation.data);
      setMessage(emptyMessage);
      setSubmitState('success');
      setStatusMessage('Mensaje enviado correctamente.');
    } catch (error) {
      setSubmitState('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo enviar el mensaje. Intentalo nuevamente.',
      );
    }
  };

  return (
    <CodeEditorShell
      accent="primary"
      fileBadge="TS"
      fileName="sendMessage.ts"
    >
      <form
        className="px-4 py-6 transition-colors duration-300 sm:px-6 sm:py-6"
        style={{ background: 'rgba(4, 16, 8, 0.3)' }}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="font-label text-[12px] leading-7 sm:text-[13px] sm:leading-8">
          <div className="text-zinc-600 italic">{'// Run this script to send a message'}</div>
          <div>
            <span className="text-primary">const</span>
            <span className="text-on-surface/85"> </span>
            <span className="text-secondary">send</span>
            <span className="text-on-surface/85"> = </span>
            <span className="text-primary">async</span>
            <span className="text-on-surface/85"> () </span>
            <span className="text-primary/80">{'=> '}</span>
            <span className="text-primary/80">{'{'}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 pl-4 sm:pl-6">
            <span className="text-primary">const</span>
            <label className="text-secondary" htmlFor="contact-name">name</label>
            <span className="text-on-surface/85">=</span>
            <span className="text-on-surface/70">{'"'}</span>
            <input
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              className={`${codeFieldBaseClass} sm:min-w-[13rem] ${errors.name ? 'border-[#ff5f56] focus:border-[#ff5f56]' : ''}`}
              disabled={isLoading}
              id="contact-name"
              name="name"
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Your Name"
              value={message.name}
            />
            <span className="text-on-surface/70">{'"'}</span>
            <span className="text-on-surface/85">;</span>
          </div>
          {errors.name ? (
            <p className="pl-4 text-[11px] leading-5 text-[#ff8f86] sm:pl-6" id="contact-name-error">
              {errors.name}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 pl-4 sm:pl-6">
            <span className="text-primary">const</span>
            <label className="text-secondary" htmlFor="contact-email">email</label>
            <span className="text-on-surface/85">=</span>
            <span className="text-on-surface/70">{'"'}</span>
            <input
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              className={`${codeFieldBaseClass} sm:min-w-[15rem] ${errors.email ? 'border-[#ff5f56] focus:border-[#ff5f56]' : ''}`}
              disabled={isLoading}
              id="contact-email"
              name="email"
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="your@email.com"
              type="email"
              value={message.email}
            />
            <span className="text-on-surface/70">{'"'}</span>
            <span className="text-on-surface/85">;</span>
          </div>
          {errors.email ? (
            <p className="pl-4 text-[11px] leading-5 text-[#ff8f86] sm:pl-6" id="contact-email-error">
              {errors.email}
            </p>
          ) : null}

          <div className="mt-2 pl-4 sm:pl-6">
            <span className="text-primary">await</span>
            <span className="text-on-surface/85"> </span>
            <span className="text-secondary">api.submit</span>
            <span className="text-primary/80">{'({'}</span>
          </div>

          <div className="pl-8 sm:pl-10">
            <div>
              <span className="text-secondary">name</span>
              <span className="text-on-surface/85">, </span>
              <span className="text-secondary">email</span>
              <span className="text-on-surface/85">,</span>
            </div>
            <div>
              <label className="text-secondary" htmlFor="contact-message">message</label>
              <span className="text-on-surface/85">: </span>
              <span className="text-on-surface/70">`</span>
            </div>
            <div className="pr-1">
              <textarea
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                aria-invalid={Boolean(errors.message)}
                className={`mt-1 min-h-[7.5rem] w-full resize-none border-l bg-transparent px-3 py-2 text-[13px] leading-7 text-on-surface/80 outline-none transition-colors placeholder:text-on-surface/20 focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm ${errors.message ? 'border-[#ff5f56] focus:border-[#ff5f56]' : 'border-[rgba(37,197,197,0.3)]'}`}
                disabled={isLoading}
                id="contact-message"
                name="message"
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Type your message here..."
                value={message.message}
              />
              {errors.message ? (
                <p className="text-[11px] leading-5 text-[#ff8f86]" id="contact-message-error">
                  {errors.message}
                </p>
              ) : null}
            </div>
            <div>
              <span className="text-on-surface/70">`</span>
            </div>
          </div>

          <div className="pl-4 sm:pl-6">
            <span className="text-primary/80">{'}'}</span>
            <span className="text-on-surface/85">);</span>
          </div>

          <div>
            <span className="text-primary/80">{'}'}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex w-full items-center justify-center gap-3 rounded-md px-5 py-3 font-label text-xs font-semibold tracking-[0.16em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            disabled={isLoading}
            type="submit"
            style={{
              border: '1px solid rgba(57, 255, 20, 0.2)',
              background: 'rgba(57, 255, 20, 0.08)',
              color: '#39ff14',
              boxShadow: '0 0 0 rgba(57, 255, 20, 0)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.4)';
                e.currentTarget.style.background = 'rgba(57, 255, 20, 0.14)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(57, 255, 20, 0.14)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.2)';
              e.currentTarget.style.background = 'rgba(57, 255, 20, 0.08)';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(57, 255, 20, 0)';
            }}
          >
            <span aria-hidden="true" className="text-sm">{isLoading ? '...' : '>'}</span>
            <span>{isLoading ? 'RUNNING' : 'RUN SCRIPT'}</span>
          </button>

          {statusMessage ? (
            <p
              aria-live="polite"
              className={`font-label text-[12px] ${
                submitState === 'success'
                  ? 'text-[#39ff14]'
                  : submitState === 'error'
                    ? 'text-[#ff8f86]'
                    : 'text-on-surface/45'
              }`}
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
      </form>
    </CodeEditorShell>
  );
};
