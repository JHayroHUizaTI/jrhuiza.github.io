import React from 'react';
import Image from 'next/image';
import { PortfolioData } from '../types';
import { SectionHeader } from './SectionHeader';
import { InteractiveTerminal, TerminalCommand } from './InteractiveTerminal';
import pictureMe from '../pictures/pictureme.jpeg';

// About section redesigned as a glassmorphism operator dashboard.
export const AboutSection = ({
  aboutData,
  statsData,
}: {
  aboutData: PortfolioData['about'];
  statsData: PortfolioData['stats'];
}) => {
  const operatorDetails = [
    { label: 'operator', value: 'jrhuiza' },
    { label: 'role', value: aboutData.role },
    { label: 'location', value: 'Lima, Peru / Remote' },
    { label: 'status', value: 'available for missions' },
  ];
  const aboutCommands: TerminalCommand[] = [
    {
      command: 'help',
      output: ['available: cat background.json, ls focus, philosophy, status, clear'],
    },
    {
      command: 'cat background.json',
      output: [
        `{ "role": "${aboutData.role}" }`,
        `{ "passion": "${aboutData.passion}" }`,
        `{ "focus": [${aboutData.focus.map((item) => `"${item}"`).join(', ')}] }`,
      ],
      aliases: ['cat background'],
    },
    {
      command: 'ls focus',
      output: aboutData.focus,
      aliases: ['focus'],
    },
    {
      command: 'philosophy',
      output: [aboutData.philosophy],
    },
    {
      command: 'status',
      output: ['available for missions', 'remote-ready from Lima, Peru'],
    },
  ];

  return (
    <section className="pt-16 pb-12 px-8 max-w-7xl mx-auto" id="about">
      <SectionHeader label="/about" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
        {/* Profile card */}
        <div className="glass-card lg:row-span-2">
          <div
            className="relative flex items-center justify-between px-5 py-3"
            style={{
              borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
              background: 'rgba(3, 10, 5, 0.5)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f56', boxShadow: '0 0 6px rgba(255, 95, 86, 0.4)' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#ffbd2e', boxShadow: '0 0 6px rgba(255, 189, 46, 0.4)' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 6px rgba(40, 200, 64, 0.4)' }} />
            </div>
            <div className="font-label text-[11px] text-zinc-500">profile.sh</div>
            <div className="font-label text-[11px] text-[#39ff14]/70">bash</div>
          </div>
          <div className="relative z-10 px-6 pb-6 pt-5">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="font-label text-[10px] uppercase tracking-[0.35em] text-[#39ff14]/70">
                  profile_node
                </div>
                <h3 className="mt-3 font-headline text-3xl font-bold text-on-surface">
                  Jhayro Huiza
                </h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-500">
                  Systems-minded operator focused on resilient cloud platforms, automation, and secure delivery pipelines.
                </p>
              </div>
              <div className="h-3 w-3 rounded-full bg-[#39ff14]" style={{ boxShadow: '0 0 12px rgba(57, 255, 20, 0.45)' }}></div>
            </div>

            {/* Profile image */}
            <div className="glass-card-inner mb-8 p-6">
              <div
                className="mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-[1.4rem] p-3"
                style={{
                  border: '1px solid rgba(57, 255, 20, 0.08)',
                  background: 'rgba(4, 16, 8, 0.5)',
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.1rem]"
                  style={{
                    border: '1px solid rgba(57, 255, 20, 0.06)',
                    background: 'radial-gradient(circle at 50% 35%, rgba(37, 197, 197, 0.1), transparent 30%), rgba(3, 10, 5, 0.8)',
                  }}
                >
                  <Image
                    src={pictureMe}
                    alt="Jhayro Huiza profile portrait"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 220px, 220px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Operator details */}
            <div className="space-y-3">
              {operatorDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="glass-card-inner flex items-center justify-between px-4 py-3"
                >
                  <span
                    className="font-label text-[10px] uppercase tracking-[0.25em] text-[#39FF14]"
                    style={{ textShadow: '0 0 6px rgba(57, 255, 20, 0.45)' }}
                  >
                    {detail.label}
                  </span>
                  <span className="font-label text-xs uppercase tracking-[0.12em] text-zinc-200">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Operating principle */}
            <div
              className="mt-8 rounded-xl px-4 py-4"
              style={{
                border: '1px solid rgba(57, 255, 20, 0.08)',
                background: 'rgba(57, 255, 20, 0.03)',
              }}
            >
              <div className="font-label text-[10px] uppercase tracking-[0.25em] text-[#39ff14]/70">
                operating_principle
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {aboutData.philosophy}
              </p>
            </div>
          </div>
        </div>

        {/* Background JSON panel */}
        <div className="glass-card">
          <div
            className="relative flex items-center justify-between px-4 pt-2"
            style={{
              borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
              background: 'rgba(3, 10, 5, 0.5)',
            }}
          >
            <div
              className="rounded-t-md px-4 py-2"
              style={{
                border: '1px solid rgba(57, 255, 20, 0.06)',
                borderBottom: 'none',
                background: 'rgba(4, 16, 8, 0.6)',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.18)',
              }}
            >
              <div className="flex items-center gap-2 font-label text-[12px]">
                <span className="font-semibold text-secondary">TS</span>
                <span className="text-zinc-300">background.json</span>
                <span className="ml-3 text-zinc-600">×</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full" style={{ background: '#ff5f56' }}></div>
              <div className="h-3 w-3 rounded-full" style={{ background: '#ffbd2e' }}></div>
              <div className="h-3 w-3 rounded-full" style={{ background: '#28c840' }}></div>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 md:p-8" style={{ background: 'rgba(4, 16, 8, 0.3)' }}>
            <div className="relative z-10 font-label text-sm leading-8 text-zinc-400">
              <div className="mb-6">
                <span className="text-[#39ff14]">jrhuiza@sysadmin:~$</span>{' '}
                <span className="text-on-surface">cat background.json</span>
              </div>

              <pre
                className="glass-card-inner overflow-x-auto whitespace-pre-wrap p-5 text-sm leading-7"
              >
                <span className="text-zinc-600">{'{'}</span>{'\n'}
                <span className="text-secondary">{'  "role"'}</span>: <span className="text-[#39ff14]">{`"${aboutData.role}"`}</span>,{'\n'}
                <span className="text-secondary">{'  "passion"'}</span>: <span className="text-zinc-300">{`"${aboutData.passion}"`}</span>,{'\n'}
                <span className="text-secondary">{'  "focus"'}</span>: [{'\n'}
                {aboutData.focus.map((item, index) => (
                  <React.Fragment key={item}>
                    {'    '}<span className={index < 2 ? 'text-[#39ff14]' : 'text-secondary'}>{`"${item}"`}</span>
                    {index < aboutData.focus.length - 1 ? ',' : ''}
                    {'\n'}
                  </React.Fragment>
                ))}
                {'  ],\n'}
                <span className="text-secondary">{'  "philosophy"'}</span>: <span className="text-zinc-300">{`"${aboutData.philosophy}"`}</span>{'\n'}
                <span className="text-zinc-600">{'}'}</span>
              </pre>

              <div
                className="mt-6 rounded-xl px-5 py-4 text-sm leading-7 text-zinc-400"
                style={{
                  border: '1px solid rgba(57, 255, 20, 0.08)',
                  background: 'rgba(57, 255, 20, 0.03)',
                }}
              >
                {aboutData.summary}
              </div>

              <div className="mt-6">
                <InteractiveTerminal
                  prompt="jrhuiza@sysadmin:~$"
                  commands={aboutCommands}
                  placeholder="try ls focus"
                  initialEntries={[
                    {
                      id: 0,
                      command: 'cat background.json',
                      prompt: 'jrhuiza@sysadmin:~$',
                      output: ['background.json loaded', 'type "help" for commands'],
                      tone: 'system',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid gap-4 sm:grid-cols-3"
          style={{ ['--stat-accent' as string]: '#25c5c5' }}
        >
          {statsData.slice(0, 4).map((stat) => (
            <div
              key={stat.label}
              className="glass-card-inner flex items-center gap-4 p-4"
            >
              {stat.icon && (
                <span className="material-symbols-outlined text-xl text-[#39ff14]">
                  {stat.icon}
                </span>
              )}
              <div className="flex flex-col">
                <div className="font-label text-[10px] uppercase tracking-[0.25em] text-[var(--stat-accent)]">
                  {stat.label}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="font-headline text-2xl font-bold tracking-tight text-[var(--stat-accent)]"
                    style={stat.highlight ? { textShadow: '0 0 12px rgba(37, 197, 197, 0.5)' } : undefined}
                  >
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="font-label text-xs uppercase tracking-widest text-[var(--stat-accent)]/80">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
