import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const BackToTop = lazy(() => import("@/components/BackToTop"));

gsap.registerPlugin(ScrollTrigger);

function waitForWindowLoad() {
    return new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
            resolve();
            return;
        }

        const onLoad = () => {
            window.removeEventListener("load", onLoad);
            resolve();
        };

        window.addEventListener("load", onLoad);
    });
}

function waitMinimum(ms: number) {
    return new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

export default function Index() {
    const [sceneReady, setSceneReady] = useState(false);
    const [pageReady, setPageReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");

        const update = () => {
            setIsMobile(media.matches);
        };

        update();
        media.addEventListener("change", update);

        return () => {
            media.removeEventListener("change", update);
        };
    }, []);

    const isVisible = useMemo(() => {
        if (isMobile) {
            return !pageReady;
        }

        return !(sceneReady && pageReady);
    }, [isMobile, sceneReady, pageReady]);

    useEffect(() => {
        let cancelled = false;

        Promise.race([
            Promise.all([waitForWindowLoad(), waitMinimum(180)]),
            waitMinimum(900),
        ]).then(() => {
            if (!cancelled) {
                setPageReady(true);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!isVisible) {
            setProgress(100);
            return;
        }

        const interval = window.setInterval(() => {
            setProgress((prev) => {
                const limit = pageReady ? 92 : 78;
                if (prev >= limit) return prev;
                return prev + Math.max(1, Math.round((limit - prev) * 0.16));
            });
        }, 80);

        return () => window.clearInterval(interval);
    }, [isVisible, pageReady]);

    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) return;

        const refreshAfterReveal = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });
            });
        };

        refreshAfterReveal();
    }, [isVisible]);

    return (
        <>
            <SplashScreen isVisible={isVisible} progress={progress} />

            <div className="relative">
                <Navbar />
                <HeroSection
                    onSceneReady={() => setSceneReady(true)}
                    startAnimation={!isVisible}
                />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />

                <Suspense fallback={null}>
                    <BackToTop />
                </Suspense>
            </div>
        </>
    );
}