import type {
  IncomingAuthConfig,
  OutboundAuthConfig,
  HmacOutAuth,
  OAuth2CcAuth,
} from '../types';

// ── Shared crypto helpers ────────────────────────────────────────────────────

const enc = new TextEncoder();

async function importHmacKey(secret: string, hash: 'SHA-256' | 'SHA-1'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash }, false, ['sign', 'verify']);
}

async function hmacHex(secret: string, message: string, hash: 'SHA-256' | 'SHA-1' = 'SHA-256'): Promise<string> {
  const key = await importHmacKey(secret, hash);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacBase64(secret: string, message: string, hash: 'SHA-256' | 'SHA-1' = 'SHA-1'): Promise<string> {
  const key = await importHmacKey(secret, hash);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

/** Timing-safe string compare via double-HMAC */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const key = await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const [sa, sb] = await Promise.all([
    crypto.subtle.sign('HMAC', key, enc.encode(a)),
    crypto.subtle.sign('HMAC', key, enc.encode(b)),
  ]);
  const ua = new Uint8Array(sa);
  const ub = new Uint8Array(sb);
  if (ua.length !== ub.length) return false;
  let diff = 0;
  for (let i = 0; i < ua.length; i++) diff |= (ua[i] ?? 0) ^ (ub[i] ?? 0);
  return diff === 0;
}

// ── Incoming request verification ────────────────────────────────────────────

export interface VerifyContext {
  rawBody: string;       // raw request body as string
  request: Request;
  url: URL;
}

/**
 * Verifies an incoming request against the form's verify_auth config.
 * Returns true if verified (or auth type is 'none').
 * Throws with a descriptive message on failure.
 */
export async function verifyIncoming(cfg: IncomingAuthConfig, ctx: VerifyContext): Promise<void> {
  switch (cfg.type) {
    case 'none':
      return;

    // ── GitHub: X-Hub-Signature-256: sha256=<hex> ──────────────────────────
    case 'hmac_github': {
      const header = ctx.request.headers.get('x-hub-signature-256') ?? '';
      const expected = 'sha256=' + await hmacHex(cfg.secret, ctx.rawBody);
      if (!(await safeEqual(header, expected))) throw new Error('GitHub HMAC signature mismatch');
      replayCheck(ctx.request.headers.get('x-github-delivery') ?? '', cfg.max_age_seconds ?? 300, ctx);
      return;
    }

    // ── Stripe: Stripe-Signature: t=<ts>,v1=<hex> ─────────────────────────
    case 'hmac_stripe': {
      const header = ctx.request.headers.get('stripe-signature') ?? '';
      const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
      const ts = parts['t'];
      const v1 = parts['v1'];
      if (!ts || !v1) throw new Error('Stripe-Signature header malformed');
      ageCheck(Number(ts) * 1000, cfg.max_age_seconds ?? 300);
      const payload = `${ts}.${ctx.rawBody}`;
      const expected = await hmacHex(cfg.secret, payload);
      if (!(await safeEqual(v1, expected))) throw new Error('Stripe HMAC signature mismatch');
      return;
    }

    // ── HubSpot v2: X-HubSpot-Signature: sha256=<hex> ─────────────────────
    case 'hmac_hubspot_v2': {
      const header = ctx.request.headers.get('x-hubspot-signature') ?? '';
      const raw = header.startsWith('sha256=') ? header.slice(7) : header;
      const expected = await hmacHex(cfg.secret, cfg.secret + ctx.rawBody);
      if (!(await safeEqual(raw, expected))) throw new Error('HubSpot v2 HMAC signature mismatch');
      return;
    }

    // ── HubSpot v3: X-HubSpot-Signature-v3, X-HubSpot-Signature-Timestamp ─
    case 'hmac_hubspot_v3': {
      const header = ctx.request.headers.get('x-hubspot-signature-v3') ?? '';
      const ts = ctx.request.headers.get('x-hubspot-signature-timestamp') ?? '';
      ageCheck(Number(ts), cfg.max_age_seconds ?? 300);
      const message = `${ctx.request.method}${ctx.url.href}${ctx.rawBody}${ts}`;
      const expected = await hmacHex(cfg.secret, message);
      if (!(await safeEqual(header, expected))) throw new Error('HubSpot v3 HMAC signature mismatch');
      return;
    }

    // ── Twilio: X-Twilio-Signature: base64(HMAC-SHA1(url + sorted params)) ─
    case 'hmac_twilio': {
      const header = ctx.request.headers.get('x-twilio-signature') ?? '';
      // Build Twilio's canonical string: URL + sorted POST params concatenated
      const params = new URLSearchParams(ctx.rawBody);
      const sortedKeys = [...params.keys()].sort();
      const canonical = ctx.url.href + sortedKeys.map(k => k + (params.get(k) ?? '')).join('');
      const expected = await hmacBase64(cfg.auth_token, canonical, 'SHA-1');
      if (!(await safeEqual(header, expected))) throw new Error('Twilio HMAC signature mismatch');
      return;
    }

    // ── Custom HMAC ────────────────────────────────────────────────────────
    case 'hmac_custom': {
      const headerRaw = ctx.request.headers.get(cfg.header_name.toLowerCase()) ?? '';
      const received = cfg.prefix && headerRaw.startsWith(cfg.prefix)
        ? headerRaw.slice(cfg.prefix.length)
        : headerRaw;

      let message: string;
      if (cfg.message_format === 'body') {
        message = ctx.rawBody;
      } else if (cfg.message_format === 'timestamp.body') {
        const ts = ctx.request.headers.get(cfg.timestamp_header ?? 'x-timestamp') ?? '';
        ageCheck(Number(ts), cfg.max_age_seconds ?? 300);
        message = `${ts}.${ctx.rawBody}`;
      } else {
        message = `${ctx.request.method}${ctx.url.href}${ctx.rawBody}`;
      }

      const expected = await hmacHex(cfg.secret, message, cfg.algorithm);
      if (!(await safeEqual(received, expected))) throw new Error('Custom HMAC signature mismatch');
      return;
    }

    // ── Bearer ─────────────────────────────────────────────────────────────
    case 'bearer': {
      const auth = ctx.request.headers.get('authorization') ?? '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
      if (!(await safeEqual(token, cfg.token))) throw new Error('Bearer token mismatch');
      return;
    }

    // ── Basic ──────────────────────────────────────────────────────────────
    case 'basic': {
      const auth = ctx.request.headers.get('authorization') ?? '';
      const b64 = auth.startsWith('Basic ') ? auth.slice(6) : '';
      const decoded = atob(b64);
      const colon = decoded.indexOf(':');
      const user = decoded.slice(0, colon);
      const pass = decoded.slice(colon + 1);
      if (!(await safeEqual(user + ':' + pass, cfg.username + ':' + cfg.password))) {
        throw new Error('Basic auth mismatch');
      }
      return;
    }

    // ── Header ─────────────────────────────────────────────────────────────
    case 'header': {
      const value = ctx.request.headers.get(cfg.name.toLowerCase()) ?? '';
      if (!(await safeEqual(value, cfg.value))) throw new Error(`Header ${cfg.name} mismatch`);
      return;
    }
  }
}

function ageCheck(tsMs: number, maxAgeSeconds: number): void {
  const age = (Date.now() - tsMs) / 1000;
  if (age > maxAgeSeconds) throw new Error(`Request timestamp too old (${Math.round(age)}s)`);
}

// GitHub uses delivery IDs not timestamps; skip replay check for now
function replayCheck(_deliveryId: string, _maxAge: number, _ctx: VerifyContext): void {
  // Could store seen delivery IDs in KV for dedup; omitted for free-tier simplicity
}

// ── Outbound request auth ────────────────────────────────────────────────────

/**
 * Applies outbound auth to a Headers object before sending a notification.
 * Mutates `headers` in-place.
 */
export async function applyOutboundAuth(
  cfg: OutboundAuthConfig,
  headers: Headers,
  body: string,
  kv: KVNamespace,
  cacheKey: string,
): Promise<void> {
  switch (cfg.type) {
    case 'none':
      break;

    case 'bearer':
      headers.set('Authorization', `Bearer ${cfg.token}`);
      break;

    case 'basic': {
      const creds = btoa(`${cfg.username}:${cfg.password}`);
      headers.set('Authorization', `Basic ${creds}`);
      break;
    }

    case 'header':
      headers.set(cfg.name, cfg.value);
      break;

    case 'hmac_sha256':
    case 'hmac_sha1': {
      const hash = cfg.type === 'hmac_sha256' ? 'SHA-256' : 'SHA-1';
      const sig = await hmacHex((cfg as HmacOutAuth).secret, body, hash);
      headers.set((cfg as HmacOutAuth).header_name, sig);
      break;
    }

    case 'oauth2_cc': {
      const token = await getOAuth2Token(cfg as OAuth2CcAuth, kv, cacheKey);
      headers.set('Authorization', `Bearer ${token}`);
      break;
    }
  }
}

async function getOAuth2Token(cfg: OAuth2CcAuth, kv: KVNamespace, cacheKey: string): Promise<string> {
  const cached = await kv.get(cacheKey);
  if (cached) return cached;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: cfg.client_id,
    client_secret: cfg.client_secret,
    ...(cfg.scope ? { scope: cfg.scope } : {}),
  });

  const res = await fetch(cfg.token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`OAuth2 token fetch failed: ${res.status}`);

  const data = await res.json<{ access_token: string; expires_in?: number }>();
  const ttl = Math.floor((data.expires_in ?? 3600) * 0.9);
  await kv.put(cacheKey, data.access_token, { expirationTtl: ttl });
  return data.access_token;
}
