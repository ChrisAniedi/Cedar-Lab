import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { addDays } from '@/core/dates';
import { buildReportHtml, REPORT_SECTIONS, type ReportSection } from '@/core/documents';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { sharePdf } from '@/lib/share';
import { useDocuments } from '@/stores/documents';
import { useMedications } from '@/stores/medications';
import { usePets } from '@/stores/pets';
import { toast } from '@/stores/toast';
import { useVaccinations } from '@/stores/vaccinations';
import { useVisits } from '@/stores/visits';
import { useWeights } from '@/stores/weights';

type Range = '3m' | '1y' | 'all';
const RANGE_DAYS: Record<Range, number | null> = { '3m': 90, '1y': 365, all: null };
const PASSPORT: ReportSection[] = ['profile', 'vaccinations', 'medications'];

/** Selective PDF reports for vets, boarding, insurers and caregivers. */
export default function Reports() {
  const { t } = useTranslation();
  const f = useFormat();
  const { date } = useToday();
  const defaultPet = useDefaultPetId();
  const [petId, setPetId] = useState(defaultPet);
  const [range, setRange] = useState<Range>('1y');
  const [sections, setSections] = useState<ReportSection[]>([...REPORT_SECTIONS]);
  const [busy, setBusy] = useState(false);
  const pet = usePets((s) => s.pets.find((p) => p.id === petId));
  const mine = <T extends { petId: string }>(list: T[]) => list.filter((x) => x.petId === petId);
  const data = {
    vaccinations: mine(useVaccinations((s) => s.items)),
    medications: mine(useMedications((s) => s.medications)),
    visits: mine(useVisits((s) => s.items)),
    weights: mine(useWeights((s) => s.items)),
    documents: mine(useDocuments((s) => s.items)),
  };
  if (!pet) return <EmptyState icon="paw-outline" title={t('pets.emptyTitle')} body={t('pets.emptyBody')} />;

  const generate = async (chosen: ReportSection[], r: Range) => {
    setBusy(true);
    try {
      const days = RANGE_DAYS[r];
      const html = buildReportHtml({ pet, ...data }, chosen, { from: days ? addDays(date, -days) : null, to: days ? date : null }, t, { date: (k) => f.date(k), weight: f.weight, age: f.age }, date);
      await sharePdf(html, t('report.title', { name: pet.name }));
      toast(t('report.ready'));
    } catch {
      toast(t('report.failed'), 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen edges={[]} width="form" footer={<Button label={busy ? t('report.generating') : t('report.generate')} icon="document-outline" loading={busy} onPress={() => generate(sections, range)} disabled={!sections.length} full />}>
      <Txt tone="textSecondary">{t('report.body')}</Txt>
      <PetPicker value={petId} onChange={setPetId} />
      <FieldLabel label={t('report.dateRange')}>
        <OptionChips options={(['3m', '1y', 'all'] as const).map((r) => ({ value: r, label: t(`report.ranges.${r}`) }))} value={range} onChange={setRange} />
      </FieldLabel>
      <FieldLabel label={t('report.sectionsLabel')}>
        <OptionChips multiple options={REPORT_SECTIONS.map((s) => ({ value: s, label: t(`report.sections.${s}`) }))} value={sections} onChange={setSections} />
      </FieldLabel>
      <Button label={t('report.passport')} icon="id-card-outline" variant="secondary" onPress={() => generate(PASSPORT, 'all')} disabled={busy} />
      <Disclaimer text={t('report.disclaimer')} />
    </Screen>
  );
}
