import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsIntro from "@/components/projects/ProjectsIntro";
import { selectedProjects } from "@/components/projects/projects-data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="min-h-screen px-6 md:px-16 lg:px-24 py-20 md:py-24"
    >
      <h2
        ref={titleRef}
        className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-6"
      >
        Projets
      </h2>

      <div ref={introRef}>
        <ProjectsIntro />
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {selectedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
