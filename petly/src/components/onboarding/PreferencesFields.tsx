import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { TimeFormat, UnitSystem } from '@/core/types';

import { FieldLabel } from '../ui/FieldLabel';
import { SegmentedControl } from '../ui/SegmentedControl';
import { SwitchRow } from '../ui/SwitchRow';

interface Props {
  units: UnitSystem;
  timeFormat: TimeFormat;
  notifications: boolean;
  onChange: (c: { units?: UnitSystem; timeFormat?: TimeFormat; notifications?: boolean }) => void;
}

export function PreferencesFields({ units, timeFormat, notifications, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <View className="gap-5">
      <FieldLabel label={t('settings.units.label')}>
        <SegmentedControl
          options={[
            { value: 'metric', label: t('settings.units.metric') },
            { value: 'imperial', label: t('settings.units.imperial') },
          ]}
          value={units}
          onChange={(v) => onChange({ units: v })}
        />
      </FieldLabel>
      <FieldLabel label={t('settings.timeFormat.label')}>
        <SegmentedControl
          options={[
            { value: '12h', label: t('settings.timeFormat.12h') },
            { value: '24h', label: t('settings.timeFormat.24h') },
          ]}
          value={timeFormat}
          onChange={(v) => onChange({ timeFormat: v })}
        />
      </FieldLabel>
      <SwitchRow label={t('settings.notificationsEnabled')} value={notifications} onValueChange={(v) => onChange({ notifications: v })} />
    </View>
  );
}
