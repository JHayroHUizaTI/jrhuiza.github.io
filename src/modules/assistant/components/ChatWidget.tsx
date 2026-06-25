'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useLanguage } from '@/shared/i18n';
import { validateChatMessage, type ChatMessage } from '../domain/chat';
import { ChatApiSubmissionService } from '../services/chatSubmissionService';

const OPEN_STORAGE_KEY = 'assistant-open';
const HISTORY_STORAGE_KEY = 'assistant-history';

const submissionService = new ChatApiSubmissionService();

const readStoredHistory = (): ChatMessage[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.sessionStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is ChatMessage =>
        !!item &&
        typeof item === 'object' &&
        (item as ChatMessage).role !== 'system' &&
        typeof (item as ChatMessage).content === 'string',
    );
  } catch {
    return [];
  }
};

export const ChatWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore persisted state on mount (sessionStorage is client-only).
  useEffect(() => {
    setHistory(readStoredHistory());
    setIsOpen(window.sessionStorage.getItem(OPEN_STORAGE_KEY) === 'true');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.sessionStorage.setItem(OPEN_STORAGE_KEY, String(isOpen));
  }, [isOpen]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, isLoading]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const messages: ChatMessage[] =
    history.length > 0
      ? history
      : [{ content: t.assistant.greeting, role: 'assistant' }];

  const submitMessage = async (rawText: string) => {
    const validation = validateChatMessage(rawText);
    if (!validation.isValid) {
      setError(validation.error ?? t.assistant.emptyMessage);
      return;
    }

    const userMessage: ChatMessage = { content: validation.text, role: 'user' };
    const previousHistory = history;
    const nextHistory = [...previousHistory, userMessage];

    setHistory(nextHistory);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const reply = await submissionService.send(nextHistory);
      setHistory((current) => [...current, { content: reply, role: 'assistant' }]);
    } catch {
      // Keep the user's text recoverable so they can retry.
      setHistory(previousHistory);
      setInput(validation.text);
      setError(t.assistant.error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setHistory([]);
    setInput('');
    setError(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        void submitMessage(input);
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.assistant.launcherAria}
        className="
          floating-cta floating-cta--chat group fixed bottom-28 right-6 z-50
          inline-flex size-14 items-center justify-center rounded-full
          bg-primary text-background shadow-lg glow-primary
          outline-none transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-xl
          active:scale-[0.98]
          focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          motion-reduce:transition-none motion-reduce:hover:scale-100
        "
      >
        <span aria-hidden="true" className="floating-cta__badge">
          <span className="floating-cta__badge-dot" />
          AI chat
        </span>
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-[28px] transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        >
          forum
        </span>
      </button>
    );
  }

  return (
    <section
      aria-label={t.assistant.title}
      className="
        glass-panel fixed bottom-28 right-6 z-50 flex flex-col
        w-[calc(100vw-3rem)] max-w-[380px]
        h-[min(70dvh,560px)] max-h-[calc(100dvh-7.5rem)]
        overflow-hidden glow-primary
      "
    >
      <header className="flex items-center justify-between gap-3 border-b border-primary/10 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
          >
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-headline text-sm font-bold text-on-surface">
              {t.assistant.title}
            </span>
            <span className="truncate font-label text-[11px] text-primary/80">
              {t.assistant.subtitle}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearConversation}
            aria-label={t.assistant.resetAria}
            className="
              rounded-full px-3 py-1.5 text-[11px] font-medium text-primary
              outline-none transition-colors duration-200
              hover:bg-primary/10
              focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              motion-reduce:transition-none
            "
          >
            {t.assistant.reset}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t.assistant.closeAria}
            className="
              flex size-9 shrink-0 items-center justify-center rounded-full
              text-on-surface/70 outline-none transition-colors duration-200
              hover:bg-primary/10 hover:text-on-surface
              focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              motion-reduce:transition-none
            "
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[22px]">
              close
            </span>
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label={t.assistant.title}
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === 'user'
                ? 'flex justify-end'
                : 'flex justify-start'
            }
          >
            <p
              className={
                message.role === 'user'
                  ? 'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-primary/15 px-3.5 py-2 text-sm text-on-surface'
                  : 'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm border border-primary/15 bg-primary/5 px-3.5 py-2 text-sm text-on-surface'
              }
            >
              {message.content}
            </p>
          </div>
        ))}

        {history.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-on-surface/60">{t.assistant.hint}</p>
            <div className="flex flex-wrap gap-2">
              {t.assistant.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={isLoading}
                  onClick={() => void submitMessage(suggestion)}
                  className="
                    rounded-full border border-primary/15 bg-primary/5 px-3 py-2 text-left
                    text-xs text-on-surface transition-colors duration-200
                    hover:border-primary/30 hover:bg-primary/10
                    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                    disabled:cursor-not-allowed disabled:opacity-50
                    motion-reduce:transition-none
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <p
              className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-primary/15 bg-primary/5 px-3.5 py-3"
              aria-label={t.assistant.typing}
            >
              <span className="sr-only">{t.assistant.typing}</span>
              <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s] motion-reduce:animate-none" />
              <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s] motion-reduce:animate-none" />
              <span className="size-2 animate-bounce rounded-full bg-primary motion-reduce:animate-none" />
            </p>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mx-4 mb-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200"
        >
          {error}
        </p>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isLoading) {
            void submitMessage(input);
          }
        }}
        className="flex items-end gap-2 border-t border-primary/10 px-3 py-3"
      >
        <label className="sr-only" htmlFor="assistant-input">
          {t.assistant.placeholder}
        </label>
        <textarea
          id="assistant-input"
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.assistant.placeholder}
          disabled={isLoading}
          className="
            max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-primary/15
            bg-background/40 px-3 py-2 text-sm text-on-surface
            outline-none transition-colors duration-200 placeholder:text-on-surface/40
            focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/40
            disabled:opacity-60
            motion-reduce:transition-none
          "
        />
        <button
          type="submit"
          aria-label={t.assistant.sendAria}
          disabled={isLoading || input.trim().length === 0}
          className="
            flex size-10 shrink-0 items-center justify-center rounded-xl
            bg-primary text-background outline-none transition-all duration-200
            hover:bg-primary/90
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            focus-visible:ring-offset-background
            disabled:cursor-not-allowed disabled:opacity-40
            motion-reduce:transition-none
          "
        >
          <span className="sr-only">{t.assistant.send}</span>
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
            send
          </span>
        </button>
      </form>
    </section>
  );
};
