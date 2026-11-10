// Helpers for service content (content/services/*/*.yaml).
import type { Service, ServiceDetails } from '../data/yamlLoader';

/** True for empty values and "To be confirmed" placeholders. */
export function isTbc(value: string | undefined | null): boolean {
  return !value || value.trim().toLowerCase().startsWith('to be confirmed');
}

/** URL-friendly name for a variant tab, e.g. "Delayed (born at home)". */
export function variantSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * A summary value for cards. For services with sub-types, returns the shared
 * value, or null when the sub-types differ (shown as "Varies by type").
 */
export function cardValue(
  service: Service,
  field: 'totalFee' | 'totalTime'
): string | null | undefined {
  if (!service.variants?.length) return service[field];
  const values = new Set(
    service.variants.map(v => (v as ServiceDetails)[field] ?? service[field])
  );
  return values.size === 1 ? [...values][0] : null;
}
