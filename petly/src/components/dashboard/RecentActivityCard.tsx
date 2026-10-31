import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ActivityTimeline } from '../health/ActivityTimeline';
import { useActivity } from '../health/useActivity';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';

export function RecentActivityCard({ petId }: { petId: string | null }) {
  const { t } = useTranslation();
  const items = useActivity(petId, 6);
  return (
    <Card>
      <View className="gap-3">
        <SectionHeader title={t('dashboard.recent')} />
        <ActivityTimeline items={items} />
      </View>
    </Card>
  );
}
