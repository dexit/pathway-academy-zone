import type { RateLimitRecord } from '../types';

const MAX = 10, WINDOW = 60;

export async function checkRateLimit(kv: KVNamespace, ip: string): Promise<boolean> {
  const key = `rate:ip:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const rec = await kv.get<RateLimitRecord>(key, 'json');
  if (!rec || now - rec.windowStart >= WINDOW) {
    await kv.put(key, JSON.stringify({ count: 1, windowStart: now } satisfies RateLimitRecord), { expirationTtl: WINDOW });
    return true;
  }
  if (rec.count >= MAX) return false;
  await kv.put(key, JSON.stringify({ count: rec.count + 1, windowStart: rec.windowStart } satisfies RateLimitRecord), { expirationTtl: WINDOW });
  return true;
}
