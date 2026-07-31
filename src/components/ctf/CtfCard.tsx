import { ArrowUpRight, Trophy } from "lucide-react";
import type { CtfResult } from "./types";

interface CtfCardProps {
  ctf: CtfResult;
}

export default function CtfCard({ ctf }: CtfCardProps) {
  const content = (
    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-secondary p-6 md:p-7 transition-colors duration-300 hover:bg-foreground hover:text-background">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/70">
          {ctf.date}
        </span>
        <Trophy size={18} className="text-accent" />
      </div>

      <h3 className="mb-2 text-lg md:text-xl font-bold leading-snug text-foreground group-hover:text-background">
        {ctf.name}
      </h3>

      <p className="mb-3 text-sm md:text-base font-semibold text-accent">{ctf.ranking}</p>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-background/80">
        {ctf.description}
      </p>

      {ctf.href && (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-background group-hover:gap-2.5 transition-all">
          Lire le récit
          <ArrowUpRight size={14} />
        </span>
      )}
    </div>
  );

  if (!ctf.href) return content;

  return (
    <a
      href={ctf.href}
      target="_blank"
      rel="noreferrer"
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </a>
  );
}
