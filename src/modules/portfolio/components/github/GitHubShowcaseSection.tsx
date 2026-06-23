// Server Component. Resolves GitHub data (cached, hourly) and hands it to the
// client `GitHubShowcase`. Rendered inside a <Suspense> boundary in page.tsx so
// the skeleton streams while this awaits.

import React from 'react';
import { getGithubShowcase } from '../../application/getGithubShowcase';
import type { CuratedProjectLike } from '../../domain/github';
import { GitHubShowcase } from './GitHubShowcase';

interface GitHubShowcaseSectionProps {
  /** Curated projects injected from page.tsx, used as the ultimate fallback. */
  fallbackProjects: CuratedProjectLike[];
}

export const GitHubShowcaseSection = async ({
  fallbackProjects,
}: GitHubShowcaseSectionProps) => {
  const result = await getGithubShowcase();

  const profileUrl = result.ok
    ? result.data.profileUrl
    : `https://github.com/${process.env.GITHUB_USERNAME ?? ''}`;

  return (
    <GitHubShowcase
      data={result.ok ? result.data : null}
      fallbackProjects={fallbackProjects}
      profileUrl={profileUrl}
    />
  );
};
