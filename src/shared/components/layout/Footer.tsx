'use client';

import React from 'react';
import { useLanguage } from '@/shared/i18n';
import { ContactIcons } from './ContactIcons';

interface FooterProps {
  authorName?: string;
  githubUrl?: string;
  year?: number;
}

export const Footer = ({
  authorName = 'Jhayro',
  githubUrl = 'https://github.com/JHayroHUizaTI',
  year = 2026,
}: FooterProps) => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: 'rgba(3, 10, 5, 0.6)',
        backdropFilter: 'blur(16px) saturate(130%)',
        WebkitBackdropFilter: 'blur(16px) saturate(130%)',
        borderTop: '1px solid rgba(57, 255, 20, 0.06)',
      }}
    >
      {/* Subtle tech grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '40px 40px',
        }}
      />

      {/* Central glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(57, 255, 20, 0.04)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-8 py-12 text-center md:py-16">
        <p className="max-w-lg text-[11px] leading-relaxed text-zinc-600">
          {t.footer.tagline}
        </p>

        <p className="text-sm text-zinc-400">
          {t.footer.madeWith}{' '}
          <span role="img" aria-label="love">❤️</span>
          {' '}{t.footer.and}{' '}
          <span role="img" aria-label="coffee">☕</span>
          {' '}{t.footer.by} {authorName}
        </p>

        <ContactIcons />

        <nav aria-label="Footer navigation" className="flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group motion-link inline-flex items-center gap-1.5 text-[12px] text-zinc-500 transition-colors duration-200 hover:text-[#39ff14]"
          >
            <span aria-hidden="true" className="material-symbols-outlined icon-anim text-[15px]">
              code
            </span>
            GitHub
          </a>
          <span aria-hidden="true" className="select-none text-zinc-700">•</span>
          <button
            onClick={scrollToTop}
            aria-label={t.footer.scrollTop}
            className="group motion-link inline-flex items-center gap-1.5 text-[12px] text-zinc-500 transition-colors duration-200 hover:text-[#39ff14]"
          >
            <span aria-hidden="true" className="material-symbols-outlined icon-anim-bounce text-[15px]">
              keyboard_double_arrow_up
            </span>
            {t.footer.scrollTop}
          </button>
        </nav>

        <p className="text-[11px] text-zinc-700">
          © {year} <span aria-hidden="true">•</span> {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};
