import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { ProjectItem } from "./types";

interface ProjectSheetProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  // Keep the last non-null project rendered during the close animation.
  // Computed at render time (not via useEffect) so DialogTitle/Description
  // are never briefly absent from the DOM on the frame the dialog opens.
  const lastProjectRef = useRef<ProjectItem | null>(null);
  if (project) lastProjectRef.current = project;
  const displayProject = project ?? lastProjectRef.current;

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
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed inset-2 sm:inset-5 md:inset-10 z-50 flex flex-col overflow-hidden rounded-2xl md:rounded-[2rem] border border-border bg-background shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Close className="absolute right-4 top-4 md:right-6 md:top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-border focus:outline-none focus:ring-2 focus:ring-ring">
            <X size={20} />
            <span className="sr-only">Fermer</span>
          </DialogPrimitive.Close>

          {displayProject && (
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <div className="mx-auto max-w-4xl px-6 py-8 md:px-14 md:py-14 lg:max-w-5xl lg:px-20 xl:max-w-6xl xl:px-24 2xl:max-w-7xl">
                <span className="inline-flex rounded-full bg-badge px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-badge-foreground">
                  {displayProject.category}
                </span>
                <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.22em] text-muted-foreground">
                  {displayProject.source}
                </p>

                <DialogTitle className="mt-4 max-w-3xl text-4xl md:text-6xl lg:max-w-4xl lg:text-7xl xl:max-w-5xl xl:text-8xl font-bold leading-[1.02] tracking-tight text-foreground">
                  {displayProject.title}
                </DialogTitle>

                <div className="mt-6 flex flex-wrap gap-2">
                  {displayProject.techniques.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs md:text-sm text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <DialogDescription className="mt-8 max-w-2xl text-lg md:text-xl leading-8 text-foreground/85 lg:max-w-3xl">
                  {displayProject.summary}
                </DialogDescription>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground lg:max-w-3xl">
                  {displayProject.impact}
                </p>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
                  {infoBlocks.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-border bg-secondary/60 p-6 md:p-7">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
                      <p className="mt-3 text-sm md:text-base leading-7 text-foreground/85">{value}</p>
                    </div>
                  ))}
                </div>

                {displayProject.snippet && (
                  <div className="mt-6 min-w-0 rounded-2xl bg-foreground p-6 md:p-7">
                    <p className="mb-3 text-xs uppercase tracking-[0.22em] text-background/55">
                      {displayProject.snippet.label}
                    </p>
                    <pre className="no-scrollbar overflow-x-auto text-xs md:text-sm leading-6 text-background/90">
                      <code>{displayProject.snippet.code}</code>
                    </pre>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-6 md:p-7">
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
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
