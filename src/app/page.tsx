import { Suspense } from 'react';
import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { HeroSection } from '@/modules/portfolio/components/HeroSection';
import { AboutSection } from '@/modules/portfolio/components/AboutSection';
import { SkillsSection } from '@/modules/portfolio/components/SkillsSection';
import { ExperienceSection } from '@/modules/portfolio/components/ExperienceSection';
import { EducationSection } from '@/modules/portfolio/components/EducationSection';
import { GitHubShowcaseSection } from '@/modules/portfolio/components/github/GitHubShowcaseSection';
import { GitHubShowcaseSkeleton } from '@/modules/portfolio/components/github/ProjectSkeleton';
import { ContactSection } from '@/modules/portfolio/components/ContactSection';
import { portfolioData } from '@/modules/portfolio/data/portfolioData';
import { GlassmorphismScene } from '@/modules/glassmorphism/components/GlassmorphismScene';
import { Reveal } from '@/shared/components/ui/Reveal';

// ISR: the whole page (incl. the GitHub fetch) is regenerated at most hourly,
// which — together with unstable_cache in the GitHub data layer — keeps us well
// under GitHub's API rate limits regardless of traffic.
export const revalidate = 3600;

export default function Home() {
  return (
    <GlassmorphismScene>
      <main className="min-h-screen">
        <Header />
        {/* Hero keeps its own built-in entrance animation (see HeroSection). */}
        <HeroSection heroData={portfolioData.hero} />
        {/* Main sections fade/slide in as they scroll into view. */}
        <Reveal variant="up">
          <AboutSection aboutData={portfolioData.about} statsData={portfolioData.stats} />
        </Reveal>
        <Reveal variant="up" delay={40}>
          <SkillsSection skillsData={portfolioData.skills} />
        </Reveal>
        <Reveal variant="left" delay={50}>
          <ExperienceSection experienceData={portfolioData.experience} />
        </Reveal>
        <Reveal variant="right" delay={50}>
          <EducationSection educationData={portfolioData.education} />
        </Reveal>
        {/* Projects + activity now sync from GitHub; curated projects remain
            the ultimate fallback. Suspense streams a skeleton while it loads. */}
        <Reveal variant="up" delay={60}>
          <Suspense fallback={<GitHubShowcaseSkeleton />}>
            <GitHubShowcaseSection fallbackProjects={portfolioData.projects} />
          </Suspense>
        </Reveal>
        <Reveal variant="zoom" delay={60}>
          <ContactSection />
        </Reveal>
        <Reveal variant="fade" delay={40}>
          <Footer />
        </Reveal>
      </main>
    </GlassmorphismScene>
  );
}
