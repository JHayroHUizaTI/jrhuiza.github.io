import React from 'react';
import type { ContributionDay, ContributionYear } from '../../domain/github';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// Level → background. Derived from the theme primary (#39FF14) at rising alpha
// so the scale reads naturally from "empty" to "more".
const LEVEL_BG: Record<ContributionDay['level'], string> = {
  0: 'rgba(57, 255, 20, 0.05)',
  1: 'rgba(57, 255, 20, 0.22)',
  2: 'rgba(57, 255, 20, 0.42)',
  3: 'rgba(57, 255, 20, 0.66)',
  4: 'rgba(57, 255, 20, 0.92)',
};

/** Parse the month index (0-11) straight from a yyyy-mm-dd string (TZ-safe). */
const monthOf = (isoDate: string): number => Number(isoDate.slice(5, 7)) - 1;

interface ContributionCalendarProps {
  year: ContributionYear;
  lessLabel: string;
  moreLabel: string;
}

/** GitHub-style contribution heatmap: month row, week columns, day cells, legend. */
export const ContributionCalendar = ({
  year,
  lessLabel,
  moreLabel,
}: ContributionCalendarProps) => {
  // Label a column only when its first day starts a new calendar month
  // (compared against the previous week — kept pure, no render-time mutation).
  const monthLabels = year.weeks.map((week, index) => {
    const firstDay = week.days[0];
    if (!firstDay) return '';
    const month = monthOf(firstDay.date);
    const previousFirstDay = year.weeks[index - 1]?.days[0];
    const previousMonth = previousFirstDay ? monthOf(previousFirstDay.date) : -1;
    return month !== previousMonth ? MONTHS[month] : '';
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex min-w-full flex-col gap-1">
          {/* Month labels aligned to week columns */}
          <div className="flex gap-[3px] pl-0">
            {monthLabels.map((label, index) => (
              <div
                key={`m-${index}`}
                className="w-[11px] shrink-0 font-label text-[9px] leading-none text-zinc-500"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div className="flex gap-[3px]">
            {year.weeks.map((week, weekIndex) => (
              <div key={`w-${weekIndex}`} className="flex flex-col gap-[3px]">
                {week.days.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.count} contributions · ${day.date}`}
                    className="block h-[11px] w-[11px] rounded-[2px] ring-1 ring-inset ring-white/[0.03] transition-colors"
                    style={{ backgroundColor: LEVEL_BG[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Less → More legend */}
      <div className="mt-3 flex items-center justify-end gap-2 font-label text-[10px] text-zinc-500">
        <span>{lessLabel}</span>
        <span className="flex items-center gap-[3px]">
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className="block h-[11px] w-[11px] rounded-[2px]"
              style={{ backgroundColor: LEVEL_BG[level] }}
            />
          ))}
        </span>
        <span>{moreLabel}</span>
      </div>
    </div>
  );
};
