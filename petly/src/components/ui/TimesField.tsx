import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { TimeKey } from '@/core/types';

import { Button } from './Button';
import { IconButton } from './IconButton';
import { TimeField } from './TimeField';

/** One or more administration times. */
export function TimesField({ label, values, onChange }: { label: string; values: TimeKey[]; onChange: (v: TimeKey[]) => void }) {
  const { t } = useTranslation();
  return (
    <View className="gap-2">
      {values.map((v, i) => (
        <View key={i} className="flex-row items-end gap-2">
          <View className="flex-1">
            <TimeField label={i === 0 ? label : ''} value={v} onChange={(nv) => onChange(values.map((x, j) => (j === i ? nv : x)))} />
          </View>
          {values.length > 1 ? <IconButton icon="close" label={t('common.delete')} onPress={() => onChange(values.filter((_, j) => j !== i))} /> : null}
        </View>
      ))}
      <View className="self-start">
        <Button size="sm" variant="ghost" icon="add" label={t('medications.fields.addTime')} onPress={() => onChange([...values, '20:00'])} />
      </View>
    </View>
  );
}
