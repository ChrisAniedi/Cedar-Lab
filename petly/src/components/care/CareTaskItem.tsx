import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { TaskOccurrence } from '@/core/tasks';
import { useFormat } from '@/hooks/useFormat';
import { useMemberName } from '@/hooks/useMemberName';
import { usePetLookup } from '@/hooks/usePetLookup';

import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';
import { CATEGORY_ICON } from './categoryIcons';

/**
 * One care occurrence. Done, pending and overdue have distinct visuals
 * (icon, colour AND text) so state never relies on colour alone.
 */
export function CareTaskItem({ occ, onToggle, showPet = true }: { occ: TaskOccurrence; onToggle: () => void; showPet?: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const member = useMemberName();
  const pet = usePetLookup()(occ.task.petId);
  const done = occ.status === 'done';
  const overdue = occ.status === 'overdue';
  const petName = pet?.name ?? '';

  return (
    <View className={`flex-row items-center gap-3 rounded-field px-3 py-3 ${done ? 'bg-surface-muted' : 'bg-surface'}`}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={done ? t('care.markUndone', { title: occ.task.title, pet: petName }) : t('care.markDone', { title: occ.task.title, pet: petName })}
        hitSlop={8}
        className={`h-11 w-11 items-center justify-center rounded-full border-2 ${done ? 'border-success bg-success' : overdue ? 'border-danger' : 'border-border'}`}
      >
        {done ? <Icon name="checkmark" tone="onPrimary" size={22} /> : <Icon name={CATEGORY_ICON[occ.task.category]} tone={overdue ? 'dangerInk' : 'textSecondary'} size={18} />}
      </Pressable>
      <Pressable
        className="flex-1 gap-0.5"
        onPress={() => router.push({ pathname: '/care/task', params: { id: occ.task.id } })}
        accessibilityRole="button"
        accessibilityHint={t('common.edit')}
      >
        <View className="flex-row flex-wrap items-center gap-x-2">
          <Txt variant="callout" weight="semibold" tone={done ? 'textSecondary' : 'text'} style={done ? { textDecorationLine: 'line-through' } : undefined}>
            {occ.task.title}
          </Txt>
          <SampleBadge show={occ.task.isSample} />
        </View>
        <Txt variant="caption" tone="textSecondary">
          {[showPet ? petName : null, f.time(occ.task.time), t(`categories.${occ.task.category}`)].filter(Boolean).join(' · ')}
        </Txt>
        {done && occ.completedAt ? (
          <Txt variant="caption" tone="successInk">
            {t('care.doneBy', { name: member(occ.completedBy), time: f.time(new Date(occ.completedAt).toTimeString().slice(0, 5)) })}
          </Txt>
        ) : overdue ? (
          <Badge label={t('care.overdue')} tone="danger" icon="alert-circle" />
        ) : null}
      </Pressable>
      {occ.task.assigneeId ? <Avatar name={member(occ.task.assigneeId)} size={30} /> : null}
    </View>
  );
}
