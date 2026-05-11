import type { FilterRuleRow, FilterResult, FilterInput } from '../types';

export function wildcardMatch(pattern: string, value: string): boolean {
  if (pattern === '*') return true;
  if (!pattern.includes('*') && !pattern.includes('?')) return pattern.toLowerCase() === value.toLowerCase();
  const re = new RegExp(
    '^' + pattern.toLowerCase().replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$'
  );
  return re.test(value.toLowerCase());
}

export function evaluateFilters(rules: FilterRuleRow[], input: FilterInput): FilterResult | null {
  for (const rule of [...rules].sort((a, b) => a.priority - b.priority)) {
    if (!rule.active) continue;
    if (matchRule(rule, input)) return { action: rule.action, rule };
  }
  return null;
}

function matchRule(rule: FilterRuleRow, input: FilterInput): boolean {
  switch (rule.source) {
    case 'query_param':
      for (const [k, v] of input.queryParams.entries())
        if (wildcardMatch(rule.pattern, k) && (rule.value_pattern === null || wildcardMatch(rule.value_pattern, v))) return true;
      return false;
    case 'body_key':
      return Object.keys(input.fields).some(k => wildcardMatch(rule.pattern, k));
    case 'body_value':
      for (const [k, val] of Object.entries(input.fields)) {
        if (!wildcardMatch(rule.pattern, k)) continue;
        const values = Array.isArray(val) ? val : [val ?? ''];
        if (values.some(v => rule.value_pattern === null || wildcardMatch(rule.value_pattern, v))) return true;
      }
      return false;
    case 'header':
      for (const [k, v] of (input.headers as unknown as Iterable<[string, string]>))
        if (wildcardMatch(rule.pattern, k) && (rule.value_pattern === null || wildcardMatch(rule.value_pattern, v))) return true;
      return false;
    case 'origin': return wildcardMatch(rule.pattern, input.origin);
    case 'ip':     return wildcardMatch(rule.pattern, input.ip);
    default:       return false;
  }
}
