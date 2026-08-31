import type { RateLimitRecord } from '../types';

const MAX = 10;
const WINDOW = 60; // seconds

export async function checkRateLimit(kv: KVNamespace, ip: string): Promise<boolean> {
  const key = `rate:ip:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const record = await kv.get<RateLimitRecord>(key, 'json');

  if (!record || now - record.windowStart >= WINDOW) {
    await kv.put(key, JSON.stringify({ count: 1, windowStart: now } satisfies RateLimitRecord), {
      expirationTtl: WINDOW,
    });
    return true;
  }

  if (record.count >= MAX) return false;

  await kv.put(key, JSON.stringify({ count: record.count + 1, windowStart: record.windowStart } satisfies RateLimitRecord), {
    expirationTtl: WINDOW,
  });
  return true;
}
