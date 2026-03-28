import { useEffect, useRef, lazy, Suspense, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronDown, Mouse } from "lucide-react";

const LaptopScene = lazy(() => import("@/components/LaptopScene"));

type HeroSectionProps = {
    onSceneReady?: () => void;
    onSceneProgress?: (value: number) => void;
};

export default function HeroSection({
                                        onSceneReady,
                                        onSceneProgress,
                                    }: HeroSectionProps) {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const handleReady = useCallback(() => {
        onSceneReady?.();
    }, [onSceneReady]);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

        const update = () => {
            setIsMobile(media.matches);
            setPrefersReducedMotion(reducedMotionMedia.matches);
        };

        update();
        media.addEventListener("change", update);
        reducedMotionMedia.addEventListener("change", update);

        return () => {
            media.removeEventListener("change", update);
            reducedMotionMedia.removeEventListener("change", update);
        };
    }, []);

    useEffect(() => {
        if (!nameRef.current || !badgeRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(nameRef.current, {
            y: isMobile ? 14 : 80,
            opacity: 0,
            duration: isMobile ? 0.32 : 1,
            delay: isMobile ? 0 : 0.2,
            clearProps: "transform,opacity",
        }).from(
            badgeRef.current,
            {
                y: isMobile ? 6 : 18,
                opacity: 0,
                rotation: isMobile ? 0 : -4,
                duration: isMobile ? 0.24 : 0.6,
                clearProps: "transform,opacity",
            },
            isMobile ? "-=0.1" : "-=0.35"
        );

        if (!prefersReducedMotion && !isMobile && scrollRef.current) {
            tl.from(
                scrollRef.current,
                { y: 12, opacity: 0, duration: 0.5, clearProps: "transform,opacity" },
                "-=0.15"
            );
        }

        return () => {
            tl.kill();
        };
    }, [isMobile, prefersReducedMotion]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0a1020]">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a1020_0%,#0b1630_38%,#0a1020_100%)]" />

                <div className="absolute right-[-10%] top-[8%] h-[70vh] w-[70vw] rounded-full bg-[#2563eb]/25 blur-[120px] md:bg-[#1d4ed8]/20 md:blur-[140px]" />
                <div className="absolute right-[10%] top-[22%] h-[45vh] w-[35vw] rounded-full bg-[#38bdf8]/18 blur-[90px] md:bg-[#38bdf8]/10 md:blur-[120px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1020]/20 via-transparent to-[#0a1020]/10 md:hidden" />

                <Suspense fallback={null}>
                    <LaptopScene onReady={handleReady} />
                </Suspense>
            </div>

            <div className="relative z-10 min-h-screen">
                <div className="absolute left-5 right-5 top-20 sm:left-6 sm:right-6 md:left-20 md:right-auto md:top-[52%] md:w-[520px] md:-translate-y-1/2 lg:left-24 lg:w-[560px] xl:left-28 xl:w-[620px]">
                    <h1
                        ref={nameRef}
                        className="inline-block text-[2.7rem] font-black leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-[5.3rem] lg:text-[6rem] xl:text-[6.6rem]"
                    >
                        Arthur
                        <br />
                        <span className="uppercase">Bouchaud</span>
                    </h1>

                    <div ref={badgeRef} className="mt-4 sm:mt-5 md:mt-6">
                        <span className="inline-block rotate-[-5deg] rounded-sm bg-[#1e3a8a] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] sm:px-4 sm:text-xs md:px-5 md:py-2.5 md:text-[1rem]">
                            Expert en cybersécurité
                        </span>
                    </div>
                </div>

                {!isMobile && (
                    <div
                        ref={scrollRef}
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 ${prefersReducedMotion ? "" : "animate-float"}`}
                    >
                        <Mouse size={20} />
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>
        </section>
    );
}