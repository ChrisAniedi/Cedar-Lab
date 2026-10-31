import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CATEGORY_ICON } from '@/components/care/categoryIcons';
import { RecurrencePicker } from '@/components/care/RecurrencePicker';
import { PetPicker } from '@/components/pets/PetPicker';
import { MemberPicker } from '@/components/team/MemberPicker';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { TimeField } from '@/components/ui/TimeField';
import { CARE_CATEGORIES, type CareCategory, type Recurrence } from '@/core/types';
import { collect, hasErrors, required } from '@/core/validation';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useToday } from '@/hooks/useToday';
import { useCare } from '@/stores/care';
import { useHousehold } from '@/stores/household';
import { toast } from '@/stores/toast';

/** Create or edit a recurring care task. */
export default function CareTaskForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; petId?: string; category?: string }>();
  const { date } = useToday();
  const existing = useCare((s) => s.tasks.find((x) => x.id === params.id));
  const { addTask, updateTask, removeTask } = useCare();
  const me = useHousehold((s) => s.currentMemberId);
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(existing?.petId ?? defaultPet);
  const [title, setTitle] = useState(existing?.title ?? '');
  const [category, setCategory] = useState<CareCategory>(existing?.category ?? (CARE_CATEGORIES.includes(params.category as CareCategory) ? (params.category as CareCategory) : 'feeding'));
  const [time, setTime] = useState(existing?.time ?? '08:00');
  const [recurrence, setRecurrence] = useState<Recurrence>(existing?.recurrence ?? { kind: 'daily' });
  const [assigneeId, setAssigneeId] = useState<string | null>(existing ? existing.assigneeId : me);
  const [errors, setErrors] = useState<{ title?: 'required' }>({});
  const [confirm, setConfirm] = useState(false);

  const save = () => {
    const e = collect({ title: required(title) }) as { title?: 'required' };
    setErrors(e);
    if (hasErrors(e) || !petId) return;
    const data = { petId, title: title.trim(), category, time, recurrence, assigneeId };
    if (existing) updateTask(existing.id, data);
    else addTask(data);
    toast(t('care.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? t('care.editTask') : t('care.new') }} />
      <PetPicker value={petId} onChange={setPetId} />
      <TextField label={t('care.fields.title')} placeholder={t('care.fields.titlePlaceholder')} value={title} onChangeText={setTitle} error={errors.title} />
      <FieldLabel label={t('care.fields.category')}>
        <OptionChips options={CARE_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`), icon: CATEGORY_ICON[c] }))} value={category} onChange={setCategory} />
      </FieldLabel>
      <TimeField label={t('care.fields.time')} value={time} onChange={setTime} />
      <RecurrencePicker value={recurrence} onChange={setRecurrence} today={date} />
      <MemberPicker label={t('care.fields.assignee')} value={assigneeId} onChange={setAssigneeId} />
      {existing ? (
        <View>
          <Button label={t('care.deleteTask')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('care.deleteTitle')}
            body={existing.title}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              removeTask(existing.id);
              router.back();
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
