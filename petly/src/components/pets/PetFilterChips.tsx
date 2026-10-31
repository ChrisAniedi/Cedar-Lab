import { useTranslation } from 'react-i18next';

import { usePets } from '@/stores/pets';

import { OptionChips } from '../ui/OptionChips';

/** "All pets" + one chip per pet. Hidden for one-pet households. */
export function PetFilterChips({ value, onChange }: { value: string | null; onChange: (id: string | null) => void }) {
  const { t } = useTranslation();
  const pets = usePets((s) => s.pets);
  if (pets.length < 2) return null;
  return (
    <OptionChips
      scroll
      options={[{ value: 'all', label: t('dashboard.allPets') }, ...pets.map((p) => ({ value: p.id, label: p.name }))]}
      value={value ?? 'all'}
      onChange={(v) => onChange(v === 'all' ? null : v)}
    />
  );
}
