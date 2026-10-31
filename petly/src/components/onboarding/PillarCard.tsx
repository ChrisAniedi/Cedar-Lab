import { View } from 'react-native';

import { Card } from '../ui/Card';
import { Icon, type IconName } from '../ui/Icon';
import { Txt } from '../ui/Txt';

export function PillarCard({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <Card className="flex-1">
      <View className="flex-row items-start gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
          <Icon name={icon} tone="textPrimary" />
        </View>
        <View className="flex-1 gap-0.5">
          <Txt variant="subheading">{title}</Txt>
          <Txt variant="caption" tone="textSecondary">
            {body}
          </Txt>
        </View>
      </View>
    </Card>
  );
}
