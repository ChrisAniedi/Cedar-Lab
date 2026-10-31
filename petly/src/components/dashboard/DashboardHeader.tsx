import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { greetingFor } from '@/core/format';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { useSettings } from '@/stores/settings';

import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/IconButton';
import { Txt } from '../ui/Txt';

export function DashboardHeader({ hasOverdue }: { hasOverdue: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const now = useToday();
  const name = useSettings((s) => s.name);
  const greeting = t(`dashboard.greeting.${greetingFor(now.hour)}`);
  return (
    <View className="flex-row items-center gap-3 pt-2">
      <View className="flex-1">
        <Txt variant="caption" tone="textSecondary">
          {f.date(now.date, 'long')}
        </Txt>
        <Txt variant="title" accessibilityRole="header" numberOfLines={2}>
          {name ? t('dashboard.greetingName', { greeting, name }) : greeting}
        </Txt>
      </View>
      <IconButton icon="notifications-outline" label={t('a11y.notifications')} onPress={() => router.push('/reminders')} badge={hasOverdue} variant="filled" />
      <Pressable onPress={() => router.push('/settings')} accessibilityRole="button" accessibilityLabel={t('more.profile')}>
        <Avatar name={name || t('common.you')} size={44} />
      </Pressable>
    </View>
  );
}
