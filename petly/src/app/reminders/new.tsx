import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { RecurrencePicker } from '@/components/care/RecurrencePicker';
import { REMINDER_ICON } from '@/components/health/ReminderCard';
import { PetPicker } from '@/components/pets/PetPicker';
import { Banner } from '@/components/ui/Banner';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { DateField } from '@/components/ui/DateField';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { TimeField } from '@/components/ui/TimeField';
import { REMINDER_KINDS, type Recurrence, type ReminderKind } from '@/core/types';
import { collect, hasErrors, required } from '@/core/validation';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useReminderActions } from '@/hooks/useReminderActions';
import { useToday } from '@/hooks/useToday';
import { useReminders } from '@/stores/reminders';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

const LEADS = ['0', '15', '60', '1440', '10080'] as const;

export default function ReminderForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; petId?: string }>();
  const { date } = useToday();
  const existing = useReminders((s) => s.items.find((r) => r.id === params.id));
  const actions = useReminderActions();
  const prefs = useSettings((s) => s.notifications);
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(existing?.petId ?? defaultPet);
  const [title, setTitle] = useState(existing?.title ?? '');
  const [kind, setKind] = useState<ReminderKind>(existing?.kind ?? 'custom');
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? date);
  const [dueTime, setDueTime] = useState(existing?.dueTime ?? '09:00');
  const [repeats, setRepeats] = useState(!!existing?.recurrence);
  const [recurrence, setRecurrence] = useState<Recurrence>(existing?.recurrence ?? { kind: 'weekly', days: [1] });
  const [lead, setLead] = useState<(typeof LEADS)[number]>((LEADS.find((l) => Number(l) === (existing?.notifyMinutesBefore ?? prefs.leadMinutes)) ?? '60'));
  const [errors, setErrors] = useState<{ title?: 'required' }>({});
  const [confirm, setConfirm] = useState(false);

  const save = async () => {
    const e = collect({ title: required(title) }) as typeof errors;
    setErrors(e);
    if (hasErrors(e) || !petId) return;
    const data = { petId, title: title.trim(), kind, dueDate, dueTime, recurrence: repeats ? recurrence : null, notifyMinutesBefore: Number(lead) };
    if (existing) await actions.save({ ...existing, ...data });
    else await actions.create({ ...data, completedAt: null, dismissedAt: null, notificationId: null });
    toast(t('reminders.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? existing.title : t('reminders.add') }} />
      {!prefs.enabled ? <Banner icon="notifications-off-outline" text={t('reminders.notificationsOff')} /> : null}
      <PetPicker value={petId} onChange={setPetId} />
      <TextField label={t('reminders.fields.title')} placeholder={t('reminders.fields.titlePlaceholder')} value={title} onChangeText={setTitle} error={errors.title} />
      <FieldLabel label={t('reminders.fields.kind')}>
        <OptionChips options={REMINDER_KINDS.map((k) => ({ value: k, label: t(`reminders.kinds.${k}`), icon: REMINDER_ICON[k] }))} value={kind} onChange={setKind} />
      </FieldLabel>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <DateField label={t('reminders.fields.date')} value={dueDate} onChange={(d) => d && setDueDate(d)} />
        </View>
        <View className="flex-1">
          <TimeField label={t('reminders.fields.time')} value={dueTime} onChange={setDueTime} />
        </View>
      </View>
      <SwitchRow label={t('reminders.fields.repeat')} description={repeats ? undefined : t('reminders.doesNotRepeat')} value={repeats} onValueChange={setRepeats} />
      {repeats ? <RecurrencePicker value={recurrence} onChange={setRecurrence} today={dueDate} kinds={['daily', 'weekly', 'interval', 'monthly']} /> : null}
      <FieldLabel label={t('reminders.fields.notify')}>
        <OptionChips options={LEADS.map((l) => ({ value: l, label: t(`reminders.lead.${l}`) }))} value={lead} onChange={setLead} />
      </FieldLabel>
      {existing ? (
        <View>
          <Button label={t('common.delete')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('common.delete')}
            body={existing.title}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={async () => {
              await actions.remove(existing);
              router.back();
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
