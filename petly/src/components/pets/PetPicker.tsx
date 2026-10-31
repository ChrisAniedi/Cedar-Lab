import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { usePets } from '@/stores/pets';

import { Chip } from '../ui/Chip';
import { FieldLabel } from '../ui/FieldLabel';

/** Every pet-related record must belong to a pet — forms start with this. */
export function PetPicker({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  const { t } = useTranslation();
  const pets = usePets((s) => s.pets);
  return (
    <FieldLabel label={t('common.selectPet')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2" accessibilityRole="radiogroup">
        {pets.map((p) => (
          <Chip key={p.id} label={p.name} selected={value === p.id} onPress={() => onChange(p.id)} />
        ))}
      </ScrollView>
    </FieldLabel>
  );
}
