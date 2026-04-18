import React from 'react';
import type { HeroConfig, OrbConfig, TorusConfig } from '../types';
import { FloatingOrb } from './FloatingOrb';
import { FloatingTorus } from './FloatingTorus';
import { FloatingParticles } from './FloatingParticles';
import { GlassPanel } from './panel/GlassPanel';

// S – Single Responsibility: orquesta la escena completa (fondo + formas + partículas + panel)
// D – Dependency Inversion: recibe HeroConfig como abstracción

interface GlassmorphismHeroProps {
  config: HeroConfig;
}

// ─── Escena 3D: configuración de formas flotantes ────────────────────────────
// Los z-index controlan la profundidad: < 10 = detrás del panel, 10 = panel, > 10 = delante

const BACK_ORBS: OrbConfig[] = [
  {
    size: 245,
    floatDuration: '7.4s',
    floatDelay: '0s',
    glowIntensity: 0.6,
    variant: 'primary',
    // Esfera grande: arriba-derecha, parcialmente detrás del panel
    style: { top: '-90px', right: '-70px', zIndex: 5 },
  },
  {
    size: 38,
    floatDuration: '4.8s',
    floatDelay: '3s',
    glowIntensity: 0.35,
    variant: 'accent',
    // Mini esfera cian decorativa detrás a la izquierda
    style: { top: '30%', left: '8%', zIndex: 3 },
  },
];

const FRONT_ORBS: OrbConfig[] = [
  {
    size: 118,
    floatDuration: '5.6s',
    floatDelay: '1.2s',
    glowIntensity: 0.55,
    variant: 'primary',
    // Esfera mediana: derecha media, en frente del panel
    style: { top: '52%', right: '-45px', zIndex: 20 },
  },
  {
    size: 52,
    floatDuration: '4s',
    floatDelay: '2.6s',
    glowIntensity: 0.4,
    variant: 'primary',
    // Esfera pequeña: esquina superior-derecha, en frente
    style: { top: '-22px', right: '155px', zIndex: 20 },
  },
  {
    size: 28,
    floatDuration: '5s',
    floatDelay: '4s',
    glowIntensity: 0.3,
    variant: 'accent',
    // Mini esfera cian frontal
    style: { bottom: '15%', left: '-14px', zIndex: 20 },
  },
];

const TORI: TorusConfig[] = [
  {
    size: 225,
    borderWidth: 44,
    scaleY: 0.36,
    rotateDeg: -24,
    floatDuration: '9.8s',
    floatDelay: '0.4s',
    variant: 'primary',
    // Toro izquierdo: detrás del panel, parcialmente visible
    style: { left: '-105px', top: '20%', zIndex: 1 },
  },
  {
    size: 280,
    borderWidth: 50,
    scaleY: 0.56,
    rotateDeg: 12,
    floatDuration: '12s',
    floatDelay: '2s',
    variant: 'primary',
    // Toro inferior: en frente del panel, centro-derecha
    style: { bottom: '-95px', left: '28%', zIndex: 20 },
  },
  {
    size: 120,
    borderWidth: 22,
    scaleY: 0.42,
    rotateDeg: -10,
    floatDuration: '8s',
    floatDelay: '3.5s',
    variant: 'accent',
    // Mini toro cian decorativo trasero
    style: { top: '-40px', left: '15%', zIndex: 2 },
  },
];

export const GlassmorphismHero: React.FC<GlassmorphismHeroProps> = ({ config }) => (
  <section
    id="glassmorphism-hero"
    className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6"
    style={{
      // Fondo: negro profundo con viñetas verdes + cian para profundidad
      background: [
        'radial-gradient(ellipse at 62% 32%, rgba(10, 42, 18, 0.55) 0%, transparent 55%)',
        'radial-gradient(ellipse at 28% 72%, rgba(6, 28, 12, 0.4) 0%, transparent 48%)',
        'radial-gradient(ellipse at 80% 85%, rgba(5, 24, 34, 0.3) 0%, transparent 40%)',
        '#030a05',
      ].join(', '),
    }}
  >
    {/* ── Capa 1: Glows ambientales ────── */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: [
          'radial-gradient(circle at 72% 16%, rgba(57, 255, 20, 0.042) 0%, transparent 42%)',
          'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.038) 0%, transparent 45%)',
          'radial-gradient(circle at 85% 75%, rgba(37, 197, 197, 0.025) 0%, transparent 38%)',
        ].join(', '),
      }}
    />

    {/* ── Capa 2: Grid técnico con máscara radial ────── */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: [
          'linear-gradient(rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse at center, black 15%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, transparent 72%)',
      }}
    />

    {/* ── Capa 3: Partículas flotantes ────── */}
    <FloatingParticles
      count={config.particles?.count ?? 32}
      spread={config.particles?.spread ?? 100}
    />

    {/* ── Capa 4: Orbs traseros (z < 10) ────── */}
    {BACK_ORBS.map((orb, i) => (
      <FloatingOrb key={`back-orb-${i}`} {...orb} />
    ))}

    {/* ── Capa 5: Toros (z configurado individualmente) ────── */}
    {TORI.map((torus, i) => (
      <FloatingTorus key={`torus-${i}`} {...torus} />
    ))}

    {/* ── Capa 6: Panel de vidrio (z-10) ────── */}
    <div className="relative z-10 w-full max-w-4xl">
      <GlassPanel
        config={config}
        className="min-h-[400px] sm:min-h-[460px] lg:min-h-[520px]"
      />
    </div>

    {/* ── Capa 7: Orbs frontales (z-20) ────── */}
    {FRONT_ORBS.map((orb, i) => (
      <FloatingOrb key={`front-orb-${i}`} {...orb} />
    ))}

    {/* ── Viñeta de bordes oscuros ────── */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 10, 5, 0.65) 100%)',
      }}
    />
  </section>
);
