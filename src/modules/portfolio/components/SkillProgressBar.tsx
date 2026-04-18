'use client';

import { useEffect, useRef, useState } from 'react';
import { SkillAccent } from '../types';

const GRADIENT_BY_ACCENT: Record<SkillAccent, string> = {
  orange: 'from-orange-500 via-amber-400 to-yellow-300',
  blue: 'from-blue-500 via-cyan-400 to-sky-300',
  gray: 'from-zinc-500 via-zinc-300 to-zinc-100',
  red: 'from-red-500 via-rose-400 to-pink-300',
  purple: 'from-purple-600 via-fuchsia-500 to-pink-400',
  green: 'from-emerald-500 via-green-400 to-lime-300',
};

interface SkillProgressBarProps {
  level: number;
  accent?: SkillAccent;
}

export const SkillProgressBar = ({ level, accent = 'green' }: SkillProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, Math.round(level)));
  const [displayWidth, setDisplayWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setDisplayWidth(clamped);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDisplayWidth(clamped);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [clamped]);

  return (
    <div className="mt-5 flex items-center gap-3">
      <div
        ref={trackRef}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/[0.04]"
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${GRADIENT_BY_ACCENT[accent]} shadow-[0_0_12px_-2px_rgba(255,255,255,0.25)] transition-[width] duration-[1400ms] ease-out`}
          style={{ width: `${displayWidth}%` }}
        />
      </div>
      <span className="min-w-[34px] text-right text-[11px] font-semibold tabular-nums text-zinc-300">
        {clamped}%
      </span>
    </div>
  );
};
