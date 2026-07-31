import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import CertificationsSection from "@/components/CertificationsSection";
import CtfSection from "@/components/CtfSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SectionWaveDivider from "@/components/SectionWaveDivider";
import { useAssetsPreload } from "@/hooks/useAssetsPreload";
import { getHeroVideoUrl } from "@/lib/media";

const BackToTop = lazy(() => import("@/components/BackToTop"));

gsap.registerPlugin(ScrollTrigger);

const SPLASH_EXIT_MS = 700;
const HERO_START_DELAY_MS = 760;
// Small anti-flash floor only - the splash still hides exactly when the
// media below reports done, this just avoids an instant blink on repeat
// visits where everything is already cached.
const MIN_SPLASH_MS = 500;

const BASE = import.meta.env.BASE_URL;
// Every heavy asset the hero + about sections actually render. Preloading
// them here gives real byte-weighted progress AND warms the HTTP cache, so
// the Three.js loaders and the <video> element that consume them right
// after resolve instantly instead of re-downloading.
const CRITICAL_ASSETS = [
    getHeroVideoUrl(),
    `${BASE}models/arthur.glb`,
    `${BASE}images/kali.jpg`,
    `${BASE}textures/rootme-logo.png`,
    `${BASE}textures/affiche-esd.jpg`,
    `${BASE}textures/eni.png`,
];

export default function Index() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [sceneReady, setSceneReady] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [startHeroAnimation, setStartHeroAnimation] = useState(false);

    const { progress: assetsProgress, done: assetsDone } = useAssetsPreload(CRITICAL_ASSETS);

    const mediaReady = sceneReady && assetsDone;
    const isVisible = !(mediaReady && minTimeElapsed);

    const progress = useMemo(() => {
        if (!isVisible) return 100;
        return Math.min(99, Math.max(0, assetsProgress));
    }, [isVisible, assetsProgress]);

    useEffect(() => {
        const timer = window.setTimeout(() => setMinTimeElapsed(true), MIN_SPLASH_MS);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    // Keep the page content out of the tab order and off-limits to
    // assistive tech while the splash overlay sits on top of it.
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.inert = isVisible;
        }
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            setStartHeroAnimation(false);
            return;
        }

        const timer = window.setTimeout(() => {
            requestAnimationFrame(() => {
                setStartHeroAnimation(true);
            });
        }, HERO_START_DELAY_MS);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) return;

        const refreshAfterReveal = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            window.setTimeout(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        ScrollTrigger.refresh();
                    });
                });
            }, SPLASH_EXIT_MS);
        };

        refreshAfterReveal();
    }, [isVisible]);

    return (
        <>
            <SplashScreen isVisible={isVisible} progress={progress} />

            <div ref={contentRef} className="relative">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Aller au contenu principal
                </a>

                <Navbar />

                <main id="main-content">
                    <HeroSection
                        onSceneReady={() => setSceneReady(true)}
                        startAnimation={startHeroAnimation}
                    />
                    <AboutSection />
                    <SectionWaveDivider className="opacity-90" />
                    <TimelineSection />
                    <SectionWaveDivider className="opacity-85" />
                    <CertificationsSection />
                    <SectionWaveDivider className="opacity-85" />
                    <CtfSection />
                    <SectionWaveDivider className="opacity-80" />
                    <ProjectsSection />
                    <SectionWaveDivider className="opacity-80" />
                    <ContactSection />
                </main>

                <Suspense fallback={null}>
                    <BackToTop />
                </Suspense>
            </div>
        </>
    );
}
