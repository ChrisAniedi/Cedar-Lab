import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import type { BadgeTone } from '../ui/Badge';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Icon, type IconName } from '../ui/Icon';
import { Txt } from '../ui/Txt';

export function HealthHubTile({ icon, title, summary, tone, href }: { icon: IconName; title: string; summary: string; tone: BadgeTone; href: Href }) {
  const router = useRouter();
  return (
    <Card onPress={() => router.push(href)} accessibilityLabel={`${title}, ${summary}`} className="flex-1">
      <View className="gap-3">
        <View className="flex-row items-center justify-between">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-soft">
            <Icon name={icon} tone="textPrimary" />
          </View>
          <Icon name="chevron-forward" tone="textSecondary" size={18} />
        </View>
        <Txt variant="subheading">{title}</Txt>
        <Badge label={summary} tone={tone} />
      </View>
    </Card>
  );
}
