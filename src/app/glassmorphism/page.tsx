import type { Metadata } from 'next';
import { GlassmorphismHero } from '@/modules/glassmorphism/components/GlassmorphismHero';
import type { HeroConfig } from '@/modules/glassmorphism/types';

export const metadata: Metadata = {
  title: 'Glassmorphism Hero // SYS_ARCH',
  description:
    'Hero section con glassmorphism futurista, esferas 3D, toros flotantes y partículas ambientales.',
  openGraph: {
    title: 'Glassmorphism Hero // SYS_ARCH',
    description: 'Futuristic glassmorphism hero section with 3D orbs and floating tori.',
    type: 'website',
  },
};

// D – Dependency Inversion: los datos se inyectan desde la página, no están hardcodeados en los componentes
const heroConfig: HeroConfig = {
  label: 'sys_arch // portfolio.v2',
  headline: 'Preciso.',
  subheadline: 'Escalable.',
  description: 'Infraestructura híbrida & automatización.',
  siteUrl: 'jhayro.dev',
  nav: [
    { label: 'HOME', href: '/', active: true },
    { label: 'ABOUT', href: '/#about' },
    { label: 'SKILLS', href: '/#skills' },
    { label: 'PROJECTS', href: '/#projects' },
    { label: 'CONTACT', href: '/#contact' },
  ],
  badges: [
    { label: 'NEXT.JS' },
    { label: 'TYPESCRIPT' },
    { label: 'DOCKER' },
  ],
  socials: [
    { iconSymbol: 'code', href: 'https://github.com', ariaLabel: 'GitHub' },
    { iconSymbol: 'location_on', href: '#', ariaLabel: 'Location' },
    { iconSymbol: 'mail', href: '/#contact', ariaLabel: 'Email' },
    { iconSymbol: 'chat_bubble', href: 'https://linkedin.com', ariaLabel: 'LinkedIn' },
  ],
  particles: { count: 36, spread: 100 },
};

export default function GlassmorphismPage() {
  return <GlassmorphismHero config={heroConfig} />;
}
