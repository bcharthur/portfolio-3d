import { useEffect, useRef, lazy, Suspense, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronDown, Mouse } from "lucide-react";

const LaptopScene = lazy(() => import("@/components/LaptopScene"));

type HeroSectionProps = {
    onSceneReady?: () => void;
    onSceneProgress?: (value: number) => void;
    startAnimation?: boolean;
};

export default function HeroSection({
                                        onSceneReady,
                                        onSceneProgress,
                                        startAnimation = false,
                                    }: HeroSectionProps) {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

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

        if (!startAnimation) {
            gsap.set([nameRef.current, badgeRef.current], {
                opacity: 0,
            });

            if (scrollRef.current) {
                gsap.set(scrollRef.current, {
                    opacity: 0,
                });
            }

            return;
        }

        if (isMobile === null || prefersReducedMotion === null) return;

        gsap.killTweensOf([nameRef.current, badgeRef.current, scrollRef.current]);

        if (isMobile || prefersReducedMotion) {
            gsap.set([nameRef.current, badgeRef.current], {
                opacity: 1,
            });

            gsap.fromTo(
                nameRef.current,
                {
                    y: 10,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.32,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                }
            );

            gsap.fromTo(
                badgeRef.current,
                {
                    y: 8,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.26,
                    delay: 0.06,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                }
            );

            return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
            nameRef.current,
            {
                y: 80,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2,
                clearProps: "transform,opacity",
            }
        ).fromTo(
            badgeRef.current,
            {
                y: 18,
                opacity: 0,
                rotation: -4,
            },
            {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.6,
                clearProps: "transform,opacity",
            },
            "-=0.35"
        );

        if (scrollRef.current) {
            tl.fromTo(
                scrollRef.current,
                {
                    y: 12,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    clearProps: "transform,opacity",
                },
                "-=0.15"
            );
        }

        return () => {
            tl.kill();
        };
    }, [isMobile, prefersReducedMotion, startAnimation]);

    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-[#0a1020]">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a1020_0%,#0b1630_38%,#0a1020_100%)]" />

                <div className="absolute right-[-8%] top-[10%] h-[42vh] w-[60vw] rounded-full bg-[#2563eb]/18 blur-[26px] md:right-[-10%] md:top-[8%] md:h-[70vh] md:w-[70vw] md:bg-[#2563eb]/25 md:blur-[140px]" />
                <div className="absolute right-[8%] top-[24%] h-[26vh] w-[28vw] rounded-full bg-[#38bdf8]/12 blur-[18px] md:right-[10%] md:top-[22%] md:h-[45vh] md:w-[35vw] md:bg-[#38bdf8]/18 md:blur-[120px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1020]/20 via-transparent to-[#0a1020]/10 md:hidden" />

                <Suspense fallback={null}>
                    <LaptopScene onReady={handleReady} />
                </Suspense>
            </div>

            <div className="relative z-10 min-h-[100svh]">
                <div className="px-5 pt-24 sm:px-6 md:absolute md:left-20 md:right-auto md:top-[52%] md:w-[520px] md:-translate-y-1/2 lg:left-24 lg:w-[560px] xl:left-28 xl:w-[620px]">
                    <h1
                        ref={nameRef}
                        className="inline-block text-[2.7rem] font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-5xl md:text-[5.3rem] lg:text-[6rem] xl:text-[6.6rem]"
                    >
                        Arthur
                        <br />
                        <span className="uppercase">Bouchaud</span>
                    </h1>

                    <div ref={badgeRef} className="mt-4 sm:mt-5 md:mt-6">
            <span className="inline-block rounded-sm bg-[#1e3a8a] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] sm:px-4 sm:text-xs md:rotate-[-5deg] md:px-5 md:py-2.5 md:text-[1rem]">
              Expert en cybersécurité
            </span>
                    </div>
                </div>

                {isMobile === false && (
                    <div
                        ref={scrollRef}
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 ${
                            prefersReducedMotion ? "" : "animate-float"
                        }`}
                    >
                        <Mouse size={20} />
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>
        </section>
    );
}