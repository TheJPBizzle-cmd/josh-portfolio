import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactFooter from './components/ContactFooter';

export default function App() {
  return (
    <main className="relative box-border min-h-screen overflow-x-clip bg-[#0C0C0C] font-sans text-[#D7E2EA]">
      <Hero />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactFooter />
    </main>
  );
}
