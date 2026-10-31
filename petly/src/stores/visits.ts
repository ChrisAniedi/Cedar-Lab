import type { VetVisit } from '@/core/types';

import { createListStore } from './createListStore';

export const useVisits = createListStore<VetVisit>('visits', 'visit-');
