import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { HealthHubTile } from '@/components/health/HealthHubTile';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { currentVaccinations, isMedicationActive, vaccinationStatus } from '@/core/health';
import { useResponsive } from '@/hooks/useResponsive';
import { useToday } from '@/hooks/useToday';
import { useDocuments } from '@/stores/documents';
import { useMedications } from '@/stores/medications';
import { useVaccinations } from '@/stores/vaccinations';
import { useVisits } from '@/stores/visits';

export default function HealthScreen() {
  const { t } = useTranslation();
  const { date } = useToday();
  const { width } = useResponsive();
  const overdue = currentVaccinations(useVaccinations((s) => s.items)).filter((v) => vaccinationStatus(v, date) === 'overdue').length;
  const activeMeds = useMedications((s) => s.medications).filter((m) => isMedicationActive(m, date)).length;
  const upcomingVisits = useVisits((s) => s.items).filter((v) => v.date >= date).length;
  const docs = useDocuments((s) => s.items).length;
  const row = width >= 640 ? 'flex-row gap-4' : 'gap-4';

  return (
    <Screen>
      <Txt variant="title" accessibilityRole="header" style={{ paddingTop: 8 }}>
        {t('health.title')}
      </Txt>
      <View className={row}>
        <HealthHubTile icon="shield-checkmark-outline" title={t('health.vaccinations')} summary={overdue ? t('health.overdueVaccines', { count: overdue }) : t('vaccinations.upToDate')} tone={overdue ? 'danger' : 'success'} href="/vaccinations" />
        <HealthHubTile icon="medkit-outline" title={t('health.medications')} summary={t('health.activeMeds', { count: activeMeds })} tone="primary" href="/medications" />
      </View>
      <View className={row}>
        <HealthHubTile icon="medical-outline" title={t('health.visits')} summary={t('health.upcomingVisits', { count: upcomingVisits })} tone="neutral" href="/visits" />
        <HealthHubTile icon="pulse-outline" title={t('health.wellness')} summary={t('wellness.weightTrend')} tone="neutral" href="/wellness" />
      </View>
      <View className={row}>
        <HealthHubTile icon="document-text-outline" title={t('health.documents')} summary={t('health.docsCount', { count: docs })} tone="neutral" href="/documents" />
        <View className="flex-1 gap-2">
          <ComingSoonRow icon="umbrella-outline" label={t('health.insurance')} />
          <ComingSoonRow icon="thermometer-outline" label={t('health.symptoms')} />
        </View>
      </View>
      <Disclaimer text={t('common.vetDisclaimer')} />
    </Screen>
  );
}
