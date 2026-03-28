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
                y: isMobile ? 6 : 0,
                scale: isMobile ? 1 : 0.8,
                opacity: 0,
                rotation: isMobile ? 0 : -5,
                duration: isMobile ? 0.24 : 0.6,
                clearProps: "transform,opacity",
            },
            isMobile ? "-=0.1" : "-=0.25"
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
        <>
            {!isMobile && <SplashScreen isVisible={!isLoaded} progress={progress} />}

            <section className="relative min-h-screen overflow-hidden bg-[#102a5c]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a1020_0%,#0b1630_38%,#0a1020_100%)]"/>

                    <div
                        className="absolute right-[-10%] top-[8%] h-[70vh] w-[70vw] rounded-full bg-[#2563eb]/25 blur-[120px] md:bg-[#1d4ed8]/20 md:blur-[140px]"/>
                    <div
                        className="absolute right-[10%] top-[22%] h-[45vh] w-[35vw] rounded-full bg-[#38bdf8]/18 blur-[90px] md:bg-[#38bdf8]/10 md:blur-[120px]"/>
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#0a1020]/20 via-transparent to-[#0a1020]/10 md:hidden"/>

                    <Suspense fallback={null}>
                        <SceneLoader onReady={handleReady} onProgress={handleProgress}/>
                        <LaptopScene/>
                    </Suspense>
                </div>

                <div className="relative z-10 min-h-screen">
                    <div
                        className="absolute left-5 right-5 top-20 sm:left-6 sm:right-6 md:top-[46%] md:right-auto md:max-w-none md:-translate-y-1/2 md:left-16 lg:left-24 xl:left-32">
                        <h1
                            ref={nameRef}
                            className="inline-block rounded-2xl bg-[#08101f]/32 px-3 py-2 text-[2.6rem] font-bold leading-[0.95] tracking-tight text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:text-5xl md:bg-transparent md:px-0 md:py-0 md:text-6xl md:shadow-none md:backdrop-blur-0 lg:text-7xl"
                        >
                            Arthur <br/>
                            <span className="uppercase">Bouchaud</span>
                        </h1>

                        <div
                            ref={badgeRef}
                            className="inline-block mt-3 rounded-md bg-[#f59e0b] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_6px_18px_rgba(245,158,11,0.28)] sm:text-xs md:mt-4 md:bg-[#1e3a8a] md:px-4 md:py-2 md:text-base md:shadow-none"
                        >
                            Expert en Cybersécurité
                        </div>
                    </div>

                    {!isMobile && (
                        <div
                            ref={scrollRef}
                            className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 ${prefersReducedMotion ? "" : "animate-float"}`}
                        >
                            <Mouse size={20}/>
                            <ChevronDown size={16}/>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}