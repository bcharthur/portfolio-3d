import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      <div className="text-lg font-bold tracking-tight text-white mix-blend-difference drop-shadow-sm">
        {/*Portfolio*/}
      </div>
      <div className="hidden md:flex items-center gap-1 bg-secondary/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border">
        {["about", "projects", "contact"].map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="px-5 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-background/60 uppercase tracking-wider"
          >
            {s}
          </button>
        ))}
      </div>
      <button
        onClick={() => scrollTo("contact")}
        className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        GET IN TOUCH
      </button>
    </nav>
  );
}
