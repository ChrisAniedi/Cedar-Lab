import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DocumentList } from '@/components/health/DocumentList';
import { WellnessPanel } from '@/components/health/WellnessPanel';
import { PetHeader } from '@/components/pets/PetHeader';
import { PET_TABS, PetTabBar, type PetTab } from '@/components/pets/PetTabBar';
import { PetCareTab } from '@/components/pets/tabs/PetCareTab';
import { PetHealthTab } from '@/components/pets/tabs/PetHealthTab';
import { PetOverviewTab } from '@/components/pets/tabs/PetOverviewTab';
import { PetRecordsTab } from '@/components/pets/tabs/PetRecordsTab';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { usePets } from '@/stores/pets';

export default function PetProfile() {
  const { t } = useTranslation();
  const { id, tab } = useLocalSearchParams<{ id: string; tab?: string }>();
  const pet = usePets((s) => s.pets.find((p) => p.id === id));
  const [active, setActive] = useState<PetTab>(PET_TABS.includes(tab as PetTab) ? (tab as PetTab) : 'overview');

  if (!pet) {
    return (
      <Screen edges={[]}>
        <EmptyState icon="paw-outline" title={t('pets.title')} body={t('common.notFound')} />
      </Screen>
    );
  }

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: pet.name }} />
      <PetHeader pet={pet} />
      <PetTabBar value={active} onChange={setActive} />
      {active === 'overview' ? <PetOverviewTab pet={pet} /> : null}
      {active === 'health' ? <PetHealthTab pet={pet} /> : null}
      {active === 'care' ? <PetCareTab pet={pet} /> : null}
      {active === 'records' ? <PetRecordsTab pet={pet} /> : null}
      {active === 'documents' ? <DocumentList petId={pet.id} /> : null}
      {active === 'wellness' ? <WellnessPanel petId={pet.id} /> : null}
    </Screen>
  );
}
