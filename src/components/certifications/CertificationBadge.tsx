import { ArrowUpRight } from "lucide-react";
import type { Certification } from "./types";

interface CertificationBadgeProps {
  certification: Certification;
}

export default function CertificationBadge({ certification }: CertificationBadgeProps) {
  const content = (
    <div className="rounded-xl border border-border bg-secondary p-4 transition-colors duration-300 hover:bg-foreground hover:text-background group h-full">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-semibold text-foreground group-hover:text-background leading-snug">
          {certification.name}
        </p>
        {certification.href && (
          <ArrowUpRight
            size={14}
            className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-background"
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground group-hover:text-background/70">
        {certification.issuer} · {certification.date}
      </p>
    </div>
  );

  if (!certification.href) return content;

  return (
    <a
      href={certification.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Voir le badge Credly : ${certification.name}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </a>
  );
}
