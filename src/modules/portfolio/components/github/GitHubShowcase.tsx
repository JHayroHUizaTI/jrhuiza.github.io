'use client';

import React from 'react';
import {
  buildDemoContributions,
  curatedProjectToCard,
  showcaseYears,
  type CuratedProjectLike,
  type GithubShowcaseData,
} from '../../domain/github';
import { useLanguage } from '@/shared/i18n';
import { SectionHeader } from '../SectionHeader';
import { GitHubActivityCard } from './GitHubActivityCard';
import { ProjectCard } from './ProjectCard';
import { GitHubButton } from './GitHubButton';

interface GitHubShowcaseProps {
  /** Resolved GitHub data, or null when the API is unconfigured/unavailable. */
  data: GithubShowcaseData | null;
  /** Curated projects used as the ultimate fallback for the grid. */
  fallbackProjects: CuratedProjectLike[];
  /** GitHub profile URL for the "View GitHub" button (works even on fallback). */
  profileUrl: string;
}

/** Deterministic thousands grouping (avoids Intl locale hydration drift). */
const groupThousands = (value: number): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Deterministic high-activity sample shown only when there's no live data.
 * Built once at module scope from a fixed year list so server and client
 * render byte-identical markup (no `Math.random`, no argless `Date`).
 */
const DEMO_CONTRIBUTIONS = buildDemoContributions(showcaseYears(2026));

export const GitHubShowcase = ({ data, fallbackProjects, profileUrl }: GitHubShowcaseProps) => {
  const { t } = useLanguage();
  const g = t.github;

  const projects =
    data && data.projects.length > 0
      ? data.projects
      : fallbackProjects.map(curatedProjectToCard);

  const liveContributions = data?.contributions ?? [];
  const isSample = liveContributions.length === 0;
  const contributions = isSample ? DEMO_CONTRIBUTIONS : liveContributions;

  return (
    <section id="github" className="mx-auto max-w-7xl px-8 py-16">
      {/* 1 — GitHub Activity */}
      <SectionHeader label="/github" title={g.activityTitle} />

      <GitHubActivityCard
        title={g.activityTitle}
        contributions={contributions}
        isSample={isSample}
        labels={{
          less: g.less,
          more: g.more,
          unavailable: g.unavailable,
          sample: g.sample,
          sampleAria: g.sampleAria,
        }}
        formatTotal={(total, year) => `${groupThousands(total)} ${g.contributionsLabel} ${year}`}
      />

      {/* 2 — Latest Projects */}
      <div className="mt-16">
        <p className="mb-3 font-label text-xs uppercase tracking-[0.16em] text-primary">
          {g.projectsKicker}
        </p>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="max-w-2xl font-headline text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            {g.projectsHeadline}
          </h3>
          <GitHubButton href={profileUrl} label={g.viewGithub} />
        </div>

        <div className="motion-stagger grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              labels={{ stars: g.stars, live: g.liveDemo, updated: g.updated }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
