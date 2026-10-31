import { currentVaccinations, dosesForDay, medicationStatus, nextDose, petHealthStatus, vaccinationStatus } from '../health';
import type { Medication, Vaccination } from '../types';

const vax = (over: Partial<Vaccination>): Vaccination => ({
  id: 'v',
  petId: 'p',
  name: 'Rabies',
  administeredOn: '2025-10-01',
  nextDueOn: '2026-12-01',
  clinic: '',
  vet: '',
  notes: '',
  certificateDocId: null,
  isSample: false,
  ...over,
});

const med = (over: Partial<Medication>): Medication => ({
  id: 'm',
  petId: 'p',
  name: 'X',
  category: 'other',
  dosage: '1',
  dosageUnit: 'mg',
  method: 'oral',
  startDate: '2026-10-01',
  endDate: null,
  recurrence: { kind: 'daily' },
  times: ['08:00', '20:00'],
  prescribedBy: '',
  instructions: '',
  isSample: false,
  createdAt: '',
  ...over,
});

describe('vaccinations', () => {
  it('classifies due status', () => {
    expect(vaccinationStatus(vax({ nextDueOn: '2026-10-30' }), '2026-10-31')).toBe('overdue');
    expect(vaccinationStatus(vax({ nextDueOn: '2026-11-20' }), '2026-10-31')).toBe('dueSoon');
    expect(vaccinationStatus(vax({ nextDueOn: '2027-06-01' }), '2026-10-31')).toBe('upToDate');
    expect(vaccinationStatus(vax({ nextDueOn: null }), '2026-10-31')).toBe('noBooster');
  });
  it('uses only the latest record per vaccine', () => {
    const list = [
      vax({ id: 'old', administeredOn: '2024-01-01', nextDueOn: '2025-01-01' }),
      vax({ id: 'new', administeredOn: '2025-01-01', nextDueOn: '2027-01-01' }),
    ];
    expect(currentVaccinations(list).map((v) => v.id)).toEqual(['new']);
  });
});

describe('medications', () => {
  it('finds the next dose today or later', () => {
    expect(nextDose(med({}), { date: '2026-10-31', time: '09:00' })).toEqual({ date: '2026-10-31', time: '20:00' });
    expect(nextDose(med({}), { date: '2026-10-31', time: '21:00' })).toEqual({ date: '2026-11-01', time: '08:00' });
    expect(nextDose(med({ endDate: '2026-10-31' }), { date: '2026-10-31', time: '21:00' })).toBeNull();
  });
  it('reports status', () => {
    expect(medicationStatus(med({ endDate: '2026-10-10' }), '2026-10-31')).toBe('completed');
    expect(medicationStatus(med({ startDate: '2026-11-10' }), '2026-10-31')).toBe('scheduled');
  });
});

describe('pet health status', () => {
  it('flags overdue records', () => {
    expect(petHealthStatus({ vaccinations: [vax({ nextDueOn: '2026-10-01' })], reminders: [], today: '2026-10-31' })).toBe('attention');
    expect(petHealthStatus({ vaccinations: [vax({ nextDueOn: '2027-10-01' })], reminders: [], today: '2026-10-31' })).toBe('good');
  });
});

describe('dosesForDay', () => {
  it('lists slots with their logged outcome', () => {
    const m = med({});
    const doses = [{ id: 'd', medicationId: 'm', petId: 'p', date: '2026-10-31', time: '08:00', status: 'given' as const, by: 'me', at: '' }];
    const slots = dosesForDay(m, doses, '2026-10-31');
    expect(slots.map((s) => [s.time, s.log?.status ?? null])).toEqual([
      ['08:00', 'given'],
      ['20:00', null],
    ]);
  });
  it('is empty outside the course', () => {
    expect(dosesForDay(med({ endDate: '2026-10-10' }), [], '2026-10-31')).toEqual([]);
    expect(dosesForDay(med({}), [], '2026-09-01')).toEqual([]);
  });
});
