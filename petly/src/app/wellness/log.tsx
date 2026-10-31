import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { TextField } from '@/components/ui/TextField';
import { sortByDate } from '@/core/wellness';
import { inputToKg, parseDecimal } from '@/core/units';
import { positiveNumber, required, type FieldError } from '@/core/validation';
import { WELLNESS_METRICS, type WellnessMetric } from '@/core/types';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { usePets } from '@/stores/pets';
import { toast } from '@/stores/toast';
import { useWeights } from '@/stores/weights';
import { useWellness } from '@/stores/wellness';

type Mode = 'weight' | 'wellness';
const SCORES = ['1', '2', '3', '4', '5'] as const;

export default function LogWellness() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const params = useLocalSearchParams<{ petId?: string; mode?: string }>();
  const { date: today } = useToday();
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(defaultPet);
  const [mode, setMode] = useState<Mode>(params.mode === 'wellness' ? 'wellness' : 'weight');
  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState('');
  const [metric, setMetric] = useState<WellnessMetric | 'behaviour'>('appetite');
  const [score, setScore] = useState<(typeof SCORES)[number]>('3');
  const [note, setNote] = useState('');
  const [error, setError] = useState<FieldError | null>(null);

  const save = () => {
    if (!petId) return;
    if (mode === 'weight') {
      const e = positiveNumber(weight);
      setError(e);
      if (e) return;
      const kg = inputToKg(parseDecimal(weight)!, f.units);
      useWeights.getState().add({ petId, date, kg, note: note.trim() });
      // Keep the profile's weight in sync with the latest measurement.
      const latest = sortByDate(useWeights.getState().items.filter((w) => w.petId === petId)).at(-1);
      if (latest) usePets.getState().updatePet(petId, { weightKg: latest.kg });
    } else {
      if (metric === 'behaviour') {
        const e = required(note);
        setError(e);
        if (e) return;
      }
      useWellness.getState().add({ petId, date, metric, score: metric === 'behaviour' ? null : Number(score), note: note.trim() });
    }
    toast(t('wellness.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: mode === 'weight' ? t('wellness.recordWeight') : t('wellness.logWellness') }} />
      <SegmentedControl
        options={[
          { value: 'weight', label: t('wellness.weight') },
          { value: 'wellness', label: t('wellness.title') },
        ]}
        value={mode}
        onChange={setMode}
      />
      <PetPicker value={petId} onChange={setPetId} />
      <DateField label={t('wellness.fields.date')} value={date} onChange={(d) => d && setDate(d)} />
      {mode === 'weight' ? (
        <TextField label={t('wellness.fields.weight', { unit: f.unit })} value={weight} onChangeText={setWeight} keyboardType="decimal-pad" error={error} autoFocus />
      ) : (
        <>
          <FieldLabel label={t('wellness.fields.metric')}>
            <OptionChips options={[...WELLNESS_METRICS, 'behaviour' as const].map((m) => ({ value: m, label: t(`wellness.${m}`) }))} value={metric} onChange={setMetric} />
          </FieldLabel>
          {metric !== 'behaviour' ? (
            <FieldLabel label={t(`wellness.${metric}`)}>
              <OptionChips options={SCORES.map((s) => ({ value: s, label: `${s} · ${t(`wellness.scale.${s}`)}` }))} value={score} onChange={setScore} />
            </FieldLabel>
          ) : null}
        </>
      )}
      <TextField label={t('wellness.fields.note')} value={note} onChangeText={setNote} multiline optional={!(mode === 'wellness' && metric === 'behaviour')} error={mode === 'wellness' ? error : null} />
    </Screen>
  );
}
