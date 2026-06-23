import React from 'react';

const shimmer = 'animate-pulse rounded bg-white/[0.06]';

/** Placeholder matching a single ProjectCard's footprint. */
export const ProjectSkeleton = () => (
  <div className="glass-card flex h-full flex-col p-7">
    <div className="mb-5 flex items-center justify-between">
      <span className={`${shimmer} h-6 w-6 rounded-md`} />
      <span className={`${shimmer} h-5 w-10`} />
    </div>
    <span className={`${shimmer} mb-3 h-5 w-2/3`} />
    <span className={`${shimmer} mb-2 h-3 w-full`} />
    <span className={`${shimmer} mb-6 h-3 w-4/5`} />
    <div className="mb-5 flex gap-2">
      <span className={`${shimmer} h-4 w-14`} />
      <span className={`${shimmer} h-4 w-12`} />
    </div>
    <div className="mt-auto flex gap-4 border-t border-white/[0.04] pt-4">
      <span className={`${shimmer} h-3 w-16`} />
      <span className={`${shimmer} h-3 w-10`} />
    </div>
  </div>
);

/** Full-section fallback used as the Suspense boundary while data resolves. */
export const GitHubShowcaseSkeleton = () => (
  <section className="mx-auto max-w-7xl px-8 py-16" aria-hidden="true">
    {/* Activity card placeholder */}
    <div className="glass-card mb-16 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <span className={`${shimmer} h-5 w-40`} />
        <span className={`${shimmer} h-7 w-56 rounded-md`} />
      </div>
      <div className={`${shimmer} h-28 w-full rounded-md`} />
    </div>

    {/* Projects grid placeholder */}
    <span className={`${shimmer} mb-3 block h-4 w-32`} />
    <span className={`${shimmer} mb-10 block h-8 w-2/3 max-w-xl`} />
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  </section>
);
