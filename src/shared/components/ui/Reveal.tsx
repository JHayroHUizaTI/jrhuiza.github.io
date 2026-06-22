'use client';

import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'fade' | 'up' | 'left' | 'right' | 'zoom';

interface RevealProps {
  children: React.ReactNode;
  /** Entrance direction/style. Defaults to a subtle slide-up. */
  variant?: RevealVariant;
  /** Stagger delay in ms before the animation plays. */
  delay?: number;
  /** Extra classes for the wrapper element. */
  className?: string;
}

/**
 * Wraps content and animates it into view the first time it scrolls onto
 * screen, using the IntersectionObserver API. The reveal is one-shot (the
 * observer disconnects after firing) so there are no looping animations.
 *
 * The hidden/visible states and reduced-motion handling live in globals.css
 * (`.reveal`, `.reveal-*`, `.is-visible`). If JS or IntersectionObserver is
 * unavailable, content is shown immediately so nothing is ever hidden.
 */
export const Reveal = ({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}: RevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    // Fallback: reveal on the next frame when the observer isn't supported
    // (deferred so we don't call setState synchronously inside the effect).
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // one-shot
          }
        });
      },
      // Trigger once the element's top edge is ~80px into the viewport.
      { threshold: 0, rootMargin: '0px 0px -80px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'reveal',
    `reveal-${variant}`,
    isVisible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={elementRef}
      className={classes}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
};
