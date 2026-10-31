import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { Txt } from '../ui/Txt';

export function DailyProgressCard({ done, total, overdue }: { done: number; total: number; overdue: number }) {
  const { t } = useTranslation();
  const ratio = total ? done / total : 0;
  const left = total - done;
  return (
    <Card>
      <View className="flex-row items-center gap-4">
        <ProgressRing ratio={ratio} accessibilityLabel={t('a11y.progress', { done, total })}>
          <Txt variant="subheading">{`${Math.round(ratio * 100)}%`}</Txt>
        </ProgressRing>
        <View className="flex-1 gap-1">
          <Txt variant="overline" tone="textSecondary">
            {t('dashboard.today')}
          </Txt>
          <Txt variant="heading">{t('dashboard.progress', { done, total })}</Txt>
          <Txt variant="caption" tone={left === 0 && total > 0 ? 'successInk' : 'textSecondary'}>
            {left === 0 && total > 0 ? t('dashboard.allDone') : t('dashboard.remaining', { count: left })}
          </Txt>
          {overdue > 0 ? <Badge label={t('dashboard.overdueCount', { count: overdue })} tone="danger" icon="alert-circle" /> : null}
        </View>
      </View>
    </Card>
  );
}
