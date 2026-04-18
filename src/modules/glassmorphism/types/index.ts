import type { CSSProperties } from 'react';

// I – Interface Segregation: interfaces pequeñas y focalizadas por responsabilidad

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SocialLink {
  iconSymbol: string;
  href: string;
  ariaLabel: string;
}

export interface BadgeItem {
  label: string;
}

export interface OrbConfig {
  size: number;
  style?: CSSProperties;
  floatDuration?: string;
  floatDelay?: string;
  /** Intensidad del glow (0–1). Por defecto 0.5 */
  glowIntensity?: number;
  /** Variante de color: 'primary' verde, 'accent' cian */
  variant?: 'primary' | 'accent';
}

export interface TorusConfig {
  size: number;
  borderWidth: number;
  scaleY?: number;
  rotateDeg?: number;
  style?: CSSProperties;
  floatDuration?: string;
  floatDelay?: string;
  /** Variante de color */
  variant?: 'primary' | 'accent';
}

/** Configuración de partículas flotantes del fondo */
export interface ParticleConfig {
  count: number;
  /** Radio máximo del área de distribución en % */
  spread: number;
}

// D – Dependency Inversion: el hero depende de esta abstracción, no de datos concretos
export interface HeroConfig {
  label: string;
  headline: string;
  subheadline: string;
  description: string;
  siteUrl: string;
  nav: NavItem[];
  badges: BadgeItem[];
  socials: SocialLink[];
  /** Configuración opcional de partículas de fondo */
  particles?: ParticleConfig;
}
