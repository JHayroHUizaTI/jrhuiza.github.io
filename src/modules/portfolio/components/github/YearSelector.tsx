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
                ? 'border border-[#26A641]/55 bg-[#0E4429]/45 text-[#39D353]'
                : 'border border-transparent text-zinc-500 hover:border-[#26A641]/25 hover:text-[#39D353]/80',
            ].join(' ')}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
