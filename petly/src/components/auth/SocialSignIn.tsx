import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ComingSoonRow } from '../ui/ComingSoonRow';

export function SocialSignIn() {
  const { t } = useTranslation();
  return (
    <View className="gap-2">
      <ComingSoonRow icon="logo-apple" label={t('auth.socialApple')} />
      <ComingSoonRow icon="logo-google" label={t('auth.socialGoogle')} />
    </View>
  );
}
