// Cloudflare Worker — Portfolio Visit Counter (Unique Visitors)
// KV namespace binding required: PORTFOLIO_KV
// Tracks: unique_visitors (persistent counter) + active_viewers (rolling 5-min window)
// Fingerprint: SHA-256(IP + User-Agent) — no PII stored

const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const ACTIVE_TTL_S = 300;               // must equal ACTIVE_WINDOW_MS / 1000

// Restrict CORS to the production domain only — prevents third-party inflation
const ALLOWED_ORIGIN = "https://prathameshlonare.me";

async function fingerprint(request) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  const data = new TextEncoder().encode(`${ip}:${ua}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const handler = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : ALLOWED_ORIGIN;

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Content-Type": "application/json",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (!env.PORTFOLIO_KV) {
        return new Response(
          JSON.stringify({ unique_visitors: 0, active_viewers: 0, status: "kv_not_configured" }),
          { headers: corsHeaders }
        );
      }

      const fp = await fingerprint(request);
      const now = Date.now();

      // --- Unique visitors ---
      // Store as an integer counter + a separate per-fingerprint key with TTL.
      // This avoids the unbounded JSON array that would grow to the 25MB KV limit.
      const fpKey = `seen:${fp}`;
      const alreadySeen = await env.PORTFOLIO_KV.get(fpKey);

      let uniqueCount = parseInt(await env.PORTFOLIO_KV.get("unique_count") || "0", 10);

      if (!alreadySeen) {
        // Mark this fingerprint as seen (30-day TTL — long enough for returning visitors)
        await env.PORTFOLIO_KV.put(fpKey, "1", { expirationTtl: 30 * 24 * 60 * 60 });
        uniqueCount += 1;
        await env.PORTFOLIO_KV.put("unique_count", String(uniqueCount));
      }

      // --- Active viewers (rolling 5-min window, unique fingerprints) ---
      const activeRaw = await env.PORTFOLIO_KV.get("active_sessions");
      let activeSessions = {};
      if (activeRaw) {
        try {
          activeSessions = JSON.parse(activeRaw);
        } catch {
          activeSessions = {};
        }
      }

      // Remove expired entries
      for (const [key, ts] of Object.entries(activeSessions)) {
        if (now - ts >= ACTIVE_WINDOW_MS) {
          delete activeSessions[key];
        }
      }

      // Add / refresh current visitor
      activeSessions[fp] = now;

      await env.PORTFOLIO_KV.put("active_sessions", JSON.stringify(activeSessions), {
        expirationTtl: ACTIVE_TTL_S, // aligned to 5 min — was 360 (6 min) before
      });

      const activeViewers = Object.keys(activeSessions).length;

      return new Response(
        JSON.stringify({
          unique_visitors: uniqueCount,
          active_viewers: activeViewers,
          status: "success",
        }),
        { headers: corsHeaders }
      );
    } catch {
      return new Response(
        JSON.stringify({ unique_visitors: 0, active_viewers: 0, status: "error" }),
        { headers: corsHeaders }
      );
    }
  },
};

export default handler;
