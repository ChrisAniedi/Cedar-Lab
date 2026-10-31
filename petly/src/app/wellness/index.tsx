import { useTranslation } from 'react-i18next';

import { WellnessPanel } from '@/components/health/WellnessPanel';
import { PetPicker } from '@/components/pets/PetPicker';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { useSelectedPet } from '@/hooks/useSelectedPet';
import { usePets } from '@/stores/pets';

/** Health analytics. Every chart belongs to one pet, so a pet is always selected. */
export default function Wellness() {
  const { t } = useTranslation();
  const pet = useSelectedPet();
  const selectPet = usePets((s) => s.selectPet);
  if (!pet) return <EmptyState icon="paw-outline" title={t('pets.emptyTitle')} body={t('pets.emptyBody')} />;
  return (
    <Screen edges={[]}>
      <PetPicker value={pet.id} onChange={selectPet} />
      <WellnessPanel petId={pet.id} />
    </Screen>
  );
}
