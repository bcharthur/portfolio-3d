import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const BackToTop = lazy(() => import("@/components/BackToTop"));

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

function waitForFonts() {
    if ("fonts" in document) {
        return (document as Document & {
            fonts: { ready: Promise<unknown> };
        }).fonts.ready.then(() => undefined);
    }

    return Promise.resolve();
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
    const [showRestOfPage, setShowRestOfPage] = useState(false);

    const isVisible = useMemo(() => {
        return !(sceneReady && pageReady);
    }, [sceneReady, pageReady]);

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            waitForWindowLoad(),
            waitForFonts(),
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

            const timeout = window.setTimeout(() => {
                setShowRestOfPage(true);
            }, 250);

            return () => window.clearTimeout(timeout);
        }

        const interval = window.setInterval(() => {
            setProgress((prev) => {
                const limit = pageReady ? 92 : 78;
                if (prev >= limit) return prev;
                return prev + Math.max(1, Math.round((limit - prev) * 0.14));
            });
        }, 90);

        return () => window.clearInterval(interval);
    }, [isVisible, pageReady]);

    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    return (
        <>
            <SplashScreen isVisible={isVisible} progress={progress} />

            <div className="relative">
                <Navbar />
                <HeroSection onSceneReady={() => setSceneReady(true)} />

                {showRestOfPage && (
                    <Suspense fallback={null}>
                        <AboutSection />
                        <ProjectsSection />
                        <ContactSection />
                        <BackToTop />
                    </Suspense>
                )}
            </div>
        </>
    );
}