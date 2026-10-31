import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useRecurrenceLabel } from '@/components/care/useRecurrenceLabel';
import { DoseRow } from '@/components/health/DoseRow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Divider } from '@/components/ui/Divider';
import { EmptyState } from '@/components/ui/EmptyState';
import { ListRow } from '@/components/ui/ListRow';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Txt } from '@/components/ui/Txt';
import { dosesForDay, medicationStatus } from '@/core/health';
import { haptic } from '@/lib/haptics';
import { useFormat } from '@/hooks/useFormat';
import { useMemberName } from '@/hooks/useMemberName';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useToday } from '@/hooks/useToday';
import { useHousehold } from '@/stores/household';
import { useMedications } from '@/stores/medications';
import { toast } from '@/stores/toast';

export default function MedicationDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date } = useToday();
  const member = useMemberName();
  const recurrence = useRecurrenceLabel();
  const { id } = useLocalSearchParams<{ id: string }>();
  const med = useMedications((s) => s.medications.find((m) => m.id === id));
  const doses = useMedications((s) => s.doses);
  const logDose = useMedications((s) => s.logDose);
  const me = useHousehold((s) => s.currentMemberId);
  const pet = usePetLookup()(med?.petId ?? '');
  if (!med) return <EmptyState icon="medkit-outline" title={t('medications.title')} body={t('common.notFound')} />;

  const status = medicationStatus(med, date);
  const today = dosesForDay(med, doses, date);
  const history = doses.filter((d) => d.medicationId === med.id).sort((a, b) => b.at.localeCompare(a.at));
  const facts = [
    [t('medications.fields.dosage'), `${med.dosage} ${med.dosageUnit}`.trim()],
    [t('medications.fields.method'), t(`medications.methods.${med.method}`)],
    [t('medications.fields.category'), t(`medications.categories.${med.category}`)],
    [t('medications.fields.frequency'), `${recurrence(med.recurrence)} · ${med.times.map(f.time).join(', ')}`],
    [t('medications.fields.startDate'), f.date(med.startDate)],
    [t('medications.fields.endDate'), med.endDate ? f.date(med.endDate) : t('medications.fields.noEnd')],
    [t('medications.fields.prescribedBy'), med.prescribedBy || t('common.notSet')],
  ];

  return (
    <Screen edges={[]} width="form">
      <Stack.Screen options={{ title: med.name }} />
      <Card>
        <View className="gap-3">
          <View className="flex-row flex-wrap items-center gap-2">
            <Txt variant="title">{med.name}</Txt>
            <SampleBadge show={med.isSample} />
          </View>
          <View className="flex-row flex-wrap gap-2">
            <Badge label={t(`medications.${status}`)} tone={status === 'active' ? 'success' : status === 'scheduled' ? 'primary' : 'neutral'} />
            {pet ? <Badge label={pet.name} tone="neutral" icon="paw" /> : null}
          </View>
          {facts.map(([k, v]) => (
            <View key={k} className="flex-row gap-3">
              <Txt variant="caption" tone="textSecondary" style={{ width: 140 }}>
                {k}
              </Txt>
              <Txt variant="callout" style={{ flex: 1 }}>
                {v}
              </Txt>
            </View>
          ))}
          {med.instructions ? <Txt tone="textSecondary">{med.instructions}</Txt> : null}
        </View>
      </Card>
      {today.length > 0 ? (
        <Card>
          <SectionHeader title={t('medications.todayDoses')} />
          {today.map((slot, i) => (
            <View key={slot.time}>
              {i > 0 ? <Divider /> : null}
              <DoseRow
                time={slot.time}
                log={slot.log}
                onLog={(s) => {
                  if (logDose(med.id, date, slot.time, s, me)) {
                    haptic.success();
                    toast(t(s === 'given' ? 'medications.givenToast' : 'medications.skippedToast', { name: med.name }), s === 'given' ? 'success' : 'info');
                  } else toast(t('medications.alreadyLogged'), 'info');
                }}
              />
            </View>
          ))}
        </Card>
      ) : null}
      <Card>
        <SectionHeader title={t('medications.history')} />
        {history.length === 0 ? (
          <Txt variant="caption" tone="textSecondary">
            {t('medications.noHistory')}
          </Txt>
        ) : (
          history.map((d) => (
            <ListRow
              key={d.id}
              icon={d.status === 'given' ? 'checkmark-circle-outline' : 'remove-circle-outline'}
              title={`${t(`medications.${d.status}`)} · ${f.date(d.date)} ${f.time(d.time)}`}
              subtitle={t('activity.by', { name: member(d.by) })}
            />
          ))
        )}
      </Card>
      <Disclaimer text={t('medications.noDosageAdvice')} />
      <Button label={t('common.edit')} icon="create-outline" variant="secondary" onPress={() => router.push({ pathname: '/medications/new', params: { id: med.id } })} />
    </Screen>
  );
}
