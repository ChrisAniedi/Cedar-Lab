import { View } from 'react-native';

import { Button } from './Button';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

/** Empty states always guide toward a useful next step. */
export function EmptyState({ icon, title, body, actionLabel, onAction, compact }: EmptyStateProps) {
  return (
    <View className={`items-center gap-3 ${compact ? 'py-4' : 'py-10'} px-4`}>
      <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
        <Icon name={icon} tone="textPrimary" size={28} />
      </View>
      <Txt variant="subheading" align="center">
        {title}
      </Txt>
      <Txt variant="body" tone="textSecondary" align="center" style={{ maxWidth: 360 }}>
        {body}
      </Txt>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} icon="add" /> : null}
    </View>
  );
}
