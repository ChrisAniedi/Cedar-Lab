import { describeWeightChange, weightTrend } from '../wellness';
import type { WeightEntry } from '../types';

const w = (date: string, kg: number): WeightEntry => ({ id: date, petId: 'p', date, kg, note: '', isSample: false });

describe('weight trend', () => {
  it('compares the two latest entries regardless of input order', () => {
    const t = weightTrend([w('2026-10-20', 12.2), w('2026-09-01', 12.9), w('2026-10-01', 12.5)]);
    expect(t.current?.kg).toBe(12.2);
    expect(t.previous?.kg).toBe(12.5);
    expect(t.deltaKg).toBe(-0.3);
    expect(t.direction).toBe('down');
  });
  it('treats < 1% as steady', () => {
    expect(weightTrend([w('2026-10-01', 28.4), w('2026-10-20', 28.5)]).direction).toBe('steady');
  });
  it('needs two points', () => {
    expect(weightTrend([w('2026-10-01', 4)]).direction).toBe('none');
  });
});

describe('describeWeightChange (observations, never diagnoses)', () => {
  it('describes a recorded change within the window', () => {
    const obs = describeWeightChange([w('2026-08-02', 10), w('2026-10-30', 9)], '2026-10-31');
    expect(obs).toEqual({ key: 'changed', direction: 'down', pct: 10, days: 89 });
  });
  it('reports when there is not enough data', () => {
    expect(describeWeightChange([w('2026-10-30', 9)], '2026-10-31')).toEqual({ key: 'notEnoughData' });
  });
});
