import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';

import { VisitCard } from '@/components/health/VisitCard';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ListRow } from '@/components/ui/ListRow';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { useToday } from '@/hooks/useToday';
import { usePets } from '@/stores/pets';
import { useVisits } from '@/stores/visits';

export default function Visits() {
  const { t } = useTranslation();
  const router = useRouter();
  const { date } = useToday();
  const [petId, setPetId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const pets = usePets((s) => s.pets);
  const q = query.trim().toLowerCase();
  const visits = useVisits((s) => s.items)
    .filter((v) => !petId || v.petId === petId)
    .filter((v) => !q || [v.reason, v.clinic, v.vet, v.diagnosis, v.treatment].some((x) => x.toLowerCase().includes(q)));
  const upcoming = visits.filter((v) => v.date >= date).sort((a, b) => a.date.localeCompare(b.date));
  const past = visits.filter((v) => v.date < date).sort((a, b) => b.date.localeCompare(a.date));
  const contacts = [...new Map(pets.filter((p) => (!petId || p.id === petId) && (p.vetClinic || p.vetName)).map((p) => [p.vetClinic + p.vetName, p])).values()];

  return (
    <Screen edges={[]}>
      <Button label={t('visits.add')} icon="add" onPress={() => router.push({ pathname: '/visits/new', params: petId ? { petId } : {} })} />
      <PetFilterChips value={petId} onChange={setPetId} />
      <TextField label={t('common.search')} placeholder={t('visits.searchPlaceholder')} value={query} onChangeText={setQuery} />
      {visits.length === 0 ? (
        <EmptyState icon="medical-outline" title={t('visits.emptyTitle')} body={t('visits.emptyBody')} />
      ) : (
        <>
          {upcoming.length ? (
            <View className="gap-2">
              <Txt variant="overline" tone="textSecondary">
                {t('visits.upcoming')}
              </Txt>
              {upcoming.map((v) => (
                <VisitCard key={v.id} visit={v} />
              ))}
            </View>
          ) : null}
          {past.length ? (
            <View className="gap-2">
              <Txt variant="overline" tone="textSecondary">
                {t('visits.past')}
              </Txt>
              {past.map((v) => (
                <VisitCard key={v.id} visit={v} />
              ))}
            </View>
          ) : null}
        </>
      )}
      {contacts.length ? (
        <Card>
          <SectionHeader title={t('visits.contacts')} />
          {contacts.map((p) => (
            <ListRow
              key={p.id}
              icon="call-outline"
              title={p.vetClinic || p.vetName}
              subtitle={[p.vetName, p.vetPhone].filter(Boolean).join(' · ')}
              onPress={p.vetPhone ? () => Linking.openURL(`tel:${p.vetPhone.replace(/\s/g, '')}`) : undefined}
            />
          ))}
        </Card>
      ) : null}
    </Screen>
  );
}
