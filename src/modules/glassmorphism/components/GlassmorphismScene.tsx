import React from 'react';
import { FloatingOrb } from './FloatingOrb';
import { FloatingTorus } from './FloatingTorus';
import { FloatingParticles } from './FloatingParticles';
import type { OrbConfig, TorusConfig } from '../types';

/**
 * S – Single Responsibility: provee el fondo visual glassmorphism para todo el sitio.
 * Renderiza capas fijas (glows, grid, partículas, orbs, toros) y envuelve children.
 * Separado del GlassmorphismHero que es solo para la sección hero.
 */

interface GlassmorphismSceneProps {
  children: React.ReactNode;
}

// Formas decorativas fijas en el viewport (position: fixed)
const SCENE_ORBS: OrbConfig[] = [
  {
    size: 200,
    floatDuration: '14s',
    floatDelay: '0s',
    glowIntensity: 0.3,
    variant: 'primary',
    style: { top: '8%', right: '-60px', zIndex: 0 },
  },
  {
    size: 140,
    floatDuration: '18s',
    floatDelay: '4s',
    glowIntensity: 0.25,
    variant: 'accent',
    style: { top: '55%', left: '-50px', zIndex: 0 },
  },
  {
    size: 80,
    floatDuration: '10s',
    floatDelay: '2s',
    glowIntensity: 0.2,
    variant: 'primary',
    style: { bottom: '15%', right: '5%', zIndex: 0 },
  },
];

const SCENE_TORI: TorusConfig[] = [
  {
    size: 180,
    borderWidth: 34,
    scaleY: 0.38,
    rotateDeg: -18,
    floatDuration: '16s',
    floatDelay: '1s',
    variant: 'primary',
    style: { top: '30%', left: '-80px', zIndex: 0 },
  },
  {
    size: 220,
    borderWidth: 40,
    scaleY: 0.52,
    rotateDeg: 14,
    floatDuration: '20s',
    floatDelay: '3s',
    variant: 'primary',
    style: { bottom: '10%', right: '-90px', zIndex: 0 },
  },
];

export const GlassmorphismScene: React.FC<GlassmorphismSceneProps> = ({ children }) => (
  <div className="relative min-h-screen overflow-x-hidden">
    {/* ── Fixed background layers ────── */}
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 62% 20%, rgba(10, 42, 18, 0.45) 0%, transparent 55%)',
            'radial-gradient(ellipse at 25% 75%, rgba(6, 28, 12, 0.35) 0%, transparent 48%)',
            'radial-gradient(ellipse at 80% 85%, rgba(5, 24, 34, 0.25) 0%, transparent 40%)',
            '#030a05',
          ].join(', '),
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(circle at 72% 16%, rgba(57, 255, 20, 0.03) 0%, transparent 42%)',
            'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.025) 0%, transparent 45%)',
            'radial-gradient(circle at 85% 50%, rgba(37, 197, 197, 0.018) 0%, transparent 38%)',
          ].join(', '),
        }}
      />

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(57, 255, 20, 0.5) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 75%)',
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={24} spread={100} />

      {/* Floating orbs */}
      {SCENE_ORBS.map((orb, i) => (
        <FloatingOrb key={`scene-orb-${i}`} {...orb} />
      ))}

      {/* Floating tori */}
      {SCENE_TORI.map((torus, i) => (
        <FloatingTorus key={`scene-torus-${i}`} {...torus} />
      ))}
    </div>

    {/* ── Content ────── */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);
