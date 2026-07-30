import type { TimelineFormation } from "./types";

interface FormationCardProps {
  formation: TimelineFormation;
}

export default function FormationCard({ formation }: FormationCardProps) {
  return (
    <div className="rounded-2xl bg-background/70 border border-border/70 p-5 md:p-6 h-full">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wider bg-badge text-badge-foreground">
          Formation
        </span>
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {formation.period}
        </span>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{formation.title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-2">
        {formation.org}
        {formation.location ? ` · ${formation.location}` : ""}
      </p>
      <p className="text-sm text-foreground/80 leading-relaxed">{formation.description}</p>
    </div>
  );
}
