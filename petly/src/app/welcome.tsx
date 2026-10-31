import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { BrandMark } from '@/components/layout/BrandMark';
import { PillarCard } from '@/components/onboarding/PillarCard';
import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { useResponsive } from '@/hooks/useResponsive';

export default function Welcome() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isWide } = useResponsive();
  return (
    <Screen
      width="form"
      edges={['top', 'bottom']}
      footer={
        <View className="gap-2">
          <Button label={t('welcome.getStarted')} onPress={() => router.push('/onboarding')} full />
          <Button label={t('welcome.haveAccount')} variant="ghost" onPress={() => router.push('/sign-in')} full />
        </View>
      }
    >
      <View className="items-start gap-4 pt-8">
        <View className="flex-row items-center gap-3">
          <BrandMark />
          <Txt variant="heading" tone="textPrimary">
            {t('app.name')}
          </Txt>
        </View>
        <Txt variant="display" accessibilityRole="header">
          {t('welcome.title')}
        </Txt>
        <Txt tone="textSecondary">{t('welcome.body')}</Txt>
      </View>
      <View className={isWide ? 'flex-row gap-3' : 'gap-3'}>
        <PillarCard icon="heart-outline" title={t('welcome.pillars.health')} body={t('welcome.pillars.healthBody')} />
        <PillarCard icon="checkbox-outline" title={t('welcome.pillars.care')} body={t('welcome.pillars.careBody')} />
        <PillarCard icon="people-outline" title={t('welcome.pillars.shared')} body={t('welcome.pillars.sharedBody')} />
      </View>
      <Txt variant="caption" tone="textSecondary" align="center">
        {t('welcome.localNote')}
      </Txt>
    </Screen>
  );
}
