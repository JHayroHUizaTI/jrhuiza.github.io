export interface StatItem {
  label: string;
  value: string;
  unit?: string;
  icon?: string;
  highlight?: boolean;
}

export interface SkillItem {
  name: string;
  id: string;
  iconClass?: string;
  textClass?: string;
  containerClass?: string;
  materialIcon?: string;
  isHighlighted?: boolean;
}

export type SkillAccent = 'orange' | 'blue' | 'gray' | 'red' | 'purple' | 'green';

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  accent?: SkillAccent;
  level?: number;
  topSkills: SkillItem[];
  otherSkills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  image?: string;
  tags?: string[];
  themeVariant: 'primary' | 'secondary';
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
  kind?: 'academic' | 'certification' | 'training';
  tags?: string[];
  icon?: string;
  status?: string;
  themeVariant: 'primary' | 'secondary';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  themeVariant: 'primary' | 'secondary';
}

export interface PortfolioData {
  hero: {
    command: string;
    promptUser: string;
    commandResult: string;
    summary: string;
  };
  about: {
    role: string;
    passion: string;
    focus: string[];
    philosophy: string;
    summary: string;
  };
  stats: StatItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}
