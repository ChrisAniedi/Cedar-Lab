import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { TimelineEntry } from '@/core/timeline';
import { useFormat } from '@/hooks/useFormat';

import { Icon, type IconName } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

const ICONS: Record<TimelineEntry['kind'], IconName> = { visit: 'medical-outline', vaccination: 'shield-checkmark-outline', prescription: 'document-text-outline' };

export function TimelineEntryRow({ entry, last }: { entry: TimelineEntry; last: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  let title = '';
  let detail: string[] = [];
  let sample = false;
  let open = () => {};
  if (entry.kind === 'visit') {
    const v = entry.visit;
    title = v.reason;
    detail = [v.clinic, v.diagnosis ? `${t('visits.diagnosisNote')}: ${v.diagnosis}` : '', v.treatment].filter(Boolean);
    sample = v.isSample;
    open = () => router.push({ pathname: '/visits/[id]', params: { id: v.id } });
  } else if (entry.kind === 'vaccination') {
    const v = entry.vaccination;
    title = `${t('vaccinations.title')}: ${v.name}`;
    detail = [v.clinic, v.nextDueOn ? t('vaccinations.nextDue', { date: f.date(v.nextDueOn) }) : ''].filter(Boolean);
    sample = v.isSample;
    open = () => router.push({ pathname: '/vaccinations/[id]', params: { id: v.id } });
  } else {
    const m = entry.medication;
    title = `${t('medications.fields.prescription')}: ${m.name}`;
    detail = [`${m.dosage} ${m.dosageUnit}`, m.prescribedBy].filter(Boolean);
    sample = m.isSample;
    open = () => router.push({ pathname: '/medications/[id]', params: { id: m.id } });
  }
  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-soft">
          <Icon name={ICONS[entry.kind]} tone="textPrimary" size={18} />
        </View>
        {!last ? <View className="w-px flex-1 bg-border" /> : null}
      </View>
      <Pressable onPress={open} accessibilityRole="button" className="flex-1 gap-0.5 pb-5">
        <Txt variant="caption" tone="textSecondary">
          {f.date(entry.date)}
        </Txt>
        <View className="flex-row flex-wrap items-center gap-2">
          <Txt variant="callout" weight="semibold">
            {title}
          </Txt>
          <SampleBadge show={sample} />
        </View>
        {detail.map((d) => (
          <Txt key={d} variant="caption" tone="textSecondary">
            {d}
          </Txt>
        ))}
      </Pressable>
    </View>
  );
}
