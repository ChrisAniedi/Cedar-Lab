import type { Vaccination } from '@/core/types';

import { createListStore } from './createListStore';

export const useVaccinations = createListStore<Vaccination>('vaccinations', 'vax-');
