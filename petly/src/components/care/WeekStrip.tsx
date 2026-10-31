import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { dayOfWeek, weekOf } from '@/core/dates';
import type { DateKey } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';

import { Txt } from '../ui/Txt';

/** Weekly calendar: tap a day to see its schedule. Shows done/total per day. */
export function WeekStrip({ selected, onSelect, counts }: { selected: DateKey; onSelect: (d: DateKey) => void; counts: (d: DateKey) => { done: number; total: number } }) {
  const { t } = useTranslation();
  const f = useFormat();
  const { date: today } = useToday();
  return (
    <View className="flex-row gap-1.5" accessibilityRole="tablist">
      {weekOf(selected).map((d) => {
        const isSel = d === selected;
        const c = counts(d);
        return (
          <Pressable
            key={d}
            onPress={() => onSelect(d)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSel }}
            accessibilityLabel={t('a11y.dayLabel', { date: f.date(d, 'long'), count: c.total })}
            className={`min-h-[72px] flex-1 items-center justify-center gap-1 rounded-field ${isSel ? 'bg-primary' : d === today ? 'border border-primary bg-surface' : 'bg-surface'}`}
          >
            <Txt variant="label" tone={isSel ? 'onPrimary' : 'textSecondary'}>
              {t(`weekdaysShort.${String(dayOfWeek(d)) as '0'}`)}
            </Txt>
            <Txt variant="subheading" tone={isSel ? 'onPrimary' : 'text'}>
              {f.date(d, 'dayNumber')}
            </Txt>
            <Txt variant="label" tone={isSel ? 'onPrimary' : 'textSecondary'}>
              {c.total ? `${c.done}/${c.total}` : '–'}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}
