import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { DateField } from '@/components/ui/DateField';
import { Screen } from '@/components/ui/Screen';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { TimeField } from '@/components/ui/TimeField';
import { parseDecimal } from '@/core/units';
import { collect, hasErrors, positiveNumber, required } from '@/core/validation';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useReminderActions } from '@/hooks/useReminderActions';
import { useToday } from '@/hooks/useToday';
import { usePets } from '@/stores/pets';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';
import { useVisits } from '@/stores/visits';

export default function VisitForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; petId?: string }>();
  const { date } = useToday();
  const existing = useVisits((s) => s.items.find((v) => v.id === params.id));
  const { add, update, remove } = useVisits();
  const currency = useSettings((s) => s.currency);
  const reminders = useReminderActions();
  const defaultPet = useDefaultPetId(params.petId);
  const pets = usePets((s) => s.pets);
  const [petId, setPetId] = useState(existing?.petId ?? defaultPet);
  const pet = pets.find((p) => p.id === petId);
  const [v, setV] = useState({
    date: existing?.date ?? date,
    time: existing?.time ?? '09:00',
    clinic: existing?.clinic ?? pet?.vetClinic ?? '',
    vet: existing?.vet ?? pet?.vetName ?? '',
    reason: existing?.reason ?? '',
    concerns: existing?.concerns ?? '',
    diagnosis: existing?.diagnosis ?? '',
    treatment: existing?.treatment ?? '',
    medication: existing?.medication ?? '',
    followUpOn: existing?.followUpOn ?? (null as string | null),
    cost: existing?.cost != null ? String(existing.cost) : '',
    notes: existing?.notes ?? '',
  });
  const set = (c: Partial<typeof v>) => setV((x) => ({ ...x, ...c }));
  const [more, setMore] = useState(!!existing);
  const [remind, setRemind] = useState(true);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [confirm, setConfirm] = useState(false);
  const validate = () => collect({ reason: required(v.reason), cost: positiveNumber(v.cost, { optional: true }) });

  const save = async () => {
    const e = validate();
    setErrors(e);
    if (hasErrors(e) || !petId) return;
    const data = { ...v, petId, reason: v.reason.trim(), cost: parseDecimal(v.cost), currency: existing?.currency ?? currency };
    if (existing) update(existing.id, data);
    else add({ ...data, documentIds: [] });
    if (!existing && remind) {
      if (v.date > date) await reminders.create({ petId, title: v.reason.trim(), kind: 'appointment', dueDate: v.date, dueTime: v.time, recurrence: null, notifyMinutesBefore: 1440, completedAt: null, dismissedAt: null, notificationId: null });
      if (v.followUpOn) await reminders.create({ petId, title: `${t('visits.fields.followUpOn')}: ${v.reason.trim()}`, kind: 'appointment', dueDate: v.followUpOn, dueTime: '09:00', recurrence: null, notifyMinutesBefore: 1440, completedAt: null, dismissedAt: null, notificationId: null });
    }
    toast(t('visits.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? t('visits.edit') : t('visits.add') }} />
      <PetPicker value={petId} onChange={setPetId} />
      <TextField label={t('visits.fields.reason')} value={v.reason} onChangeText={(reason) => set({ reason })} error={errors.reason} />
      <View className="flex-row gap-3">
        <View className="flex-1">
          <DateField label={t('visits.fields.date')} value={v.date} onChange={(d) => d && set({ date: d })} />
        </View>
        <View className="flex-1">
          <TimeField label={t('visits.fields.time')} value={v.time} onChange={(time) => set({ time })} />
        </View>
      </View>
      <TextField label={t('visits.fields.clinic')} value={v.clinic} onChangeText={(clinic) => set({ clinic })} optional />
      <TextField label={t('visits.fields.vet')} value={v.vet} onChangeText={(vet) => set({ vet })} optional />
      <Button label={more ? t('common.showLess') : t('common.showMore')} variant="ghost" icon={more ? 'chevron-up' : 'chevron-down'} onPress={() => setMore(!more)} />
      {more ? (
        <View className="gap-5">
          <TextField label={t('visits.fields.concerns')} value={v.concerns} onChangeText={(concerns) => set({ concerns })} multiline optional />
          <TextField label={t('visits.fields.diagnosis')} value={v.diagnosis} onChangeText={(diagnosis) => set({ diagnosis })} multiline optional />
          <TextField label={t('visits.fields.treatment')} value={v.treatment} onChangeText={(treatment) => set({ treatment })} multiline optional />
          <TextField label={t('visits.fields.medication')} value={v.medication} onChangeText={(medication) => set({ medication })} optional />
          <DateField label={t('visits.fields.followUpOn')} value={v.followUpOn} onChange={(followUpOn) => set({ followUpOn })} optional />
          <TextField label={`${t('visits.fields.cost')} (${existing?.currency ?? currency})`} value={v.cost} onChangeText={(cost) => set({ cost })} keyboardType="decimal-pad" error={errors.cost} optional />
          <TextField label={t('visits.fields.notes')} value={v.notes} onChangeText={(notes) => set({ notes })} multiline optional />
        </View>
      ) : null}
      {!existing && (v.date > date || v.followUpOn) ? <SwitchRow label={t('visits.addFollowUpReminder')} value={remind} onValueChange={setRemind} /> : null}
      {existing ? (
        <View>
          <Button label={t('common.delete')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('visits.deleteTitle')}
            body={existing.reason}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              remove(existing.id);
              router.dismissTo('/visits');
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
