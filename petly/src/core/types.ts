/** Domain model. Framework-free. Every pet-related record carries a petId. */

export type ID = string;
/** Local calendar date, `YYYY-MM-DD`. */
export type DateKey = string;
/** Local wall-clock time, `HH:mm`. */
export type TimeKey = string;
/** ISO-8601 timestamp (UTC). */
export type Timestamp = string;

export const SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'fish', 'reptile', 'other'] as const;
export type Species = (typeof SPECIES)[number];

export const SEXES = ['male', 'female', 'unknown'] as const;
export type Sex = (typeof SEXES)[number];

export interface Pet {
  id: ID;
  name: string;
  species: Species;
  breed: string;
  birthDate: DateKey | null;
  sex: Sex;
  weightKg: number | null;
  colour: string;
  photoUri: string | null;
  neutered: boolean | null;
  microchip: string | null;
  allergies: string[];
  conditions: string[];
  behaviourNotes: string;
  feedingNotes: string;
  vetName: string;
  vetClinic: string;
  vetPhone: string;
  isSample: boolean;
  createdAt: Timestamp;
}

export type Recurrence =
  | { kind: 'once'; date: DateKey }
  | { kind: 'daily' }
  | { kind: 'weekly'; days: number[] } // 0 = Sunday
  | { kind: 'interval'; everyDays: number; startDate: DateKey }
  | { kind: 'monthly'; dayOfMonth: number };

export const CARE_CATEGORIES = ['feeding', 'water', 'walking', 'exercise', 'grooming', 'hygiene', 'medication', 'custom'] as const;
export type CareCategory = (typeof CARE_CATEGORIES)[number];

export interface CareTask {
  id: ID;
  petId: ID;
  title: string;
  category: CareCategory;
  time: TimeKey;
  recurrence: Recurrence;
  assigneeId: ID | null;
  isSample: boolean;
  createdAt: Timestamp;
}

/** Append-only audit trail. A correction is a new 'undone' entry, never a delete. */
export interface CareLogEntry {
  id: ID;
  taskId: ID;
  petId: ID;
  date: DateKey;
  action: 'completed' | 'undone';
  by: ID;
  at: Timestamp;
}

export const MEDICATION_CATEGORIES = ['antibiotic', 'antiparasitic', 'painRelief', 'supplement', 'chronic', 'other'] as const;
export type MedicationCategory = (typeof MEDICATION_CATEGORIES)[number];
export const MEDICATION_METHODS = ['oral', 'topical', 'injection', 'drops', 'inhaled', 'other'] as const;
export type MedicationMethod = (typeof MEDICATION_METHODS)[number];

export interface Medication {
  id: ID;
  petId: ID;
  name: string;
  category: MedicationCategory;
  dosage: string;
  dosageUnit: string;
  method: MedicationMethod;
  startDate: DateKey;
  endDate: DateKey | null;
  recurrence: Recurrence;
  times: TimeKey[];
  prescribedBy: string;
  instructions: string;
  isSample: boolean;
  createdAt: Timestamp;
}

export interface DoseLog {
  id: ID;
  medicationId: ID;
  petId: ID;
  date: DateKey;
  time: TimeKey;
  status: 'given' | 'skipped';
  by: ID;
  at: Timestamp;
}

export interface Vaccination {
  id: ID;
  petId: ID;
  name: string;
  administeredOn: DateKey;
  nextDueOn: DateKey | null;
  clinic: string;
  vet: string;
  notes: string;
  certificateDocId: ID | null;
  isSample: boolean;
}

export interface VetVisit {
  id: ID;
  petId: ID;
  date: DateKey;
  time: TimeKey | null;
  clinic: string;
  vet: string;
  reason: string;
  concerns: string;
  diagnosis: string;
  treatment: string;
  medication: string;
  followUpOn: DateKey | null;
  cost: number | null;
  currency: Currency;
  notes: string;
  documentIds: ID[];
  isSample: boolean;
}

export interface WeightEntry {
  id: ID;
  petId: ID;
  date: DateKey;
  kg: number;
  note: string;
  isSample: boolean;
}

export const WELLNESS_METRICS = ['appetite', 'water', 'energy'] as const;
export type WellnessMetric = (typeof WELLNESS_METRICS)[number];

/** Appetite / water / energy on a 1–5 scale, or a free-text behaviour note. */
export interface WellnessEntry {
  id: ID;
  petId: ID;
  date: DateKey;
  metric: WellnessMetric | 'behaviour';
  score: number | null;
  note: string;
  isSample: boolean;
}

export const REMINDER_KINDS = ['vaccination', 'medication', 'appointment', 'grooming', 'feeding', 'refill', 'custom'] as const;
export type ReminderKind = (typeof REMINDER_KINDS)[number];

export interface Reminder {
  id: ID;
  petId: ID;
  title: string;
  kind: ReminderKind;
  dueDate: DateKey;
  dueTime: TimeKey;
  recurrence: Recurrence | null;
  notifyMinutesBefore: number;
  completedAt: Timestamp | null;
  dismissedAt: Timestamp | null;
  notificationId: string | null;
  isSample: boolean;
}

export const DOCUMENT_CATEGORIES = ['vaccination', 'prescription', 'lab', 'insurance', 'adoption', 'invoice', 'other'] as const;
export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

export interface PetDocument {
  id: ID;
  petId: ID;
  title: string;
  category: DocumentCategory;
  date: DateKey;
  uri: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  isSample: boolean;
}

export const ROLES = ['owner', 'admin', 'caregiver', 'viewer', 'sitter'] as const;
export type Role = (typeof ROLES)[number];

export interface Member {
  id: ID;
  name: string;
  role: Role;
  isSelf: boolean;
  isSample: boolean;
}

export const CURRENCIES = ['USD', 'GBP', 'CAD', 'EUR', 'AUD', 'NZD'] as const;
export type Currency = (typeof CURRENCIES)[number];
export type UnitSystem = 'metric' | 'imperial';
export type TimeFormat = '12h' | '24h';
export type ThemePreference = 'system' | 'light' | 'dark';
