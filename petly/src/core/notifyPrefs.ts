import type { ReminderKind } from './types';

export interface NotifyPrefs {
  enabled: boolean;
  care: boolean;
  medication: boolean;
  vaccination: boolean;
  appointments: boolean;
}

/** Whether a reminder of this kind should raise a device notification. */
export function shouldNotify(kind: ReminderKind, p: NotifyPrefs): boolean {
  if (!p.enabled) return false;
  switch (kind) {
    case 'medication':
    case 'refill':
      return p.medication;
    case 'vaccination':
      return p.vaccination;
    case 'appointment':
      return p.appointments;
    default:
      return p.care;
  }
}
