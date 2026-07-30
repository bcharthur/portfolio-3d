import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { ProjectItem } from "./types";

type ProjectSheetProps = {
  project: ProjectItem | null;
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

  if (!project || !isMounted) return null;

  const infoBlocks: Array<[string, string]> = [
    ["Contexte", project.context],
    ["Démarche", project.approach],
    ["Automatisation", project.automation],
    ["Remédiation", project.remediation],
  ];

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
        <div className={`h-full overflow-y-auto bg-gradient-to-br ${project.color}`}>
          <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-12 pt-6 md:px-10 md:pb-16 md:pt-8 lg:px-16">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-white/65">
                {project.source}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/20"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <h3
              id="project-sheet-title"
              className="mt-4 max-w-[16ch] text-4xl md:text-6xl leading-[1.02] font-bold tracking-tight text-white"
            >
              {project.title}
            </h3>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.techniques.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs md:text-sm text-white/95"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-8 text-lg md:text-xl leading-8 text-white/92 max-w-3xl">
              {project.summary}
            </p>
            <p className="mt-3 text-base leading-7 text-white/78 max-w-3xl">{project.impact}</p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {infoBlocks.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/8 p-5 md:p-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">{label}</p>
                  <p className="mt-3 text-sm md:text-base leading-7 text-white/88">{value}</p>
                </div>
              ))}
            </div>

            {project.snippet && (
              <div className="mt-6 rounded-2xl bg-black/30 p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.26em] text-white/55 mb-3">
                  {project.snippet.label}
                </p>
                <pre className="overflow-x-auto text-xs md:text-sm leading-6 text-white/85">
                  <code>{project.snippet.code}</code>
                </pre>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/8 p-5 md:p-6">
              <p className="text-xs md:text-sm leading-6 text-white/70 max-w-md">
                Écrit dans le respect des règles Root-Me : cette fiche présente uniquement la
                méthodologie et les enseignements, sans flag ni solution complète.
              </p>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-900 transition-transform hover:-translate-y-0.5"
              >
                En discuter
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
