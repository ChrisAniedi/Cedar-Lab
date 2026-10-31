import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { collect, hasErrors, required } from '@/core/validation';
import type { NewPet } from '@/stores/pets';

import { Button } from '../ui/Button';
import { Screen } from '../ui/Screen';
import { SectionHeader } from '../ui/SectionHeader';
import { SwitchRow } from '../ui/SwitchRow';
import { TextField } from '../ui/TextField';
import { BasicsFields } from './BasicsFields';
import { HealthFields } from './HealthFields';
import { PhotoPicker } from './PhotoPicker';
import { SpeciesBreedFields } from './SpeciesBreedFields';
import { VetFields } from './VetFields';

/** Add / edit a pet. Essentials first; more details progressively disclosed. */
export function PetForm({ initial, id, onSubmit, footerExtra }: { initial: NewPet; id: string; onSubmit: (p: NewPet) => void; footerExtra?: ReactNode }) {
  const { t } = useTranslation();
  const [pet, setPet] = useState(initial);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<{ name?: 'required' }>({});
  const set = (c: Partial<NewPet>) => setPet((p) => ({ ...p, ...c }));

  const submit = () => {
    const e = collect({ name: required(pet.name) }) as { name?: 'required' };
    setErrors(e);
    if (!hasErrors(e)) onSubmit({ ...pet, name: pet.name.trim() });
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={submit} full />}>
      <PhotoPicker pet={{ ...pet, id }} onChange={(photoUri) => set({ photoUri })} />
      <SectionHeader title={t('pets.sections.identity')} />
      <TextField label={t('pets.fields.name')} value={pet.name} onChangeText={(name) => set({ name })} error={errors.name} />
      <SpeciesBreedFields species={pet.species} breed={pet.breed} onChange={set} />
      <BasicsFields birthDate={pet.birthDate} sex={pet.sex} weightKg={pet.weightKg} onChange={set} />
      <Button label={more ? t('common.showLess') : t('common.showMore')} variant="ghost" icon={more ? 'chevron-up' : 'chevron-down'} onPress={() => setMore(!more)} />
      {more ? (
        <View className="gap-5">
          <TextField label={t('pets.fields.colour')} value={pet.colour} onChangeText={(colour) => set({ colour })} optional />
          <TextField label={t('pets.fields.microchip')} value={pet.microchip ?? ''} onChangeText={(v) => set({ microchip: v || null })} optional />
          <SwitchRow label={t('pets.fields.neutered')} value={!!pet.neutered} onValueChange={(neutered) => set({ neutered })} />
          <SectionHeader title={t('pets.sections.health')} />
          <HealthFields allergies={pet.allergies} conditions={pet.conditions} onChange={set} />
          <SectionHeader title={t('pets.sections.vet')} />
          <VetFields vetName={pet.vetName} vetClinic={pet.vetClinic} vetPhone={pet.vetPhone} onChange={set} />
          <SectionHeader title={t('pets.sections.notes')} />
          <TextField label={t('pets.fields.feedingNotes')} value={pet.feedingNotes} onChangeText={(feedingNotes) => set({ feedingNotes })} multiline optional />
          <TextField label={t('pets.fields.behaviourNotes')} value={pet.behaviourNotes} onChangeText={(behaviourNotes) => set({ behaviourNotes })} multiline optional />
        </View>
      ) : null}
      {footerExtra}
    </Screen>
  );
}
