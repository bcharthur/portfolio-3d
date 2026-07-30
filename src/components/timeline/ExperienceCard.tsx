import { ArrowUpRight } from "lucide-react";
import LogoBadge from "./LogoBadge";
import type { TimelineExperience } from "./types";

interface ExperienceCardProps {
  experience: TimelineExperience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="rounded-2xl bg-background/70 border border-border/70 p-5 md:p-6">
      <div className="flex items-start gap-4 mb-3">
        <LogoBadge
          src={experience.logo}
          alt={experience.org}
          fallbackInitial={experience.logoInitial ?? experience.org.charAt(0)}
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground">
              Expérience
            </span>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {experience.period}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{experience.title}</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {experience.org}
            {experience.location ? ` · ${experience.location}` : ""}
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed mb-3">{experience.description}</p>

      {experience.href && (
        <a
          href={experience.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
        >
          Voir le profil
          <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}
