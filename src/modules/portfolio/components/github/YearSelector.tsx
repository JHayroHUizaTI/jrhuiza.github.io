import React from 'react';

interface YearSelectorProps {
  years: number[];
  selected: number;
  onSelect: (year: number) => void;
}

/** Segmented year picker for the contribution calendar. */
export const YearSelector = ({ years, selected, onSelect }: YearSelectorProps) => {
  return (
    <div
      role="tablist"
      aria-label="Year"
      className="flex flex-wrap items-center gap-1.5"
    >
      {years.map((year) => {
        const isActive = year === selected;
        return (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(year)}
            className={[
              'motion-button rounded-md px-3 py-1 font-label text-xs transition-colors',
              isActive
                ? 'border border-[rgba(57,255,20,0.4)] bg-[rgba(57,255,20,0.08)] text-primary'
                : 'border border-transparent text-zinc-500 hover:text-on-surface',
            ].join(' ')}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
