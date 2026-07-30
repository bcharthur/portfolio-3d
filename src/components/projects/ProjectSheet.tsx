import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectItem } from "./types";

interface ProjectSheetProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  const [displayProject, setDisplayProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (project) setDisplayProject(project);
  }, [project]);

  const infoBlocks: Array<[string, string]> = displayProject
    ? [
        ["Contexte", displayProject.context],
        ["Démarche", displayProject.approach],
        ["Automatisation", displayProject.automation],
        ["Remédiation", displayProject.remediation],
      ]
    : [];

  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[92vw] max-h-[88vh] overflow-y-auto overflow-x-hidden rounded-3xl border-border bg-background p-0 sm:rounded-3xl">
        {displayProject && (
          <div className="min-w-0 p-6 md:p-10">
            <span className="inline-flex rounded-full bg-badge px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-badge-foreground">
              {displayProject.category}
            </span>
            <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.22em] text-muted-foreground">
              {displayProject.source}
            </p>

            <DialogTitle className="mt-4 max-w-2xl text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-foreground">
              {displayProject.title}
            </DialogTitle>

            <div className="mt-5 flex flex-wrap gap-2">
              {displayProject.techniques.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs md:text-sm text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-base md:text-lg leading-7 text-foreground/85">
              {displayProject.summary}
            </p>
            <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-muted-foreground">
              {displayProject.impact}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {infoBlocks.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-secondary/60 p-5 md:p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
                  <p className="mt-3 text-sm md:text-base leading-6 text-foreground/85">{value}</p>
                </div>
              ))}
            </div>

            {displayProject.snippet && (
              <div className="mt-6 rounded-2xl bg-foreground p-5 md:p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-background/55">
                  {displayProject.snippet.label}
                </p>
                <pre className="overflow-x-auto text-xs md:text-sm leading-6 text-background/90">
                  <code>{displayProject.snippet.code}</code>
                </pre>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-5 md:p-6">
              <p className="max-w-md text-xs md:text-sm leading-6 text-muted-foreground">
                Écrit dans le respect des règles Root-Me : cette fiche présente uniquement la
                méthodologie et les enseignements, sans flag ni solution complète.
              </p>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-background transition-opacity hover:opacity-90"
              >
                En discuter
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
