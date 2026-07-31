import { forwardRef, useState } from "react";
import { Hexagon, TrendingDown, TrendingUp } from "lucide-react";
import stats from "@/data/stats.json";
import StatsRefreshButton from "@/components/StatsRefreshButton";

const BASE = import.meta.env.BASE_URL;

type PlatformRow = {
  key: string;
  name: string;
  pseudo: string;
  score: number;
  rank: number;
  trend7d: number | null;
  url: string;
};

function buildRows(): PlatformRow[] {
  const rows: PlatformRow[] = [];

  if (stats.rootMe) {
    rows.push({
      key: "root-me",
      name: "Root-Me",
      pseudo: stats.rootMe.pseudo,
      score: stats.rootMe.score,
      rank: stats.rootMe.rank,
      trend7d: stats.rootMe.trend7d,
      url: stats.rootMe.url,
    });
  }

  if (stats.cyberLearning) {
    rows.push({
      key: "cyber-learning",
      name: "Cyber Learning",
      pseudo: stats.cyberLearning.pseudo,
      score: stats.cyberLearning.score,
      rank: stats.cyberLearning.rank,
      trend7d: stats.cyberLearning.trend7d,
      url: stats.cyberLearning.url,
    });
  }

  return rows;
}

// Drop the real Cyber-Learning logo in at public/textures/cyberlearning-icon.png
// (same treatment as rootme-icon.png: transparent background, cropped tight to
// the mark) and it's picked up automatically - no other code change needed.
// Falls back to a generic hexagon icon until that file exists.
function CyberLearningIcon() {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <Hexagon className="h-6 w-6 text-sky-500" strokeWidth={2.2} />;
  }

  return (
    <img
      src={`${BASE}textures/cyberlearning-icon.png`}
      alt=""
      className="h-7 w-7 object-contain"
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
    />
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "root-me") {
    return (
      <img
        src={`${BASE}textures/rootme-icon.png`}
        alt=""
        className="h-7 w-7 object-contain"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return <CyberLearningIcon />;
}

function TrendValue({ trend7d }: { trend7d: number | null }) {
  if (trend7d === null) {
    return <span className="text-sm font-semibold text-white/40">-</span>;
  }

  if (trend7d === 0) {
    return <span className="text-sm font-semibold text-white/50">= (7j)</span>;
  }

  const isUp = trend7d > 0;
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold ${
        isUp ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      <Icon size={14} />
      {isUp ? "+" : ""}
      {trend7d}
      <span className="text-xs font-normal text-white/40">(7j)</span>
    </span>
  );
}

const HeroStatsCard = forwardRef<HTMLDivElement>(function HeroStatsCard(_props, ref) {
  const rows = buildRows();
  if (rows.length === 0) return null;

  return (
    <div
      ref={ref}
      className="w-full max-w-md divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1630]/80 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm"
    >
      {rows.map((row) => (
        <a
          key={row.key}
          href={row.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-3 p-3.5 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-center sm:gap-4 sm:p-4"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              <PlatformIcon platform={row.key} />
            </span>

            <span className="min-w-0">
              <span className="block whitespace-nowrap text-sm font-bold text-white">{row.name}</span>
              <span className="block whitespace-nowrap text-xs text-white/50">{row.pseudo}</span>
            </span>
          </span>

          <span className="flex items-center justify-between gap-4 sm:ml-auto sm:justify-end sm:gap-6">
            <span className="text-center">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Score
              </span>
              <span className="block whitespace-nowrap text-sm font-bold text-emerald-400">
                {row.score} pts
              </span>
            </span>

            <span className="text-center">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Rang
              </span>
              <span className="block whitespace-nowrap text-sm font-bold text-sky-400">#{row.rank}</span>
            </span>

            <span className="text-center">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Tendance
              </span>
              <TrendValue trend7d={row.trend7d} />
            </span>
          </span>
        </a>
      ))}

      <StatsRefreshButton />
    </div>
  );
});

export default HeroStatsCard;
