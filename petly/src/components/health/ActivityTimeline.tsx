import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { ActivityItem } from '@/core/activity';

import { Txt } from '../ui/Txt';
import { ActivityRow } from './ActivityRow';

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  const { t } = useTranslation();
  if (items.length === 0) {
    return (
      <Txt variant="caption" tone="textSecondary">
        {t('activity.empty')}
      </Txt>
    );
  }
  return (
    <View>
      {items.map((item, i) => (
        <ActivityRow key={`${item.kind}-${item.id}`} item={item} last={i === items.length - 1} />
      ))}
    </View>
  );
}
