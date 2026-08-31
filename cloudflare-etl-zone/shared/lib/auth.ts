import type { IncomingAuthConfig, OutboundAuthConfig } from '../types';

const enc = new TextEncoder();

async function importKey(secret: string, hash: 'SHA-256'|'SHA-1') {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash }, false, ['sign']);
}
async function hmacHex(secret: string, msg: string, hash: 'SHA-256'|'SHA-1' = 'SHA-256') {
  const sig = await crypto.subtle.sign('HMAC', await importKey(secret, hash), enc.encode(msg));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function hmacB64(secret: string, msg: string) {
  const sig = await crypto.subtle.sign('HMAC', await importKey(secret, 'SHA-1'), enc.encode(msg));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}
async function safeEq(a: string, b: string) {
  const k = await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const [sa, sb] = await Promise.all([crypto.subtle.sign('HMAC', k, enc.encode(a)), crypto.subtle.sign('HMAC', k, enc.encode(b))]);
  const ua = new Uint8Array(sa), ub = new Uint8Array(sb);
  if (ua.length !== ub.length) return false;
  let d = 0; for (let i = 0; i < ua.length; i++) d |= (ua[i] ?? 0) ^ (ub[i] ?? 0);
  return d === 0;
}

export interface VerifyCtx { rawBody: string; request: Request; url: URL }

export async function verifyIncoming(cfg: IncomingAuthConfig, ctx: VerifyCtx): Promise<void> {
  switch (cfg.type) {
    case 'none': return;
    case 'hmac_github': {
      const h = ctx.request.headers.get('x-hub-signature-256') ?? '';
      if (!await safeEq(h, 'sha256=' + await hmacHex(cfg.secret as string, ctx.rawBody))) throw new Error('GitHub HMAC mismatch');
      return;
    }
    case 'hmac_stripe': {
      const h = ctx.request.headers.get('stripe-signature') ?? '';
      const p = Object.fromEntries(h.split(',').map(s => s.split('=')));
      if (!p['t'] || !p['v1']) throw new Error('Stripe-Signature malformed');
      ageCheck(Number(p['t']) * 1000, (cfg.max_age_seconds as number) ?? 300);
      if (!await safeEq(p['v1'], await hmacHex(cfg.secret as string, `${p['t']}.${ctx.rawBody}`))) throw new Error('Stripe HMAC mismatch');
      return;
    }
    case 'hmac_hubspot_v2': {
      const h = ctx.request.headers.get('x-hubspot-signature') ?? '';
      const raw = h.startsWith('sha256=') ? h.slice(7) : h;
      if (!await safeEq(raw, await hmacHex(cfg.secret as string, cfg.secret + ctx.rawBody))) throw new Error('HubSpot v2 HMAC mismatch');
      return;
    }
    case 'hmac_hubspot_v3': {
      const h = ctx.request.headers.get('x-hubspot-signature-v3') ?? '';
      const ts = ctx.request.headers.get('x-hubspot-signature-timestamp') ?? '';
      ageCheck(Number(ts), (cfg.max_age_seconds as number) ?? 300);
      if (!await safeEq(h, await hmacHex(cfg.secret as string, `${ctx.request.method}${ctx.url.href}${ctx.rawBody}${ts}`))) throw new Error('HubSpot v3 HMAC mismatch');
      return;
    }
    case 'hmac_twilio': {
      const h = ctx.request.headers.get('x-twilio-signature') ?? '';
      const params = new URLSearchParams(ctx.rawBody);
      const canonical = ctx.url.href + [...params.keys()].sort().map(k => k + (params.get(k) ?? '')).join('');
      if (!await safeEq(h, await hmacB64(cfg.auth_token as string, canonical))) throw new Error('Twilio HMAC mismatch');
      return;
    }
    case 'hmac_custom': {
      const hRaw = ctx.request.headers.get((cfg.header_name as string).toLowerCase()) ?? '';
      const received = cfg.prefix && hRaw.startsWith(cfg.prefix as string) ? hRaw.slice((cfg.prefix as string).length) : hRaw;
      const msg = cfg.message_format === 'body' ? ctx.rawBody
        : cfg.message_format === 'timestamp.body'
          ? (() => { const ts = ctx.request.headers.get((cfg.timestamp_header as string|undefined) ?? 'x-timestamp') ?? ''; ageCheck(Number(ts), (cfg.max_age_seconds as number) ?? 300); return `${ts}.${ctx.rawBody}`; })()
          : `${ctx.request.method}${ctx.url.href}${ctx.rawBody}`;
      if (!await safeEq(received, await hmacHex(cfg.secret as string, msg, cfg.algorithm as 'SHA-256'|'SHA-1'))) throw new Error('Custom HMAC mismatch');
      return;
    }
    case 'bearer': {
      const tok = (ctx.request.headers.get('authorization') ?? '').replace(/^Bearer /, '');
      if (!await safeEq(tok, cfg.token as string)) throw new Error('Bearer mismatch');
      return;
    }
    case 'basic': {
      const b64 = (ctx.request.headers.get('authorization') ?? '').replace(/^Basic /, '');
      const dec = atob(b64); const ci = dec.indexOf(':');
      if (!await safeEq(dec.slice(0, ci) + ':' + dec.slice(ci + 1), `${cfg.username}:${cfg.password}`)) throw new Error('Basic auth mismatch');
      return;
    }
    case 'header': {
      const v = ctx.request.headers.get((cfg.name as string).toLowerCase()) ?? '';
      if (!await safeEq(v, cfg.value as string)) throw new Error(`Header ${cfg.name} mismatch`);
      return;
    }
  }
}

function ageCheck(tsMs: number, maxAge: number) {
  const age = (Date.now() - tsMs) / 1000;
  if (age > maxAge) throw new Error(`Request too old (${Math.round(age)}s)`);
}

export async function applyOutboundAuth(cfg: OutboundAuthConfig, headers: Headers, body: string, kv: KVNamespace, cacheKey: string) {
  switch (cfg.type) {
    case 'none': break;
    case 'bearer': headers.set('Authorization', `Bearer ${cfg.token}`); break;
    case 'basic':  headers.set('Authorization', `Basic ${btoa(`${cfg.username}:${cfg.password}`)}`); break;
    case 'header': headers.set(cfg.name, cfg.value); break;
    case 'hmac_sha256': case 'hmac_sha1': {
      const h = cfg.type === 'hmac_sha256' ? 'SHA-256' : 'SHA-1';
      headers.set(cfg.header_name, await hmacHex(cfg.secret, body, h));
      break;
    }
    case 'oauth2_cc': {
      const cached = await kv.get(cacheKey);
      if (cached) { headers.set('Authorization', `Bearer ${cached}`); break; }
      const res = await fetch(cfg.token_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'client_credentials', client_id: cfg.client_id, client_secret: cfg.client_secret, ...(cfg.scope ? { scope: cfg.scope } : {}) }).toString(),
      });
      if (!res.ok) throw new Error(`OAuth2 fetch failed: ${res.status}`);
      const d = await res.json<{ access_token: string; expires_in?: number }>();
      await kv.put(cacheKey, d.access_token, { expirationTtl: Math.floor((d.expires_in ?? 3600) * 0.9) });
      headers.set('Authorization', `Bearer ${d.access_token}`);
      break;
    }
  }
}
