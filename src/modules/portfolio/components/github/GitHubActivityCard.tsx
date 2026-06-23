'use client';

import React, { useState } from 'react';
import type { ContributionYear } from '../../domain/github';
import { YearSelector } from './YearSelector';
import { ContributionCalendar } from './ContributionCalendar';

interface GitHubActivityCardProps {
  title: string;
  contributions: ContributionYear[];
  /** True when `contributions` is the deterministic demo fallback, not live data. */
  isSample?: boolean;
  labels: {
    less: string;
    more: string;
    unavailable: string;
    sample: string;
    sampleAria: string;
  };
  /** Builds the "N contributions in YYYY" sentence (locale-aware via i18n). */
  formatTotal: (total: number, year: number) => string;
}

/**
 * Large dark card holding the contribution heatmap, a year selector and the
 * total-for-year readout. Falls back to an elegant message when no
 * contribution data is available (e.g. missing GITHUB_TOKEN or API failure).
 */
export const GitHubActivityCard = ({
  title,
  contributions,
  isSample = false,
  labels,
  formatTotal,
}: GitHubActivityCardProps) => {
  const years = contributions.map((entry) => entry.year);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const active =
    contributions.find((entry) => entry.year === selectedYear) ?? contributions[0];

  return (
    <div className="glass-card p-6 md:p-8" style={{ background: 'rgba(7, 19, 12, 0.72)' }}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-headline text-xl font-bold text-on-surface md:text-2xl">
              {title}
            </h3>
            {isSample ? (
              <span
                aria-label={labels.sampleAria}
                title={labels.sampleAria}
                className="inline-flex items-center rounded-full border border-[#26A641]/30 bg-[#0E4429]/40 px-2 py-0.5 font-label text-[10px] uppercase tracking-[0.14em] text-[#39D353]/80"
              >
                {labels.sample}
              </span>
            ) : null}
          </div>
          {active ? (
            <p className="mt-1 font-label text-xs text-zinc-500">
              {formatTotal(active.total, active.year)}
            </p>
          ) : null}
        </div>

        {years.length > 0 ? (
          <YearSelector years={years} selected={active?.year ?? years[0]} onSelect={setSelectedYear} />
        ) : null}
      </div>

      {active ? (
        <ContributionCalendar year={active} lessLabel={labels.less} moreLabel={labels.more} />
      ) : (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-white/[0.07] py-12">
          <p className="flex items-center gap-2 font-label text-sm text-zinc-500">
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              cloud_off
            </span>
            {labels.unavailable}
          </p>
        </div>
      )}
    </div>
  );
};
