import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React & TypeScript",
  "Three.js & WebGL",
  "Node.js & Express",
  "GSAP & Animations",
  "Tailwind CSS",
  "Git & CI/CD",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
            titleRef.current,
            { y: 22 },
            {
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 88%",
                once: true,
              },
            }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
            textRef.current,
            { y: 18 },
            {
              y: 0,
              duration: 0.55,
              delay: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 84%",
                once: true,
              },
            }
        );
      }

      if (skillsRef.current) {
        gsap.fromTo(
            skillsRef.current.children,
            { y: 14 },
            {
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 85%",
                once: true,
              },
            }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
          id="about"
          ref={sectionRef}
          className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20 md:py-24"
      >
        <div className="max-w-4xl">
          <h2
              ref={titleRef}
              className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-6 md:mb-8"
          >
            À propos
          </h2>

          <p
              ref={textRef}
              className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 md:mb-12"
          >
            Développeur web passionné par les expériences interactives 3D et les systèmes temps réel.
            Je crée des interfaces rapides, responsives et agréables à utiliser.
          </p>

          <div ref={skillsRef} className="flex flex-wrap gap-2.5 md:gap-3">
            {skills.map((skill) => (
                <span
                    key={skill}
                    className="px-4 py-2 md:px-5 md:py-2.5 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm font-medium border border-border hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
                >
              {skill}
            </span>
            ))}
          </div>
        </div>
      </section>
  );
}