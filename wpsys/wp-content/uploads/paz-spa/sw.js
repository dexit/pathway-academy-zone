/**
 * Pathway Academy Zone — Service Worker
 *
 * Strategy:
 *   - Hashed JS/CSS/fonts/images → cache-first (immutable assets, never stale)
 *   - HTML / SPA routes          → network-first with offline fallback
 *   - Images (public root)       → stale-while-revalidate (1 week, freshens in background)
 *   - API / form endpoints       → network-only (never cache)
 */

const CACHE_VERSION = "paz-v1"
const STATIC_CACHE = `${CACHE_VERSION}-static`
const IMAGE_CACHE  = `${CACHE_VERSION}-images`
const HTML_CACHE   = `${CACHE_VERSION}-html`

const OFFLINE_FALLBACK = "/offline.html"

const PRECACHE_URLS = [
  "/",
  "/offline.html",
]

/* ── Install ───────────────────────────────────────────────────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => { /* non-fatal if offline.html missing */ })
    )
  )
  self.skipWaiting()
})

/* ── Activate — purge old caches ───────────────────────────────────── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("paz-") && !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

/* ── Fetch ──────────────────────────────────────────────────────────── */
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin GET requests
  if (request.method !== "GET" || url.origin !== self.location.origin) return

  const path = url.pathname

  // API/form calls — network only
  if (path.startsWith("/api/") || path.startsWith("/wp-json/")) {
    return
  }

  // Hashed static assets (Vite bundles) — cache-first
  if (path.startsWith("/assets/") && /\.(js|css|woff2?|webp|png|svg)$/.test(path)) {
    event.respondWith(cacheFirst(STATIC_CACHE, request))
    return
  }

  // Public images (non-hashed) — stale-while-revalidate
  if (/\.(webp|png|jpg|jpeg|svg|gif|ico)$/.test(path)) {
    event.respondWith(staleWhileRevalidate(IMAGE_CACHE, request, 7 * 24 * 3600))
    return
  }

  // HTML / SPA navigation — network-first with offline fallback
  if (request.headers.get("Accept")?.includes("text/html") || path === "/") {
    event.respondWith(networkFirstHTML(request))
    return
  }
})

/* ── Strategies ─────────────────────────────────────────────────────── */

async function cacheFirst(cacheName, request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(cacheName)
    cache.put(request, response.clone())
  }
  return response
}

async function staleWhileRevalidate(cacheName, request, maxAgeSeconds) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchAndUpdate = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone())
    return response
  })

  if (cached) {
    const date = cached.headers.get("date")
    const age = date ? (Date.now() - new Date(date).getTime()) / 1000 : 0
    if (age < maxAgeSeconds) return cached
  }

  return fetchAndUpdate
}

async function networkFirstHTML(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(HTML_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request) || await caches.match("/")
    return cached || new Response(
      "<!doctype html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your connection and try again.</p></body></html>",
      { headers: { "Content-Type": "text/html" }, status: 503 }
    )
  }
}
