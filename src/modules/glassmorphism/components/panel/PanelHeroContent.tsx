'use client';

import React from 'react';
import type { BadgeItem, SocialLink } from '../../types';

// S – Single Responsibility: contenido textual y acciones del hero panel
// I – Interface Segregation: props mínimas y específicas para este componente

interface PanelHeroContentProps {
  label: string;
  headline: string;
  subheadline: string;
  description: string;
  badges: BadgeItem[];
  socials: SocialLink[];
}

/** Badge con borde sutil y micro-hover */
const Badge: React.FC<BadgeItem> = ({ label }) => (
  <span
    className="inline-block rounded-md font-label text-[10px] tracking-[0.15em] transition-all duration-300"
    style={{
      border: '1px solid rgba(57, 255, 20, 0.15)',
      background: 'rgba(57, 255, 20, 0.05)',
      color: 'rgba(57, 255, 20, 0.7)',
      padding: '4px 10px',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.35)';
      e.currentTarget.style.background = 'rgba(57, 255, 20, 0.1)';
      e.currentTarget.style.boxShadow = '0 0 12px rgba(57, 255, 20, 0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.15)';
      e.currentTarget.style.background = 'rgba(57, 255, 20, 0.05)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {label}
  </span>
);

/** Social button con glow neon al hover */
const SocialButton: React.FC<SocialLink> = ({ iconSymbol, href, ariaLabel }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
    style={{
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(255, 255, 255, 0.04)',
      color: 'rgba(255, 255, 255, 0.5)',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = 'rgba(57, 255, 20, 0.4)';
      el.style.background = 'rgba(57, 255, 20, 0.08)';
      el.style.color = '#39ff14';
      el.style.boxShadow = '0 0 18px rgba(57, 255, 20, 0.18), 0 0 6px rgba(57, 255, 20, 0.12) inset';
      el.style.transform = 'scale(1.08)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      el.style.background = 'rgba(255, 255, 255, 0.04)';
      el.style.color = 'rgba(255, 255, 255, 0.5)';
      el.style.boxShadow = 'none';
      el.style.transform = 'scale(1)';
    }}
  >
    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
      {iconSymbol}
    </span>
  </a>
);

export const PanelHeroContent: React.FC<PanelHeroContentProps> = ({
  label,
  headline,
  subheadline,
  description,
  badges,
  socials,
}) => (
  <div className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
    {/* Bloque de texto principal */}
    <div className="space-y-5">
      {/* Label técnico con línea decorativa */}
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-[1px] w-5"
          style={{ background: 'rgba(57, 255, 20, 0.5)' }}
        />
        <p className="font-label text-[0.62rem] tracking-[0.35em] text-[#39ff14] opacity-70">
          {label}
        </p>
      </div>

      {/* Headline con gradiente premium */}
      <h1
        className="font-headline font-bold leading-[0.92]"
        style={{
          fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
          background: 'linear-gradient(145deg, #39ff14 0%, #5aff3e 30%, #25c5c5 70%, #1aa0a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 12px rgba(57, 255, 20, 0.18))',
        }}
      >
        {headline}
      </h1>

      {/* Subheadline */}
      <p
        className="font-headline font-light tracking-tight text-zinc-200"
        style={{
          fontSize: 'clamp(1.9rem, 4.8vw, 3.4rem)',
          lineHeight: 1.1,
        }}
      >
        {subheadline}
      </p>
    </div>

    {/* Barra inferior: badges a la izquierda, social icons a la derecha */}
    <div className="flex items-end justify-between gap-4 pt-8">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <Badge key={b.label} label={b.label} />
          ))}
        </div>
        <p className="max-w-xs font-body text-[13px] leading-relaxed text-zinc-500">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 gap-2.5">
        {socials.map((s) => (
          <SocialButton key={s.ariaLabel} {...s} />
        ))}
      </div>
    </div>
  </div>
);
