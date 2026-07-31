import { useState } from "react";

interface LogoBadgeProps {
  src?: string;
  alt: string;
  fallbackInitial: string;
}

export default function LogoBadge({ src, alt, fallbackInitial }: LogoBadgeProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
        {fallbackInitial}
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
