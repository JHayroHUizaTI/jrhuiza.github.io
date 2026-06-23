// ---------------------------------------------------------------------------
// GitHub showcase — application layer (use case + cached entry point).
//
// `GetGithubShowcaseUseCase` depends only on the `GithubDataPort` interface
// (like `SendContactMessageUseCase` depends on `EmailDeliveryPort`). The
// exported `getGithubShowcase()` wires the concrete adapter, wraps the network
// work in `unstable_cache` (revalidate hourly, tag `github`) and never throws —
// it returns a discriminated result so the UI can show an elegant fallback.
//
// Server-only.
// ---------------------------------------------------------------------------

import { unstable_cache } from 'next/cache';
import {
  selectShowcaseProjects,
  showcaseYears,
  type GithubShowcaseData,
} from '../domain/github';
import {
  GithubApiService,
  MissingGithubConfigurationError,
  type GithubDataPort,
} from '../services/githubService';

export type GithubShowcaseResult =
  | { ok: true; data: GithubShowcaseData }
  | { ok: false; reason: 'unconfigured' | 'error' };

export class GetGithubShowcaseUseCase {
  constructor(private readonly github: GithubDataPort) {}

  async execute(now: number): Promise<GithubShowcaseData> {
    const years = showcaseYears(new Date(now).getUTCFullYear());

    // Repositories and contributions are independent → fetch concurrently.
    const [repos, contributions] = await Promise.all([
      this.github.fetchRepositories(),
      this.github.fetchContributions(years),
    ]);

    return {
      username: this.github.username,
      profileUrl: `https://github.com/${this.github.username}`,
      projects: selectShowcaseProjects(repos, { now }),
      contributions,
      hasContributions: contributions.some((year) => year.total > 0),
    };
  }
}

/**
 * Cached loader. `unstable_cache` is the primary rate-limit guard: GitHub is
 * hit at most once per hour per region, regardless of how many visitors load
 * the page. `revalidateTag('github')` can force a refresh on demand.
 */
const loadShowcase = unstable_cache(
  async (now: number): Promise<GithubShowcaseData> => {
    const useCase = new GetGithubShowcaseUseCase(new GithubApiService());
    return useCase.execute(now);
  },
  ['github-showcase'],
  { revalidate: 3600, tags: ['github'] },
);

export async function getGithubShowcase(): Promise<GithubShowcaseResult> {
  // Bucket `now` to the hour so the cache key is stable within a revalidation
  // window (avoids a fresh miss on every request from a changing timestamp).
  const hourBucket = Math.floor(Date.now() / 3_600_000) * 3_600_000;

  try {
    return { ok: true, data: await loadShowcase(hourBucket) };
  } catch (error) {
    if (error instanceof MissingGithubConfigurationError) {
      return { ok: false, reason: 'unconfigured' };
    }
    console.error('[github-showcase] failed to load GitHub data:', error);
    return { ok: false, reason: 'error' };
  }
}
