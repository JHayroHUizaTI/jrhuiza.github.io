// ---------------------------------------------------------------------------
// GitHub showcase — service layer (ports & adapters).
//
// `GithubDataPort` is the port; `GithubApiService` is the concrete adapter that
// talks to GitHub's REST (repositories) and GraphQL (contributions) APIs.
// Reads `GITHUB_USERNAME` / `GITHUB_TOKEN` from the environment in the
// constructor, exactly like `ResendEmailService` reads `RESEND_API_KEY`.
//
// Server-only: never import this from a client component.
// ---------------------------------------------------------------------------

import {
  CONTRIBUTION_LEVEL,
  type ContributionYear,
  type GithubRepository,
} from '../domain/github';

export interface GithubDataPort {
  readonly username: string;
  fetchRepositories(): Promise<GithubRepository[]>;
  fetchContributions(years: number[]): Promise<ContributionYear[]>;
}

export class MissingGithubConfigurationError extends Error {
  constructor() {
    super('Falta configurar GITHUB_USERNAME para sincronizar GitHub.');
    this.name = 'MissingGithubConfigurationError';
  }
}

export class GithubApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GithubApiError';
  }
}

const REST_ENDPOINT = 'https://api.github.com';
const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Raw GraphQL response shapes (subset).
interface RawContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}
interface RawContributionCollection {
  contributionCalendar: {
    totalContributions: number;
    weeks: { contributionDays: RawContributionDay[] }[];
  };
}

export class GithubApiService implements GithubDataPort {
  readonly username: string;
  private readonly token?: string;

  constructor(
    username = process.env.GITHUB_USERNAME,
    token = process.env.GITHUB_TOKEN,
  ) {
    if (!username) {
      throw new MissingGithubConfigurationError();
    }
    this.username = username;
    this.token = token;
  }

  private headers(extra?: Record<string, string>): HeadersInit {
    return {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-modern',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...extra,
    };
  }

  async fetchRepositories(): Promise<GithubRepository[]> {
    const url = `${REST_ENDPOINT}/users/${encodeURIComponent(
      this.username,
    )}/repos?per_page=100&sort=pushed&type=owner`;

    // GET requests are cacheable by Next's data cache; the wrapping
    // `unstable_cache` is the primary rate-limit guard (see application layer).
    const response = await fetch(url, {
      headers: this.headers(),
      next: { revalidate: 3600, tags: ['github'] },
    });

    if (!response.ok) {
      throw new GithubApiError(
        `GitHub REST request failed (${response.status} ${response.statusText}).`,
      );
    }

    const repos = (await response.json()) as GithubRepository[];
    return Array.isArray(repos) ? repos : [];
  }

  async fetchContributions(years: number[]): Promise<ContributionYear[]> {
    // The contribution calendar is only available via GraphQL, which requires
    // a token. Without one we degrade gracefully to an empty calendar.
    if (!this.token || years.length === 0) return [];

    const query = buildContributionsQuery(years);
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: this.headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ query, variables: { login: this.username } }),
      // POST isn't covered by Next's fetch cache; `unstable_cache` upstream
      // bounds how often this runs.
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new GithubApiError(
        `GitHub GraphQL request failed (${response.status} ${response.statusText}).`,
      );
    }

    const payload = (await response.json()) as {
      data?: { user?: Record<string, RawContributionCollection | null> };
      errors?: { message: string }[];
    };

    if (payload.errors?.length) {
      throw new GithubApiError(payload.errors[0]?.message ?? 'GitHub GraphQL error.');
    }

    const user = payload.data?.user ?? {};
    return years
      .map((year) => normalizeContributionYear(year, user[`y${year}`]))
      .filter((entry): entry is ContributionYear => entry !== null);
  }
}

/** Build a single batched query that aliases one collection per year. */
function buildContributionsQuery(years: number[]): string {
  const fields = years
    .map((year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      return `y${year}: contributionsCollection(from: "${from}", to: "${to}") {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }`;
    })
    .join('\n');

  return `query ($login: String!) { user(login: $login) { ${fields} } }`;
}

function normalizeContributionYear(
  year: number,
  collection: RawContributionCollection | null | undefined,
): ContributionYear | null {
  if (!collection) return null;
  const calendar = collection.contributionCalendar;

  return {
    year,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: CONTRIBUTION_LEVEL[day.contributionLevel] ?? 0,
      })),
    })),
  };
}
