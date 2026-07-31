import { useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";

const REFRESH_URL = import.meta.env.VITE_STATS_REFRESH_URL as string | undefined;
const COOLDOWN_STORAGE_KEY = "statsRefreshCooldownUntil";

type Status = "idle" | "loading" | "success" | "rate_limited" | "error";

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function readStoredCooldown(): number {
  const raw = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
  const until = raw ? Number(raw) : 0;
  return Number.isFinite(until) ? until : 0;
}

export default function StatsRefreshButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startCountdown = (untilTimestamp: number) => {
    window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(untilTimestamp));

    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((untilTimestamp - Date.now()) / 1000));
      setRemainingSeconds(remaining);
      if (remaining <= 0 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, 1000);
  };

  useEffect(() => {
    const until = readStoredCooldown();
    if (until > Date.now()) startCountdown(until);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  if (!REFRESH_URL) return null;

  const onCooldown = remainingSeconds > 0;

  const handleClick = async () => {
    if (onCooldown || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch(REFRESH_URL, { method: "POST" });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setStatus("success");
        startCountdown(Date.now() + (data.cooldownSeconds ?? 900) * 1000);
      } else if (res.status === 429) {
        setStatus("rate_limited");
        startCountdown(Date.now() + (data?.retryAfterSeconds ?? 60) * 1000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const label = () => {
    if (status === "loading") return "Demande en cours...";
    if (onCooldown && status === "success") return `Actualisé - réessayer dans ${formatCountdown(remainingSeconds)}`;
    if (onCooldown) return `Réessayer dans ${formatCountdown(remainingSeconds)}`;
    if (status === "error") return "Échec - réessayer";
    return "Actualiser les scores";
  };

  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3.5 py-2.5 sm:px-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={onCooldown || status === "loading"}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {status === "loading" ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <RefreshCw size={13} />
        )}
        {label()}
      </button>

      {status === "error" && (
        <span className="text-[11px] text-rose-400/80">Réessaie dans un instant</span>
      )}
    </div>
  );
}
