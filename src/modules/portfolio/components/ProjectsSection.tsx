import React from 'react';
import { PortfolioData } from '../types';
import { SectionHeader } from './SectionHeader';

// Showcase grid for featured projects – glassmorphism variant.
export const ProjectsSection = ({ projectsData }: { projectsData: PortfolioData['projects'] }) => {
  return (
    <section className="py-16 px-8 max-w-7xl mx-auto" id="projects">
      <SectionHeader
        label="/projects"
        title="Projects"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => {
          const isPrimary = project.themeVariant === 'primary';
          const colorClass = isPrimary ? 'text-primary' : 'text-secondary';
          const borderClass = isPrimary ? 'border-[#39ff14]' : 'border-[#25C5C5]';

          return (
            <div key={project.id} className="glass-card p-10">
              <div className="flex justify-between items-start mb-8">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: isPrimary ? 'rgba(57, 255, 20, 0.06)' : 'rgba(37, 197, 197, 0.06)',
                    border: `1px solid ${isPrimary ? 'rgba(57, 255, 20, 0.1)' : 'rgba(37, 197, 197, 0.1)'}`,
                  }}
                >
                  <span className={`material-symbols-outlined ${colorClass} text-2xl`}>{project.icon}</span>
                </div>
                <div className="flex gap-4">
                  <a className="text-zinc-600 hover:text-[#39ff14] transition-colors" href="#">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                  </a>
                  <a className="text-zinc-600 hover:text-[#39ff14] transition-colors" href="#">
                    <span className="material-symbols-outlined text-xl">open_in_new</span>
                  </a>
                </div>
              </div>
              <h4 className="font-headline text-2xl font-bold mb-4 text-on-surface">{project.title}</h4>
              <p className="text-zinc-400 font-light text-sm mb-8 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-label text-[9px] px-2 py-0.5 uppercase text-zinc-500"
                    style={{
                      border: '1px solid rgba(57, 255, 20, 0.1)',
                      background: 'rgba(57, 255, 20, 0.04)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
