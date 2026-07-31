// Fetches real Root-Me and Cyber-Learning stats for br0nson and writes
// src/data/stats.json, which the Hero section imports at build time (no
// runtime fetch, so no CORS/CSP concerns on the deployed site). Run by
// .github/workflows/update-stats.yml on a schedule; the resulting commit
// triggers the existing deploy workflow, which rebuilds with fresh data.
//
// Each site is scraped independently and fails open: if one breaks (site
// markup change, auth failure, network issue), we keep that site's last
// known-good values instead of overwriting them with garbage.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STATS_PATH = path.join(ROOT, "src/data/stats.json");
const HISTORY_PATH = path.join(ROOT, "scripts/data/stats-history.json");
const HISTORY_MAX_ENTRIES = 120;
const TREND_WINDOW_DAYS = 7;

const USER_AGENT =
  "Mozilla/5.0 (compatible; ArthurBouchaudPortfolioBot/1.0; +https://bcharthur.github.io/portfolio-3d/)";

const ROOT_ME_URL = "https://www.root-me.org/br0nson";
const CYBER_LEARNING_LOGIN_URL = "https://cyber-learning.fr/wp-login.php";
const CYBER_LEARNING_STATS_URL = "https://cyber-learning.fr/hacker-stats/?hackeur_id=1126";

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function digitsToInt(text) {
  const digits = (text ?? "").replace(/\D+/g, "");
  return digits ? Number.parseInt(digits, 10) : null;
}

// --- Root-Me (public profile, no auth needed) ------------------------------

