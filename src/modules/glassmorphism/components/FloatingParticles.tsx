'use client';

import React, { useMemo } from 'react';

// S – Single Responsibility: genera y renderiza las partículas flotantes del fondo
// O – Open/Closed: configurable via count & spread sin modificar la implementación

interface FloatingParticlesProps {
  /** Número de partículas */
  count?: number;
  /** Radio de dispersión en viewport-relative (%) */
  spread?: number;
}

interface ParticleData {
  id: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
}

/**
 * Deterministic pseudo-random basado en seed.
 * Evita re-renders con valores cambiantes y mantiene hidratación SSR–client estable.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49271;
  return x - Math.floor(x);
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 28,
  spread = 100,
}) => {
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i * 3 + 1);
      const r2 = seededRandom(i * 3 + 2);
      const r3 = seededRandom(i * 3 + 3);
      return {
        id: i,
        x: `${r1 * spread}%`,
        y: `${r2 * spread}%`,
        size: 1.5 + r3 * 3,
        opacity: 0.15 + r3 * 0.35,
        delay: `${r1 * 8}s`,
        duration: `${4 + r2 * 6}s`,
      };
    });
  }, [count, spread]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(57, 255, 20, ${p.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(57, 255, 20, ${p.opacity * 0.4})`,
            animation: `glassFloat ${p.duration} ease-in-out ${p.delay} infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};
