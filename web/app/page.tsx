import {
  HeroSection,
  AgenticSection,
  FeaturedProjectsSection,
  SkillsPreviewSection,
} from "./components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AgenticSection />
      <div className="section-divider" />
      <FeaturedProjectsSection />
      <div className="section-divider" />
      <SkillsPreviewSection />
    </>
  );
}
