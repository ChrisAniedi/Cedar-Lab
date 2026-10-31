import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { searchBreeds } from '@/core/breeds';
import { SPECIES, type Species } from '@/core/types';

import { Chip } from '../ui/Chip';
import { FieldLabel } from '../ui/FieldLabel';
import { OptionChips } from '../ui/OptionChips';
import { TextField } from '../ui/TextField';

/** Species chips + searchable breed with free-text custom entry. */
export function SpeciesBreedFields({ species, breed, onChange }: { species: Species; breed: string; onChange: (c: { species?: Species; breed?: string }) => void }) {
  const { t } = useTranslation();
  const matches = searchBreeds(species, breed).filter((b) => b !== breed);
  return (
    <View className="gap-4">
      <FieldLabel label={t('pets.fields.species')}>
        <OptionChips options={SPECIES.map((s) => ({ value: s, label: t(`species.${s}`) }))} value={species} onChange={(s) => onChange({ species: s, breed: '' })} />
      </FieldLabel>
      <TextField label={t('pets.fields.breed')} placeholder={t('onboarding.species.breedHint')} value={breed} onChangeText={(v) => onChange({ breed: v })} autoCorrect={false} />
      {matches.length > 0 ? (
        <View className="flex-row flex-wrap gap-2">
          {matches.map((b) => (
            <Chip key={b} label={b} role="button" onPress={() => onChange({ breed: b })} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
