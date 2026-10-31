import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { addDays } from '@/core/dates';
import { WELLNESS_METRICS } from '@/core/types';
import { average, describeWeightChange, inRange, sortByDate } from '@/core/wellness';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useToday } from '@/hooks/useToday';
import { useWeights } from '@/stores/weights';
import { useWellness } from '@/stores/wellness';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ComingSoonRow } from '../ui/ComingSoonRow';
import { Disclaimer } from '../ui/Disclaimer';
import { EmptyState } from '../ui/EmptyState';
import { ListRow } from '../ui/ListRow';
import { SectionHeader } from '../ui/SectionHeader';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Txt } from '../ui/Txt';
import { LineChart } from './LineChart';
import { ScoreBars } from './ScoreBars';

type Range = '30' | '90' | '180' | 'all';
const SCORE_DAYS = 14;

/** Weight trend, appetite / water / energy and observations for one pet. */
export function WellnessPanel({ petId }: { petId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date: today } = useToday();
  const pet = usePetLookup()(petId);
  const [range, setRange] = useState<Range>('180');
  const weights = useWeights((s) => s.items).filter((w) => w.petId === petId);
  const entries = useWellness((s) => s.items).filter((e) => e.petId === petId);
  const days = range === 'all' ? null : Number(range);
  const series = inRange(weights, today, days);
  const obs = describeWeightChange(weights, today, days ?? 3650);
  const obsText =
    obs.key === 'notEnoughData'
      ? t('wellness.change.notEnoughData')
      : obs.key === 'steady'
        ? t('wellness.change.steady', { days: obs.days })
        : t(`wellness.change.${obs.direction}`, { pct: obs.pct, days: obs.days });
  const scoreDays = Array.from({ length: SCORE_DAYS }, (_, i) => addDays(today, i - SCORE_DAYS + 1));
  const behaviour = sortByDate(entries.filter((e) => e.metric === 'behaviour')).reverse().slice(0, 5);

  return (
    <View className="gap-5">
      <Card>
        <View className="gap-4">
          <View className="flex-row items-center justify-between gap-2">
            <SectionHeader title={t('wellness.weightTrend')} />
            <Button size="sm" variant="secondary" icon="add" label={t('wellness.record')} onPress={() => router.push({ pathname: '/wellness/log', params: { petId } })} />
          </View>
          <SegmentedControl
            options={(['30', '90', '180', 'all'] as const).map((r) => ({ value: r, label: t(`wellness.range.${r}`) }))}
            value={range}
            onChange={setRange}
          />
          {series.length > 0 ? (
            <LineChart
              points={series.map((w) => ({ key: w.id, value: f.weightValue(w.kg), label: f.date(w.date), valueLabel: f.weight(w.kg) }))}
              accessibilityLabel={t('wellness.chartLabel', { name: pet?.name ?? '', weight: f.weight(series.at(-1)!.kg) })}
              pointLabel={(p) => t('wellness.pointLabel', { date: p.label, value: p.valueLabel })}
            />
          ) : (
            <Txt variant="caption" tone="textSecondary">
              {t('wellness.noData')}
            </Txt>
          )}
          <Txt variant="callout">{obsText}</Txt>
          <Disclaimer text={t('common.vetDisclaimer')} />
        </View>
      </Card>

      <Card>
        <View className="gap-4">
          <View className="flex-row items-center justify-between gap-2">
            <SectionHeader title={t('wellness.title')} />
            <Button size="sm" variant="secondary" icon="add" label={t('wellness.logWellness')} onPress={() => router.push({ pathname: '/wellness/log', params: { petId, mode: 'wellness' } })} />
          </View>
          {WELLNESS_METRICS.map((m) => {
            const byDay = scoreDays.map((d) => entries.find((e) => e.metric === m && e.date === d)?.score ?? null);
            const avg = average(byDay.filter((x): x is number => x !== null));
            return (
              <ScoreBars
                key={m}
                title={t(`wellness.${m}`)}
                scores={byDay}
                summary={avg !== null ? t('wellness.average', { value: avg }) : t('wellness.noData')}
                accessibilityLabel={`${t(`wellness.${m}`)}: ${avg !== null ? t('wellness.average', { value: avg }) : t('wellness.noData')}`}
              />
            );
          })}
        </View>
      </Card>

      <Card>
        <View className="gap-2">
          <SectionHeader title={t('wellness.behaviour')} />
          {behaviour.length === 0 ? (
            <EmptyState compact icon="chatbubble-ellipses-outline" title={t('wellness.behaviour')} body={t('wellness.noData')} actionLabel={t('wellness.addObservation')} onAction={() => router.push({ pathname: '/wellness/log', params: { petId, mode: 'wellness' } })} />
          ) : (
            behaviour.map((b) => <ListRow key={b.id} icon="chatbubble-ellipses-outline" title={b.note} subtitle={f.date(b.date)} />)
          )}
        </View>
      </Card>

      <Card>
        <View className="gap-1">
          <SectionHeader title={t('wellness.history')} />
          {[...series].reverse().map((w) => (
            <ListRow key={w.id} icon="scale-outline" title={f.weight(w.kg)} subtitle={[f.date(w.date), w.note].filter(Boolean).join(' · ')} />
          ))}
          {series.length === 0 ? (
            <Txt variant="caption" tone="textSecondary">
              {t('wellness.noData')}
            </Txt>
          ) : null}
        </View>
      </Card>

      <ComingSoonRow icon="pulse-outline" label={t('wellness.customMetrics')} />
    </View>
  );
}
