import { addDays, addMonths, diffDays, isDateKey, isTimeKey, monthGrid, toDateKey, weekOf, fromDateKey } from '../dates';

describe('dates', () => {
  it('round-trips date keys in local time', () => {
    expect(toDateKey(fromDateKey('2026-03-29'))).toBe('2026-03-29');
  });
  it('adds days across month and year boundaries', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });
  it('clamps month arithmetic to the last day', () => {
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
    expect(addMonths('2024-01-31', 1)).toBe('2024-02-29');
  });
  it('diffs days across DST changes', () => {
    expect(diffDays('2026-03-28', '2026-03-30')).toBe(2);
    expect(diffDays('2026-11-02', '2026-10-31')).toBe(-2);
  });
  it('validates keys', () => {
    expect(isDateKey('2026-02-30')).toBe(false);
    expect(isDateKey('2026-02-28')).toBe(true);
    expect(isTimeKey('24:00')).toBe(false);
    expect(isTimeKey('07:05')).toBe(true);
  });
  it('builds a Monday-first week', () => {
    const week = weekOf('2026-10-31'); // Saturday
    expect(week[0]).toBe('2026-10-26');
    expect(week).toHaveLength(7);
  });
  it('builds a full month grid', () => {
    const grid = monthGrid(2026, 9); // October 2026
    expect(grid.length % 7).toBe(0);
    expect(grid).toContain('2026-10-01');
    expect(grid).toContain('2026-10-31');
  });
});
