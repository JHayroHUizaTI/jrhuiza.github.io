import React from 'react';
import type { HeroConfig } from '../../types';
import { PanelTopBar } from './PanelTopBar';
import { PanelHeroContent } from './PanelHeroContent';

// S – Single Responsibility: ensambla la estructura visual del panel de vidrio
// D – Dependency Inversion: depende de HeroConfig (abstracción), no de datos concretos

interface GlassPanelProps {
  config: HeroConfig;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ config, className = '' }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl ${className}`}
    style={{
      // Glassmorphism premium: blur + saturación + tinte oscuro-verde
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      background: 'rgba(4, 16, 8, 0.42)',
      border: '1px solid rgba(57, 255, 20, 0.1)',
      boxShadow: [
        // Sombra exterior profunda
        '0 48px 100px rgba(0, 0, 0, 0.72)',
        '0 16px 40px rgba(0, 0, 0, 0.35)',
        // Inner glow sutil
        '0 0 0 1px rgba(255, 255, 255, 0.04) inset',
        '0 1px 0 rgba(57, 255, 20, 0.08) inset',
        '0 -1px 0 rgba(0, 0, 0, 0.3) inset',
      ].join(', '),
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
    }}
  >
    {/* Reflejo especular: línea brillante en el borde superior */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.18) 35%, rgba(255, 255, 255, 0.08) 50%, rgba(57, 255, 20, 0.18) 65%, transparent 100%)',
      }}
    />

    {/* Inner ambient gradient */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 30% 0%, rgba(57, 255, 20, 0.04) 0%, transparent 50%)',
      }}
    />

    <PanelTopBar siteUrl={config.siteUrl} navItems={config.nav} />
    <PanelHeroContent
      label={config.label}
      headline={config.headline}
      subheadline={config.subheadline}
      description={config.description}
      badges={config.badges}
      socials={config.socials}
    />
  </div>
);
