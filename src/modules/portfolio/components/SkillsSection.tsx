import { PortfolioData, SkillAccent, SkillCategory, SkillItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { SkillProgressBar } from './SkillProgressBar';

type AccentTheme = {
  iconBg: string;
  glow: string;
};

// Static class strings so Tailwind's JIT keeps them in the build.
const ACCENT_THEME: Record<SkillAccent, AccentTheme> = {
  orange: {
    iconBg: 'bg-orange-500',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.45)]',
  },
  blue: {
    iconBg: 'bg-blue-500',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]',
  },
  gray: {
    iconBg: 'bg-zinc-700',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(161,161,170,0.4)]',
  },
  red: {
    iconBg: 'bg-red-500',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.45)]',
  },
  purple: {
    iconBg: 'bg-purple-500',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.45)]',
  },
  green: {
    iconBg: 'bg-emerald-500',
    glow: 'hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.45)]',
  },
};

const DEFAULT_ACCENT: SkillAccent = 'green';

const SkillBadge = ({ skill }: { skill: SkillItem }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-zinc-300 transition-colors hover:border-white/15 hover:bg-white/[0.06]">
    {skill.materialIcon ? (
      <span className="material-symbols-outlined text-[14px] leading-none text-zinc-400">
        {skill.materialIcon}
      </span>
    ) : null}
    <span>{skill.name}</span>
  </span>
);

const SkillCard = ({ category }: { category: SkillCategory }) => {
  const theme = ACCENT_THEME[category.accent ?? DEFAULT_ACCENT];
  const badges = [...category.topSkills, ...category.otherSkills];

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#0d1424] p-7 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 ${theme.glow}`}
    >
      <header className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} shadow-lg shadow-black/30`}
        >
          <span className="material-symbols-outlined text-[26px] text-white">
            {category.icon ?? 'category'}
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-[17px] font-bold leading-snug text-white">
            {category.title}
          </h3>
          {category.description ? (
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              {category.description}
            </p>
          ) : null}
        </div>
      </header>

      {typeof category.level === 'number' ? (
        <SkillProgressBar level={category.level} accent={category.accent} />
      ) : null
      }

      {badges.length > 0 ? (
        <div className="mt-7 flex flex-wrap gap-2">
          {badges.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      ) : null
      }
    </article>
  );
};

// Skills section – card grid replicating the reference layout.
export const SkillsSection = ({ skillsData }: { skillsData: PortfolioData['skills'] }) => {
  return (
    <section className="mx-auto max-w-7xl px-8 py-16" id="skills">
      <SectionHeader
        label="/skills"
        title="Skills Tree"
        subtitle="Tools & Technologies I Can Work With"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
