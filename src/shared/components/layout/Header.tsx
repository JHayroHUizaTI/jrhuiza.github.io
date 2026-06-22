'use client';

import React from 'react';
import { useLanguage } from '@/shared/i18n';
import { LanguageSelector } from '@/shared/components/ui/LanguageSelector';

// ---------------------------------------------------------------------------
// Navigation configuration — single source of truth for all nav items.
// `labelKey` maps to the matching string in the i18n `nav` dictionary.
// ---------------------------------------------------------------------------
type NavLabelKey = 'about' | 'skills' | 'work' | 'projects' | 'education' | 'contact';

interface NavItem {
  href: string;
  labelKey: NavLabelKey;
  icon: string;
}

const SCROLL_THRESHOLD = 80;

const NAV_ITEMS: NavItem[] = [
  { href: '#about', labelKey: 'about', icon: 'person' },
  { href: '#skills', labelKey: 'skills', icon: 'code' },
  { href: '#work', labelKey: 'work', icon: 'work' },
  { href: '#projects', labelKey: 'projects', icon: 'folder_copy' },
  { href: '#education', labelKey: 'education', icon: 'school' },
  { href: '#contact', labelKey: 'contact', icon: 'mail' },
];

// ---------------------------------------------------------------------------
// NavbarItem — renders a single glassmorphism-styled navigation link.
// ---------------------------------------------------------------------------
const NavbarItem = ({
  item,
  label,
  compact,
  active,
}: {
  item: NavItem;
  label: string;
  compact: boolean;
  active: boolean;
}) => {
  const linkClasses = [
    'group relative flex h-10 min-w-[2.5rem] items-center overflow-hidden rounded-md text-zinc-400 transition-all duration-300 ease-out hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14] hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
    compact ? 'max-w-[2.5rem] justify-center gap-0 px-0' : 'max-w-[13rem] gap-2 px-3',
    active ? 'bg-[rgba(57,255,20,0.08)] text-[#39ff14]' : '',
  ].join(' ');

  const labelClasses = [
    'font-label whitespace-nowrap text-sm uppercase tracking-[0.14em] transition-all duration-300 ease-out',
    compact ? 'max-w-0 -translate-x-1 opacity-0' : 'max-w-[10rem] translate-x-0 opacity-100',
  ].join(' ');

  return (
    <a
      href={item.href}
      aria-current={active ? 'location' : undefined}
      aria-label={label}
      title={label}
      className={linkClasses}
    >
      <span className="material-symbols-outlined icon-anim text-[20px] transition-colors duration-200 group-hover:text-[#39ff14]">
        {item.icon}
      </span>
      <span className={labelClasses} aria-hidden={compact ? true : undefined}>
        {label}
      </span>
      {/* Hover underline glow – neon green */}
      <span
        className={[
          'pointer-events-none absolute bottom-0 h-[2px] origin-left rounded-full bg-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-all duration-300',
          compact ? 'left-2 right-2' : 'left-3 right-3',
          active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-80 group-hover:scale-x-100',
        ].join(' ')}
      />
    </a>
  );
};

const getActiveHref = (): string => {
  const marker = window.scrollY + 120;

  return NAV_ITEMS.reduce((activeHref, item) => {
    const section = document.getElementById(item.href.slice(1));

    if (!section || section.offsetTop > marker) {
      return activeHref;
    }

    return item.href;
  }, '');
};

const getScrolledState = (): boolean => window.scrollY > SCROLL_THRESHOLD;

const useNavbarScrollState = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState('');

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      setIsScrolled(getScrolledState());
      setActiveHref(getActiveHref());
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return { activeHref, isScrolled };
};

// ---------------------------------------------------------------------------
// MobileNavItem — keeps the expanded drawer readable while sharing active state.
// ---------------------------------------------------------------------------
const MobileNavItem = ({
  item,
  label,
  active,
  onClick,
}: {
  item: NavItem;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <a
    href={item.href}
    onClick={onClick}
    aria-current={active ? 'location' : undefined}
    className={[
      'group flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-400 transition-all duration-200 hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
      active ? 'bg-[rgba(57,255,20,0.08)] text-[#39ff14]' : '',
    ].join(' ')}
  >
    <span className="material-symbols-outlined icon-anim text-xl transition-colors duration-200 group-hover:text-[#39ff14]">
      {item.icon}
    </span>
    <span className="font-label text-xs uppercase tracking-[0.18em]">
      {label}
    </span>
  </a>
);

// ---------------------------------------------------------------------------
// Header — fixed glassmorphism header with neon green accents.
// ---------------------------------------------------------------------------
export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { activeHref, isScrolled } = useNavbarScrollState();
  const { t } = useLanguage();

  return (
    <nav
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
        background: isScrolled ? 'rgba(3, 10, 5, 0.84)' : 'rgba(3, 10, 5, 0.72)',
        backdropFilter: isScrolled ? 'blur(28px) saturate(160%)' : 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: isScrolled ? 'blur(28px) saturate(160%)' : 'blur(24px) saturate(150%)',
        boxShadow: isScrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.46), 0 1px 0 rgba(57, 255, 20, 0.08) inset'
          : '0 4px 30px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(57, 255, 20, 0.04) inset',
      }}
    >
      <div
        className={[
          'mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6',
          isScrolled ? 'h-14' : 'h-16',
        ].join(' ')}
      >
        {/* Logo */}
        <a
          href="#"
          className={[
            'motion-link select-none font-label font-bold tracking-tighter transition-all duration-300',
            isScrolled ? 'text-lg' : 'text-xl',
          ].join(' ')}
          style={{
            color: '#39ff14',
            textShadow: '0 0 14px rgba(57, 255, 20, 0.3)',
          }}
        >
          &lt;Jrhuiza/&gt;
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={item.href}
              item={item}
              label={t.nav[item.labelKey]}
              compact={isScrolled}
              active={activeHref === item.href}
            />
          ))}
        </div>

        {/* Right side: language selector + CTA + mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector compact={isScrolled} />
          <a
            href="#contact"
            className={[
              'group flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
              isScrolled ? 'h-9 w-9' : 'h-10 w-10',
            ].join(' ')}
            aria-label={t.nav.contactAria}
            style={{
              background: '#39ff14',
              color: '#030a05',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.3)',
            }}
          >
            <span className="material-symbols-outlined icon-anim icon-anim-bounce text-xl">mail</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="group lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:bg-[rgba(57,255,20,0.05)] hover:text-[#39ff14] transition-all"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined icon-anim-rotate text-xl">
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
            <MobileNavItem
              key={item.href}
              item={item}
              label={t.nav[item.labelKey]}
              active={activeHref === item.href}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
};
