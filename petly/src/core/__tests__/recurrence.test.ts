import { nextOccurrence, occursOn, summarize } from '../recurrence';

describe('recurrence', () => {
  it('handles once, daily and weekly rules', () => {
    expect(occursOn({ kind: 'once', date: '2026-10-31' }, '2026-10-31')).toBe(true);
    expect(occursOn({ kind: 'once', date: '2026-10-31' }, '2026-11-01')).toBe(false);
    expect(occursOn({ kind: 'daily' }, '2026-10-31')).toBe(true);
    expect(occursOn({ kind: 'weekly', days: [6] }, '2026-10-31')).toBe(true); // Saturday
    expect(occursOn({ kind: 'weekly', days: [1] }, '2026-10-31')).toBe(false);
  });
  it('handles every-N-days from a start date', () => {
    const rule = { kind: 'interval', everyDays: 3, startDate: '2026-10-01' } as const;
    expect(occursOn(rule, '2026-10-04')).toBe(true);
    expect(occursOn(rule, '2026-10-05')).toBe(false);
    expect(occursOn(rule, '2026-09-28')).toBe(false);
  });
  it('clamps monthly rules to short months', () => {
    expect(occursOn({ kind: 'monthly', dayOfMonth: 31 }, '2026-02-28')).toBe(true);
    expect(occursOn({ kind: 'monthly', dayOfMonth: 15 }, '2026-02-15')).toBe(true);
  });
  it('respects a start date', () => {
    expect(occursOn({ kind: 'daily' }, '2026-10-01', '2026-10-05')).toBe(false);
  });
  it('finds the next occurrence', () => {
    expect(nextOccurrence({ kind: 'interval', everyDays: 21, startDate: '2026-10-31' }, '2026-10-31')).toBe('2026-11-21');
    expect(nextOccurrence({ kind: 'monthly', dayOfMonth: 4 }, '2026-10-31')).toBe('2026-11-04');
    expect(nextOccurrence({ kind: 'once', date: '2026-10-01' }, '2026-10-31')).toBeNull();
  });
  it('summarises for i18n', () => {
    expect(summarize({ kind: 'weekly', days: [5, 1, 2, 3, 4] })).toEqual({ key: 'weekdays' });
    expect(summarize({ kind: 'interval', everyDays: 1, startDate: '2026-01-01' })).toEqual({ key: 'daily' });
  });
});
