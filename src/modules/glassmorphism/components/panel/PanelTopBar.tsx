'use client';

import React from 'react';
import type { NavItem } from '../../types';

// S – Single Responsibility: barra superior del panel (chrome + navegación)

interface PanelTopBarProps {
  siteUrl: string;
  navItems: NavItem[];
}

/** Dots del macOS-style window chrome */
const TrafficLights: React.FC = () => (
  <div className="flex shrink-0 items-center gap-2">
    {[
      { bg: '#ff5f57', shadow: 'rgba(255, 95, 87, 0.4)' },
      { bg: '#febc2e', shadow: 'rgba(254, 188, 46, 0.4)' },
      { bg: '#28c840', shadow: 'rgba(40, 200, 64, 0.4)' },
    ].map((dot) => (
      <span
        key={dot.bg}
        className="h-[10px] w-[10px] rounded-full"
        style={{
          background: dot.bg,
          boxShadow: `0 0 6px ${dot.shadow}`,
        }}
      />
    ))}
  </div>
);

export const PanelTopBar: React.FC<PanelTopBarProps> = ({ siteUrl, navItems }) => (
  <div
    className="flex items-center gap-4 border-b px-5 py-3"
    style={{
      borderColor: 'rgba(255, 255, 255, 0.06)',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.18) 100%)',
    }}
  >
    <TrafficLights />

    {/* URL bar */}
    <div className="mx-4 hidden flex-1 sm:block">
      <div
        className="mx-auto max-w-[240px] rounded-full px-4 py-1 text-center font-label text-[11px] tracking-wider"
        style={{
          border: '1px solid rgba(57, 255, 20, 0.1)',
          background: 'rgba(57, 255, 20, 0.03)',
          color: 'rgba(57, 255, 20, 0.55)',
          boxShadow: '0 0 12px rgba(57, 255, 20, 0.04) inset',
        }}
      >
        {siteUrl}
      </div>
    </div>

    {/* Navegación */}
    <nav className="ml-auto flex items-center gap-3 lg:gap-5">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="hidden font-label text-[0.65rem] tracking-[0.2em] md:block"
          style={{
            color: item.active ? '#39ff14' : 'rgba(255, 255, 255, 0.45)',
            textShadow: item.active ? '0 0 12px rgba(57, 255, 20, 0.4)' : 'none',
            transition: 'color 0.25s ease, text-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            if (!item.active) {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!item.active) {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
              e.currentTarget.style.textShadow = 'none';
            }
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  </div>
);
