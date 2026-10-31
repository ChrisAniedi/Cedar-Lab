import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CATEGORY_ICON } from '@/components/care/categoryIcons';
import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { nowTimeKey } from '@/core/dates';
import { CARE_CATEGORIES, type CareCategory } from '@/core/types';
import { haptic } from '@/lib/haptics';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useToday } from '@/hooks/useToday';
import { useCare } from '@/stores/care';
import { useHousehold } from '@/stores/household';
import { usePets } from '@/stores/pets';
import { toast } from '@/stores/toast';

/** Log something just done (e.g. an extra feeding): a one-off task completed now. */
export default function LogActivity() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ petId?: string; category?: string }>();
  const { date } = useToday();
  const me = useHousehold((s) => s.currentMemberId);
  const pets = usePets((s) => s.pets);
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(defaultPet);
  const [category, setCategory] = useState<CareCategory>(CARE_CATEGORIES.includes(params.category as CareCategory) ? (params.category as CareCategory) : 'feeding');
  const [note, setNote] = useState('');

  const save = () => {
    if (!petId) return;
    const { addTask, complete } = useCare.getState();
    const task = addTask({ petId, title: note.trim() || t(`categories.${category}`), category, time: nowTimeKey(new Date()), recurrence: { kind: 'once', date }, assigneeId: me });
    complete(task.id, date, me);
    haptic.success();
    toast(t('care.log.logged', { pet: pets.find((p) => p.id === petId)?.name ?? '' }));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Txt tone="textSecondary">{t('care.log.body')}</Txt>
      <PetPicker value={petId} onChange={setPetId} />
      <FieldLabel label={t('care.fields.category')}>
        <OptionChips options={CARE_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`), icon: CATEGORY_ICON[c] }))} value={category} onChange={setCategory} />
      </FieldLabel>
      <TextField label={t('care.log.note')} value={note} onChangeText={setNote} optional />
    </Screen>
  );
}
