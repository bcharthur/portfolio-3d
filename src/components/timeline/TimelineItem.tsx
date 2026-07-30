import { ArrowUpRight } from "lucide-react";
import type { TimelineEntry } from "./types";

interface TimelineItemProps {
  entry: TimelineEntry;
}

export default function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <div className="relative pl-8 md:pl-10">
      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />

      <div className="flex flex-wrap items-center gap-2.5 mb-2">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {entry.period}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wider ${
            entry.type === "education"
              ? "bg-badge text-badge-foreground"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {entry.type === "education" ? "Formation" : "Expérience"}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{entry.title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-2">
        {entry.org}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
        {entry.description}
      </p>

      {entry.href && (
        <a
          href={entry.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
        >
          Voir le profil
          <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}
