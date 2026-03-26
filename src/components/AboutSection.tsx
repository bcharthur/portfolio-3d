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
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8,
      });
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 30, opacity: 0, duration: 0.8, delay: 0.2,
      });
      if (skillsRef.current) {
        gsap.from(skillsRef.current.children, {
          scrollTrigger: { trigger: skillsRef.current, start: "top 80%" },
          y: 20, opacity: 0, duration: 0.5, stagger: 0.1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center px-8 md:px-16 lg:px-24 py-24">
      <div className="max-w-4xl">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
          À propos
        </h2>
        <p ref={textRef} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
          Développeur web passionné par les expériences interactives 3D et les systèmes temps réel. 
          Je crée des interfaces rapides, responsives et agréables à utiliser.
        </p>
        <div ref={skillsRef} className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
