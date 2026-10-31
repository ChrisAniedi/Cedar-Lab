import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { ActivityItem } from '@/core/activity';
import { useFormat } from '@/hooks/useFormat';
import { useMemberName } from '@/hooks/useMemberName';
import { usePetLookup } from '@/hooks/usePetLookup';

import { CATEGORY_ICON } from '../care/categoryIcons';
import { Icon, type IconName } from '../ui/Icon';
import { Txt } from '../ui/Txt';

/** One line of the activity timeline, always attributed. */
export function ActivityRow({ item, last }: { item: ActivityItem; last?: boolean }) {
  const { t } = useTranslation();
  const f = useFormat();
  const member = useMemberName();
  const pet = usePetLookup()(item.petId);

  let icon: IconName = 'ellipse-outline';
  let text = '';
  let by: string | null = null;
  switch (item.kind) {
    case 'care':
      icon = CATEGORY_ICON[item.category];
      text = t('activity.care', { title: item.title });
      by = member(item.by);
      break;
    case 'dose':
      icon = 'medkit-outline';
      text = item.status === 'given' ? t('activity.doseGiven', { title: item.title }) : t('activity.doseSkipped', { title: item.title });
      by = member(item.by);
      break;
    case 'weight':
      icon = 'scale-outline';
      text = t('activity.weight', { weight: f.weight(item.kg) });
      break;
    case 'visit':
      icon = 'medical-outline';
      text = t('activity.visit', { title: item.title });
      break;
    case 'vaccination':
      icon = 'shield-checkmark-outline';
      text = t('activity.vaccination', { title: item.title });
      break;
  }
  const date = item.at.slice(0, 10);
  const time = item.kind === 'care' || item.kind === 'dose' ? f.time(new Date(item.at).toTimeString().slice(0, 5)) : null;

  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-soft">
          <Icon name={icon} tone="textPrimary" size={16} />
        </View>
        {!last ? <View className="w-px flex-1 bg-border" /> : null}
      </View>
      <View className="flex-1 pb-4">
        <Txt variant="callout">{text}</Txt>
        <Txt variant="caption" tone="textSecondary">
          {[pet?.name, by ? t('activity.by', { name: by }) : null, [f.relative(date), time].filter(Boolean).join(' ')].filter(Boolean).join(' · ')}
        </Txt>
      </View>
    </View>
  );
}
