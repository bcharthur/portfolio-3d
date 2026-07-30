import { useEffect, useRef, useState } from "react";

interface AssetsProgress {
  progress: number;
  done: boolean;
}

interface AssetState {
  loaded: number;
  total: number;
  done: boolean;
}

/**
 * Downloads a fixed list of URLs with `fetch`, reporting a real byte-weighted
 * progress (sum of bytes loaded / sum of bytes expected across all of them).
 * This also warms the browser HTTP cache, so the actual consumers of these
 * assets (Three.js loaders, the hero's <video> element) resolve instantly
 * once this hook reports `done`.
 *
 * Fails open per-asset: a request that errors out is counted as done with
 * whatever bytes it had, so one bad network hiccup can't hang the loader.
 */
export function useAssetsPreload(urls: string[]): AssetsProgress {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    const states = new Map<string, AssetState>(
      urls.map((url) => [url, { loaded: 0, total: 0, done: false }]),
    );

    const recompute = () => {
      if (cancelled) return;
      let loaded = 0;
      let total = 0;
      let allDone = true;
      for (const state of states.values()) {
        loaded += state.loaded;
        total += state.total;
        if (!state.done) allDone = false;
      }
      setProgress(total > 0 ? Math.min(100, (loaded / total) * 100) : 0);
      if (allDone) setDone(true);
    };

    const downloadOne = async (url: string) => {
      const state = states.get(url)!;
      try {
        const response = await fetch(url);
        const total = Number(response.headers.get("content-length")) || 0;
        const reader = response.body?.getReader();

        state.total = total;

        if (!reader || total === 0) {
          await response.blob();
          state.loaded = total;
          state.done = true;
          recompute();
          return;
        }

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          state.loaded += value.length;
          recompute();
        }

        state.done = true;
        recompute();
      } catch {
        state.done = true;
        recompute();
      }
    };

    Promise.all(urls.map(downloadOne));

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { progress, done };
}
