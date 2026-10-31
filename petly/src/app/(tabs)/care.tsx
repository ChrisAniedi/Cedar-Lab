import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CareSection } from '@/components/care/CareSection';
import { useCompleteTask } from '@/components/care/useCompleteTask';
import { WeekStrip } from '@/components/care/WeekStrip';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { occurrencesOn, progress } from '@/core/tasks';
import type { DateKey } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useCareDay } from '@/hooks/useTodayCare';
import { useToday } from '@/hooks/useToday';
import { useCare } from '@/stores/care';

export default function CareScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const now = useToday();
  const toggle = useCompleteTask();
  const [petId, setPetId] = useState<string | null>(null);
  const [date, setDate] = useState<DateKey>(now.date);
  const tasks = useCare((s) => s.tasks);
  const log = useCare((s) => s.log);
  const { occurrences, progress: p } = useCareDay(petId, date);
  const scoped = petId ? tasks.filter((x) => x.petId === petId) : tasks;
  const counts = (d: DateKey) => progress(occurrencesOn(scoped, log, d, now));
  const by = (s: string) => occurrences.filter((o) => o.status === s);
  const params = petId ? { petId } : {};

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <Txt variant="title" accessibilityRole="header">
          {t('care.title')}
        </Txt>
        <View className="flex-row gap-2">
          <Button size="sm" variant="secondary" icon="create-outline" label={t('care.log.title')} onPress={() => router.push({ pathname: '/care/log', params })} />
          <Button size="sm" icon="add" label={t('common.add')} onPress={() => router.push({ pathname: '/care/task', params })} />
        </View>
      </View>
      <PetFilterChips value={petId} onChange={setPetId} />
      <WeekStrip selected={date} onSelect={setDate} counts={counts} />
      <Card>
        <View className="flex-row items-center gap-4">
          <ProgressRing ratio={p.ratio} size={56} stroke={6} accessibilityLabel={t('a11y.progress', { done: p.done, total: p.total })} />
          <View className="flex-1">
            <Txt variant="subheading">{date === now.date ? t('care.today') : f.date(date, 'long')}</Txt>
            <Txt variant="caption" tone="textSecondary">
              {t('dashboard.progress', { done: p.done, total: p.total })}
            </Txt>
          </View>
        </View>
      </Card>
      {occurrences.length === 0 ? (
        <EmptyState icon="calendar-outline" title={t('care.emptyDay')} body={t('dashboard.noTasksBody')} actionLabel={t('care.new')} onAction={() => router.push({ pathname: '/care/task', params })} />
      ) : (
        <View className="gap-5">
          <CareSection title={t('care.overdue')} items={by('overdue')} onToggle={toggle} showPet={!petId} />
          <CareSection title={t('care.pending')} items={by('pending')} onToggle={toggle} showPet={!petId} />
          <CareSection title={t('care.completed')} items={by('done')} onToggle={toggle} showPet={!petId} />
        </View>
      )}
    </Screen>
  );
}
