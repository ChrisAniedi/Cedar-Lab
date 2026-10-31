import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { RecurrencePicker } from '@/components/care/RecurrencePicker';
import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { DateField } from '@/components/ui/DateField';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { TimesField } from '@/components/ui/TimesField';
import { MEDICATION_CATEGORIES, MEDICATION_METHODS, type MedicationCategory, type MedicationMethod, type Recurrence } from '@/core/types';
import { collect, hasErrors, required } from '@/core/validation';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useToday } from '@/hooks/useToday';
import { useMedications } from '@/stores/medications';
import { toast } from '@/stores/toast';

export default function MedicationForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; petId?: string }>();
  const { date } = useToday();
  const existing = useMedications((s) => s.medications.find((m) => m.id === params.id));
  const { add, update, remove } = useMedications();
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(existing?.petId ?? defaultPet);
  const [name, setName] = useState(existing?.name ?? '');
  const [dosage, setDosage] = useState(existing?.dosage ?? '');
  const [dosageUnit, setDosageUnit] = useState(existing?.dosageUnit ?? 'mg');
  const [recurrence, setRecurrence] = useState<Recurrence>(existing?.recurrence ?? { kind: 'daily' });
  const [times, setTimes] = useState(existing?.times ?? ['08:00']);
  const [startDate, setStartDate] = useState(existing?.startDate ?? date);
  const [endDate, setEndDate] = useState<string | null>(existing?.endDate ?? null);
  const [category, setCategory] = useState<MedicationCategory>(existing?.category ?? 'other');
  const [method, setMethod] = useState<MedicationMethod>(existing?.method ?? 'oral');
  const [prescribedBy, setPrescribedBy] = useState(existing?.prescribedBy ?? '');
  const [instructions, setInstructions] = useState(existing?.instructions ?? '');
  const [more, setMore] = useState(!!existing);
  const [errors, setErrors] = useState<{ name?: 'required'; dosage?: 'required' }>({});
  const [confirm, setConfirm] = useState(false);

  const save = () => {
    const e = collect({ name: required(name), dosage: required(dosage) }) as typeof errors;
    setErrors(e);
    if (hasErrors(e) || !petId) return;
    const data = { petId, name: name.trim(), dosage: dosage.trim(), dosageUnit: dosageUnit.trim(), recurrence, times, startDate, endDate, category, method, prescribedBy: prescribedBy.trim(), instructions: instructions.trim() };
    if (existing) update(existing.id, data);
    else add(data);
    toast(t('medications.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? t('medications.edit') : t('medications.add') }} />
      <PetPicker value={petId} onChange={setPetId} />
      <TextField label={t('medications.fields.name')} value={name} onChangeText={setName} error={errors.name} />
      <View className="flex-row gap-3">
        <View className="flex-1">
          <TextField label={t('medications.fields.dosage')} value={dosage} onChangeText={setDosage} error={errors.dosage} keyboardType="decimal-pad" />
        </View>
        <View className="w-32">
          <TextField label={t('medications.fields.unit')} value={dosageUnit} onChangeText={setDosageUnit} autoCapitalize="none" />
        </View>
      </View>
      <Disclaimer text={t('medications.noDosageAdvice')} />
      <RecurrencePicker value={recurrence} onChange={setRecurrence} today={date} />
      <TimesField label={t('medications.fields.times')} values={times} onChange={setTimes} />
      <DateField label={t('medications.fields.startDate')} value={startDate} onChange={(d) => d && setStartDate(d)} />
      <Button label={more ? t('common.showLess') : t('common.showMore')} variant="ghost" icon={more ? 'chevron-up' : 'chevron-down'} onPress={() => setMore(!more)} />
      {more ? (
        <View className="gap-5">
          <DateField label={t('medications.fields.endDate')} value={endDate} onChange={setEndDate} optional placeholder={t('medications.fields.noEnd')} />
          <FieldLabel label={t('medications.fields.category')}>
            <OptionChips options={MEDICATION_CATEGORIES.map((c) => ({ value: c, label: t(`medications.categories.${c}`) }))} value={category} onChange={setCategory} />
          </FieldLabel>
          <FieldLabel label={t('medications.fields.method')}>
            <OptionChips options={MEDICATION_METHODS.map((c) => ({ value: c, label: t(`medications.methods.${c}`) }))} value={method} onChange={setMethod} />
          </FieldLabel>
          <TextField label={t('medications.fields.prescribedBy')} value={prescribedBy} onChangeText={setPrescribedBy} optional />
          <TextField label={t('medications.fields.instructions')} value={instructions} onChangeText={setInstructions} multiline optional />
          <Button
            label={t('medications.fields.prescription')}
            icon="attach-outline"
            variant="secondary"
            onPress={() => router.push({ pathname: '/documents/new', params: { petId: petId ?? '', category: 'prescription', title: name } })}
          />
        </View>
      ) : null}
      {existing ? (
        <View>
          <Button label={t('common.delete')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('medications.deleteTitle')}
            body={t('medications.deleteBody')}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              remove(existing.id);
              router.dismissTo('/medications');
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
