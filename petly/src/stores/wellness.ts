import type { WellnessEntry } from '@/core/types';

import { createListStore } from './createListStore';

export const useWellness = createListStore<WellnessEntry>('wellness', 'wl-');
