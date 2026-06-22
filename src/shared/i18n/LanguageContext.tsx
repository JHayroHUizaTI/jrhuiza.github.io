'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';
import {
  DEFAULT_LANGUAGE,
  Language,
  Translations,
  translations,
} from './translations';

const STORAGE_KEY = 'preferred-language';

// Tiny external store backed by localStorage. Using useSyncExternalStore keeps
// the read SSR-safe (server + first client render use DEFAULT_LANGUAGE, so
// there is no hydration mismatch) without a setState-in-effect.
const listeners = new Set<() => void>();

const isLanguage = (value: string | null): value is Language =>
  value === 'es' || value === 'en';

const readLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
};

const subscribe = (callback: () => void): (() => void) => {
  listeners.add(callback);
  // Sync across tabs/windows.
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
};

const persistLanguage = (lang: Language): void => {
  window.localStorage.setItem(STORAGE_KEY, lang);
  // Notify in-tab subscribers (the storage event only fires in other tabs).
  listeners.forEach((listener) => listener());
};

interface LanguageContextValue {
  /** Active language code. */
  language: Language;
  /** Switch language and persist the choice to localStorage. */
  setLanguage: (lang: Language) => void;
  /** UI strings for the active language. */
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

/**
 * Provides the active language + UI translations to the tree, persisting the
 * choice to localStorage and keeping it in sync across tabs.
 */
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const language = useSyncExternalStore(
    subscribe,
    readLanguage,
    () => DEFAULT_LANGUAGE,
  );

  // Keep the document language in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    persistLanguage(lang);
  }, []);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/** Access the active language, switcher, and UI translations. */
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
