import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtfCard from "@/components/ctf/CtfCard";
import { ctfResults } from "@/components/ctf/ctf-data";

gsap.registerPlugin(ScrollTrigger);

export default function CtfSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
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
    <section id="ctf" ref={sectionRef} className="px-6 md:px-16 lg:px-24 py-20 md:py-24">
      <h2
        ref={titleRef}
        className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-6"
      >
        Compétitions
      </h2>

      <p
        ref={introRef}
        className="max-w-2xl mb-10 md:mb-14 text-foreground/80 text-base md:text-lg leading-relaxed"
      >
        Les CTF sont l'un des meilleurs moyens de progresser en cybersécurité : analyser,
        expérimenter, automatiser, et apprendre en continu.
      </p>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {ctfResults.map((ctf) => (
          <CtfCard key={ctf.id} ctf={ctf} />
        ))}
      </div>
    </section>
  );
}
