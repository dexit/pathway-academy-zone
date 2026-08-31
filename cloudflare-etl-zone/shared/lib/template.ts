import type { TemplateContext } from '../types';

export function render(template: string, ctx: TemplateContext): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, raw: string) => {
    const path = raw.trim();
    const dot = path.indexOf('.');
    if (dot === -1) return match;
    const ns = path.slice(0, dot);
    const key = path.slice(dot + 1);
    switch (ns) {
      case 'submission': return encode((ctx.submission as Record<string, string>)[key], template);
      case 'field': {
        const v = ctx.fields[key];
        return encode(v === undefined ? '' : Array.isArray(v) ? (v[0] ?? '') : v, template);
      }
      case 'metadata': return String((ctx.metadata as unknown as Record<string, string|number>)[key] ?? '');
      default: return match;
    }
  });
}

function encode(v: string, template: string): string {
  return /^https?:\/\//.test(template) ? encodeURIComponent(v) : v;
}
