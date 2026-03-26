import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8,
      });
      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 30, opacity: 0, duration: 0.6, delay: 0.3,
      });
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
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-tight"
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
        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>

      <footer className="mt-24 flex items-center gap-8 text-sm text-muted-foreground">
        {["About", "Projects", "Contact"].map((s) => (
          <button
            key={s}
            onClick={() => document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </footer>
    </section>
  );
}
