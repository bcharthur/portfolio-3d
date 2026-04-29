import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import type { ProjectCaseStudy } from "./types";

type ProjectSheetProps = {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectSheet({ project, isOpen, onClose }: ProjectSheetProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    const timeout = window.setTimeout(() => setIsMounted(false), 360);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMounted, onClose]);

  const tags = useMemo(() => project?.tags ?? [], [project]);

  if (!project || !isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/35 backdrop-blur-[3px]"
        onClick={onClose}
        aria-label="Fermer le détail du projet"
      />

      <div
        className={`absolute inset-x-0 bottom-0 top-6 md:top-10 rounded-t-[2rem] md:rounded-t-[2.75rem] bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-sheet-title"
      >
        <div className={`h-full overflow-y-auto bg-gradient-to-br ${project.surfaceGradient}`}>
          <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-12 pt-6 md:px-10 md:pb-16 md:pt-8 lg:px-16">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/18"
                aria-label="Retour"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Get in touch
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/18"
                  aria-label="Fermer"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="grid gap-10 pt-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-14 lg:pt-16">
              <div>
                <p className="mb-5 text-sm uppercase tracking-[0.32em] text-white/65">
                  {project.category}
                </p>
                <h3
                  id="project-sheet-title"
                  className="max-w-[10ch] text-5xl md:text-7xl leading-[0.95] font-bold tracking-tight text-white"
                >
                  {project.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 text-white/92">
                <p className="text-lg md:text-[1.55rem] leading-9">{project.shortDescription}</p>
                <p className="text-base md:text-lg leading-8 text-white/82">{project.cardInsight}</p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition-transform hover:-translate-y-0.5"
                >
                  En parler
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] bg-white/8 p-5 md:mt-16 md:p-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Contexte", project.challenge],
                  ["Démarche", project.approach],
                  ["Automatisation", project.automation],
                  ["Impact", project.impact],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] bg-white/7 p-5">
                    <p className="text-sm uppercase tracking-[0.26em] text-white/55">{label}</p>
                    <p className="mt-4 text-sm md:text-base leading-7 text-white/88">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] bg-white/8 p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.26em] text-white/55">Remédiation</p>
                <p className="mt-4 text-base md:text-lg leading-8 text-white/88">{project.remediation}</p>
              </div>

              <div className="rounded-[2rem] bg-white/8 p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.26em] text-white/55">Positionnement</p>
                <p className="mt-4 text-base md:text-lg leading-8 text-white/88">
                  Ce case study est présenté comme une analyse technique issue d'un lab. Le focus
                  est volontairement mis sur la méthodologie, les scripts et les enseignements
                  sécurité, sans exposer de walkthrough complet ni d'élément sensible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
