import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { CareCategory, Pet } from '@/core/types';
import { CARE_CATEGORIES } from '@/core/types';
import { useCareDay } from '@/hooks/useTodayCare';
import { useFormat } from '@/hooks/useFormat';
import { useCare } from '@/stores/care';

import { CareTaskItem } from '../../care/CareTaskItem';
import { CATEGORY_ICON } from '../../care/categoryIcons';
import { useCompleteTask } from '../../care/useCompleteTask';
import { useRecurrenceLabel } from '../../care/useRecurrenceLabel';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { EmptyState } from '../../ui/EmptyState';
import { ListRow } from '../../ui/ListRow';
import { SectionHeader } from '../../ui/SectionHeader';
import { Txt } from '../../ui/Txt';

export function PetCareTab({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const recurrence = useRecurrenceLabel();
  const toggle = useCompleteTask();
  const { occurrences } = useCareDay(pet.id);
  const tasks = useCare((s) => s.tasks).filter((x) => x.petId === pet.id);
  const groups = CARE_CATEGORIES.map((c) => [c, tasks.filter((x) => x.category === c).sort((a, b) => a.time.localeCompare(b.time))] as const).filter(([, list]) => list.length > 0);

  return (
    <View className="gap-5">
      <Card>
        <View className="gap-3">
          <SectionHeader title={t('care.today')} />
          {occurrences.length ? (
            occurrences.map((o) => <CareTaskItem key={o.task.id} occ={o} onToggle={() => toggle(o)} showPet={false} />)
          ) : (
            <Txt variant="caption" tone="textSecondary">
              {t('care.emptyDay')}
            </Txt>
          )}
        </View>
      </Card>
      {pet.feedingNotes ? (
        <Card>
          <View className="gap-1">
            <Txt variant="subheading">{t('pets.fields.feedingNotes')}</Txt>
            <Txt tone="textSecondary">{pet.feedingNotes}</Txt>
          </View>
        </Card>
      ) : null}
      {groups.length === 0 ? (
        <EmptyState icon="checkbox-outline" title={t('dashboard.noTasksTitle')} body={t('dashboard.noTasksBody')} actionLabel={t('care.new')} onAction={() => router.push({ pathname: '/care/task', params: { petId: pet.id } })} />
      ) : (
        groups.map(([cat, list]) => (
          <Card key={cat}>
            <View className="gap-1">
              <SectionHeader title={t(`categories.${cat as CareCategory}`)} />
              {list.map((task) => (
                <ListRow
                  key={task.id}
                  icon={CATEGORY_ICON[task.category]}
                  title={task.title}
                  subtitle={`${f.time(task.time)} · ${recurrence(task.recurrence)}`}
                  onPress={() => router.push({ pathname: '/care/task', params: { id: task.id } })}
                />
              ))}
            </View>
          </Card>
        ))
      )}
      <Button label={t('care.new')} icon="add" variant="secondary" onPress={() => router.push({ pathname: '/care/task', params: { petId: pet.id } })} />
    </View>
  );
}
