import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share, View } from 'react-native';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Txt } from '@/components/ui/Txt';
import { buildHandoverText, HANDOVER_SECTIONS, handoverHtml, type HandoverSection } from '@/core/documents';
import { isMedicationActive } from '@/core/health';
import { occursOn } from '@/core/recurrence';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { sharePdf } from '@/lib/share';
import { useCare } from '@/stores/care';
import { useMedications } from '@/stores/medications';
import { usePets } from '@/stores/pets';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

/** Build a sitter care guide and share it as text or PDF. */
export default function Handover() {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date } = useToday();
  const defaultPet = useDefaultPetId();
  const [petId, setPetId] = useState(defaultPet);
  const [sections, setSections] = useState<HandoverSection[]>([...HANDOVER_SECTIONS]);
  const pet = usePets((s) => s.pets.find((p) => p.id === petId));
  const tasks = useCare((s) => s.tasks);
  const meds = useMedications((s) => s.medications);
  const contact = useSettings((s) => s.emergencyContact);
  if (!pet) return <EmptyState icon="paw-outline" title={t('pets.emptyTitle')} body={t('pets.emptyBody')} />;

  const text = buildHandoverText(
    {
      pet,
      routines: tasks
        .filter((x) => x.petId === pet.id && x.category !== 'medication' && occursOn(x.recurrence, date))
        .sort((a, b) => a.time.localeCompare(b.time))
        .map((x) => ({ time: f.time(x.time), title: x.title })),
      medications: meds
        .filter((m) => m.petId === pet.id && isMedicationActive(m, date))
        .map((m) => ({ name: m.name, dosage: `${m.dosage} ${m.dosageUnit}`.trim(), times: m.times.map(f.time), instructions: m.instructions })),
      emergencyContact: contact,
    },
    sections,
    t,
  );

  const shareText = () => Share.share({ title: t('handover.doc.title', { name: pet.name }), message: text }).catch(() => {});
  const sharePdfFile = async () => {
    try {
      await sharePdf(handoverHtml(text), t('handover.doc.title', { name: pet.name }));
    } catch {
      toast(t('report.failed'), 'danger');
    }
  };

  return (
    <Screen edges={[]} width="form">
      <Txt tone="textSecondary">{t('handover.body')}</Txt>
      <PetPicker value={petId} onChange={setPetId} />
      <FieldLabel label={t('handover.include')}>
        <OptionChips multiple options={HANDOVER_SECTIONS.map((s) => ({ value: s, label: t(`handover.sections.${s}`) }))} value={sections} onChange={setSections} />
      </FieldLabel>
      {!contact.name && !contact.phone && sections.includes('emergency') ? (
        <Button label={t('emergency.contact')} icon="call-outline" variant="ghost" onPress={() => router.push('/emergency')} />
      ) : null}
      <Card>
        <SectionHeader title={t('handover.preview')} />
        <Txt variant="caption" selectable>
          {text}
        </Txt>
      </Card>
      <View className="gap-2">
        <Button label={t('handover.shareGuide')} icon="share-outline" onPress={shareText} full />
        <Button label={t('handover.sharePdf')} icon="document-outline" variant="secondary" onPress={sharePdfFile} full />
      </View>
      <ComingSoonRow icon="link-outline" label={t('handover.secureLinks')} body={t('handover.secureLinksBody')} />
    </Screen>
  );
}
