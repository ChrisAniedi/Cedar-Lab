import type { PetDocument } from '@/core/types';

import { createListStore } from './createListStore';

export const useDocuments = createListStore<PetDocument>('documents', 'doc-');
