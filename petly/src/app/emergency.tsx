import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { PetAvatar } from '@/components/pets/PetAvatar';
import { PetPicker } from '@/components/pets/PetPicker';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { buildEmergencyPayload, EMERGENCY_FIELDS } from '@/core/documents';
import { palettes } from '@/core/theme/tokens';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { usePets } from '@/stores/pets';
import { useSettings } from '@/stores/settings';

/** Compact emergency profile + offline QR containing only owner-approved fields. */
export default function Emergency() {
  const { t } = useTranslation();
  const defaultPet = useDefaultPetId();
  const [petId, setPetId] = useState(defaultPet);
  const pet = usePets((s) => s.pets.find((p) => p.id === petId));
  const contact = useSettings((s) => s.emergencyContact);
  const fields = useSettings((s) => s.emergencyFields);
  const set = useSettings((s) => s.set);
  if (!pet) return <EmptyState icon="paw-outline" title={t('pets.emptyTitle')} body={t('pets.emptyBody')} />;
  const payload = buildEmergencyPayload(pet, fields, contact, t);
  const on = (f: (typeof EMERGENCY_FIELDS)[number]) => fields.includes(f);

  return (
    <Screen edges={[]} width="form">
      <Txt tone="textSecondary">{t('emergency.body')}</Txt>
      <PetPicker value={petId} onChange={setPetId} />
      <Card>
        <View className="gap-4">
          <View className="flex-row items-center gap-4">
            <PetAvatar pet={pet} size={72} shape="rounded" />
            <View className="flex-1 gap-1">
              <Txt variant="title">{pet.name}</Txt>
              {on('species') ? (
                <Txt tone="textSecondary">{[t(`species.${pet.species}`), pet.breed].filter(Boolean).join(' · ')}</Txt>
              ) : null}
            </View>
          </View>
          {on('allergies') && pet.allergies.length ? (
            <View className="flex-row flex-wrap gap-2">
              {pet.allergies.map((a) => (
                <Badge key={a} label={a} tone="danger" icon="warning-outline" />
              ))}
            </View>
          ) : null}
          {on('conditions') ? (
            <View className="gap-0.5">
              <Txt variant="caption" tone="textSecondary">
                {t('emergency.alerts')}
              </Txt>
              <Txt>{pet.conditions.join(', ') || t('emergency.noAlerts')}</Txt>
            </View>
          ) : null}
          {on('contact') && (contact.name || contact.phone) ? (
            <View className="gap-0.5">
              <Txt variant="caption" tone="textSecondary">
                {t('emergency.contact')}
              </Txt>
              <Txt>{`${contact.name} ${contact.phone}`.trim()}</Txt>
            </View>
          ) : null}
          {on('vet') && (pet.vetClinic || pet.vetPhone) ? (
            <View className="gap-0.5">
              <Txt variant="caption" tone="textSecondary">
                {t('emergency.fields.vet')}
              </Txt>
              <Txt>{[pet.vetClinic, pet.vetPhone].filter(Boolean).join(' · ')}</Txt>
            </View>
          ) : null}
          <View className="items-center gap-2 rounded-field bg-surface-muted p-4">
            {/* Always dark-on-white so scanners read it in either theme. */}
            <View className="rounded-field p-3" style={{ backgroundColor: palettes.light.surface }} accessible accessibilityLabel={t('emergency.qr')}>
              <QRCode value={payload} size={168} color={palettes.light.text} backgroundColor={palettes.light.surface} />
            </View>
            <Txt variant="caption" tone="textSecondary" align="center">
              {t('emergency.qrBody')}
            </Txt>
          </View>
        </View>
      </Card>
      <Card>
        <View className="gap-3">
          <SectionHeader title={t('emergency.contact')} />
          <TextField label={t('emergency.contactName')} value={contact.name} onChangeText={(name) => set({ emergencyContact: { ...contact, name } })} />
          <TextField label={t('emergency.contactPhone')} value={contact.phone} onChangeText={(phone) => set({ emergencyContact: { ...contact, phone } })} keyboardType="phone-pad" />
        </View>
      </Card>
      <Card>
        <SectionHeader title={t('emergency.privacy')} />
        <Txt variant="caption" tone="textSecondary">
          {t('emergency.privacyBody')}
        </Txt>
        {EMERGENCY_FIELDS.map((f) => (
          <SwitchRow
            key={f}
            label={t(`emergency.fields.${f}`)}
            value={on(f)}
            onValueChange={(v) => set({ emergencyFields: v ? [...fields, f] : fields.filter((x) => x !== f) })}
          />
        ))}
      </Card>
      <ComingSoonRow icon="globe-outline" label={t('emergency.publicProfile')} body={t('emergency.publicProfileBody')} />
    </Screen>
  );
}
