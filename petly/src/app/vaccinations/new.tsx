import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { DateField } from '@/components/ui/DateField';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Screen } from '@/components/ui/Screen';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { collect, hasErrors, required } from '@/core/validation';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useReminderActions } from '@/hooks/useReminderActions';
import { useToday } from '@/hooks/useToday';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';
import { useVaccinations } from '@/stores/vaccinations';

export default function VaccinationForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; petId?: string }>();
  const { date } = useToday();
  const existing = useVaccinations((s) => s.items.find((v) => v.id === params.id));
  const { add, update, remove } = useVaccinations();
  const reminders = useReminderActions();
  const lead = useSettings((s) => s.notifications.leadMinutes);
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(existing?.petId ?? defaultPet);
  const [name, setName] = useState(existing?.name ?? '');
  const [administeredOn, setAdministeredOn] = useState(existing?.administeredOn ?? date);
  const [nextDueOn, setNextDueOn] = useState<string | null>(existing?.nextDueOn ?? null);
  const [clinic, setClinic] = useState(existing?.clinic ?? '');
  const [vet, setVet] = useState(existing?.vet ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [remind, setRemind] = useState(!existing);
  const [errors, setErrors] = useState<{ name?: 'required' }>({});
  const [confirm, setConfirm] = useState(false);

  const save = async () => {
    const e = collect({ name: required(name) }) as typeof errors;
    setErrors(e);
    if (hasErrors(e) || !petId) return;
    const data = { petId, name: name.trim(), administeredOn, nextDueOn, clinic: clinic.trim(), vet: vet.trim(), notes: notes.trim() };
    if (existing) update(existing.id, data);
    else add({ ...data, certificateDocId: null });
    if (remind && nextDueOn && nextDueOn >= date) {
      await reminders.create({ petId, title: name.trim(), kind: 'vaccination', dueDate: nextDueOn, dueTime: '09:00', recurrence: null, notifyMinutesBefore: Math.max(lead, 1440), completedAt: null, dismissedAt: null, notificationId: null });
    }
    toast(t('vaccinations.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? t('vaccinations.edit') : t('vaccinations.add') }} />
      <PetPicker value={petId} onChange={setPetId} />
      <TextField label={t('vaccinations.fields.name')} value={name} onChangeText={setName} error={errors.name} />
      <DateField label={t('vaccinations.fields.administeredOn')} value={administeredOn} onChange={(d) => d && setAdministeredOn(d)} />
      <DateField label={t('vaccinations.fields.nextDueOn')} value={nextDueOn} onChange={setNextDueOn} optional />
      <Disclaimer text={t('vaccinations.sourceNote')} />
      {nextDueOn && !existing ? <SwitchRow label={t('reminders.add')} value={remind} onValueChange={setRemind} /> : null}
      <TextField label={t('vaccinations.fields.clinic')} value={clinic} onChangeText={setClinic} optional />
      <TextField label={t('vaccinations.fields.vet')} value={vet} onChangeText={setVet} optional />
      <TextField label={t('vaccinations.fields.notes')} value={notes} onChangeText={setNotes} multiline optional />
      {existing ? (
        <View>
          <Button label={t('common.delete')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('vaccinations.deleteTitle')}
            body={existing.name}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              remove(existing.id);
              router.dismissTo('/vaccinations');
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
