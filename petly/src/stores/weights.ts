import type { WeightEntry } from '@/core/types';

import { createListStore } from './createListStore';

export const useWeights = createListStore<WeightEntry>('weights', 'wt-');
