import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight, Linkedin, Github, Bug } from "lucide-react";
import { siteSections } from "@/lib/sections";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arthur-bouchaud-a74981238", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/bcharthur", icon: Github },
  { label: "YesWeHack", href: "https://yeswehack.com/hunters/br0nson", icon: Bug },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
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

      if (socialRef.current) {
        gsap.fromTo(
            socialRef.current,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              delay: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
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
          Travaillons
          <br />
          <span className="italic">ensemble !</span>
        </h2>

        <a
            ref={ctaRef}
            href="mailto:art.bouchaud@gmail.com"
            className="mt-12 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-lg font-semibold hover:gap-5 transition-all duration-300 group"
        >
          <Mail size={20} />
          Commencer un nouveau projet
          <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>

        <div ref={socialRef} className="mt-10 flex items-center gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon size={18} />
                {label}
              </a>
          ))}
        </div>

        <footer
            ref={footerRef}
            className="mt-24 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground"
        >
          {siteSections.map((section) => (
              <button
                  key={section.id}
                  onClick={() =>
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-foreground transition-colors"
              >
                {section.label}
              </button>
          ))}
        </footer>
      </section>
  );
}