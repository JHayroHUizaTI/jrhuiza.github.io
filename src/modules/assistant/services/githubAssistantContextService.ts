import 'server-only';

import { unstable_cache } from 'next/cache';

const GITHUB_API = 'https://api.github.com';
const DEFAULT_OWNER = 'JHayroHUizaTI';
const TARGET_REPO = 'AI_Radar';
const README_PREVIEW_LENGTH = 2500;

interface GithubRepoPayload {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  pushed_at: string;
}

const stripMarkdown = (content: string) =>
  content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '- ')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const buildHeaders = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-modern-assistant',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchAiRadarContextUncached = async (): Promise<string | null> => {
  const owner = process.env.GITHUB_USERNAME ?? DEFAULT_OWNER;
  const repoUrl = `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(TARGET_REPO)}`;

  try {
    const [repoResponse, readmeResponse] = await Promise.all([
      fetch(repoUrl, {
        headers: buildHeaders(),
        next: { revalidate: 3600, tags: ['github', 'assistant-context'] },
      }),
      fetch(`${repoUrl}/readme`, {
        headers: {
          ...buildHeaders(),
          Accept: 'application/vnd.github.raw+json',
        },
        next: { revalidate: 3600, tags: ['github', 'assistant-context'] },
      }),
    ]);

    if (!repoResponse.ok) {
      return null;
    }

    const repo = (await repoResponse.json()) as GithubRepoPayload;
    const readme = readmeResponse.ok ? stripMarkdown(await readmeResponse.text()) : '';
    const readmePreview = readme.slice(0, README_PREVIEW_LENGTH);
    const lastPushDate = new Date(repo.pushed_at).toISOString().slice(0, 10);

    return [
      'Proyecto destacado desde GitHub:',
      `- Nombre: ${repo.name}`,
      `- URL: ${repo.html_url}`,
      repo.description ? `- Descripción: ${repo.description}` : null,
      repo.homepage ? `- Demo/Homepage: ${repo.homepage}` : null,
      repo.language ? `- Lenguaje principal: ${repo.language}` : null,
      repo.topics?.length ? `- Topics: ${repo.topics.join(', ')}` : null,
      `- Stars: ${repo.stargazers_count}`,
      `- Forks: ${repo.forks_count}`,
      `- Última actualización conocida del repo: ${lastPushDate}`,
      readmePreview ? `- Extracto del README:\n${readmePreview}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  } catch {
    return null;
  }
};

const loadAiRadarContext = unstable_cache(
  async () => fetchAiRadarContextUncached(),
  ['assistant-ai-radar-context'],
  { revalidate: 3600, tags: ['github', 'assistant-context'] },
);

export const getAiRadarAssistantContext = async (): Promise<string | null> => loadAiRadarContext();
