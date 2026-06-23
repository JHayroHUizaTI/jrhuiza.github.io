import React from 'react';
import type { ContributionDay, ContributionYear } from '../../domain/github';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// Standard GitHub green contribution palette. Level 0 is a dark greenish-gray
// that reads clearly as "empty" over the dark card; 1→4 climb the classic scale.
const LEVEL_BG: Record<ContributionDay['level'], string> = {
  0: '#0E1A14',
  1: '#0E4429',
  2: '#006D32',
  3: '#26A641',
  4: '#39D353',
};

/** Parse the month index (0-11) straight from a yyyy-mm-dd string (TZ-safe). */
const monthOf = (isoDate: string): number => Number(isoDate.slice(5, 7)) - 1;

// Cap the per-cell mount stagger so it stays cheap regardless of week count.
const STAGGER_STEP_MS = 12;
const STAGGER_CAP_MS = 520;

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
      <div className="overflow-x-auto pb-1.5">
        <div className="inline-flex min-w-full flex-col gap-1.5">
          {/* Month labels aligned to week columns */}
          <div className="flex gap-[4px] pl-0">
            {monthLabels.map((label, index) => (
              <div
                key={`m-${index}`}
                className="w-3 shrink-0 font-label text-[10px] leading-none text-zinc-500"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div className="github-cal-grid flex gap-[4px]">
            {year.weeks.map((week, weekIndex) => (
              <div key={`w-${weekIndex}`} className="flex flex-col gap-[4px]">
                {week.days.map((day) => {
                  const delay = Math.min(weekIndex * STAGGER_STEP_MS, STAGGER_CAP_MS);
                  return (
                    <span
                      key={day.date}
                      title={`${day.count} contributions · ${day.date}`}
                      className="github-cal-cell block h-3 w-3 rounded-[3px] ring-1 ring-inset ring-white/[0.04]"
                      style={{
                        backgroundColor: LEVEL_BG[day.level],
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Less → More legend */}
      <div className="mt-4 flex items-center justify-end gap-2 font-label text-[10px] text-zinc-500">
        <span>{lessLabel}</span>
        <span className="flex items-center gap-[4px]">
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className="block h-3 w-3 rounded-[3px]"
              style={{ backgroundColor: LEVEL_BG[level] }}
            />
          ))}
        </span>
        <span>{moreLabel}</span>
      </div>
    </div>
  );
};
