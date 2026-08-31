import { render } from '../../../shared/lib/template';
import type { MappingRuleRow, SubmissionFields, SubmissionMetadata, Dto, DtoValue, TemplateContext } from '../../../shared/types';

export interface TransformResult {
  dto: Dto;
  warnings: string[];   // non-fatal issues (missing optional fields, etc.)
  errors: string[];     // validation failures (required fields missing)
}

/**
 * Apply mapping rules to raw submission fields, producing a typed DTO.
 * Rules are applied in priority order; each rule maps one source expression
 * to one target DTO field with an optional transform.
 */
export function applyMappings(
  rules: MappingRuleRow[],
  fields: SubmissionFields,
  metadata: SubmissionMetadata,
  submissionMeta: { id: string; form_id: string; origin: string; created_at: string; status: string },
): TransformResult {
  const dto: Dto = {};
  const warnings: string[] = [];
  const errors: string[] = [];

  const ctx: TemplateContext = { submission: submissionMeta, fields, metadata };

  const sorted = [...rules].sort((a, b) => a.priority - b.priority);

  for (const rule of sorted) {
    if (!rule.active) continue;

    // ── Resolve source value ─────────────────────────────────────────────────
    let raw: string | undefined;

    if (rule.source_expr.includes('{{')) {
      // Full template expression → render directly
      raw = render(rule.source_expr, ctx);
    } else {
      // Plain field name lookup
      const v = fields[rule.source_expr];
      raw = v === undefined ? undefined : Array.isArray(v) ? v.join(', ') : v;
    }

    // Apply default
    if (!raw || raw.trim() === '') {
      if (rule.default_value !== null) {
        raw = rule.default_value;
      } else {
        if (rule.required) {
          errors.push(`Required field "${rule.name}" (source: ${rule.source_expr}) is missing or empty`);
        } else {
          warnings.push(`Optional field "${rule.name}" (source: ${rule.source_expr}) is empty — skipped`);
        }
        dto[rule.target_field] = null;
        continue;
      }
    }

    // ── Apply transform ──────────────────────────────────────────────────────
    try {
      dto[rule.target_field] = applyTransform(raw, rule);
    } catch (e) {
      warnings.push(`Transform error on "${rule.name}": ${(e as Error).message} — using raw value`);
      dto[rule.target_field] = raw;
    }
  }

  return { dto, warnings, errors };
}

function applyTransform(value: string, rule: MappingRuleRow): DtoValue {
  const cfg = rule.transform_config ? JSON.parse(rule.transform_config) as Record<string, string> : {};

  switch (rule.transform) {
    case 'passthrough':
      return value;

    case 'trim':
      return value.trim();

    case 'lowercase':
      return value.toLowerCase();

    case 'uppercase':
      return value.toUpperCase();

    case 'regex_extract': {
      const pattern = cfg['pattern'] ?? '(.*)';
      const flags = cfg['flags'] ?? '';
      const m = new RegExp(pattern, flags).exec(value);
      return m?.[1] ?? null;
    }

    case 'regex_replace': {
      const pattern = cfg['pattern'] ?? '';
      const replacement = cfg['replacement'] ?? '';
      const flags = cfg['flags'] ?? 'g';
      return value.replace(new RegExp(pattern, flags), replacement);
    }

    case 'template':
      // cfg.template is a mini-template, value is exposed as {{value}}
      return (cfg['template'] ?? value).replace('{{value}}', value);

    case 'number': {
      const n = parseFloat(value.replace(/[^0-9.\-]/g, ''));
      if (isNaN(n)) throw new Error(`"${value}" is not a number`);
      return n;
    }

    case 'boolean':
      return ['1', 'true', 'yes', 'on', 'y'].includes(value.toLowerCase().trim());

    case 'date_iso': {
      const d = new Date(value);
      if (isNaN(d.getTime())) throw new Error(`"${value}" is not a parseable date`);
      return d.toISOString();
    }

    case 'json_parse': {
      return JSON.parse(value) as DtoValue;
    }

    case 'truncate': {
      const max = parseInt(cfg['max_length'] ?? '255', 10);
      return value.slice(0, max);
    }

    default:
      return value;
  }
}

/**
 * Build a D1 INSERT or UPSERT statement from a DTO.
 * Returns null if dto has no fields matching the allowlist.
 */
export function buildInsertStatement(
  db: D1Database,
  tableName: string,
  dto: Dto,
  upsertKey: string | null,
  fieldAllowlist: string[] | null,
): D1PreparedStatement | null {
  const allowed = fieldAllowlist
    ? Object.entries(dto).filter(([k]) => fieldAllowlist.includes(k))
    : Object.entries(dto);

  const entries = allowed.filter(([, v]) => v !== null);
  if (entries.length === 0) return null;

  const cols = entries.map(([k]) => k).join(', ');
  const placeholders = entries.map(() => '?').join(', ');
  const values = entries.map(([, v]) => v);

  let sql = `INSERT INTO ${tableName} (${cols}) VALUES (${placeholders})`;

  if (upsertKey) {
    const updateCols = entries.filter(([k]) => k !== upsertKey).map(([k]) => `${k}=excluded.${k}`).join(', ');
    if (updateCols) sql += ` ON CONFLICT(${upsertKey}) DO UPDATE SET ${updateCols}`;
  }

  return db.prepare(sql).bind(...values);
}
