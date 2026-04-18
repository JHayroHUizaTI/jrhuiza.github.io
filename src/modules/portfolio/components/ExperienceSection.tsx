import React from 'react';
import { ExperienceItem, PortfolioData } from '../types';
import { SectionHeader } from './SectionHeader';

// ────────────────────────────────────────────────────
// Domain helpers
// ────────────────────────────────────────────────────

interface TimelineNodeProps {
  /** Whether this is the last item (hides the trailing rail). */
  isLast: boolean;
}

interface ExperienceCardProps {
  item: ExperienceItem;
}

interface MetadataBadgeProps {
  icon: string;
  label: string;
}

// ────────────────────────────────────────────────────
// Presentation – atomic sub-components
// ────────────────────────────────────────────────────

/**
 * Renders a single metadata badge with a Material Symbol icon.
 * Used for date and location indicators beside each experience entry.
 */
const MetadataBadge = ({ icon, label }: MetadataBadgeProps) => (
  <span className="inline-flex items-center gap-1.5 text-zinc-500 text-[13px]">
    <span className="material-symbols-outlined text-[15px] text-zinc-600">{icon}</span>
    {label}
  </span>
);

/**
 * Circular accent node + vertical connecting rail.
 * The node uses the project's `--color-primary` (#39FF14) through Tailwind's
 * `bg-primary` token to match the neon-green dots in the reference.
 */
const TimelineNode = ({ isLast }: TimelineNodeProps) => (
  <div className="relative flex flex-col items-center" aria-hidden="true">
    {/* Accent dot */}
    <div className="relative z-10 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(57,255,20,0.55),0_0_30px_rgba(57,255,20,0.2)]" />
    {/* Connecting rail – hidden on last item */}
    {!isLast && (
      <div className="w-px flex-1 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
    )}
  </div>
);

/**
 * Single experience entry rendered beside the timeline rail.
 * Layout: role → company → metadata row → description.
 * Matches the reference image's left-aligned timeline card pattern.
 */
const ExperienceCard = ({ item }: ExperienceCardProps) => (
  <article className="pb-10 last:pb-0 group">
    {/* Role / Title */}
    <h3 className="font-headline text-[18px] md:text-xl font-bold text-on-surface leading-tight tracking-tight">
      {item.role}
    </h3>

    {/* Organisation */}
    <p className="mt-1.5 font-label text-sm font-medium text-primary tracking-wide">
      {item.company}
    </p>

    {/* Metadata row – date + location */}
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
      <MetadataBadge icon="calendar_today" label={item.period} />
      {item.location && <MetadataBadge icon="location_on" label={item.location} />}
    </div>

    {/* Description */}
    <p className="mt-4 max-w-2xl text-[14px] md:text-[15px] leading-7 text-zinc-400">
      {item.description}
    </p>
  </article>
);

// ────────────────────────────────────────────────────
// Composition – section root
// ────────────────────────────────────────────────────

interface ExperienceSectionProps {
  experienceData: PortfolioData['experience'];
}

/**
 * Vertical timeline section mirroring the reference design:
 * - Dark background inherited from `--color-background`
 * - Section header with `/work_experience` label
 * - Left-side vertical rail with neon-green accent nodes
 * - Each entry shows role, org (green), date/location metadata, and description
 * - Fully responsive: rail shifts to edge on mobile
 */
export const ExperienceSection = ({ experienceData }: ExperienceSectionProps) => {
  if (!experienceData.length) return null;

  return (
    <section className="relative overflow-hidden py-16 px-8 max-w-7xl mx-auto" id="work">
        <SectionHeader label="/work_experience" title="Experience" />

        {/* Timeline grid: rail column + content column */}
        <div className="mt-10 grid grid-cols-[20px_1fr] md:grid-cols-[28px_1fr] gap-x-5 md:gap-x-8">
          {experienceData.map((exp, idx) => (
            <React.Fragment key={exp.id}>
              {/* Rail + node */}
              <TimelineNode isLast={idx === experienceData.length - 1} />
              {/* Card content */}
              <ExperienceCard item={exp} />
            </React.Fragment>
          ))}
        </div>
    </section>
  );
};
