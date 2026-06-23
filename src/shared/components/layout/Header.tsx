'use client';

import React from 'react';
import { useLanguage } from '@/shared/i18n';
import { LanguageSelector } from '@/shared/components/ui/LanguageSelector';

// ---------------------------------------------------------------------------
// Navigation configuration — single source of truth for all nav items.
// `labelKey` maps to the matching string in the i18n `nav` dictionary.
// `core` marks the priority links that stay labelled even in the compact pill
// (the rest collapse to icon-only on scroll but remain fully functional).
// ---------------------------------------------------------------------------
type NavLabelKey = 'about' | 'skills' | 'work' | 'projects' | 'education' | 'contact';

interface NavItem {
  href: string;
  labelKey: NavLabelKey;
  icon: string;
  core: boolean;
}

const SCROLL_THRESHOLD = 80;

const NAV_ITEMS: NavItem[] = [
  { href: '#about', labelKey: 'about', icon: 'person', core: true },
  { href: '#skills', labelKey: 'skills', icon: 'code', core: true },
  { href: '#work', labelKey: 'work', icon: 'work', core: false },
  { href: '#projects', labelKey: 'projects', icon: 'folder_copy', core: true },
  { href: '#education', labelKey: 'education', icon: 'school', core: false },
  { href: '#contact', labelKey: 'contact', icon: 'mail', core: true },
];

// ---------------------------------------------------------------------------
// NavbarItem — a single pill nav link. Labels animate their `max-width`/opacity
// so collapsing to icon-only on scroll never reflows / shifts the layout.
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
    'group relative flex h-9 items-center overflow-hidden rounded-full text-zinc-400 transition-all duration-300 ease-out hover:bg-[rgba(57,255,20,0.06)] hover:text-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
    compact ? 'min-w-[2.25rem] max-w-[2.25rem] justify-center gap-0 px-0' : 'min-w-[2.25rem] max-w-[12rem] gap-2 px-3.5',
    active ? 'bg-[rgba(57,255,20,0.08)] text-[#39ff14]' : '',
  ].join(' ');

  const labelClasses = [
    'font-label whitespace-nowrap text-[0.78rem] uppercase tracking-[0.12em] transition-all duration-300 ease-out',
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
      {/* Active / hover underline — neon green into teal, matching the site accent */}
      <span
        className={[
          'pointer-events-none absolute bottom-[3px] h-[2px] origin-left rounded-full transition-all duration-300',
          'bg-gradient-to-r from-[#39ff14] to-[#25C5C5] shadow-[0_0_8px_rgba(57,255,20,0.55)]',
          compact ? 'left-2.5 right-2.5' : 'left-3.5 right-3.5',
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
      'group flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition-all duration-200 hover:bg-[rgba(57,255,20,0.06)] hover:text-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]',
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
// Header — floating, centered, pill-shaped glassmorphism navbar.
//
// Scroll behaviour (driven by `isScrolled`):
//   • at top     → full pill: logo wordmark + labelled links + language code + CTA.
//   • scrolled   → compact core: wordmark + nav labels + language code collapse
//     their `max-width`/opacity (icons stay), the pill tightens its padding and
//     blur. Everything animates width/opacity/scale so there is no layout shift;
//     the navbar never disappears, it only condenses.
// ---------------------------------------------------------------------------
export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { activeHref, isScrolled } = useNavbarScrollState();
  const { t, language } = useLanguage();

  return (
    <nav
      aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300 ease-out"
    >
      {/* Floating pill */}
      <div
        className={[
          'flex items-center rounded-full transition-all duration-300 ease-out',
          isScrolled ? 'gap-1 px-2 py-1.5' : 'gap-1.5 px-3 py-2',
        ].join(' ')}
        style={{
          border: `1px solid rgba(57, 255, 20, ${isScrolled ? 0.16 : 0.12})`,
          background: isScrolled ? 'rgba(3, 10, 5, 0.66)' : 'rgba(3, 10, 5, 0.55)',
          backdropFilter: isScrolled ? 'blur(26px) saturate(160%)' : 'blur(22px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(26px) saturate(160%)' : 'blur(22px) saturate(150%)',
          boxShadow: isScrolled
            ? '0 10px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 1px 0 rgba(57, 255, 20, 0.08) inset'
            : '0 8px 30px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 1px 0 rgba(57, 255, 20, 0.05) inset',
        }}
      >
        {/* Logo wordmark — collapses to the bracket monogram on scroll */}
        <a
          href="#"
          aria-label="Jrhuiza"
          className="motion-link group flex h-9 shrink-0 select-none items-center rounded-full px-2.5 font-label font-bold tracking-tighter text-[#39ff14] transition-all duration-300 ease-out hover:bg-[rgba(57,255,20,0.06)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]"
          style={{ textShadow: '0 0 14px rgba(57, 255, 20, 0.3)' }}
        >
          <span aria-hidden="true" className="text-base">&lt;</span>
          <span
            aria-hidden="true"
            className={[
              'overflow-hidden whitespace-nowrap text-base transition-all duration-300 ease-out',
              isScrolled ? 'max-w-0 opacity-0' : 'max-w-[7rem] opacity-100',
            ].join(' ')}
          >
            Jrhuiza
          </span>
          <span aria-hidden="true" className="text-base">/&gt;</span>
        </a>

        {/* Divider */}
        <span
          aria-hidden="true"
          className="mx-0.5 hidden h-5 w-px bg-[rgba(57,255,20,0.14)] lg:block"
        />

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
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

        {/* Divider */}
        <span
          aria-hidden="true"
          className="mx-0.5 hidden h-5 w-px bg-[rgba(57,255,20,0.14)] lg:block"
        />

        {/* Right cluster: language capsule + CTA + mobile toggle */}
        <div className="flex shrink-0 items-center gap-1.5">
          <LanguageSelector compact={isScrolled} />

          <a
            href="#contact"
            aria-label={t.nav.contactAria}
            className={[
              'group flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030a05]',
            ].join(' ')}
            style={{
              background: '#39ff14',
              color: '#030a05',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.3)',
            }}
          >
            <span className="material-symbols-outlined icon-anim icon-anim-bounce text-[20px]">mail</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="group flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-all duration-200 hover:bg-[rgba(57,255,20,0.06)] hover:text-[#39ff14] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined icon-anim-rotate text-xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer — glass panel dropping from the pill */}
      {mobileOpen && (
        <div
          className="glass-panel mt-2 space-y-1 p-3 animate-[fadeIn_150ms_ease-out] lg:hidden"
          style={{
            background: 'rgba(3, 10, 5, 0.92)',
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
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
