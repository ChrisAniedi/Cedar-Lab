import { buildSampleData } from '../sample';
import { medicalTimeline } from '../timeline';

describe('medical timeline', () => {
  const s = buildSampleData('2026-10-31', 'me', '2026-10-31T09:00:00Z');
  const bella = (x: { petId: string }) => x.petId === 's-bella';
  const entries = medicalTimeline(
    { visits: s.visits.filter(bella), vaccinations: s.vaccinations.filter(bella), medications: s.medications.filter(bella) },
    '2026-10-31',
  );
  it('is newest first', () => {
    const dates = entries.map((e) => e.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
  it('merges visits, vaccinations and prescriptions', () => {
    expect(new Set(entries.map((e) => e.kind))).toEqual(new Set(['visit', 'vaccination', 'prescription']));
  });
  it('excludes future appointments', () => {
    const all = medicalTimeline({ visits: s.visits, vaccinations: [], medications: [] }, '2026-10-31');
    expect(all.every((e) => e.date <= '2026-10-31')).toBe(true);
  });
});
