'use client';

import React from 'react';
import { PortfolioData } from '../types';

const NEON_GREEN = '#39FF14';
const NEON_BLUE = '#25C5C5';

const techTags = ['NEXT.JS', 'LINUX', 'TERRAFORM', 'ANSIBLE', 'AWS', 'AZURE'];

const splitName = (name: string) => name.trim().split(/\s+/).filter(Boolean);

const splitSummary = (text: string) => {
  const chunks = text
    .split(/\.\s*(?=[A-Z])/)
    .map((chunk, index, arr) => (index < arr.length - 1 ? `${chunk}.` : chunk))
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);

  return {
    lead: chunks[0] ?? text.trim(),
    detail: chunks.slice(1).join(' ').trim(),
  };
};

const AvailabilityBadge = () => (
  <div
    className="inline-flex items-center gap-3 rounded-full px-4 py-2 font-label text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-300"
    style={{
      border: `1px solid ${NEON_GREEN}33`,
      background: 'rgba(5, 7, 10, 0.7)',
      backdropFilter: 'blur(12px)',
      boxShadow: `0 0 28px ${NEON_GREEN}1A`,
    }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: NEON_GREEN }}
      />
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full"
        style={{ background: NEON_GREEN, boxShadow: `0 0 8px ${NEON_GREEN}` }}
      />
    </span>
    Available for projects
  </div>
);

const ActionButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-label text-sm font-semibold transition-all duration-150 ease-out hover:-translate-y-0.5"
    style={{
      border: `1px solid ${NEON_GREEN}66`,
      background: NEON_GREEN,
      color: '#03110A',
      boxShadow: `0 0 28px ${NEON_GREEN}40`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#33FFB2';
      e.currentTarget.style.boxShadow = `0 0 36px ${NEON_GREEN}66`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = NEON_GREEN;
      e.currentTarget.style.boxShadow = `0 0 28px ${NEON_GREEN}40`;
    }}
  >
    {children}
    <span className="transition-transform duration-150 group-hover:translate-x-0.5">
      →
    </span>
  </a>
);

const OutlineButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noreferrer' : undefined}
    className="inline-flex items-center justify-center rounded-md px-6 py-3.5 font-label text-sm font-medium text-zinc-100 transition-all duration-150 ease-out hover:-translate-y-0.5"
    style={{
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(11, 15, 20, 0.6)',
      backdropFilter: 'blur(12px)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${NEON_GREEN}55`;
      e.currentTarget.style.boxShadow = `0 0 24px ${NEON_GREEN}26`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </a>
);

export const HeroSection = ({
  heroData,
}: {
  heroData: PortfolioData['hero'];
}) => {
  const developerName = heroData.promptUser || 'Jhayro Huiza';
  const summary =
    heroData.summary ||
    'Focused on the automation and operation of hybrid infrastructures.';
  const nameParts = splitName(developerName);
  const { lead, detail } = splitSummary(summary);

  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-zinc-100 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-28"
      style={{ background: '#05070A' }}
    >
      {/* Backdrop: soft radial gradients + subtle noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1400px 700px at 15% 10%, rgba(57, 255, 20, 0.08), transparent 55%), radial-gradient(1100px 600px at 90% 95%, rgba(37, 197, 197, 0.06), transparent 55%), linear-gradient(180deg, #05070A 0%, #0A0E13 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON_GREEN}20 30%, ${NEON_BLUE}15 70%, transparent)`,
        }}
      />

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade {
          opacity: 0;
          animation: hero-fade-up 640ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        <header className="hero-fade flex flex-col gap-10 sm:gap-12">
          <div style={{ animationDelay: '0ms' }}>
            <AvailabilityBadge />
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            <h1 className="font-headline font-semibold tracking-tight">
              <span
                className="block text-4xl font-light italic leading-[1.05] text-zinc-200 sm:text-5xl lg:text-6xl"
                style={{ letterSpacing: '-0.01em' }}
              >
                Hello, I&apos;m
              </span>
              <span
                className="text-hero-gradient mt-3 block max-w-full py-2 text-6xl font-semibold leading-none tracking-tight [overflow-wrap:normal] [text-wrap:balance] sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[128px] 2xl:text-[144px]"
                style={{
                  filter: `drop-shadow(0 4px 28px ${NEON_GREEN}40)`,
                }}
              >
                {nameParts.map((part, index) => (
                  <React.Fragment key={`${part}-${index}`}>
                    <span className="inline-block">{part}</span>
                    {index < nameParts.length - 1 ? ' ' : null}
                  </React.Fragment>
                ))}
              </span>
            </h1>

            <p className="max-w-3xl font-label text-xs font-medium uppercase tracking-[0.36em] text-[#25C5C5]">
              SysAdmin / Developer — Automation &amp; Cloud Operations
            </p>
          </div>

          <div className="grid max-w-4xl gap-4 lg:grid-cols-[1.1fr_auto] lg:items-end lg:gap-12">
            <div className="space-y-3">
              <p className="font-body text-lg leading-[1.55] text-zinc-200 sm:text-xl sm:leading-[1.6] lg:text-[22px]">
                {lead}
              </p>
              {detail ? (
                <p className="font-body text-sm leading-7 text-zinc-500 sm:text-base">
                  {detail}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ActionButton href="#contact">Run Profile</ActionButton>
            <OutlineButton href="#projects">View Projects</OutlineButton>
          </div>

          <div className="flex flex-wrap gap-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1.5 font-label text-[10px] font-medium tracking-[0.28em] text-zinc-400"
                style={{
                  border: `1px solid ${NEON_BLUE}1F`,
                  background: 'rgba(11, 15, 20, 0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </div>
    </section>
  );
};
