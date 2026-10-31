import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '../ui/Button';
import { Screen } from '../ui/Screen';
import { Txt } from '../ui/Txt';

interface Props {
  step: number;
  total: number;
  title: string;
  body: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
}

export function OnboardingShell({ step, total, title, body, children, onNext, onBack, onSkip, nextLabel }: Props) {
  const { t } = useTranslation();
  return (
    <Screen
      width="form"
      edges={['top', 'bottom']}
      footer={
        <View className="flex-row items-center gap-2">
          {onBack ? <Button label={t('common.back')} variant="ghost" onPress={onBack} /> : null}
          <View className="flex-1" />
          {onSkip ? <Button label={t('common.skip')} variant="secondary" onPress={onSkip} /> : null}
          <Button label={nextLabel ?? t('common.next')} onPress={onNext} />
        </View>
      }
    >
      <View className="gap-2 pt-4">
        <View className="h-1.5 flex-row overflow-hidden rounded-full bg-surface-muted" accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: step }}>
          <View className="rounded-full bg-primary" style={{ width: `${(step / total) * 100}%` }} />
        </View>
        <Txt variant="label" tone="textSecondary">
          {t('onboarding.stepOf', { step, total })}
        </Txt>
      </View>
      <View className="gap-2">
        <Txt variant="title" accessibilityRole="header">
          {title}
        </Txt>
        <Txt tone="textSecondary">{body}</Txt>
      </View>
      {children}
    </Screen>
  );
}
