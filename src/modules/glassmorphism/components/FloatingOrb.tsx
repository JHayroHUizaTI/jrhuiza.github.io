import React from 'react';
import type { OrbConfig } from '../types';

// S – Single Responsibility: renderiza exclusivamente una esfera 3D flotante
// O – Open/Closed: extensible vía variant, glowIntensity y style sin modificar la implementación

const COLOR_MAP = {
  primary: {
    highlight: 'rgba(190, 255, 130, 0.65)',
    shadow: 'rgba(0, 52, 10, 0.88)',
    core: ['#2dcc35', '#18961f', '#063a0b', '#010f03'],
    glow: 'rgba(57, 255, 20,',
  },
  accent: {
    highlight: 'rgba(130, 255, 240, 0.6)',
    shadow: 'rgba(0, 32, 52, 0.88)',
    core: ['#25c5c5', '#1a8f96', '#063a3a', '#010f0f'],
    glow: 'rgba(37, 197, 197,',
  },
} as const;

export const FloatingOrb: React.FC<OrbConfig> = ({
  size,
  style,
  floatDuration = '6s',
  floatDelay = '0s',
  glowIntensity = 0.5,
  variant = 'primary',
}) => {
  const palette = COLOR_MAP[variant];
  const glowRadius = Math.round(size * 0.35);
  const shadowDepth = Math.round(size * 0.18);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        animation: `glassFloat ${floatDuration} ease-in-out ${floatDelay} infinite`,
        willChange: 'transform',
        // Efecto esfera 3D avanzado: highlight especular arriba-izquierda + sombra profunda + core gradient
        background: [
          `radial-gradient(circle at 32% 26%, ${palette.highlight} 0%, transparent 22%)`,
          `radial-gradient(circle at 68% 74%, ${palette.shadow} 0%, transparent 38%)`,
          `radial-gradient(circle at 50% 50%, ${palette.core[0]} 0%, ${palette.core[1]} 28%, ${palette.core[2]} 58%, ${palette.core[3]} 100%)`,
        ].join(', '),
        boxShadow: [
          `0 0 ${glowRadius}px ${palette.glow} ${0.25 * glowIntensity})`,
          `0 0 ${glowRadius * 2}px ${palette.glow} ${0.12 * glowIntensity})`,
          `0 ${shadowDepth}px ${shadowDepth * 1.8}px rgba(0, 0, 0, 0.6)`,
          `inset 0 -${Math.round(size * 0.06)}px ${Math.round(size * 0.1)}px rgba(0, 0, 0, 0.4)`,
        ].join(', '),
        ...style,
      }}
    />
  );
};
