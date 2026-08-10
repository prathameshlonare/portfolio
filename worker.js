// Cloudflare Worker — Portfolio Visit Counter (Unique Visitors)
// KV namespace binding required: PORTFOLIO_KV
// Tracks: unique_visitors (persistent) + active_viewers (rolling 5-min window)
// Fingerprint: SHA-256(IP + User-Agent) — no PII stored

const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

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
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Content-Type": "application/json",
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

      // --- Unique visitors (persistent set) ---
      const uniqueRaw = await env.PORTFOLIO_KV.get("unique_visitors");
      let uniqueSet = [];
      if (uniqueRaw) {
        try {
          uniqueSet = JSON.parse(uniqueRaw);
        } catch {
          uniqueSet = [];
        }
      }

      const isNewVisitor = !uniqueSet.includes(fp);
      if (isNewVisitor) {
        uniqueSet.push(fp);
        await env.PORTFOLIO_KV.put("unique_visitors", JSON.stringify(uniqueSet));
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

      // Add current visitor
      activeSessions[fp] = now;

      await env.PORTFOLIO_KV.put("active_sessions", JSON.stringify(activeSessions), {
        expirationTtl: 360,
      });

      const activeViewers = Object.keys(activeSessions).length;

      return new Response(
        JSON.stringify({
          unique_visitors: uniqueSet.length,
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
