import type { Certification } from "./types";

interface CertificationBadgeProps {
  certification: Certification;
}

export default function CertificationBadge({ certification }: CertificationBadgeProps) {
  return (
    <div className="rounded-xl border border-border bg-secondary p-4 transition-colors duration-300 hover:bg-foreground hover:text-background group">
      <p className="text-sm font-semibold text-foreground group-hover:text-background leading-snug mb-1.5">
        {certification.name}
      </p>
      <p className="text-xs text-muted-foreground group-hover:text-background/70">
        {certification.issuer} · {certification.date}
      </p>
    </div>
  );
}
