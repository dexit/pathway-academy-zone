import type { FilterRuleRow, FilterResult, FilterSource, SubmissionFields } from '../types';

/**
 * Glob-style wildcard matching.
 *   *  — zero or more characters
 *   ?  — exactly one character
 * Case-insensitive.
 */
export function wildcardMatch(pattern: string, value: string): boolean {
  const p = pattern.toLowerCase();
  const v = value.toLowerCase();

  // Fast paths
  if (p === '*') return true;
  if (!p.includes('*') && !p.includes('?')) return p === v;

  // Build regex from glob pattern
  const re = new RegExp(
    '^' +
    p.replace(/[.+^${}()|[\]\\]/g, '\\$&')
     .replace(/\*/g, '.*')
     .replace(/\?/g, '.') +
    '$'
  );
  return re.test(v);
}

export interface FilterInput {
  queryParams: URLSearchParams;
  fields: SubmissionFields;
  headers: Headers;
  origin: string;
  ip: string;
}

/**
 * Evaluates filter rules in priority order (ascending).
 * Returns the first matching FilterResult or null (= default allow).
 */
export function evaluateFilters(
  rules: FilterRuleRow[],
  input: FilterInput,
): FilterResult | null {
  const sorted = [...rules].sort((a, b) => a.priority - b.priority);

  for (const rule of sorted) {
    if (!rule.active) continue;

    const matched = matchRule(rule, input);
    if (matched) return { action: rule.action, rule };
  }

  return null;
}

function matchRule(rule: FilterRuleRow, input: FilterInput): boolean {
  const source: FilterSource = rule.source;

  switch (source) {
    case 'query_param': {
      // Check if any query param key matches pattern
      for (const [key, value] of input.queryParams.entries()) {
        if (!wildcardMatch(rule.pattern, key)) continue;
        // Key matched; now check value if value_pattern set
        if (rule.value_pattern === null || wildcardMatch(rule.value_pattern, value)) {
          return true;
        }
      }
      return false;
    }

    case 'body_key': {
      // Check if any submitted field name matches pattern
      for (const key of Object.keys(input.fields)) {
        if (wildcardMatch(rule.pattern, key)) return true;
      }
      return false;
    }

    case 'body_value': {
      // Check if any field VALUE matches value_pattern (pattern = field name filter)
      for (const [key, val] of Object.entries(input.fields)) {
        if (!wildcardMatch(rule.pattern, key)) continue;
        const values = Array.isArray(val) ? val : [val ?? ''];
        for (const v of values) {
          if (rule.value_pattern === null || wildcardMatch(rule.value_pattern, v)) {
            return true;
          }
        }
      }
      return false;
    }

    case 'header': {
      // Check request headers: pattern = header name, value_pattern = optional value
      for (const [key, value] of (input.headers as unknown as Iterable<[string, string]>)) {
        if (!wildcardMatch(rule.pattern, key)) continue;
        if (rule.value_pattern === null || wildcardMatch(rule.value_pattern, value)) {
          return true;
        }
      }
      return false;
    }

    case 'origin':
      return wildcardMatch(rule.pattern, input.origin);

    case 'ip':
      return wildcardMatch(rule.pattern, input.ip);

    default:
      return false;
  }
}
