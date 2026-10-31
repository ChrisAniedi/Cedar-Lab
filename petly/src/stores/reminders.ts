import type { Reminder } from '@/core/types';

import { createListStore } from './createListStore';

/** Scheduling side-effects live in hooks/useReminderActions so this slice stays pure state. */
export const useReminders = createListStore<Reminder>('reminders', 'rem-');
