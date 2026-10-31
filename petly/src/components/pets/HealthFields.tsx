import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TagInput } from '../ui/TagInput';

export function HealthFields({ allergies, conditions, onChange }: { allergies: string[]; conditions: string[]; onChange: (c: { allergies?: string[]; conditions?: string[] }) => void }) {
  const { t } = useTranslation();
  return (
    <View className="gap-5">
      <TagInput label={t('pets.fields.allergies')} placeholder={t('pets.fields.addAllergy')} values={allergies} onChange={(v) => onChange({ allergies: v })} />
      <TagInput label={t('pets.fields.conditions')} placeholder={t('pets.fields.addCondition')} values={conditions} onChange={(v) => onChange({ conditions: v })} />
    </View>
  );
}
