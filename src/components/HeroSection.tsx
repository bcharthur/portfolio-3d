import { useEffect, useRef, lazy, Suspense, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronDown, Mouse } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import SceneLoader from "@/components/SceneLoader";

const LaptopScene = lazy(() => import("@/components/LaptopScene"));

export default function HeroSection() {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const handleReady = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleProgress = useCallback((value: number) => {
        setProgress(value);
    }, []);

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
        if (!nameRef.current || !badgeRef.current || !scrollRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(nameRef.current, {
            y: isMobile ? 26 : 80,
            opacity: 0,
            duration: isMobile ? 0.55 : 1,
            delay: isMobile ? 0.05 : 0.2,
            clearProps: "transform,opacity",
        }).from(
            badgeRef.current,
            {
                scale: isMobile ? 0.96 : 0.8,
                opacity: 0,
                rotation: isMobile ? 0 : -5,
                duration: isMobile ? 0.4 : 0.6,
                clearProps: "transform,opacity",
            },
            "-=0.25"
        );

        if (!prefersReducedMotion) {
            tl.from(
                scrollRef.current,
                { y: 12, opacity: 0, duration: isMobile ? 0.35 : 0.5, clearProps: "transform,opacity" },
                "-=0.15"
            );
        }

        return () => {
            tl.kill();
        };
    }, [isLoaded, isMobile, prefersReducedMotion]);

    return (
        <>
            {!isMobile && <SplashScreen isVisible={!isLoaded} progress={progress} />}

            <section className="relative min-h-screen overflow-hidden bg-[#0a1020]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute right-[-10%] top-[8%] h-[70vh] w-[70vw] rounded-full bg-[#1d4ed8]/20 blur-[140px]" />
                    <div className="absolute right-[10%] top-[22%] h-[45vh] w-[35vw] rounded-full bg-[#38bdf8]/10 blur-[120px]" />

                    <Suspense fallback={null}>
                        <SceneLoader onReady={handleReady} onProgress={handleProgress} />
                        <LaptopScene />
                    </Suspense>
                </div>

                <div className="relative z-10 min-h-screen">
                    <div className="absolute left-5 top-[16%] sm:left-6 md:top-[46%] md:-translate-y-1/2 md:left-16 lg:left-24 xl:left-32 max-w-[85vw] md:max-w-none">
                        <h1
                            ref={nameRef}
                            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-white will-change-transform"
                        >
                            Arthur <br />
                            <span className="uppercase">Bouchaud</span>
                        </h1>

                        <div
                            ref={badgeRef}
                            className="inline-block mt-3 md:mt-4 bg-[#1e3a8a] text-white px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-base font-bold uppercase tracking-[0.18em] will-change-transform"
                        >
                            Expert en Cybersécurité
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 ${prefersReducedMotion ? "" : "animate-float"}`}
                    >
                        <Mouse size={20} />
                        <ChevronDown size={16} />
                    </div>
                </div>
            </section>
        </>
    );
}
