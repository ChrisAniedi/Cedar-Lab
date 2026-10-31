import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useSettings } from '@/stores/settings';

import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import { Txt } from '../ui/Txt';

/** Honest outcome of submitting an auth form while there is no backend. */
export function CloudUnavailableSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  const onboarded = useSettings((s) => s.onboardingComplete);
  return (
    <Sheet open={open} onClose={onClose} title={t('auth.cloudUnavailableTitle')}>
      <Txt tone="textSecondary">{t('auth.cloudUnavailableBody')}</Txt>
      <Button
        label={t('auth.useOnDevice')}
        full
        onPress={() => {
          onClose();
          router.replace(onboarded ? '/(tabs)' : '/onboarding');
        }}
      />
    </Sheet>
  );
}
