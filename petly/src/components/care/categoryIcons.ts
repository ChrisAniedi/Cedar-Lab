import type { CareCategory } from '@/core/types';

import type { IconName } from '../ui/Icon';

export const CATEGORY_ICON: Record<CareCategory, IconName> = {
  feeding: 'restaurant-outline',
  water: 'water-outline',
  walking: 'walk-outline',
  exercise: 'fitness-outline',
  grooming: 'cut-outline',
  hygiene: 'sparkles-outline',
  medication: 'medkit-outline',
  custom: 'paw-outline',
};
