'use client';

import React from 'react';
import { useLanguage, type Language } from '@/shared/i18n';

/**
 * Navbar language switcher. Uses a native <select> so it stays accessible and
 * works reliably across desktop and mobile, styled to match the neon-glass UI.
 * Option labels are shown in their own language (Español / English) regardless
 * of the active UI language, which is the conventional pattern.
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
  const currentLabel = language === 'es' ? 'Español' : 'English';
  const nextLabel = nextLanguage === 'es' ? 'Español' : 'English';
  const compactLabel =
    language === 'es'
      ? `Idioma: ${currentLabel}. Cambiar a ${nextLabel}.`
      : `Language: ${currentLabel}. Switch to ${nextLabel}.`;

  if (compact) {
    return (
      <button
        type="button"
        aria-label={compactLabel}
        title={t.language.label}
        onClick={() => setLanguage(nextLanguage)}
        className={`group motion-button inline-flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(57,255,20,0.2)] bg-[rgba(3,10,5,0.6)] text-[#39ff14] transition-all duration-300 hover:border-[rgba(57,255,20,0.5)] hover:bg-[rgba(57,255,20,0.05)] focus-visible:border-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14] ${className}`}
      >
        <span className="material-symbols-outlined icon-anim-rotate text-[18px]">
          language
        </span>
      </button>
    );
  }

  return (
    <div className={`group relative inline-flex items-center ${className}`}>
      <span
        aria-hidden="true"
        className="material-symbols-outlined icon-anim pointer-events-none absolute left-2 text-[16px] text-[#39ff14]"
      >
        language
      </span>
      <select
        aria-label={t.language.label}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="motion-button cursor-pointer appearance-none rounded-md border border-[rgba(57,255,20,0.2)] bg-[rgba(3,10,5,0.6)] py-2 pl-8 pr-7 font-label text-xs uppercase tracking-[0.12em] text-zinc-300 outline-none transition-colors duration-200 hover:border-[rgba(57,255,20,0.5)] hover:text-[#39ff14] focus-visible:border-[#39ff14] focus-visible:ring-1 focus-visible:ring-[#39ff14]"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <span
        aria-hidden="true"
        className="material-symbols-outlined pointer-events-none absolute right-1 text-[16px] text-zinc-500 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#39ff14]"
      >
        expand_more
      </span>
    </div>
  );
};
