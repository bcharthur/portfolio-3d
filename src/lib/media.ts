/**
 * Picks the best background-video format this browser can actually decode.
 * Some browsers (open-source Chromium builds, some Linux/Firefox distros)
 * ship without a licensed H.264 decoder - WebM/VP9 covers those, MP4/H.264
 * covers everyone else (including Safari, which has no VP9 support).
 */
export function getHeroVideoUrl(): string {
  const base = `${import.meta.env.BASE_URL}videos/videoplayback`;

  if (typeof document !== "undefined") {
    const probe = document.createElement("video");
    const canPlayMp4 = probe.canPlayType('video/mp4; codecs="avc1.640028"');
    if (canPlayMp4 === "probably" || canPlayMp4 === "maybe") {
      return `${base}.mp4`;
    }
    const canPlayWebm = probe.canPlayType('video/webm; codecs="vp9"');
    if (canPlayWebm === "probably" || canPlayWebm === "maybe") {
      return `${base}.webm`;
    }
  }

  return `${base}.mp4`;
}
