import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { Divider } from '@/components/ui/Divider';
import { ListRow } from '@/components/ui/ListRow';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Txt } from '@/components/ui/Txt';
import { useSettings } from '@/stores/settings';

export default function More() {
  const { t } = useTranslation();
  const router = useRouter();
  const name = useSettings((s) => s.name);
  return (
    <Screen>
      <Txt variant="title" accessibilityRole="header" style={{ paddingTop: 8 }}>
        {t('more.title')}
      </Txt>
      <SectionHeader title={t('more.careTools')} />
      <Card>
        <ListRow icon="notifications-outline" title={t('reminders.title')} onPress={() => router.push('/reminders')} />
        <Divider />
        <ListRow icon="people-outline" title={t('team.title')} onPress={() => router.push('/care-team')} />
        <Divider />
        <ListRow icon="swap-horizontal-outline" title={t('handover.title')} onPress={() => router.push('/handover')} />
        <Divider />
        <ListRow icon="qr-code-outline" title={t('emergency.title')} onPress={() => router.push('/emergency')} />
        <Divider />
        <ListRow icon="document-attach-outline" title={t('report.screenTitle')} onPress={() => router.push('/reports')} />
      </Card>
      <SectionHeader title={t('more.account')} />
      <Card>
        <ListRow icon="person-outline" title={t('more.profile')} subtitle={name || undefined} onPress={() => router.push('/settings')} />
        <Divider />
        <ListRow icon="settings-outline" title={t('settings.title')} onPress={() => router.push('/settings')} />
      </Card>
      <View className="gap-2">
        <ComingSoonRow icon="star-outline" label={t('more.subscription')} body={t('more.subscriptionBody')} />
        <ComingSoonRow icon="cloud-outline" label={t('settings.cloudSync')} body={t('settings.cloudSyncBody')} />
      </View>
    </Screen>
  );
}
