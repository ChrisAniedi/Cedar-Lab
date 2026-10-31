import { addDays } from './dates';
import type {
  CareLogEntry,
  CareTask,
  DateKey,
  DoseLog,
  Medication,
  Member,
  Pet,
  PetDocument,
  Reminder,
  Vaccination,
  VetVisit,
  WeightEntry,
  WellnessEntry,
} from './types';

/**
 * Sample household: Max, Luna and Bella. Every record has `isSample: true`
 * (the UI badges it) and stable `s-` ids so it can be removed in one go.
 * Dates are relative to `today` so the sample always looks current.
 */
export interface SampleData {
  pets: Pet[];
  members: Member[];
  tasks: CareTask[];
  careLog: CareLogEntry[];
  medications: Medication[];
  doses: DoseLog[];
  vaccinations: Vaccination[];
  visits: VetVisit[];
  weights: WeightEntry[];
  wellness: WellnessEntry[];
  reminders: Reminder[];
  documents: PetDocument[];
}

export const SAMPLE_PREFIX = 's-';
export const isSampleId = (id: string) => id.startsWith(SAMPLE_PREFIX);

export function buildSampleData(today: DateKey, selfId: string, now: string): SampleData {
  const d = (n: number) => addDays(today, n);
  const yearsAgo = (y: number, m = 0) => {
    const [yy, mm] = today.split('-').map(Number);
    const month = (mm ?? 1) - m;
    const date = new Date(yy! - y, month - 1, 14);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-14`;
  };

  const base = {
    colour: '',
    photoUri: null,
    isSample: true,
    createdAt: now,
  };

  const pets: Pet[] = [
    {
      ...base,
      id: 's-max',
      name: 'Max',
      species: 'dog',
      breed: 'Golden Retriever',
      birthDate: yearsAgo(3, 2),
      sex: 'male',
      weightKg: 28.5,
      colour: 'Golden',
      neutered: true,
      microchip: '985 112 004 567 321',
      allergies: [],
      conditions: [],
      behaviourNotes: 'Very energetic. Pulls on the lead near squirrels. Loves tennis balls.',
      feedingNotes: '2 cups dry food at 7:30 and 18:00. No table scraps.',
      vetName: 'Dr. Priya Shah',
      vetClinic: 'Oakwood Veterinary Clinic',
      vetPhone: '+1 555 0142',
    },
    {
      ...base,
      id: 's-luna',
      name: 'Luna',
      species: 'cat',
      breed: 'British Shorthair',
      birthDate: yearsAgo(5, 4),
      sex: 'female',
      weightKg: 4.8,
      colour: 'Blue-grey',
      neutered: true,
      microchip: '985 112 004 998 104',
      allergies: ['Chicken protein'],
      conditions: ['Hyperthyroidism (managed)'],
      behaviourNotes: 'Shy with strangers. Hides under the bed — give her space.',
      feedingNotes: 'Wet food (fish) 60 g twice daily. Tablet hidden in a treat at breakfast.',
      vetName: 'Dr. Priya Shah',
      vetClinic: 'Oakwood Veterinary Clinic',
      vetPhone: '+1 555 0142',
    },
    {
      ...base,
      id: 's-bella',
      name: 'Bella',
      species: 'dog',
      breed: 'French Bulldog',
      birthDate: yearsAgo(8, 1),
      sex: 'female',
      weightKg: 12.2,
      colour: 'Fawn',
      neutered: true,
      microchip: null,
      allergies: ['Beef'],
      conditions: ['Brachycephalic airway', 'Mild arthritis'],
      behaviourNotes: 'Overheats easily — short walks only in warm weather.',
      feedingNotes: 'Senior kibble, 1 cup split across morning and evening.',
      vetName: 'Dr. Marcus Lee',
      vetClinic: 'Riverside Animal Hospital',
      vetPhone: '+1 555 0198',
    },
  ];

  const members: Member[] = [
    { id: 's-sam', name: 'Sam Rivera', role: 'admin', isSelf: false, isSample: true },
    { id: 's-jordan', name: 'Jordan Ellis', role: 'sitter', isSelf: false, isSample: true },
  ];

  const task = (id: string, petId: string, title: string, category: CareTask['category'], time: string, assigneeId: string | null): CareTask => ({
    id,
    petId,
    title,
    category,
    time,
    recurrence: { kind: 'daily' },
    assigneeId,
    isSample: true,
    createdAt: now,
  });

  const tasks: CareTask[] = [
    task('s-t1', 's-max', 'Morning feeding', 'feeding', '07:30', selfId),
    task('s-t2', 's-luna', 'Thyroid tablet', 'medication', '08:00', selfId),
    task('s-t3', 's-max', 'Morning walk', 'walking', '08:30', 's-sam'),
    task('s-t4', 's-luna', 'Refresh water fountain', 'water', '09:00', selfId),
    task('s-t5', 's-bella', 'Joint supplement', 'medication', '12:30', 's-sam'),
    task('s-t6', 's-bella', 'Wrinkle cleaning', 'hygiene', '17:00', selfId),
    task('s-t7', 's-max', 'Evening feeding', 'feeding', '18:00', 's-sam'),
    { ...task('s-t8', 's-max', 'Brush coat', 'grooming', '19:30', selfId), recurrence: { kind: 'weekly', days: [0, 3] } },
  ];

  const careLog: CareLogEntry[] = [
    { id: 's-c1', taskId: 's-t1', petId: 's-max', date: today, action: 'completed', by: selfId, at: `${today}T07:34:00` },
    { id: 's-c2', taskId: 's-t2', petId: 's-luna', date: today, action: 'completed', by: 's-sam', at: `${today}T08:05:00` },
    { id: 's-c3', taskId: 's-t1', petId: 's-max', date: d(-1), action: 'completed', by: selfId, at: `${d(-1)}T07:40:00` },
    { id: 's-c4', taskId: 's-t7', petId: 's-max', date: d(-1), action: 'completed', by: 's-sam', at: `${d(-1)}T18:10:00` },
  ];

  const medications: Medication[] = [
    {
      id: 's-m1',
      petId: 's-luna',
      name: 'Methimazole',
      category: 'chronic',
      dosage: '2.5',
      dosageUnit: 'mg',
      method: 'oral',
      startDate: d(-210),
      endDate: null,
      recurrence: { kind: 'daily' },
      times: ['08:00'],
      prescribedBy: 'Dr. Priya Shah',
      instructions: 'Give with food. Hide in a treat.',
      isSample: true,
      createdAt: now,
    },
    {
      id: 's-m2',
      petId: 's-bella',
      name: 'Glucosamine & chondroitin',
      category: 'supplement',
      dosage: '1',
      dosageUnit: 'chew',
      method: 'oral',
      startDate: d(-90),
      endDate: null,
      recurrence: { kind: 'daily' },
      times: ['12:30'],
      prescribedBy: 'Dr. Marcus Lee',
      instructions: '',
      isSample: true,
      createdAt: now,
    },
    {
      id: 's-m3',
      petId: 's-max',
      name: 'NexGard Spectra',
      category: 'antiparasitic',
      dosage: '1',
      dosageUnit: 'tablet',
      method: 'oral',
      startDate: d(-60),
      endDate: null,
      recurrence: { kind: 'monthly', dayOfMonth: Number(d(4).slice(8)) },
      times: ['09:00'],
      prescribedBy: 'Dr. Priya Shah',
      instructions: 'Monthly flea, tick and worm protection.',
      isSample: true,
      createdAt: now,
    },
    {
      id: 's-m4',
      petId: 's-bella',
      name: 'Amoxicillin',
      category: 'antibiotic',
      dosage: '250',
      dosageUnit: 'mg',
      method: 'oral',
      startDate: d(-150),
      endDate: d(-140),
      recurrence: { kind: 'daily' },
      times: ['08:00', '20:00'],
      prescribedBy: 'Dr. Marcus Lee',
      instructions: 'Finish the full course.',
      isSample: true,
      createdAt: now,
    },
  ];

  const doses: DoseLog[] = [
    { id: 's-d1', medicationId: 's-m1', petId: 's-luna', date: today, time: '08:00', status: 'given', by: 's-sam', at: `${today}T08:05:00` },
    { id: 's-d2', medicationId: 's-m1', petId: 's-luna', date: d(-1), time: '08:00', status: 'given', by: selfId, at: `${d(-1)}T08:02:00` },
    { id: 's-d3', medicationId: 's-m2', petId: 's-bella', date: d(-1), time: '12:30', status: 'skipped', by: 's-sam', at: `${d(-1)}T13:10:00` },
  ];

  const vax = (id: string, petId: string, name: string, given: DateKey, next: DateKey | null, clinic: string, vet: string): Vaccination => ({
    id,
    petId,
    name,
    administeredOn: given,
    nextDueOn: next,
    clinic,
    vet,
    notes: '',
    certificateDocId: null,
    isSample: true,
  });
  const vaccinations: Vaccination[] = [
    vax('s-v1', 's-max', 'Rabies', d(-340), d(25), 'Oakwood Veterinary Clinic', 'Dr. Priya Shah'),
    vax('s-v2', 's-max', 'DHPP', d(-300), d(65), 'Oakwood Veterinary Clinic', 'Dr. Priya Shah'),
    vax('s-v3', 's-luna', 'FVRCP', d(-380), d(-15), 'Oakwood Veterinary Clinic', 'Dr. Priya Shah'),
    vax('s-v4', 's-luna', 'Rabies', d(-200), d(530), 'Oakwood Veterinary Clinic', 'Dr. Priya Shah'),
    vax('s-v5', 's-bella', 'DHPP', d(-120), d(975), 'Riverside Animal Hospital', 'Dr. Marcus Lee'),
    vax('s-v6', 's-bella', 'Leptospirosis', d(-500), d(-135), 'Riverside Animal Hospital', 'Dr. Marcus Lee'),
    vax('s-v7', 's-bella', 'Leptospirosis', d(-130), d(235), 'Riverside Animal Hospital', 'Dr. Marcus Lee'),
  ];

  const visit = (v: Partial<VetVisit> & Pick<VetVisit, 'id' | 'petId' | 'date' | 'reason'>): VetVisit => ({
    time: null,
    clinic: 'Riverside Animal Hospital',
    vet: 'Dr. Marcus Lee',
    concerns: '',
    diagnosis: '',
    treatment: '',
    medication: '',
    followUpOn: null,
    cost: null,
    currency: 'USD',
    notes: '',
    documentIds: [],
    isSample: true,
    ...v,
  });
  const visits: VetVisit[] = [
    visit({ id: 's-vv1', petId: 's-bella', date: d(-150), reason: 'Coughing and lethargy', concerns: 'Coughing for 3 days, low energy.', diagnosis: 'Upper respiratory infection', treatment: 'Antibiotics, rest', medication: 'Amoxicillin 250 mg', cost: 186, followUpOn: d(-136) }),
    visit({ id: 's-vv2', petId: 's-bella', date: d(-136), reason: 'Follow-up: respiratory infection', diagnosis: 'Resolved', cost: 65 }),
    visit({ id: 's-vv3', petId: 's-bella', date: d(-95), reason: 'Stiffness after walks', diagnosis: 'Mild osteoarthritis (hips)', treatment: 'Joint supplement, weight management, shorter walks', medication: 'Glucosamine & chondroitin', cost: 240 }),
    visit({ id: 's-vv4', petId: 's-bella', date: d(-40), reason: 'Annual senior wellness check', diagnosis: 'Healthy for age; blood panel normal', treatment: 'Dental clean recommended', cost: 310 }),
    visit({ id: 's-vv5', petId: 's-luna', date: d(-210), reason: 'Weight loss, increased appetite', clinic: 'Oakwood Veterinary Clinic', vet: 'Dr. Priya Shah', diagnosis: 'Hyperthyroidism', treatment: 'Started methimazole', medication: 'Methimazole 2.5 mg', cost: 420 }),
    visit({ id: 's-vv6', petId: 's-max', date: d(9), time: '10:15', reason: 'Annual check-up and rabies booster', clinic: 'Oakwood Veterinary Clinic', vet: 'Dr. Priya Shah' }),
  ];

  const series = (petId: string, points: [number, number][]): WeightEntry[] =>
    points.map(([offset, kg], i) => ({ id: `${petId}-w${i}`, petId, date: d(offset), kg, note: '', isSample: true }));
  const weights: WeightEntry[] = [
    ...series('s-max', [[-180, 27.2], [-150, 27.6], [-120, 27.9], [-90, 28.1], [-60, 28.0], [-30, 28.3], [-3, 28.5]]),
    ...series('s-luna', [[-210, 4.3], [-170, 4.5], [-120, 4.6], [-80, 4.7], [-40, 4.8], [-5, 4.8]]),
    ...series('s-bella', [[-180, 12.9], [-150, 12.6], [-120, 12.7], [-95, 12.8], [-60, 12.5], [-30, 12.3], [-7, 12.2]]),
  ];

  const wellness: WellnessEntry[] = [];
  const pattern = [4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 4, 5, 4, 4];
  for (const pet of pets) {
    pattern.forEach((score, i) => {
      wellness.push({ id: `${pet.id}-a${i}`, petId: pet.id, date: d(-i), metric: 'appetite', score, note: '', isSample: true });
      wellness.push({ id: `${pet.id}-e${i}`, petId: pet.id, date: d(-i), metric: 'energy', score: pet.id === 's-bella' ? Math.max(2, score - 1) : score, note: '', isSample: true });
      wellness.push({ id: `${pet.id}-h${i}`, petId: pet.id, date: d(-i), metric: 'water', score: Math.min(5, score), note: '', isSample: true });
    });
  }
  wellness.push({ id: 's-b1', petId: 's-bella', date: d(-2), metric: 'behaviour', score: null, note: 'Reluctant on the stairs this morning, fine after a short rest.', isSample: true });

  const rem = (r: Partial<Reminder> & Pick<Reminder, 'id' | 'petId' | 'title' | 'kind' | 'dueDate'>): Reminder => ({
    dueTime: '09:00',
    recurrence: null,
    notifyMinutesBefore: 60,
    completedAt: null,
    dismissedAt: null,
    notificationId: null,
    isSample: true,
    ...r,
  });
  const reminders: Reminder[] = [
    rem({ id: 's-r1', petId: 's-luna', title: 'FVRCP booster', kind: 'vaccination', dueDate: d(-15) }),
    rem({ id: 's-r2', petId: 's-max', title: 'Vet appointment: annual check-up', kind: 'appointment', dueDate: d(9), dueTime: '10:15', notifyMinutesBefore: 1440 }),
    rem({ id: 's-r3', petId: 's-max', title: 'Rabies booster', kind: 'vaccination', dueDate: d(25) }),
    rem({ id: 's-r4', petId: 's-luna', title: 'Methimazole refill', kind: 'refill', dueDate: d(3), dueTime: '17:00' }),
    rem({ id: 's-r5', petId: 's-bella', title: 'Nail trim', kind: 'grooming', dueDate: today, dueTime: '16:00', recurrence: { kind: 'interval', everyDays: 21, startDate: today } }),
    rem({ id: 's-r6', petId: 's-max', title: 'NexGard Spectra', kind: 'medication', dueDate: d(4) }),
    rem({ id: 's-r7', petId: 's-bella', title: 'Dental clean', kind: 'appointment', dueDate: d(-6), completedAt: `${d(-6)}T11:00:00` }),
  ];

  const doc = (id: string, petId: string, title: string, category: PetDocument['category'], date: DateKey): PetDocument => ({
    id,
    petId,
    title,
    category,
    date,
    uri: null,
    mimeType: 'application/pdf',
    sizeBytes: null,
    isSample: true,
  });
  const documents: PetDocument[] = [
    doc('s-doc1', 's-max', 'Rabies certificate', 'vaccination', d(-340)),
    doc('s-doc2', 's-luna', 'Thyroid panel results', 'lab', d(-210)),
    doc('s-doc3', 's-luna', 'Methimazole prescription', 'prescription', d(-210)),
    doc('s-doc4', 's-bella', 'Senior wellness invoice', 'invoice', d(-40)),
    doc('s-doc5', 's-bella', 'Pet insurance policy', 'insurance', d(-365)),
    doc('s-doc6', 's-max', 'Adoption certificate', 'adoption', d(-1000)),
  ];

  return { pets, members, tasks, careLog, medications, doses, vaccinations, visits, weights, wellness, reminders, documents };
}
