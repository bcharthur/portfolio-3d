import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineGroupBlock from "@/components/timeline/TimelineGroupBlock";
import { timelineGroups } from "@/components/timeline/timeline-data";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
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
      id="parcours"
      ref={sectionRef}
      className="px-6 md:px-16 lg:px-24 py-20 md:py-24"
    >
      <h2
        ref={titleRef}
        className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-6"
      >
        Parcours
      </h2>

      <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.25em] mb-10 md:mb-14">
        Formation et expérience, en parallèle
      </p>

      <div ref={listRef} className="max-w-5xl space-y-6 md:space-y-8">
        {timelineGroups.map((group) => (
          <TimelineGroupBlock key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
