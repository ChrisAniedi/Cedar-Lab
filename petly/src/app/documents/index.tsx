import { useState } from 'react';

import { DocumentList } from '@/components/health/DocumentList';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Screen } from '@/components/ui/Screen';

export default function Documents() {
  const [petId, setPetId] = useState<string | null>(null);
  return (
    <Screen edges={[]}>
      <PetFilterChips value={petId} onChange={setPetId} />
      <DocumentList petId={petId} />
    </Screen>
  );
}
