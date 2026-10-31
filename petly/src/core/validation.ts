/** Form validation. Returns an error code (for i18n) or null. */

export type FieldError = 'required' | 'email' | 'passwordShort' | 'passwordWeak' | 'mismatch' | 'number' | 'positive' | 'date' | 'time' | 'tooLong';

export const required = (v: string): FieldError | null => (v.trim() ? null : 'required');

export function email(v: string): FieldError | null {
  if (!v.trim()) return 'required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'email';
}

export function password(v: string): FieldError | null {
  if (!v) return 'required';
  if (v.length < 8) return 'passwordShort';
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'passwordWeak';
  return null;
}

export const matches = (a: string, b: string): FieldError | null => (a === b ? null : 'mismatch');

export function positiveNumber(v: string, { optional = false } = {}): FieldError | null {
  if (!v.trim()) return optional ? null : 'required';
  const n = Number(v.trim().replace(',', '.'));
  if (!Number.isFinite(n)) return 'number';
  return n > 0 ? null : 'positive';
}

export const maxLength = (v: string, max: number): FieldError | null => (v.length > max ? 'tooLong' : null);

/** First error across a record of validators, keyed by field. */
export function collect<K extends string>(checks: Record<K, FieldError | null>): Partial<Record<K, FieldError>> {
  const out: Partial<Record<K, FieldError>> = {};
  for (const k of Object.keys(checks) as K[]) {
    const e = checks[k];
    if (e) out[k] = e;
  }
  return out;
}

export const hasErrors = (errors: object) => Object.keys(errors).length > 0;
