import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { birthDateFromAge } from '@/core/age';
import { SEXES, type DateKey, type Sex } from '@/core/types';
import { displayWeight, inputToKg, parseDecimal } from '@/core/units';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';

import { DateField } from '../ui/DateField';
import { FieldLabel } from '../ui/FieldLabel';
import { OptionChips } from '../ui/OptionChips';
import { SwitchRow } from '../ui/SwitchRow';
import { TextField } from '../ui/TextField';

interface Props {
  birthDate: DateKey | null;
  sex: Sex;
  weightKg: number | null;
  onChange: (c: { birthDate?: DateKey | null; sex?: Sex; weightKg?: number | null }) => void;
}

/** Age (exact or estimated), sex and weight in the user's units. */
export function BasicsFields({ birthDate, sex, weightKg, onChange }: Props) {
  const { t } = useTranslation();
  const f = useFormat();
  const { date: today } = useToday();
  const [exact, setExact] = useState(true);
  const [estimate, setEstimate] = useState('');
  const [weight, setWeight] = useState(weightKg != null ? String(displayWeight(weightKg, f.units)) : '');
  const weightError = weight && parseDecimal(weight) === null ? 'number' : weight && (parseDecimal(weight) ?? 0) <= 0 ? 'positive' : null;

  return (
    <View className="gap-4">
      <SwitchRow label={t('onboarding.basics.knowBirthday')} value={exact} onValueChange={setExact} />
      {exact ? (
        <DateField label={t('pets.fields.birthDate')} value={birthDate} onChange={(d) => onChange({ birthDate: d })} optional />
      ) : (
        <TextField
          label={t('onboarding.basics.estimate')}
          keyboardType="decimal-pad"
          value={estimate}
          onChangeText={(v) => {
            setEstimate(v);
            const n = parseDecimal(v);
            onChange({ birthDate: n !== null && n >= 0 && n < 60 ? birthDateFromAge(n, today) : null });
          }}
        />
      )}
      <FieldLabel label={t('pets.fields.sex')}>
        <OptionChips options={SEXES.map((s) => ({ value: s, label: t(`sex.${s}`) }))} value={sex} onChange={(s) => onChange({ sex: s })} />
      </FieldLabel>
      <TextField
        label={t('pets.fields.weight', { unit: f.unit })}
        keyboardType="decimal-pad"
        value={weight}
        error={weightError}
        optional
        onChangeText={(v) => {
          setWeight(v);
          const n = parseDecimal(v);
          onChange({ weightKg: n !== null && n > 0 ? inputToKg(n, f.units) : null });
        }}
      />
    </View>
  );
}
