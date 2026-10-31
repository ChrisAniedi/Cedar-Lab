import { useTranslation } from 'react-i18next';

import { ageOn } from '@/core/age';
import { diffDays } from '@/core/dates';
import { formatDate, formatMoney, formatNumber, formatTime, type DateStyle } from '@/core/format';
import type { Currency, DateKey, Pet, TimeKey } from '@/core/types';
import { displayWeight } from '@/core/units';
import { deviceLocale } from '@/lib/i18n';
import { useSettings } from '@/stores/settings';

import { useToday } from './useToday';

/** Locale + preference aware formatters for screens. */
export function useFormat() {
  const { t } = useTranslation();
  const units = useSettings((s) => s.units);
  const timeFormat = useSettings((s) => s.timeFormat);
  const currency = useSettings((s) => s.currency);
  const { date: today } = useToday();
  const locale = deviceLocale();

  const unit = units === 'imperial' ? 'lb' : 'kg';

  return {
    locale,
    unit,
    units,
    date: (key: DateKey, style: DateStyle = 'medium') => formatDate(key, locale, style),
    time: (time: TimeKey) => formatTime(time, timeFormat),
    weight: (kg: number) => `${formatNumber(displayWeight(kg, units), locale)} ${unit}`,
    weightValue: (kg: number) => displayWeight(kg, units),
    money: (amount: number, cur: Currency = currency) => formatMoney(amount, cur, locale),
    age: (pet: Pick<Pet, 'birthDate'>) => {
      if (!pet.birthDate) return t('age.unknown');
      const a = ageOn(pet.birthDate, today);
      if (a.years > 0) return t('age.years', { count: a.years });
      if (a.months > 0) return t('age.months', { count: a.months });
      return t('age.newborn');
    },
    /** "Today", "Tomorrow", "in 3 days", "Overdue by 2 days" or a date. */
    relative: (key: DateKey) => {
      const n = diffDays(today, key);
      if (n === 0) return t('common.today');
      if (n === 1) return t('common.tomorrow');
      if (n === -1) return t('common.yesterday');
      if (n > 1 && n <= 14) return t('common.inDays', { count: n });
      if (n < 0) return t('common.overdueBy', { count: -n });
      return formatDate(key, locale, 'short');
    },
  };
}
