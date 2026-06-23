'use client';

import React from 'react';
import { useLanguage, type Language } from '@/shared/i18n';

/**
 * Inline globe icon that visually matches lucide's `Globe2`
 * (a circle with a vertical meridian + two latitude curves).
 * Purely decorative — `aria-hidden`, sized via the parent.
 */
const GlobeIcon = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* outer sphere */}
    <circle cx="12" cy="12" r="9" />
    {/* meridian (vertical great circle) */}
    <path d="M12 3a14 14 0 0 0 0 18a14 14 0 0 0 0-18" />
    {/* two latitude curves */}
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
  </svg>
);

/**
 * Premium language toggle capsule. A single click swaps the active language
 * via `setLanguage` (two-language toggle — no dropdown needed). The capsule
 * shows an inline globe plus the CURRENT active language code (`ES` / `EN`).
 *
 * SSR-safe: language is read from the i18n external store (returns the default
 * on the server), so the rendered code matches between server and client.
 */
export const LanguageSelector = ({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => {
  const { language, setLanguage, t } = useLanguage();
  const nextLanguage: Language = language === 'es' ? 'en' : 'es';
  const currentCode = language === 'es' ? 'ES' : 'EN';
  const currentLabel = language === 'es' ? 'Español' : 'English';
  const nextLabel = nextLanguage === 'es' ? 'Español' : 'English';
  const ariaLabel =
    language === 'es'
      ? `${t.language.label}: ${currentLabel}. Cambiar a ${nextLabel}.`
      : `${t.language.label}: ${currentLabel}. Switch to ${nextLabel}.`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={() => setLanguage(nextLanguage)}
      className={[
        'group motion-button inline-flex h-9 items-center justify-center overflow-hidden rounded-full border border-[rgba(57,255,20,0.18)] bg-[rgba(3,10,5,0.6)] text-[#39ff14] transition-all duration-300 ease-out hover:border-[rgba(57,255,20,0.5)] hover:bg-[rgba(57,255,20,0.06)] focus-visible:border-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
        compact ? 'w-9 gap-0 px-0' : 'gap-1.5 px-3',
        className,
      ].join(' ')}
    >
      <GlobeIcon className="icon-anim-rotate h-[18px] w-[18px] shrink-0 transition-colors duration-200" />
      <span
        aria-hidden={compact ? true : undefined}
        className={[
          'font-label text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out',
          compact
            ? 'max-w-0 -translate-x-1 opacity-0'
            : 'max-w-[3rem] translate-x-0 opacity-100',
        ].join(' ')}
      >
        {currentCode}
      </span>
    </button>
  );
};
