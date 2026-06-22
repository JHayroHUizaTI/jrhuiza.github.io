import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { HeroSection } from '@/modules/portfolio/components/HeroSection';
import { AboutSection } from '@/modules/portfolio/components/AboutSection';
import { SkillsSection } from '@/modules/portfolio/components/SkillsSection';
import { ExperienceSection } from '@/modules/portfolio/components/ExperienceSection';
import { EducationSection } from '@/modules/portfolio/components/EducationSection';
import { ProjectsSection } from '@/modules/portfolio/components/ProjectsSection';
import { ContactSection } from '@/modules/portfolio/components/ContactSection';
import { portfolioData } from '@/modules/portfolio/data/portfolioData';
import { GlassmorphismScene } from '@/modules/glassmorphism/components/GlassmorphismScene';
import { Reveal } from '@/shared/components/ui/Reveal';

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
        <Reveal variant="up" delay={60}>
          <ProjectsSection projectsData={portfolioData.projects} />
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
