import { useTranslation } from 'react-i18next';

import { summarize } from '@/core/recurrence';
import type { Recurrence } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';

export function useRecurrenceLabel() {
  const { t } = useTranslation();
  const f = useFormat();
  return (r: Recurrence) => {
    const s = summarize(r);
    switch (s.key) {
      case 'once':
        return t('recurrence.once', { date: f.date(s.date) });
      case 'weekly':
        return t('recurrence.weekly', { days: s.days.map((d) => t(`weekdaysShort.${String(d) as '0'}`)).join(', ') });
      case 'interval':
        return t('recurrence.interval', { count: s.count });
      case 'monthly':
        return t('recurrence.monthly', { day: s.day });
      default:
        return t(`recurrence.${s.key}`);
    }
  };
}
