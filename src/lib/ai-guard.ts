/**
 * Spend guard for public, unauthenticated AI chat endpoints.
 *
 * WHY (26.7.2026): these routes are on public Vercel URLs and call Gemini with no
 * authentication. Elad funds the key personally and had just run out of credit, so
 * an unbounded endpoint is a direct hole in his pocket. Most of his sites already
 * had a per-IP limiter; these did not, and none of them had any ceiling on the
 * aggregate — a per-IP rule stops one flooder but not five hundred visitors, a
 * crawler, or a scripted loop rotating addresses.
 *
 * Two independent limits, both fail CLOSED:
 *   1. per-IP fixed window  — stops a single abusive client
 *   2. per-day total        — stops the aggregate, which is what actually bankrupts
 *
 * HONEST LIMITATION: this is in-memory, so it is per serverless instance and resets
 * on cold start. It genuinely bounds a sustained attack against a warm instance and
 * costs nothing to run, but it is NOT a hard global ceiling — Vercel may run several
 * instances, each with its own budget. A true global cap needs shared state (Redis
 * or Postgres), which these sites do not have. Sized deliberately low so that even
 * several instances in parallel stay affordable. Do not mistake it for a hard cap.
 */

type Bucket = { count: number; resetAt: number };

const ipBuckets = new Map<string, Bucket>();
const MAX_TRACKED_IPS = 5000;

/** Per-IP allowance. */
const IP_LIMIT = Number(process.env.AI_CHAT_IP_LIMIT ?? 10);
const IP_WINDOW_MS = 60_000;

/**
 * Whole-endpoint daily allowance for THIS instance. At ~600 output tokens of
 * gemini-flash per answer (~$0.002), 400 answers is well under a dollar a day per
 * instance while being far more than any of these sites legitimately serves.
 */
const DAILY_LIMIT = Number(process.env.AI_CHAT_DAILY_LIMIT ?? 400);

let day = "";
let dayCount = 0;

export type GuardVerdict =
  | { ok: true; used: number; limit: number }
  | { ok: false; reason: "rate" | "daily"; used: number; limit: number };

/** Best-effort client IP from the usual proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Charge one AI answer against both limits.
 * Call AFTER validating the request body, so malformed traffic cannot burn budget.
 */
export function aiGuard(req: Request): GuardVerdict {
  const now = Date.now();

  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    dayCount = 0;
  }

  const ip = clientIp(req);
  const existing = ipBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    if (ipBuckets.size > MAX_TRACKED_IPS) {
      for (const [k, v] of ipBuckets) if (v.resetAt <= now) ipBuckets.delete(k);
    }
    ipBuckets.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
  } else {
    existing.count += 1;
    if (existing.count > IP_LIMIT) {
      return { ok: false, reason: "rate", used: dayCount, limit: DAILY_LIMIT };
    }
  }

  if (dayCount >= DAILY_LIMIT) {
    return { ok: false, reason: "daily", used: dayCount, limit: DAILY_LIMIT };
  }

  dayCount += 1;
  return { ok: true, used: dayCount, limit: DAILY_LIMIT };
}
