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
            .from(
                badgeRef.current,
                { scale: 0.8, opacity: 0, rotation: -5, duration: 0.6 },
                "-=0.3"
            )
            .from(scrollRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0a1020]">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute right-[-10%] top-[8%] h-[70vh] w-[70vw] rounded-full bg-[#1d4ed8]/20 blur-[140px]"/>
                <div
                    className="absolute right-[10%] top-[22%] h-[45vh] w-[35vw] rounded-full bg-[#38bdf8]/10 blur-[120px]"/>

                <Suspense fallback={null}>
                    <LaptopScene/>
                </Suspense>
            </div>

            <div className="relative z-10 min-h-screen">
                <div
                    className="absolute left-6 top-[20%] md:top-[46%] md:-translate-y-1/2 md:left-16 lg:left-24 xl:left-32">
                    <h1 className="text-7xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-white">
                        Arthur <br/>
                        <span className="uppercase">Bouchaud</span>
                    </h1>

                    <div
                        className="inline-block mt-3 md:mt-4 bg-[#1e3a8a] text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-bold uppercase tracking-widest">
                        Expert en Cybersécurité
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 animate-float"
                >
                    <Mouse size={20}/>
                    <ChevronDown size={16}/>
                </div>
            </div>
        </section>
    );
}