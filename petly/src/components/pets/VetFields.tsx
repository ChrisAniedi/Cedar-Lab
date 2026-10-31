import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TextField } from '../ui/TextField';

export function VetFields({ vetName, vetClinic, vetPhone, onChange }: { vetName: string; vetClinic: string; vetPhone: string; onChange: (c: { vetName?: string; vetClinic?: string; vetPhone?: string }) => void }) {
  const { t } = useTranslation();
  return (
    <View className="gap-4">
      <TextField label={t('pets.fields.vetClinic')} value={vetClinic} onChangeText={(v) => onChange({ vetClinic: v })} optional />
      <TextField label={t('pets.fields.vetName')} value={vetName} onChangeText={(v) => onChange({ vetName: v })} optional />
      <TextField label={t('pets.fields.vetPhone')} value={vetPhone} onChangeText={(v) => onChange({ vetPhone: v })} keyboardType="phone-pad" optional />
    </View>
  );
}
