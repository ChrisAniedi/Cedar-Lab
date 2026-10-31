import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, View } from 'react-native';

import { getSecret, SECURE_KEYS } from '@/lib/secure';

import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Txt } from '../ui/Txt';

/** Optional biometric lock. The flag lives in secure-store, not the kv store. */
export function AppLockGate({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [locked, setLocked] = useState(false);
  const enabled = useRef(false);

  const unlock = async () => {
    const res = await LocalAuthentication.authenticateAsync({ promptMessage: t('lock.prompt') });
    if (res.success) setLocked(false);
  };

  useEffect(() => {
    getSecret(SECURE_KEYS.appLock).then((v) => {
      enabled.current = v === '1';
      if (enabled.current) setLocked(true);
    });
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background' && enabled.current) setLocked(true);
    });
    return () => sub.remove();
  }, []);

  if (!locked) return <>{children}</>;
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-8">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
        <Icon name="lock-closed-outline" tone="textPrimary" size={36} />
      </View>
      <Txt variant="title" align="center">
        {t('lock.title')}
      </Txt>
      <Txt tone="textSecondary" align="center">
        {t('lock.body')}
      </Txt>
      <Button label={t('lock.unlock')} onPress={unlock} icon="finger-print" />
    </View>
  );
}
