import { buildEmergencyPayload, buildHandoverText, buildReportHtml, escapeHtml } from '../documents';
import { buildSampleData } from '../sample';

const t = (key: string, params?: Record<string, string | number>) => (params ? `${key}(${Object.values(params).join(',')})` : key);
const f = { date: (k: string) => k, weight: (kg: number) => `${kg} kg`, age: () => '3y' };
const data = buildSampleData('2026-10-31', 'me', '2026-10-31T09:00:00Z');
const luna = data.pets[1]!;

describe('report html', () => {
  it('escapes user content', () => {
    expect(escapeHtml('<b>"x" & \'y\'</b>')).toBe('&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;');
  });
  it('includes only selected sections and respects the date range', () => {
    const html = buildReportHtml(
      {
        pet: luna,
        vaccinations: data.vaccinations.filter((v) => v.petId === luna.id),
        medications: [],
        visits: data.visits.filter((v) => v.petId === luna.id),
        weights: data.weights.filter((w) => w.petId === luna.id),
        documents: [],
      },
      ['weights'],
      { from: '2026-09-01', to: null },
      t,
      f,
      '2026-10-31',
    );
    expect(html).toContain('report.sections.weights');
    expect(html).not.toContain('report.sections.visits');
    expect(html).toContain('4.8 kg');
    expect(html).not.toContain('4.3 kg'); // outside range
    expect(html).toContain('report.disclaimer');
  });
});

describe('emergency payload', () => {
  it('contains only approved fields', () => {
    const text = buildEmergencyPayload(luna, ['allergies'], { name: 'A', phone: '1' }, t);
    expect(text).toContain('Chicken protein');
    expect(text).not.toContain('Hyperthyroidism');
    expect(text).not.toContain('emergency.payload.contact');
    expect(text).not.toContain('985');
  });
});

describe('handover', () => {
  it('lists selected sections', () => {
    const text = buildHandoverText(
      { pet: luna, routines: [{ time: '08:00', title: 'Tablet' }], medications: [], emergencyContact: { name: '', phone: '' } },
      ['routines', 'medication'],
      t,
    );
    expect(text).toContain('08:00  Tablet');
    expect(text).toContain('handover.doc.none');
    expect(text).not.toContain('HANDOVER.SECTIONS.FEEDING');
  });
});
