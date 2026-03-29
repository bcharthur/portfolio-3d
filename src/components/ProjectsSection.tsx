import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Projet 3D",
    description: "Expérience WebGL immersive",
    color: "from-badge to-accent",
  },
  {
    title: "App Mobile",
    description: "Application React Native",
    color: "from-accent to-badge",
  },
  {
    title: "Dashboard",
    description: "Interface d'analyse de données",
    color: "from-foreground/80 to-foreground/40",
  },
  {
    title: "E-commerce",
    description: "Boutique en ligne moderne",
    color: "from-badge/80 to-accent/60",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (labelRef.current) {
        gsap.fromTo(
            labelRef.current,
            { y: 14 },
            {
              y: 0,
              duration: 0.45,
              delay: 0.04,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 86%",
                once: true,
              },
            }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
            cardsRef.current.children,
            { y: 26 },
            {
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 88%",
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
          id="projects"
          ref={sectionRef}
          className="min-h-screen px-6 md:px-16 lg:px-24 py-20 md:py-24"
      >
        <h2
            ref={titleRef}
            className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-4"
        >
          Projets
        </h2>

        <p
            ref={labelRef}
            className="text-muted-foreground text-base md:text-lg mb-10 md:mb-16"
        >
          Selected
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((p) => (
              <a
                  key={p.title}
                  href="#"
                  className="group relative block rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-90`} />

                <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-accent-foreground">
                        {p.title}
                      </h3>
                      <p className="text-accent-foreground/70 text-xs md:text-sm mt-1">
                        {p.description}
                      </p>
                    </div>

                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-background/40 transition-colors">
                      <ArrowUpRight size={18} className="text-accent-foreground" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </a>
          ))}
        </div>
      </section>
  );
}