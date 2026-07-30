import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCharacter from "./AboutCharacter";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "Cybersécurité",
    "Analyse de risques EBIOS RM",
    "Veille cybersécurité",
    "Gouvernance & Gestion des risques",
    "Développement full-stack",
    "Conception logicielle",
    "Communication",
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isMobile || prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { y: 22, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            }

            if (textRef.current) {
                gsap.fromTo(
                    textRef.current,
                    { y: 18, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        delay: 0.05,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 84%",
                            once: true,
                        },
                    }
                );
            }

            if (skillsRef.current) {
                gsap.fromTo(
                    skillsRef.current.children,
                    { y: 14, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.06,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: skillsRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="a-propos"
            ref={sectionRef}
            className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20 md:py-24"
        >
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-7xl leading-[1.05] font-bold tracking-tight text-foreground mb-6 md:mb-8"
                    >
                        À propos
                    </h2>

                    <p
                        ref={textRef}
                        className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 md:mb-12"
                    >
                        Ancien développeur full-stack, je me spécialise aujourd’hui en cybersécurité à travers mon alternance chez Covéa
                        et mon Bac+5 Expert en Sécurité Digitale. Après deux années en développement applicatif chez Groupama
                        Centre-Atlantique, j’ai choisi d’orienter mon parcours vers la sécurité des systèmes d’information.
                        J’interviens désormais sur des sujets d’analyse de risques EBIOS RM, de gestion des tiers et de veille cybersécurité,
                        avec une approche qui relie technique, rigueur et compréhension des besoins métier.
                    </p>

                    <div ref={skillsRef} className="flex flex-wrap gap-2.5 md:gap-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 md:px-5 md:py-2.5 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm font-medium border border-border hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <AboutCharacter />
                </div>
            </div>
        </section>
    );
}