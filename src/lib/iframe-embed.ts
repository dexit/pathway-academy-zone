/**
 * When the SPA is loaded inside an iframe (e.g. embedded in a WordPress page),
 * this module continuously reports its scroll height to the parent window so
 * the parent can resize the iframe to eliminate scrollbars.
 *
 * Message shape: { type: 'paz-resize', height: number, route: string }
 *
 * Safe to import unconditionally — it is a no-op when not in an iframe.
 */

const PAZ_MSG_TYPE = "paz-resize"

function isEmbedded(): boolean {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
}

function reportHeight(): void {
  if (!isEmbedded()) return
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
  window.parent.postMessage(
    { type: PAZ_MSG_TYPE, height, route: window.location.pathname + window.location.search },
    "*"
  )
}

let _rafId: number | null = null

function scheduleReport(): void {
  if (_rafId !== null) cancelAnimationFrame(_rafId)
  _rafId = requestAnimationFrame(() => {
    reportHeight()
    _rafId = null
  })
}

/** Initialise the embed height reporter. Call once at app startup. */
export function initIframeEmbed(): void {
  if (!isEmbedded()) return

  // Report on first paint
  reportHeight()

  // Report after fonts + images settle
  window.addEventListener("load", reportHeight)

  // MutationObserver watches DOM changes (route transitions, content loads)
  const mo = new MutationObserver(scheduleReport)
  mo.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: false })

  // ResizeObserver watches layout reflow
  const ro = new ResizeObserver(scheduleReport)
  ro.observe(document.documentElement)

  // Also handle explicit resize messages from parent (e.g. on sidebar toggle)
  window.addEventListener("message", (e) => {
    if (e.data?.type === "paz-resize-request") reportHeight()
  })
}

/** Force a single height report — call after programmatic route changes. */
export function reportEmbedHeight(): void {
  scheduleReport()
}

/** Returns true when the SPA is running inside an iframe. */
export { isEmbedded }
