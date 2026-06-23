import React from 'react';
import type { ProjectCardModel } from '../../domain/github';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// A small, stable palette for the most common languages; everything else falls
// back to the theme secondary. Avoids a runtime dependency just for dots.
const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Dockerfile: '#384d54',
  Vue: '#41b883',
  PHP: '#4F5D95',
};

/** Deterministic "Mon YYYY" from an ISO date (TZ-safe, no hydration drift). */
const formatMonthYear = (iso: string): string =>
  `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

interface ProjectCardProps {
  project: ProjectCardModel;
  labels: { stars: string; live: string; updated: string };
}

export const ProjectCard = ({ project, labels }: ProjectCardProps) => {
  const langColor = project.language ? LANGUAGE_COLOR[project.language] ?? '#25C5C5' : null;

  return (
    <article className="group glass-card motion-surface flex h-full flex-col p-7">
      {/* Header: repo icon + external links */}
      <div className="mb-5 flex items-start justify-between">
        <span
          className="material-symbols-outlined icon-anim text-2xl text-primary"
          aria-hidden="true"
        >
          folder_open
        </span>
        <div className="flex items-center gap-3">
          {project.homepage ? (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.live}
              title={labels.live}
              className="motion-button text-zinc-600 transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined icon-anim text-xl" aria-hidden="true">
                open_in_new
              </span>
            </a>
          ) : null}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="motion-button text-zinc-600 transition-colors hover:text-primary"
          >
            <svg className="icon-anim h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Title + description */}
      <h4 className="mb-3 break-words font-headline text-xl font-bold text-on-surface">
        {project.name}
      </h4>
      <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-zinc-400">
        {project.description ?? '—'}
      </p>

      {/* Topics */}
      {project.topics.length > 0 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {project.topics.map((topic) => (
            <span
              key={topic}
              className="font-label text-[9px] uppercase text-zinc-500"
              style={{
                border: '1px solid rgba(57, 255, 20, 0.1)',
                background: 'rgba(57, 255, 20, 0.04)',
                padding: '2px 8px',
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      {/* Footer meta: language · stars · updated */}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.04] pt-4 font-label text-[11px] text-zinc-500">
        {project.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColor ?? '#25C5C5' }}
              aria-hidden="true"
            />
            {project.language}
          </span>
        ) : null}
        {project.stars > 0 ? (
          <span className="inline-flex items-center gap-1" title={labels.stars}>
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              star
            </span>
            {project.stars}
          </span>
        ) : null}
        {project.updatedAt ? (
          <span className="ml-auto">
            {labels.updated} {formatMonthYear(project.updatedAt)}
          </span>
        ) : null}
      </div>
    </article>
  );
};
