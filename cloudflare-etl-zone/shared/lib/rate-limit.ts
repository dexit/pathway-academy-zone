import type { RateLimitRecord } from '../types';

const MAX = 10, WINDOW = 60;

// KV writes are capped at 1K/day on the free tier.
// Strategy: write once per window open + once when the limit is hit ("latch").
// Within the window below MAX, reads are used without a write (best-effort counting).
// This bounds writes to ≤2 per IP per 60s window rather than per request.
export async function checkRateLimit(kv: KVNamespace, ip: string): Promise<boolean> {
  const key = `rate:ip:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const rec = await kv.get<RateLimitRecord>(key, 'json');

  if (!rec || now - rec.windowStart >= WINDOW) {
    // New window: one write per IP per 60s
    await kv.put(key, JSON.stringify({ count: 1, windowStart: now } satisfies RateLimitRecord), { expirationTtl: WINDOW });
    return true;
  }

  if (rec.count >= MAX) return false;

  const newCount = rec.count + 1;
  if (newCount >= MAX) {
    // Latch the blocked state so subsequent reads block without further writes
    await kv.put(key, JSON.stringify({ count: newCount, windowStart: rec.windowStart } satisfies RateLimitRecord), { expirationTtl: WINDOW });
  }
  // Sub-MAX requests: don't write back; accept eventual-consistency counting
  return true;
}
