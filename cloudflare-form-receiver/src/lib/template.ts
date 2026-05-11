import type { TemplateContext } from '../types';

/**
 * Renders a template string replacing {{namespace.key}} tags.
 *
 * Supported namespaces:
 *   {{submission.id}}          — submission ID
 *   {{submission.form_id}}     — form ID
 *   {{submission.origin}}      — origin header
 *   {{submission.status}}      — current status
 *   {{submission.created_at}}  — ISO timestamp
 *   {{field.email}}            — any submitted field by name (first value if multi)
 *   {{metadata.ip}}            — client IP
 *   {{metadata.userAgent}}     — User-Agent
 *   {{metadata.referrer}}      — Referer header
 *   {{metadata.timestamp}}     — unix ms timestamp
 *   {{metadata.origin}}        — same as submission.origin
 *
 * Unknown tags are left as-is.
 */
export function render(template: string, ctx: TemplateContext): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, raw: string) => {
    const path = raw.trim();
    const dot = path.indexOf('.');
    if (dot === -1) return match;

    const ns = path.slice(0, dot);
    const key = path.slice(dot + 1);

    switch (ns) {
      case 'submission': {
        const v = (ctx.submission as Record<string, string>)[key];
        return v !== undefined ? encodeIfUrl(v, template) : match;
      }
      case 'field': {
        const v = ctx.fields[key];
        if (v === undefined) return '';
        const s = Array.isArray(v) ? (v[0] ?? '') : v;
        return encodeIfUrl(s, template);
      }
      case 'metadata': {
        const v = (ctx.metadata as unknown as Record<string, string | number>)[key];
        return v !== undefined ? String(v) : match;
      }
      default:
        return match;
    }
  });
}

// URL-encode field values when the template looks like a URL
// to prevent header injection via field values.
function encodeIfUrl(value: string, template: string): string {
  if (template.startsWith('http://') || template.startsWith('https://')) {
    return encodeURIComponent(value);
  }
  return value;
}
