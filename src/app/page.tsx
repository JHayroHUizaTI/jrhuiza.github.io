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

export default function Home() {
  return (
    <GlassmorphismScene>
      <main className="min-h-screen">
        <Header />
        <HeroSection heroData={portfolioData.hero} />
        <AboutSection aboutData={portfolioData.about} statsData={portfolioData.stats} />
        <SkillsSection skillsData={portfolioData.skills} />
        <ExperienceSection experienceData={portfolioData.experience} />
        <EducationSection educationData={portfolioData.education} />
        <ProjectsSection projectsData={portfolioData.projects} />
        <ContactSection />
        <Footer />
      </main>
    </GlassmorphismScene>
  );
}
