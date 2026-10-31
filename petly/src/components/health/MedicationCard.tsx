import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { medicationStatus, nextDose } from '@/core/health';
import type { Medication } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useToday } from '@/hooks/useToday';

import { useRecurrenceLabel } from '../care/useRecurrenceLabel';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

const STATUS_TONE = { active: 'success', scheduled: 'primary', completed: 'neutral' } as const;

export function MedicationCard({ med }: { med: Medication }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const now = useToday();
  const pet = usePetLookup()(med.petId);
  const recurrence = useRecurrenceLabel();
  const status = medicationStatus(med, now.date);
  const next = status === 'completed' ? null : nextDose(med, now);
  return (
    <Card onPress={() => router.push({ pathname: '/medications/[id]', params: { id: med.id } })} accessibilityLabel={`${med.name}, ${pet?.name ?? ''}`}>
      <View className="flex-row items-start gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
          <Icon name="medkit-outline" tone="textPrimary" />
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Txt variant="subheading">{med.name}</Txt>
            <SampleBadge show={med.isSample} />
          </View>
          <Txt variant="caption" tone="textSecondary">
            {[pet?.name, `${med.dosage} ${med.dosageUnit}`.trim(), recurrence(med.recurrence)].filter(Boolean).join(' · ')}
          </Txt>
          <View className="mt-1 flex-row flex-wrap items-center gap-2">
            <Badge label={t(`medications.${status}`)} tone={STATUS_TONE[status]} />
            {status !== 'completed' ? (
              <Txt variant="caption" tone="textSecondary">
                {next ? t('medications.next', { when: `${f.relative(next.date)} ${f.time(next.time)}` }) : t('medications.noNext')}
              </Txt>
            ) : null}
          </View>
        </View>
      </View>
    </Card>
  );
}
