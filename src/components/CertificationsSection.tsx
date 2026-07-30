import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificationBadge from "@/components/certifications/CertificationBadge";
import { certifications } from "@/components/certifications/certifications-data";

gsap.registerPlugin(ScrollTrigger);

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = certifications.find((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

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

      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section id="certifications" ref={sectionRef} className="px-6 md:px-16 lg:px-24 py-20 md:py-24">
      <h2
        ref={titleRef}
        className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-10 md:mb-14"
      >
        Certifications
      </h2>

      {featured && (
        <div
          ref={featuredRef}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-foreground text-background p-6 md:p-8"
        >
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-background/60 mb-2">
              Certification active
            </p>
            <h3 className="text-xl md:text-2xl font-bold mb-1">{featured.name}</h3>
            <p className="text-sm md:text-base text-background/70">
              {featured.issuer}
              {featured.credentialId ? ` · ${featured.credentialId}` : ""} · Émise{" "}
              {featured.date}
              {featured.expires ? ` · Expire ${featured.expires}` : ""}
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-background/30 px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wider">
            Prochaine étape : CSNE
          </span>
        </div>
      )}

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {rest.map((certification) => (
          <CertificationBadge key={certification.name} certification={certification} />
        ))}
      </div>
    </section>
  );
}
