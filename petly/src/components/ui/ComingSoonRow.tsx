import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Badge } from './Badge';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

/**
 * Anything unbuilt is shown as this explicit, non-interactive row.
 * Never fake a feature behind a working-looking control.
 */
export function ComingSoonRow({ icon, label, body }: { icon: IconName; label: string; body?: string }) {
  const { t } = useTranslation();
  return (
    <View
      className="min-h-[56px] flex-row items-center gap-3 rounded-field bg-surface-muted px-3 py-3"
      accessible
      accessibilityLabel={`${label}. ${t('common.comingSoon')}`}
      accessibilityState={{ disabled: true }}
    >
      <Icon name={icon} tone="textSecondary" />
      <View className="flex-1">
        <Txt variant="callout">{label}</Txt>
        {body ? (
          <Txt variant="caption" tone="textSecondary">
            {body}
          </Txt>
        ) : null}
      </View>
      <Badge label={t('common.comingSoon')} tone="neutral" />
    </View>
  );
}
