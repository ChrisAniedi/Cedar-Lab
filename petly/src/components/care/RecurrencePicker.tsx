import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { DateKey, Recurrence } from '@/core/types';

import { Chip } from '../ui/Chip';
import { FieldLabel } from '../ui/FieldLabel';
import { OptionChips } from '../ui/OptionChips';
import { TextField } from '../ui/TextField';

type Kind = Recurrence['kind'];
const KINDS: Kind[] = ['once', 'daily', 'weekly', 'interval', 'monthly'];
const DAYS = ['1', '2', '3', '4', '5', '6', '0'] as const;

/** Builds a Recurrence: once, daily, specific weekdays, every N days, monthly. */
export function RecurrencePicker({ value, onChange, today, kinds = KINDS }: { value: Recurrence; onChange: (r: Recurrence) => void; today: DateKey; kinds?: Kind[] }) {
  const { t } = useTranslation();
  const setKind = (k: Kind) => {
    if (k === value.kind) return;
    if (k === 'once') onChange({ kind: 'once', date: today });
    else if (k === 'daily') onChange({ kind: 'daily' });
    else if (k === 'weekly') onChange({ kind: 'weekly', days: [1, 3, 5] });
    else if (k === 'interval') onChange({ kind: 'interval', everyDays: 2, startDate: today });
    else onChange({ kind: 'monthly', dayOfMonth: Number(today.slice(8)) });
  };
  return (
    <View className="gap-3">
      <FieldLabel label={t('recurrence.label')}>
        <OptionChips options={kinds.map((k) => ({ value: k, label: t(`recurrence.kinds.${k}`) }))} value={value.kind} onChange={setKind} />
      </FieldLabel>
      {value.kind === 'weekly' ? (
        <View className="flex-row flex-wrap gap-2">
          {DAYS.map((d) => {
            const n = Number(d);
            const on = value.days.includes(n);
            return (
              <Chip
                key={d}
                role="checkbox"
                label={t(`weekdaysShort.${d}`)}
                selected={on}
                onPress={() => {
                  const days = on ? value.days.filter((x) => x !== n) : [...value.days, n];
                  if (days.length) onChange({ kind: 'weekly', days });
                }}
              />
            );
          })}
        </View>
      ) : null}
      {value.kind === 'interval' ? (
        <TextField
          label={t('recurrence.everyNDays')}
          keyboardType="number-pad"
          value={String(value.everyDays)}
          onChangeText={(s) => onChange({ ...value, everyDays: Math.max(1, Math.min(365, Number(s.replace(/\D/g, '')) || 1)) })}
        />
      ) : null}
      {value.kind === 'monthly' ? (
        <TextField
          label={t('recurrence.dayOfMonth')}
          keyboardType="number-pad"
          value={String(value.dayOfMonth)}
          onChangeText={(s) => onChange({ kind: 'monthly', dayOfMonth: Math.max(1, Math.min(31, Number(s.replace(/\D/g, '')) || 1)) })}
        />
      ) : null}
    </View>
  );
}
