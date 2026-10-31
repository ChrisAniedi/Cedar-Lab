import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { fromDateKey, monthGrid } from '@/core/dates';
import type { DateKey } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';

import { IconButton } from './IconButton';
import { Txt } from './Txt';

interface CalendarProps {
  value: DateKey | null;
  onSelect: (d: DateKey) => void;
  /** Dates with something scheduled get a dot. */
  marked?: Set<DateKey>;
}

const WEEK = ['1', '2', '3', '4', '5', '6', '0'] as const;

export function Calendar({ value, onSelect, marked }: CalendarProps) {
  const { t } = useTranslation();
  const f = useFormat();
  const { date: today } = useToday();
  const initial = fromDateKey(value ?? today);
  const [cursor, setCursor] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const days = monthGrid(cursor.y, cursor.m);
  const monthKey = `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}`;
  const shift = (n: number) => {
    const d = new Date(cursor.y, cursor.m + n, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <IconButton icon="chevron-back" label={t('common.back')} onPress={() => shift(-1)} />
        <Txt variant="subheading">{f.date(`${monthKey}-01`, 'monthYear')}</Txt>
        <IconButton icon="chevron-forward" label={t('common.next')} onPress={() => shift(1)} />
      </View>
      <View className="flex-row">
        {WEEK.map((d) => (
          <View key={d} className="flex-1 items-center py-1">
            <Txt variant="label" tone="textSecondary">
              {t(`weekdaysShort.${d}`)}
            </Txt>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {days.map((d) => {
          const inMonth = d.startsWith(monthKey);
          const selected = d === value;
          const isToday = d === today;
          return (
            <View key={d} style={{ width: `${100 / 7}%` }} className="items-center py-0.5">
              <Pressable
                onPress={() => onSelect(d)}
                accessibilityRole="button"
                accessibilityLabel={f.date(d, 'long')}
                accessibilityState={{ selected }}
                className={`h-11 w-11 items-center justify-center rounded-full ${selected ? 'bg-primary' : isToday ? 'border border-primary' : ''}`}
              >
                <Txt variant="callout" tone={selected ? 'onPrimary' : inMonth ? 'text' : 'textSecondary'}>
                  {f.date(d, 'dayNumber')}
                </Txt>
                {marked?.has(d) && !selected ? <View className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary" /> : null}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
