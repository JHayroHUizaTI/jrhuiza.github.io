'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Navigation configuration — single source of truth for all nav items.
// ---------------------------------------------------------------------------
interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '#about', label: 'about', icon: 'person' },
  { href: '#skills', label: 'skills', icon: 'code' },
  { href: '#work', label: 'work_experience', icon: 'work' },
  { href: '#projects', label: 'projects', icon: 'folder_copy' },
  { href: '#education', label: 'education', icon: 'school' },
  { href: '#contact', label: 'contact', icon: 'mail' },
];

// ---------------------------------------------------------------------------
// NavbarItem — renders a single glassmorphism-styled navigation link.
// ---------------------------------------------------------------------------
const NavbarItem = ({ item }: { item: NavItem }) => (
  <a
    href={item.href}
    className="group relative flex items-center gap-2 rounded-md px-3 py-2 text-zinc-400 transition-all duration-200 hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14] hover:scale-[1.04]"
  >
    <span className="material-symbols-outlined text-[20px] transition-colors duration-200 group-hover:text-[#39ff14]">
      {item.icon}
    </span>
    <span className="font-label text-sm uppercase tracking-[0.14em]">
      {item.label}
    </span>
    {/* Hover underline glow – neon green */}
    <span className="pointer-events-none absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-transform duration-200 group-hover:scale-x-100" />
  </a>
);

// ---------------------------------------------------------------------------
// Header — fixed glassmorphism header with neon green accents.
// ---------------------------------------------------------------------------
export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
        background: 'rgba(3, 10, 5, 0.72)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(57, 255, 20, 0.04) inset',
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-16">
        {/* Logo */}
        <a
          href="#"
          className="font-label font-bold tracking-tighter text-xl select-none"
          style={{
            color: '#39ff14',
            textShadow: '0 0 14px rgba(57, 255, 20, 0.3)',
          }}
        >
          &lt;Jrhuiza/&gt;
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavbarItem key={item.href} item={item} />
          ))}
        </div>

        {/* Right side: CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Contact me"
            style={{
              background: '#39ff14',
              color: '#030a05',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.3)',
            }}
          >
            <span className="material-symbols-outlined text-xl">mail</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14] transition-all"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer – glassmorphism */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 pb-6 pt-4 space-y-1 animate-[fadeIn_150ms_ease-out]"
          style={{
            borderTop: '1px solid rgba(57, 255, 20, 0.06)',
            background: 'rgba(3, 10, 5, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-400 transition-all duration-200 hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14]"
            >
              <span className="material-symbols-outlined text-xl transition-colors duration-200 group-hover:text-[#39ff14]">
                {item.icon}
              </span>
              <span className="font-label text-xs uppercase tracking-[0.18em]">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
