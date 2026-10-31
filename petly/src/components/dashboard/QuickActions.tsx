import { useRouter, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { Icon, type IconName } from '../ui/Icon';
import { Txt } from '../ui/Txt';

/** Important actions within one tap from the dashboard. */
export function QuickActions({ petId }: { petId: string | null }) {
  const { t } = useTranslation();
  const router = useRouter();
  const p = petId ? { petId } : {};
  const actions: { icon: IconName; label: string; href: Href }[] = [
    { icon: 'restaurant-outline', label: t('quick.feeding'), href: { pathname: '/care/log', params: { ...p, category: 'feeding' } } },
    { icon: 'medkit-outline', label: t('quick.medication'), href: { pathname: '/medications/new', params: p } },
    { icon: 'scale-outline', label: t('quick.weight'), href: { pathname: '/wellness/log', params: p } },
    { icon: 'medical-outline', label: t('quick.visit'), href: { pathname: '/visits/new', params: p } },
    { icon: 'notifications-outline', label: t('quick.reminder'), href: { pathname: '/reminders/new', params: p } },
  ];
  return (
    <View className="flex-row flex-wrap gap-2">
      {actions.map((a) => (
        <Pressable
          key={a.label}
          onPress={() => router.push(a.href)}
          accessibilityRole="button"
          accessibilityLabel={a.label}
          className="min-h-[84px] min-w-[104px] flex-1 items-center justify-center gap-2 rounded-card border border-border bg-surface px-2 py-3 active:opacity-80"
        >
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
            <Icon name={a.icon} tone="textPrimary" />
          </View>
          <Txt variant="label" align="center" numberOfLines={2}>
            {a.label}
          </Txt>
        </Pressable>
      ))}
    </View>
  );
}
