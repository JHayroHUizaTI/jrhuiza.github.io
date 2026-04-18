import React from 'react';
import type { TorusConfig } from '../types';

// S – Single Responsibility: renderiza exclusivamente un toro/ring 3D flotante
// O – Open/Closed: scaleY, rotateDeg y variant permiten distintas perspectivas y colores

const TORUS_COLORS = {
  primary: {
    top: 'rgba(75, 228, 55, 0.94)',
    right: 'rgba(28, 158, 28, 0.82)',
    bottom: 'rgba(3, 48, 8, 0.96)',
    left: 'rgba(10, 88, 14, 0.86)',
    glow: 'rgba(57, 255, 20,',
    innerGlow: 'rgba(90, 230, 60,',
  },
  accent: {
    top: 'rgba(55, 228, 218, 0.94)',
    right: 'rgba(28, 140, 158, 0.82)',
    bottom: 'rgba(3, 38, 48, 0.96)',
    left: 'rgba(10, 78, 88, 0.86)',
    glow: 'rgba(37, 197, 197,',
    innerGlow: 'rgba(60, 210, 230,',
  },
} as const;

export const FloatingTorus: React.FC<TorusConfig> = ({
  size,
  borderWidth,
  scaleY = 1,
  rotateDeg = 0,
  style,
  floatDuration = '8s',
  floatDelay = '0s',
  variant = 'primary',
}) => {
  const palette = TORUS_COLORS[variant];

  return (
    // Wrapper para la animación de flotación (separa la animación del transform de forma)
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        animation: `glassFloat ${floatDuration} ease-in-out ${floatDelay} infinite`,
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Div interior para la forma del toro: border circular + colores direccionales para profundidad 3D */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${borderWidth}px solid`,
          // Colores direccionales simulan iluminación 3D: brillante arriba, oscuro abajo
          borderTopColor: palette.top,
          borderRightColor: palette.right,
          borderBottomColor: palette.bottom,
          borderLeftColor: palette.left,
          background: 'transparent',
          // scaleY aplana el toro para simular perspectiva/ángulo de visión
          transform: `rotate(${rotateDeg}deg) scaleY(${scaleY})`,
          boxShadow: [
            `0 0 ${Math.round(size * 0.16)}px ${palette.glow} 0.18)`,
            `0 0 ${Math.round(size * 0.32)}px ${palette.glow} 0.08)`,
            `0 ${Math.round(borderWidth * 0.5)}px ${Math.round(borderWidth)}px rgba(0, 0, 0, 0.55) inset`,
            `0 -${Math.round(borderWidth * 0.3)}px ${Math.round(borderWidth * 0.6)}px ${palette.innerGlow} 0.16) inset`,
          ].join(', '),
          filter: `drop-shadow(0 ${Math.round(size * 0.07)}px ${Math.round(size * 0.12)}px rgba(0,0,0,0.55))`,
        }}
      />
    </div>
  );
};
