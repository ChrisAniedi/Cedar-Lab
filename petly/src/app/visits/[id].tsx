import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useVisits } from '@/stores/visits';

export default function VisitDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = useVisits((s) => s.items.find((v) => v.id === id));
  const pet = usePetLookup()(visit?.petId ?? '');
  if (!visit) return <EmptyState icon="medical-outline" title={t('visits.title')} body={t('common.notFound')} />;
  const rows: [string, string][] = [
    [t('visits.fields.date'), [f.date(visit.date, 'long'), visit.time ? f.time(visit.time) : null].filter(Boolean).join(' · ')],
    [t('visits.fields.clinic'), visit.clinic],
    [t('visits.fields.vet'), visit.vet],
    [t('visits.fields.concerns'), visit.concerns],
    [t('visits.fields.diagnosis'), visit.diagnosis],
    [t('visits.fields.treatment'), visit.treatment],
    [t('visits.fields.medication'), visit.medication],
    [t('visits.fields.followUpOn'), visit.followUpOn ? f.date(visit.followUpOn) : ''],
    [t('visits.fields.cost'), visit.cost != null ? f.money(visit.cost, visit.currency) : ''],
    [t('visits.fields.notes'), visit.notes],
  ];
  return (
    <Screen edges={[]} width="form">
      <Stack.Screen options={{ title: visit.reason }} />
      <Card>
        <View className="gap-4">
          <View className="gap-2">
            <View className="flex-row flex-wrap items-center gap-2">
              <Txt variant="title">{visit.reason}</Txt>
              <SampleBadge show={visit.isSample} />
            </View>
            {pet ? <Badge label={pet.name} tone="neutral" icon="paw" /> : null}
          </View>
          {rows
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <View key={k} className="gap-0.5">
                <Txt variant="caption" tone="textSecondary">
                  {k}
                </Txt>
                <Txt>{v}</Txt>
              </View>
            ))}
        </View>
      </Card>
      <Button label={t('visits.fields.documents')} icon="attach-outline" variant="secondary" onPress={() => router.push({ pathname: '/documents/new', params: { petId: visit.petId, category: 'invoice', title: visit.reason } })} />
      <Button label={t('common.edit')} icon="create-outline" variant="secondary" onPress={() => router.push({ pathname: '/visits/new', params: { id: visit.id } })} />
    </Screen>
  );
}
