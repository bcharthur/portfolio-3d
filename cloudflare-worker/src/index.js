// Cloudflare Worker: lets portfolio visitors request a fresh Root-Me /
// Cyber-Learning stats scrape without exposing a GitHub token to the
// browser. The token lives only as a Worker secret (env.GITHUB_TOKEN),
// never shipped in any client-side JS.
//
// Rate limiting, two layers:
//  - per-visitor: one trigger per PER_IP_COOLDOWN_SECONDS, keyed by
//    CF-Connecting-IP in Workers KV
//  - global: one trigger per GLOBAL_COOLDOWN_SECONDS regardless of who's
//    asking, so this can't be used to hammer GitHub Actions minutes or
//    Root-Me/Cyber-Learning even by rotating IPs
//
// On success, it POSTs a workflow_dispatch for update-stats.yml, the
// same Action that already runs on a daily schedule. That Action scrapes,
// commits src/data/stats.json if it changed, and (per its own logic)
// kicks the GitHub Pages deploy workflow - so the fresh numbers land on
// the live site a couple of minutes after the request, not instantly.

const OWNER = "bcharthur";
const REPO = "portfolio-3d";
const WORKFLOW_FILE = "update-stats.yml";
const REF = "master";

const PER_IP_COOLDOWN_SECONDS = 15 * 60; // 15 minutes
const GLOBAL_COOLDOWN_SECONDS = 2 * 60; // 2 minutes

const ALLOWED_ORIGINS = new Set([
  "https://bcharthur.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4174",
  "http://127.0.0.1:4174",
]);

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://bcharthur.github.io";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "method_not_allowed" }, 405, origin);
    }

    const now = Date.now();

    // Global cooldown first - cheapest check, protects the shared resource
    // regardless of how many distinct IPs might be involved.
    const globalKey = "cooldown:global";
    const globalLast = await env.STATS_REFRESH_KV.get(globalKey);
    if (globalLast && now - Number(globalLast) < GLOBAL_COOLDOWN_SECONDS * 1000) {
      const retryAfterSeconds = Math.ceil(
        (GLOBAL_COOLDOWN_SECONDS * 1000 - (now - Number(globalLast))) / 1000
      );
      return json({ ok: false, error: "rate_limited", scope: "global", retryAfterSeconds }, 429, origin);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ipKey = `cooldown:ip:${ip}`;
    const ipLast = await env.STATS_REFRESH_KV.get(ipKey);
    if (ipLast && now - Number(ipLast) < PER_IP_COOLDOWN_SECONDS * 1000) {
      const retryAfterSeconds = Math.ceil(
        (PER_IP_COOLDOWN_SECONDS * 1000 - (now - Number(ipLast))) / 1000
      );
      return json({ ok: false, error: "rate_limited", scope: "ip", retryAfterSeconds }, 429, origin);
    }

    const dispatchRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-stats-refresh-worker",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: REF }),
      }
    );

    if (!dispatchRes.ok) {
      const detail = await dispatchRes.text().catch(() => "");
      return json({ ok: false, error: "github_error", status: dispatchRes.status, detail }, 502, origin);
    }

    await env.STATS_REFRESH_KV.put(globalKey, String(now), {
      expirationTtl: GLOBAL_COOLDOWN_SECONDS + 60,
    });
    await env.STATS_REFRESH_KV.put(ipKey, String(now), {
      expirationTtl: PER_IP_COOLDOWN_SECONDS + 60,
    });

    return json({ ok: true, cooldownSeconds: PER_IP_COOLDOWN_SECONDS }, 202, origin);
  },
};
