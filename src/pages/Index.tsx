import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";

const ParticlesScene = lazy(() => import("@/components/ParticlesScene"));

export default function Index() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <ParticlesScene />
      </Suspense>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <BackToTop />
    </div>
  );
}
