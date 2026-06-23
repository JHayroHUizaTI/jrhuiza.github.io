// ---------------------------------------------------------------------------
// GitHub showcase — domain layer.
//
// Pure types + business rules (filtering, scoring, normalization). No network,
// no env, no framework. Mirrors the hexagonal style of `domain/contact.ts`:
// the application/service layers depend on these types and pure functions.
// ---------------------------------------------------------------------------

/** Raw repository shape we consume from the GitHub REST API (subset). */
export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  pushed_at: string;
  updated_at: string;
}

/** A single day in the contribution calendar. `level` drives the color scale. */
export interface ContributionDay {
  date: string; // ISO yyyy-mm-dd
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

/** One year of contribution activity, ready to render as a calendar grid. */
export interface ContributionYear {
  year: number;
  total: number;
  weeks: ContributionWeek[];
}

/**
 * Normalized project view-model rendered by `ProjectCard`. Both live GitHub
 * repositories and curated fallback entries are mapped to this shape so the
 * card stays presentational and source-agnostic.
 */
export interface ProjectCardModel {
  id: string;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  url: string;
  homepage: string | null;
  updatedAt: string | null;
  source: 'github' | 'curated';
}

/** Everything the showcase section needs, resolved server-side. */
export interface GithubShowcaseData {
  username: string;
  profileUrl: string;
  projects: ProjectCardModel[];
  contributions: ContributionYear[];
  hasContributions: boolean;
}

/** Minimal curated project shape used as the ultimate fallback (from portfolioData). */
export interface CuratedProjectLike {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Recency bonus: heavier weight for repos pushed in the last few months. */
const recencyScore = (pushedAt: string, now: number): number => {
  const ageDays = (now - new Date(pushedAt).getTime()) / DAY_MS;
  if (Number.isNaN(ageDays)) return 0;
  if (ageDays <= 30) return 8;
  if (ageDays <= 90) return 6;
  if (ageDays <= 180) return 3;
  if (ageDays <= 365) return 1;
  return 0;
};

/**
 * Relevance score for a repository. Prioritizes stars, then a description,
 * topics, recent activity and the presence of a live demo (homepage).
 */
export const scoreRepository = (repo: GithubRepository, now: number): number =>
  repo.stargazers_count * 10 +
  repo.forks_count * 3 +
  (repo.description ? 5 : 0) +
  (repo.topics?.length ?? 0) * 2 +
  (repo.homepage ? 4 : 0) +
  recencyScore(repo.pushed_at, now);

/**
 * Select the projects worth showcasing: drop forks, archived and disabled
 * repos, score the rest and return the strongest `limit` entries normalized
 * to `ProjectCardModel`. Pure — `now` is injected for testability/determinism.
 */
export const selectShowcaseProjects = (
  repos: GithubRepository[],
  options: { limit?: number; now: number },
): ProjectCardModel[] => {
  const { limit = 6, now } = options;

  return repos
    .filter((repo) => !repo.fork && !repo.archived && !repo.disabled)
    .map((repo) => ({ repo, score: scoreRepository(repo, now) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ repo }) => repositoryToCard(repo));
};

/** Map a raw repository to the presentational card model. */
export const repositoryToCard = (repo: GithubRepository): ProjectCardModel => ({
  id: String(repo.id),
  name: repo.name,
  description: repo.description,
  language: repo.language,
  topics: (repo.topics ?? []).slice(0, 4),
  stars: repo.stargazers_count,
  url: repo.html_url,
  homepage: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null,
  updatedAt: repo.pushed_at ?? repo.updated_at ?? null,
  source: 'github',
});

/** Map a curated portfolio project (the ultimate fallback) to the card model. */
export const curatedProjectToCard = (project: CuratedProjectLike): ProjectCardModel => ({
  id: `curated-${project.id}`,
  name: project.title,
  description: project.description,
  language: null,
  topics: project.tags.slice(0, 4),
  stars: 0,
  url: project.githubUrl ?? project.liveUrl ?? '#',
  homepage: project.liveUrl ?? null,
  updatedAt: null,
  source: 'curated',
});

/** GitHub GraphQL contribution levels → numeric scale used by the calendar. */
export const CONTRIBUTION_LEVEL: Record<string, ContributionDay['level']> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Years to request, newest first, from the current year back to `oldest`. */
export const showcaseYears = (currentYear: number, oldest = 2023): number[] => {
  const years: number[] = [];
  for (let year = currentYear; year >= oldest; year -= 1) years.push(year);
  return years;
};

// ---------------------------------------------------------------------------
// Deterministic demo contributions
//
// When there is no live GitHub data (e.g. missing GITHUB_TOKEN) we render a
// high-activity *sample* calendar instead of an empty grid. It MUST be
// deterministic so server and client produce byte-identical markup (no
// hydration mismatch): a seeded PRNG drives the density and dates are built by
// iterating the calendar year — never `Math.random()` or an argless `Date`.
// ---------------------------------------------------------------------------

/** mulberry32 — tiny, fast, deterministic 32-bit PRNG. Returns [0, 1). */
const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Zero-pad to 2 digits without locale/Intl. */
const pad2 = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

/** TZ-safe ISO yyyy-mm-dd from a UTC date (no toISOString round-trips needed). */
const isoFromUtc = (date: Date): string =>
  `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;

/** Map a raw daily count to the 0–4 level scale (GitHub-like quartiles). */
const levelFromCount = (count: number): ContributionDay['level'] => {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
};

/**
 * Density model for one day. Weekdays are busy, weekends lighter, with
 * occasional intense streaks and a few genuinely empty days — reads like a
 * consistently productive engineer rather than uniform noise. Pure: all
 * randomness comes from the injected PRNG.
 */
const demoCountFor = (dayOfWeek: number, rng: () => number): number => {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const roll = rng();

  // A small share of empty days keeps it believable (more on weekends).
  const emptyChance = isWeekend ? 0.32 : 0.08;
  if (roll < emptyChance) return 0;

  // Occasional intense streak day (skewed toward weekdays).
  const spikeChance = isWeekend ? 0.06 : 0.16;
  if (rng() < spikeChance) return 13 + Math.floor(rng() * 10); // level 4

  // Baseline productivity, skewed toward levels 2–4.
  const base = isWeekend ? 1 : 4;
  const spread = isWeekend ? 6 : 11;
  return base + Math.floor(rng() * spread);
};

/** Build one deterministic, high-activity demo year aligned to Sunday weeks. */
export const buildDemoContributionYear = (year: number): ContributionYear => {
  const rng = mulberry32(year * 2654435761);
  const weeks: ContributionWeek[] = [];
  let total = 0;
  let currentWeek: ContributionDay[] = [];

  // Iterate every calendar day of `year` in UTC, grouping into Sunday-started
  // weeks exactly like GitHub aligns its columns.
  const cursor = new Date(Date.UTC(year, 0, 1));
  const firstDow = cursor.getUTCDay();

  // Pad the first (partial) week so day 0 lands in its real weekday slot.
  for (let i = 0; i < firstDow; i += 1) currentWeek.push(null as unknown as ContributionDay);

  while (cursor.getUTCFullYear() === year) {
    const dayOfWeek = cursor.getUTCDay();
    const count = demoCountFor(dayOfWeek, rng);
    total += count;
    currentWeek.push({ date: isoFromUtc(cursor), count, level: levelFromCount(count) });

    if (dayOfWeek === 6) {
      weeks.push({ days: currentWeek.filter(Boolean) });
      currentWeek = [];
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  if (currentWeek.length > 0) weeks.push({ days: currentWeek.filter(Boolean) });

  return { year, total, weeks };
};

/** Deterministic demo dataset for the given years (newest-first as provided). */
export const buildDemoContributions = (years: number[]): ContributionYear[] =>
  years.map(buildDemoContributionYear);