async function scrapeRootMe() {
  const res = await fetch(ROOT_ME_URL, {
    headers: { "User-Agent": USER_AGENT, "Accept-Language": "fr" },
  });
  if (!res.ok) throw new Error(`Root-Me HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const values = {};
  $("div.small-6.medium-3.columns.text-center").each((_, el) => {
    const label = $(el).find("span.gras").first().text().trim();
    const value = digitsToInt($(el).find("h3").first().text());
    if (label && value !== null) values[label] = value;
  });

  const place = values["Place"];
  const points = values["Points"];
  const challenges = values["Challenges"];

  if (place == null || points == null || challenges == null) {
    throw new Error("Root-Me: couldn't find Place/Points/Challenges on the page");
  }

  return { rank: place, score: points, challenges };
}

// --- Cyber-Learning (WordPress, needs login for the personal stats page) ---

function mergeCookies(jar, res) {
  const setCookies =
    typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  for (const raw of setCookies) {
    const pair = raw.split(";", 1)[0];
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}

function cookieHeader(jar) {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function scrapeCyberLearning() {
  const user = process.env.CYBER_LEARNING_USER;
  const pass = process.env.CYBER_LEARNING_PASSWORD;
  if (!user || !pass) {
    throw new Error("Cyber-Learning: missing CYBER_LEARNING_USER / CYBER_LEARNING_PASSWORD env vars");
  }

  const jar = new Map();

  // 1) Load the login page to pick up wordpress_test_cookie.
  const loginPage = await fetch(CYBER_LEARNING_LOGIN_URL, {
    headers: { "User-Agent": USER_AGENT },
  });
  mergeCookies(jar, loginPage);
  jar.set("wordpress_test_cookie", "WP Cookie check");

  // 2) Submit credentials. Use redirect: "manual" so we can read the
  // auth Set-Cookie headers off the redirect response directly, instead
  // of losing them if fetch silently follows the redirect itself.
  const body = new URLSearchParams({
    log: user,
    pwd: pass,
    "wp-submit": "Log In",
    redirect_to: "https://cyber-learning.fr/hacker-stats/",
    testcookie: "1",
  });
  const loginRes = await fetch(CYBER_LEARNING_LOGIN_URL, {
    method: "POST",
    redirect: "manual",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookieHeader(jar),
    },
    body,
  });
  mergeCookies(jar, loginRes);

  const hasAuthCookie = [...jar.keys()].some((name) => name.startsWith("wordpress_logged_in_"));
  if (!hasAuthCookie) {
    throw new Error("Cyber-Learning: login did not return an auth cookie (bad credentials?)");
  }

  // 3) Fetch the personal stats page with the authenticated session.
  const statsRes = await fetch(CYBER_LEARNING_STATS_URL, {
    headers: { "User-Agent": USER_AGENT, Cookie: cookieHeader(jar) },
  });
  if (!statsRes.ok) throw new Error(`Cyber-Learning HTTP ${statsRes.status}`);
  const html = await statsRes.text();

  if (!html.includes("Déconnexion")) {
    throw new Error("Cyber-Learning: page doesn't look like an authenticated session");
  }

  const $ = cheerio.load(html);
  const pageText = $("body").text().replace(/\s+/g, " ");

  const scoreMatch = pageText.match(/Total\s*:\s*([\d\s]+)\s*Pts/i);
  const rankMatch = pageText.match(/Vous\s+(?:êtes|etes)\s+N.?\s*(\d+)\s*sur\s*(\d+)\s*inscrits/i);

  // "Enigmes résolues" sits right after a sibling block (e.g. "...2024<hr><h3>144
  // Enigmes résolues</h3>") with no whitespace between the closing tag and the
  // next text node, so cheerio's flattened body text can fuse an unrelated
  // number (like the "2024" from a join date) straight onto the real count.
  // Match it scoped to just that one element's own text instead.
  let solved = null;
  $("h3, b").each((_, el) => {
    if (solved !== null) return;
    const text = $(el).text().trim();
    const m = text.match(/^(\d+)\s*Enigmes?\s+r[ée]solues$/i);
    if (m) solved = Number.parseInt(m[1], 10);
  });

  const score = scoreMatch ? digitsToInt(scoreMatch[1]) : null;
  const rank = rankMatch ? Number.parseInt(rankMatch[1], 10) : null;
  const totalRegistered = rankMatch ? Number.parseInt(rankMatch[2], 10) : null;

  if (score == null || rank == null || solved == null) {
    throw new Error("Cyber-Learning: couldn't find score/rank/solved on the page");
  }

  return { rank, score, totalRegistered, solved };
}

// --- History + trend ---------------------------------------------------

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function computeTrend(history, currentScore, site) {
  if (!currentScore && currentScore !== 0) return null;

  const today = new Date();
  const cutoff = new Date(today.getTime() - TREND_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  // Oldest entry at or before the cutoff, i.e. the closest thing to
  // "score ~7 days ago" that we actually have on record.
  let reference = null;
  for (const entry of history) {
    const entryDate = new Date(entry.date);
    if (entryDate <= cutoff && (!reference || entryDate > new Date(reference.date))) {
      reference = entry;
    }
  }

  const referenceScore = reference?.[site]?.score;
  if (referenceScore == null) return null;

  return currentScore - referenceScore;
}

async function main() {
  const existingStats = await readJson(STATS_PATH, null);
  const history = await readJson(HISTORY_PATH, []);

  let rootMe;
  try {
    rootMe = await scrapeRootMe();
    console.log("Root-Me OK:", rootMe);
  } catch (err) {
    console.error("Root-Me scrape failed, keeping last known value:", err.message);
    rootMe = existingStats?.rootMe
      ? {
          rank: existingStats.rootMe.rank,
          score: existingStats.rootMe.score,
          challenges: existingStats.rootMe.challenges,
        }
      : null;
  }

  let cyberLearning;
  try {
    cyberLearning = await scrapeCyberLearning();
    console.log("Cyber-Learning OK:", cyberLearning);
  } catch (err) {
    console.error("Cyber-Learning scrape failed, keeping last known value:", err.message);
    cyberLearning = existingStats?.cyberLearning
      ? {
          rank: existingStats.cyberLearning.rank,
          score: existingStats.cyberLearning.score,
          totalRegistered: existingStats.cyberLearning.totalRegistered,
          solved: existingStats.cyberLearning.solved,
        }
      : null;
  }

  if (!rootMe && !cyberLearning) {
    console.error("Both scrapes failed and there is no previous data. Aborting without writing.");
    process.exitCode = 1;
    return;
  }

  const today = todayIso();
  const historyEntry = {
    date: today,
    rootMe: rootMe ? { score: rootMe.score, rank: rootMe.rank } : undefined,
    cyberLearning: cyberLearning ? { score: cyberLearning.score, rank: cyberLearning.rank } : undefined,
  };
  const historyWithoutToday = history.filter((entry) => entry.date !== today);
  const nextHistory = [...historyWithoutToday, historyEntry]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-HISTORY_MAX_ENTRIES);

  const stats = {
    updatedAt: new Date().toISOString(),
    rootMe: rootMe
      ? {
          pseudo: "br0nson",
          url: ROOT_ME_URL,
          score: rootMe.score,
          rank: rootMe.rank,
          challenges: rootMe.challenges,
          trend7d: computeTrend(nextHistory, rootMe.score, "rootMe"),
        }
      : existingStats?.rootMe ?? null,
    cyberLearning: cyberLearning
      ? {
          pseudo: "br0nson",
          url: "https://cyber-learning.fr/hacker-stats/?hackeur_id=1126",
          score: cyberLearning.score,
          rank: cyberLearning.rank,
          totalRegistered: cyberLearning.totalRegistered,
          solved: cyberLearning.solved,
          trend7d: computeTrend(nextHistory, cyberLearning.score, "cyberLearning"),
        }
      : existingStats?.cyberLearning ?? null,
  };

  await mkdir(path.dirname(STATS_PATH), { recursive: true });
  await mkdir(path.dirname(HISTORY_PATH), { recursive: true });
  await writeFile(STATS_PATH, JSON.stringify(stats, null, 2) + "\n");
  await writeFile(HISTORY_PATH, JSON.stringify(nextHistory, null, 2) + "\n");

  console.log("Wrote", STATS_PATH, "and", HISTORY_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
