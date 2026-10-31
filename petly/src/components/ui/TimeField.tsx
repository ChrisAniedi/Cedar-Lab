import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { TimeKey } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';

import { Button } from './Button';
import { Chip } from './Chip';
import { Icon } from './Icon';
import { Sheet } from './Sheet';
import { Txt } from './Txt';

const HOURS = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0'));
const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

export function TimeField({ label, value, onChange }: { label: string; value: TimeKey; onChange: (t: TimeKey) => void }) {
  const { t } = useTranslation();
  const f = useFormat();
  const [open, setOpen] = useState(false);
  const [h, m] = value.split(':') as [string, string];
  return (
    <View className="gap-1.5">
      <Txt variant="label">{label}</Txt>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${f.time(value)}`}
        className="min-h-[48px] flex-row items-center justify-between rounded-field border border-border bg-surface-muted px-3.5"
      >
        <Txt>{f.time(value)}</Txt>
        <Icon name="time-outline" tone="textSecondary" size={18} />
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)} title={label}>
        <Txt variant="display" align="center">
          {f.time(value)}
        </Txt>
        <View className="flex-row flex-wrap gap-2">
          {HOURS.map((hh) => (
            <Chip key={hh} label={f.time(`${hh}:00`).replace(':00', '')} selected={hh === h} onPress={() => onChange(`${hh}:${m}`)} />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {MINUTES.map((mm) => (
            <Chip key={mm} label={`:${mm}`} selected={mm === m} onPress={() => onChange(`${h}:${mm}`)} />
          ))}
        </View>
        <Button label={t('common.done')} onPress={() => setOpen(false)} full />
      </Sheet>
    </View>
  );
}
