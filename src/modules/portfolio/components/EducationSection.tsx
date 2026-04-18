import React from 'react';
import { EducationItem, PortfolioData } from '../types';
import { SectionHeader } from './SectionHeader';

interface EducationSectionProps {
  educationData: PortfolioData['education'];
}

interface EducationCardProps {
  item: EducationItem;
  compact?: boolean;
}

const fallbackTags = ['Systems', 'Cloud', 'Automation'];

const getAccent = (variant: EducationItem['themeVariant']) => {
  const isPrimary = variant === 'primary';

  return {
    text: isPrimary ? 'text-primary' : 'text-secondary',
    border: isPrimary ? 'border-primary/25' : 'border-secondary/25',
    softBg: isPrimary ? 'bg-primary/10' : 'bg-secondary/10',
    line: isPrimary ? 'bg-primary' : 'bg-secondary',
    shadow: isPrimary ? 'shadow-[0_0_24px_rgba(57,255,20,0.34)]' : 'shadow-[0_0_24px_rgba(37,197,197,0.34)]',
  };
};

const TagList = ({ tags, variant }: { tags?: string[]; variant: EducationItem['themeVariant'] }) => {
  const accent = getAccent(variant);

  return (
    <div className="flex flex-wrap gap-2">
      {(tags?.length ? tags : fallbackTags).map((tag) => (
        <span
          key={tag}
          className={`rounded-md border px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.16em] ${accent.border} ${accent.text}`}
          style={{ background: variant === 'primary' ? 'rgba(57, 255, 20, 0.055)' : 'rgba(37, 197, 197, 0.055)' }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const TimelineRail = ({ variant }: { variant: EducationItem['themeVariant'] }) => {
  const accent = getAccent(variant);

  return (
    <div className="absolute bottom-0 left-0 top-0 flex w-10 justify-center md:w-14">
      <div className="w-px bg-gradient-to-b from-transparent via-secondary/35 to-transparent" />
      <div className={`absolute top-12 grid h-8 w-8 place-items-center rounded-full border ${accent.border} bg-background ${accent.shadow}`}>
        <div className={`h-3 w-3 rounded-full ${accent.line}`} />
      </div>
    </div>
  );
};

const RedHatLogo = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 96 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 42.4C10.2 31.7 28.8 28 48.7 30.2c22.2 2.4 39.7 10.9 42.2 20.3 1.9 7.1-8.9 11.4-27.4 10.8-21.5-.7-45.7-7.5-54.6-15.4C6.9 44.2 6 43.1 6 42.4Z"
      fill="#c90000"
    />
    <path
      d="M30.9 6.3c2.1-4.8 11 2.9 15.6 1.2 4.1-1.6 5.2-7.9 23.1 2.7 12.7 7.5 16.5 11.2 18.4 19.3l4.4 18.7c1.7 7.2-8.3 11.6-28.7 10.9-22.1-.8-47.8-9-55.1-17.8-4.7-5.7 2.6-12.5 14.6-13.7L30.9 6.3Z"
      fill="#e00"
    />
    <path
      d="M22 27.2c15 12.2 35.4 17.8 69.1 18.6 2.8 11.2-13.1 15.7-37.8 10.8-23.5-4.7-44.4-15.7-47.1-24.7-.9-3 5.6-4.9 15.8-4.7Z"
      fill="#050505"
    />
    <path
      d="M25.4 25.6c15.8 10.4 34.5 15.3 62 16.2.6 3.2-.7 6.1-3.9 8.2-26.5-.3-49.9-7.5-63.1-19.7.5-1.8 2.1-3.4 5-4.7Z"
      fill="#111"
    />
    <path
      d="M34.4 8.6c1.4-1.1 7.8 4.2 13 3.1 4.5-.9 6.9-5.3 19.2 2.1 11.8 7.1 14.1 10 15.5 15.6l1.7 7C60.3 35.1 40.3 29.8 24.4 19l10-10.4Z"
      fill="#ff2b2b"
    />
  </svg>
);

const EducationIcon = ({ icon, variant }: { icon?: string; variant: EducationItem['themeVariant'] }) => {
  const accent = getAccent(variant);

  if (icon === 'redhat') {
    return <RedHatLogo className="h-9 w-11 drop-shadow-[0_0_10px_rgba(224,0,0,0.5)]" />;
  }

  return <span className={`material-symbols-outlined text-xl ${accent.text}`}>{icon ?? 'workspace_premium'}</span>;
};

const MainEducationCard = ({ item }: { item: EducationItem }) => {
  const accent = getAccent(item.themeVariant);

  return (
    <article className="relative ml-10 overflow-hidden rounded-lg border border-primary/10 bg-[rgba(4,16,8,0.62)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl md:ml-14 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/60 via-secondary/35 to-transparent" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.2em] ${accent.border} ${accent.text}`}>
            <span className="material-symbols-outlined text-[15px]">{item.icon ?? 'school'}</span>
            <span>{item.period}</span>
          </div>
          <h3 className="font-headline text-2xl font-bold leading-tight text-on-surface md:text-4xl">
            {item.degree}
          </h3>
          <p className="mt-3 font-label text-xs uppercase tracking-[0.22em] text-zinc-500">
            {item.institution}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base md:leading-8">
            {item.description}
          </p>
        </div>
        <div className="min-w-[12rem] rounded-lg border border-secondary/10 bg-secondary/5 p-4">
          <p className="font-label text-[10px] uppercase tracking-[0.22em] text-zinc-600">Status</p>
          <p className={`mt-2 font-label text-sm ${accent.text}`}>{item.status ?? 'Active learning'}</p>
        </div>
      </div>
      <div className="mt-7">
        <TagList tags={item.tags} variant={item.themeVariant} />
      </div>
    </article>
  );
};

const CertificationCard = ({ item, compact = false }: EducationCardProps) => {
  const accent = getAccent(item.themeVariant);
  const iconFrameSize = item.icon === 'redhat' ? 'h-12 w-12' : 'h-10 w-10';

  return (
    <article className="rounded-lg border border-primary/10 bg-[rgba(4,16,8,0.48)] p-5 transition-colors duration-300 hover:border-primary/25 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className={`grid ${iconFrameSize} shrink-0 place-items-center rounded-lg border ${accent.border} ${accent.softBg}`}>
          <EducationIcon icon={item.icon} variant={item.themeVariant} />
        </div>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-600">{item.period}</span>
      </div>
      <h4 className={`font-headline font-semibold leading-snug text-on-surface ${compact ? 'text-base' : 'text-lg'}`}>
        {item.degree}
      </h4>
      <p className="mt-2 font-label text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.institution}</p>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{item.description}</p>
      <div className="mt-5">
        <TagList tags={item.tags} variant={item.themeVariant} />
      </div>
    </article>
  );
};

const TrainingItem = ({ item }: { item: EducationItem }) => {
  const accent = getAccent(item.themeVariant);

  return (
    <li className="grid gap-4 rounded-lg border border-primary/10 bg-[rgba(3,10,5,0.42)] p-4 sm:grid-cols-[auto_1fr]">
      <div className={`grid h-8 w-8 place-items-center rounded-full border ${accent.border} ${accent.softBg}`}>
        <span className={`material-symbols-outlined text-base ${accent.text}`}>{item.icon ?? 'check_circle'}</span>
      </div>
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-headline text-base font-semibold text-on-surface">{item.degree}</h4>
          <span className="font-label text-[10px] uppercase tracking-[0.18em] text-zinc-600">{item.period}</span>
        </div>
        <p className="mt-1 font-label text-[11px] uppercase tracking-[0.16em] text-zinc-500">{item.institution}</p>
        <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
      </div>
    </li>
  );
};

export const EducationSection = ({ educationData }: EducationSectionProps) => {
  const academicItems = educationData.filter((item) => (item.kind ?? 'academic') === 'academic');
  const certifications = educationData.filter((item) => item.kind === 'certification');
  const trainings = educationData.filter((item) => item.kind === 'training');
  const mainAcademic = academicItems[0] ?? educationData[0];

  if (!mainAcademic) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-8 py-16" id="education">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          label="/education"
          title="Education"
          subtitle="Formal studies, certifications, and focused training mapped like a compact operator timeline."
        />

        <div className="relative">
          <TimelineRail variant={mainAcademic.themeVariant} />
          <MainEducationCard item={mainAcademic} />
        </div>

        {certifications.length > 0 ? (
          <div className="mt-12 md:ml-14">
            <div className="mb-5 flex items-center gap-4">
              <h3 className="font-headline text-xl font-bold text-on-surface md:text-2xl">Professional Certifications</h3>
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 via-secondary/20 to-transparent" />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {certifications.map((item) => (
                <CertificationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : null}

        {trainings.length > 0 ? (
          <div className="mt-12 md:ml-14">
            <div className="mb-5 flex items-center gap-4">
              <h3 className="font-headline text-xl font-bold text-primary md:text-2xl">Additional Training</h3>
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 via-secondary/20 to-transparent" />
            </div>
            <ul className="grid gap-4 lg:grid-cols-2">
              {trainings.map((item) => (
                <TrainingItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};
