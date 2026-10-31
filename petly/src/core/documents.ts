import { sortByDate } from './wellness';
import type { DateKey, Medication, Pet, PetDocument, Vaccination, VetVisit, WeightEntry } from './types';

/**
 * Builders for the shareable outputs: PDF report (HTML), sitter handover
 * (plain text) and the emergency card QR payload. Copy comes in through `t`
 * so core stays framework-free and every string still lives in the locale file.
 */
export type Translate = (key: string, params?: Record<string, string | number>) => string;
export type Formatters = { date: (key: DateKey) => string; weight: (kg: number) => string; age: (pet: Pet) => string };

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export const REPORT_SECTIONS = ['profile', 'vaccinations', 'medications', 'visits', 'weights', 'documents'] as const;
export type ReportSection = (typeof REPORT_SECTIONS)[number];

export interface ReportData {
  pet: Pet;
  vaccinations: Vaccination[];
  medications: Medication[];
  visits: VetVisit[];
  weights: WeightEntry[];
  documents: PetDocument[];
}

export function filterByRange<T extends { date: DateKey }>(list: T[], from: DateKey | null, to: DateKey | null): T[] {
  return list.filter((x) => (!from || x.date >= from) && (!to || x.date <= to));
}

function table(headers: string[], rows: string[][], empty: string): string {
  if (rows.length === 0) return `<p class="muted">${escapeHtml(empty)}</p>`;
  const head = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export function buildReportHtml(
  data: ReportData,
  sections: ReportSection[],
  range: { from: DateKey | null; to: DateKey | null },
  t: Translate,
  f: Formatters,
  generatedOn: DateKey,
): string {
  const { pet } = data;
  const parts: string[] = [];
  const dash = '—';

  if (sections.includes('profile')) {
    const rows: [string, string][] = [
      [t('report.fields.species'), t(`species.${pet.species}`)],
      [t('report.fields.breed'), pet.breed || dash],
      [t('report.fields.age'), pet.birthDate ? f.age(pet) : dash],
      [t('report.fields.sex'), t(`sex.${pet.sex}`)],
      [t('report.fields.weight'), pet.weightKg != null ? f.weight(pet.weightKg) : dash],
      [t('report.fields.microchip'), pet.microchip || dash],
      [t('report.fields.allergies'), pet.allergies.join(', ') || dash],
      [t('report.fields.conditions'), pet.conditions.join(', ') || dash],
      [t('report.fields.vet'), [pet.vetName, pet.vetClinic, pet.vetPhone].filter(Boolean).join(' · ') || dash],
    ];
    parts.push(
      `<h2>${escapeHtml(t('report.sections.profile'))}</h2><dl>${rows
        .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`)
        .join('')}</dl>`,
    );
  }
  if (sections.includes('vaccinations')) {
    const list = sortByDate(
      filterByRange(data.vaccinations.map((v) => ({ ...v, date: v.administeredOn })), range.from, range.to),
    ).reverse();
    parts.push(
      `<h2>${escapeHtml(t('report.sections.vaccinations'))}</h2>` +
        table(
          [t('report.cols.vaccine'), t('report.cols.given'), t('report.cols.nextDue'), t('report.cols.clinic')],
          list.map((v) => [v.name, f.date(v.administeredOn), v.nextDueOn ? f.date(v.nextDueOn) : dash, v.clinic || dash]),
          t('report.empty'),
        ),
    );
  }
  if (sections.includes('medications')) {
    parts.push(
      `<h2>${escapeHtml(t('report.sections.medications'))}</h2>` +
        table(
          [t('report.cols.medication'), t('report.cols.dosage'), t('report.cols.from'), t('report.cols.to'), t('report.cols.prescriber')],
          data.medications.map((m) => [
            m.name,
            `${m.dosage} ${m.dosageUnit}`.trim(),
            f.date(m.startDate),
            m.endDate ? f.date(m.endDate) : t('report.ongoing'),
            m.prescribedBy || dash,
          ]),
          t('report.empty'),
        ),
    );
  }
  if (sections.includes('visits')) {
    const list = sortByDate(filterByRange(data.visits, range.from, range.to)).reverse();
    parts.push(
      `<h2>${escapeHtml(t('report.sections.visits'))}</h2>` +
        table(
          [t('report.cols.date'), t('report.cols.reason'), t('report.cols.diagnosis'), t('report.cols.treatment')],
          list.map((v) => [f.date(v.date), v.reason, v.diagnosis || dash, v.treatment || dash]),
          t('report.empty'),
        ),
    );
  }
  if (sections.includes('weights')) {
    const list = sortByDate(filterByRange(data.weights, range.from, range.to)).reverse();
    parts.push(
      `<h2>${escapeHtml(t('report.sections.weights'))}</h2>` +
        table(
          [t('report.cols.date'), t('report.cols.weight'), t('report.cols.note')],
          list.map((w) => [f.date(w.date), f.weight(w.kg), w.note || dash]),
          t('report.empty'),
        ),
    );
  }
  if (sections.includes('documents')) {
    parts.push(
      `<h2>${escapeHtml(t('report.sections.documents'))}</h2>` +
        table(
          [t('report.cols.document'), t('report.cols.category'), t('report.cols.date')],
          filterByRange(data.documents, range.from, range.to).map((d) => [d.title, t(`documents.categories.${d.category}`), f.date(d.date)]),
          t('report.empty'),
        ),
    );
  }

  const rangeLine =
    range.from || range.to
      ? t('report.range', { from: range.from ? f.date(range.from) : dash, to: range.to ? f.date(range.to) : dash })
      : t('report.allTime');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
body{font-family:-apple-system,Inter,Helvetica,Arial,sans-serif;color:#252B28;margin:32px;font-size:12px}
h1{color:#285C49;font-size:24px;margin:0} h2{color:#285C49;font-size:15px;margin:24px 0 8px;border-bottom:1px solid #DFE4DC;padding-bottom:4px}
.muted{color:#5B635E} table{width:100%;border-collapse:collapse} th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #EEF2EC;vertical-align:top}
th{background:#EEF2EC;font-weight:600} dl{display:grid;grid-template-columns:160px 1fr;gap:4px 12px;margin:0} dt{color:#5B635E} dd{margin:0}
.footer{margin-top:32px;color:#5B635E;font-size:10px}
</style></head><body>
<h1>${escapeHtml(t('report.title', { name: pet.name }))}</h1>
<p class="muted">${escapeHtml(rangeLine)} · ${escapeHtml(t('report.generated', { date: f.date(generatedOn) }))}</p>
${pet.isSample ? `<p class="muted">${escapeHtml(t('sample.reportNote'))}</p>` : ''}
${parts.join('\n')}
<p class="footer">${escapeHtml(t('report.disclaimer'))}</p>
</body></html>`;
}

export const HANDOVER_SECTIONS = ['feeding', 'medication', 'routines', 'behaviour', 'allergies', 'emergency', 'vet'] as const;
export type HandoverSection = (typeof HANDOVER_SECTIONS)[number];

export function buildHandoverText(
  input: {
    pet: Pet;
    routines: { time: string; title: string }[];
    medications: { name: string; dosage: string; times: string[]; instructions: string }[];
    emergencyContact: { name: string; phone: string };
  },
  sections: HandoverSection[],
  t: Translate,
): string {
  const { pet } = input;
  const lines: string[] = [t('handover.doc.title', { name: pet.name }), ''];
  const add = (heading: string, body: string[]) => {
    lines.push(heading.toUpperCase(), ...(body.length ? body : [t('handover.doc.none')]), '');
  };
  if (sections.includes('feeding')) add(t('handover.sections.feeding'), pet.feedingNotes ? [pet.feedingNotes] : []);
  if (sections.includes('medication'))
    add(
      t('handover.sections.medication'),
      input.medications.map((m) => `• ${m.name} — ${m.dosage} @ ${m.times.join(', ')}${m.instructions ? ` (${m.instructions})` : ''}`),
    );
  if (sections.includes('routines')) add(t('handover.sections.routines'), input.routines.map((r) => `• ${r.time}  ${r.title}`));
  if (sections.includes('behaviour')) add(t('handover.sections.behaviour'), pet.behaviourNotes ? [pet.behaviourNotes] : []);
  if (sections.includes('allergies'))
    add(t('handover.sections.allergies'), [...pet.allergies, ...pet.conditions].map((a) => `• ${a}`));
  if (sections.includes('emergency'))
    add(
      t('handover.sections.emergency'),
      input.emergencyContact.name || input.emergencyContact.phone ? [`${input.emergencyContact.name} ${input.emergencyContact.phone}`.trim()] : [],
    );
  if (sections.includes('vet'))
    add(t('handover.sections.vet'), [pet.vetName, pet.vetClinic, pet.vetPhone].filter(Boolean).length ? [[pet.vetName, pet.vetClinic, pet.vetPhone].filter(Boolean).join(' · ')] : []);
  lines.push(t('handover.doc.footer'));
  return lines.join('\n').trim();
}

export const EMERGENCY_FIELDS = ['species', 'contact', 'allergies', 'conditions', 'vet', 'microchip'] as const;
export type EmergencyField = (typeof EMERGENCY_FIELDS)[number];

/**
 * Offline QR payload: plain text containing ONLY owner-approved fields.
 * No URL, no account data, no documents.
 */
export function buildEmergencyPayload(
  pet: Pet,
  approved: EmergencyField[],
  contact: { name: string; phone: string },
  t: Translate,
): string {
  const lines = [t('emergency.payload.header', { name: pet.name })];
  if (approved.includes('species')) lines.push(`${t(`species.${pet.species}`)}${pet.breed ? ` · ${pet.breed}` : ''}`);
  if (approved.includes('contact') && (contact.name || contact.phone))
    lines.push(t('emergency.payload.contact', { value: `${contact.name} ${contact.phone}`.trim() }));
  if (approved.includes('allergies') && pet.allergies.length)
    lines.push(t('emergency.payload.allergies', { value: pet.allergies.join(', ') }));
  if (approved.includes('conditions') && pet.conditions.length)
    lines.push(t('emergency.payload.conditions', { value: pet.conditions.join(', ') }));
  if (approved.includes('vet') && (pet.vetClinic || pet.vetPhone))
    lines.push(t('emergency.payload.vet', { value: [pet.vetClinic, pet.vetPhone].filter(Boolean).join(' ') }));
  if (approved.includes('microchip') && pet.microchip) lines.push(t('emergency.payload.microchip', { value: pet.microchip }));
  return lines.join('\n');
}
