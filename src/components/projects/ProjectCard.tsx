import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "./types";

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative block rounded-2xl overflow-hidden min-h-[24rem] md:min-h-[26rem] border border-white/10 text-left"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-95`} />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-7 text-accent-foreground">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex w-fit rounded-full bg-background/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/90 backdrop-blur-sm">
            {project.category}
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/15 transition-colors group-hover:bg-background/30">
            <ArrowUpRight size={18} className="text-accent-foreground" />
          </span>
        </div>

        <div>
          <h3 className="max-w-[18ch] text-2xl md:text-3xl font-bold leading-tight mb-4">
            {project.title}
          </h3>

          <p className="text-sm md:text-base text-accent-foreground/85 leading-relaxed mb-5 max-w-[50ch]">
            {project.summary}
          </p>

          <p className="text-xs md:text-sm text-accent-foreground/75 leading-relaxed mb-6 max-w-[52ch]">
            {project.impact}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techniques.map((technique) => (
              <span
                key={technique}
                className="rounded-full border border-white/20 bg-background/10 px-3 py-1 text-xs md:text-sm text-accent-foreground/90"
              >
                {technique}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
    </button>
  );
}
