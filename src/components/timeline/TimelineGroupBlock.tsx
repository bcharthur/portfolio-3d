import FormationCard from "./FormationCard";
import ExperienceCard from "./ExperienceCard";
import type { TimelineGroup } from "./types";

interface TimelineGroupBlockProps {
  group: TimelineGroup;
}

export default function TimelineGroupBlock({ group }: TimelineGroupBlockProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-secondary/50 p-4 md:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 md:mb-5 px-1">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <h3 className="text-lg md:text-2xl font-bold text-foreground tracking-tight">
          {group.period}
        </h3>
        {group.formation && group.experiences.length > 0 && (
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.15em]">
            En parallèle
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {group.formation && <FormationCard formation={group.formation} />}

        <div className="flex flex-col gap-4">
          {group.experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
}
