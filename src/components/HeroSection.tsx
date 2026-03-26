import { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { ChevronDown, Mouse } from "lucide-react";

const LaptopScene = lazy(() => import("@/components/LaptopScene"));

export default function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(nameRef.current, { y: 80, opacity: 0, duration: 1, delay: 0.5 })
      .from(badgeRef.current, { scale: 0.8, opacity: 0, rotation: -5, duration: 0.6 }, "-=0.3")
      .from(scrollRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
  }, []);

  return (
      <section className="relative min-h-screen px-8 md:px-16 lg:px-24 pt-28 md:pt-32">
      {/* 3D Scene – fills the hero */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <LaptopScene />
        </Suspense>
      </div>

      {/* Title – bottom left, smaller */}
      <div className="relative z-10">
        <h1
          ref={nameRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground"
        >
          Arthur <span className="uppercase">Bouchaud</span>
        </h1>
        <div
          ref={badgeRef}
          className="inline-block mt-2 bg-badge text-badge-foreground px-3 py-1.5 text-xs md:text-sm font-bold uppercase tracking-widest"
          style={{ transform: "rotate(-2deg)" }}
        >
          Expert en Cybersécurité
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-float"
      >
        <Mouse size={20} />
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
