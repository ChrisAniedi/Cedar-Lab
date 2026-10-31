import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { VACCINE_STATUS } from '@/components/health/VaccinationCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ListRow } from '@/components/ui/ListRow';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Txt } from '@/components/ui/Txt';
import { vaccinationStatus } from '@/core/health';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useToday } from '@/hooks/useToday';
import { useDocuments } from '@/stores/documents';
import { useVaccinations } from '@/stores/vaccinations';

export default function VaccinationDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date } = useToday();
  const { id } = useLocalSearchParams<{ id: string }>();
  const vax = useVaccinations((s) => s.items.find((v) => v.id === id));
  const cert = useDocuments((s) => s.items.find((d) => d.id === vax?.certificateDocId));
  const pet = usePetLookup()(vax?.petId ?? '');
  if (!vax) return <EmptyState icon="shield-checkmark-outline" title={t('vaccinations.title')} body={t('common.notFound')} />;
  const status = vaccinationStatus(vax, date);
  const rows = [
    [t('vaccinations.fields.administeredOn'), f.date(vax.administeredOn)],
    [t('vaccinations.fields.nextDueOn'), vax.nextDueOn ? f.date(vax.nextDueOn) : t('vaccinations.noBooster')],
    [t('vaccinations.fields.clinic'), vax.clinic || t('common.notSet')],
    [t('vaccinations.fields.vet'), vax.vet || t('common.notSet')],
  ];
  return (
    <Screen edges={[]} width="form">
      <Stack.Screen options={{ title: vax.name }} />
      <Card>
        <View className="gap-3">
          <View className="flex-row flex-wrap items-center gap-2">
            <Txt variant="title">{vax.name}</Txt>
            <SampleBadge show={vax.isSample} />
          </View>
          <View className="flex-row flex-wrap gap-2">
            <Badge label={t(`vaccinations.${status}`)} tone={VACCINE_STATUS[status].tone} icon={VACCINE_STATUS[status].icon} />
            {pet ? <Badge label={pet.name} tone="neutral" icon="paw" /> : null}
          </View>
          {rows.map(([k, v]) => (
            <View key={k} className="flex-row gap-3">
              <Txt variant="caption" tone="textSecondary" style={{ width: 130 }}>
                {k}
              </Txt>
              <Txt variant="callout" style={{ flex: 1 }}>
                {v}
              </Txt>
            </View>
          ))}
          {vax.notes ? <Txt tone="textSecondary">{vax.notes}</Txt> : null}
        </View>
      </Card>
      <Card>
        <SectionHeader title={t('vaccinations.certificate')} />
        {cert ? (
          <ListRow icon="document-text-outline" title={cert.title} subtitle={f.date(cert.date)} onPress={() => router.push({ pathname: '/pets/[id]', params: { id: vax.petId, tab: 'documents' } })} />
        ) : (
          <View className="gap-2">
            <Txt variant="caption" tone="textSecondary">
              {t('vaccinations.noCertificate')}
            </Txt>
            <Button
              label={t('vaccinations.attachCertificate')}
              icon="attach-outline"
              variant="secondary"
              onPress={() => router.push({ pathname: '/documents/new', params: { petId: vax.petId, category: 'vaccination', title: `${vax.name} ${t('vaccinations.certificate')}`, vaccinationId: vax.id } })}
            />
          </View>
        )}
      </Card>
      <Button label={t('common.edit')} icon="create-outline" variant="secondary" onPress={() => router.push({ pathname: '/vaccinations/new', params: { id: vax.id } })} />
    </Screen>
  );
}
