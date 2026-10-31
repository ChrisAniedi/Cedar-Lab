import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Screen } from '../ui/Screen';
import { Txt } from '../ui/Txt';
import { BrandMark } from '../layout/BrandMark';

export function AuthShell({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <Screen width="form">
      <View className="items-center gap-3 pt-6">
        <BrandMark size={56} />
        <Txt variant="title" align="center" accessibilityRole="header">
          {title}
        </Txt>
        <Txt tone="textSecondary" align="center">
          {body}
        </Txt>
      </View>
      {children}
    </Screen>
  );
}
