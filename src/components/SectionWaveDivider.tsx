interface SectionWaveDividerProps {
  className?: string;
}

export default function SectionWaveDivider({ className = "" }: SectionWaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative -mt-px h-12 overflow-hidden md:h-16 ${className}`}
    >
      <svg
        className="section-wave-divider absolute inset-0 h-full w-[200%]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,48C120,80,240,96,360,88C480,80,600,48,720,44C840,40,960,64,1080,76C1200,88,1320,88,1440,68V120H0Z"
          fill="hsl(var(--background))"
          opacity="0.92"
        />
      </svg>
    </div>
  );
}
