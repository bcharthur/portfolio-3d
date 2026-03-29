import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
            titleRef.current,
            { y: 24 },
            {
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                once: true,
              },
            }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
            ctaRef.current,
            { y: 16 },
            {
              y: 0,
              duration: 0.45,
              delay: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
            footerRef.current,
            { y: 12 },
            {
              y: 0,
              duration: 0.4,
              delay: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
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
          id="contact"
          ref={sectionRef}
          className="min-h-[70vh] flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-24 text-center"
      >
        <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.02]"
        >
          Let's work
          <br />
          <span className="italic">together!</span>
        </h2>

        <a
            ref={ctaRef}
            href="mailto:hello@example.com"
            className="mt-12 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-lg font-semibold hover:gap-5 transition-all duration-300 group"
        >
          <Mail size={20} />
          Start a new project
          <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>

        <footer
            ref={footerRef}
            className="mt-24 flex items-center gap-8 text-sm text-muted-foreground"
        >
          {["About", "Projects", "Contact"].map((s) => (
              <button
                  key={s}
                  onClick={() =>
                      document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-foreground transition-colors"
              >
                {s}
              </button>
          ))}
        </footer>
      </section>
  );
}