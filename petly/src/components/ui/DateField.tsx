import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { DateKey } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';

import { Button } from './Button';
import { Calendar } from './Calendar';
import { Icon } from './Icon';
import { Sheet } from './Sheet';
import { Txt } from './Txt';

interface DateFieldProps {
  label: string;
  value: DateKey | null;
  onChange: (d: DateKey | null) => void;
  optional?: boolean;
  placeholder?: string;
}

export function DateField({ label, value, onChange, optional, placeholder }: DateFieldProps) {
  const { t } = useTranslation();
  const f = useFormat();
  const [open, setOpen] = useState(false);
  return (
    <View className="gap-1.5">
      <View className="flex-row items-baseline gap-1.5">
        <Txt variant="label">{label}</Txt>
        {optional ? (
          <Txt variant="caption" tone="textSecondary">
            {t('common.optional')}
          </Txt>
        ) : null}
      </View>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value ? f.date(value, 'long') : (placeholder ?? t('common.notSet'))}`}
        className="min-h-[48px] flex-row items-center justify-between rounded-field border border-border bg-surface-muted px-3.5"
      >
        <Txt tone={value ? 'text' : 'textSecondary'}>{value ? f.date(value) : (placeholder ?? t('common.pickDate'))}</Txt>
        <Icon name="calendar-outline" tone="textSecondary" size={18} />
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)} title={label}>
        <Calendar
          value={value}
          onSelect={(d) => {
            onChange(d);
            setOpen(false);
          }}
        />
        {optional && value ? (
          <Button
            label={t('common.clear')}
            variant="secondary"
            onPress={() => {
              onChange(null);
              setOpen(false);
            }}
          />
        ) : null}
      </Sheet>
    </View>
  );
}
