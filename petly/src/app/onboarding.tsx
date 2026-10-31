import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { PreferencesFields } from '@/components/onboarding/PreferencesFields';
import { BasicsFields } from '@/components/pets/BasicsFields';
import { HealthFields } from '@/components/pets/HealthFields';
import { PhotoPicker } from '@/components/pets/PhotoPicker';
import { SpeciesBreedFields } from '@/components/pets/SpeciesBreedFields';
import { VetFields } from '@/components/pets/VetFields';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { required } from '@/core/validation';
import { ensurePermission } from '@/lib/notifications';
import { useHousehold } from '@/stores/household';
import { createPet, loadSampleData } from '@/stores/lifecycle';
import { emptyPet, type NewPet } from '@/stores/pets';
import { useSettings } from '@/stores/settings';

const TOTAL = 9;

/** Nine short steps. Optional ones can be skipped; only the pet's name is required. */
export default function Onboarding() {
  const { t } = useTranslation();
  const router = useRouter();
  const settings = useSettings();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(settings.name);
  const [country, setCountry] = useState(settings.country);
  const [pet, setPet] = useState<NewPet>(emptyPet);
  const [prefs, setPrefs] = useState({ units: settings.units, timeFormat: settings.timeFormat, notifications: settings.notifications.enabled });
  const [nameError, setNameError] = useState<'required' | null>(null);
  const set = (c: Partial<NewPet>) => setPet((p) => ({ ...p, ...c }));
  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const saveProfile = () => {
    settings.set({ name: name.trim(), country: country.trim().toUpperCase() });
    useHousehold.getState().setSelfName(name.trim());
  };

  const finish = async () => {
    saveProfile();
    settings.set({ units: prefs.units, timeFormat: prefs.timeFormat, onboardingComplete: true });
    settings.setNotifications({ enabled: prefs.notifications });
    if (pet.name.trim()) createPet({ ...pet, name: pet.name.trim() });
    if (prefs.notifications) await ensurePermission();
    router.replace('/(tabs)');
  };

  const exploreSample = () => {
    loadSampleData();
    settings.set({ onboardingComplete: true });
    router.replace('/(tabs)');
  };

  const shell = { step, total: TOTAL, onBack: step > 1 ? back : undefined };

  switch (step) {
    case 1:
      return (
        <OnboardingShell {...shell} title={t('onboarding.welcome.title')} body={t('onboarding.welcome.body')} onNext={next} nextLabel={t('onboarding.welcome.start')}>
          <View className="gap-2">
            <Button label={t('onboarding.welcome.sample')} variant="secondary" icon="flask-outline" onPress={exploreSample} full />
            <Txt variant="caption" tone="textSecondary" align="center">
              {t('onboarding.welcome.sampleNote')}
            </Txt>
          </View>
        </OnboardingShell>
      );
    case 2:
      return (
        <OnboardingShell
          {...shell}
          title={t('onboarding.you.title')}
          body={t('onboarding.you.body')}
          onNext={() => {
            saveProfile();
            next();
          }}
        >
          <TextField label={t('auth.name')} value={name} onChangeText={setName} autoComplete="name" optional />
          <TextField label={t('onboarding.you.country')} hint={t('onboarding.you.countryHint')} value={country} onChangeText={setCountry} autoCapitalize="characters" maxLength={2} optional />
        </OnboardingShell>
      );
    case 3:
      return (
        <OnboardingShell
          {...shell}
          title={t('onboarding.pet.title')}
          body={t('onboarding.pet.body')}
          onNext={() => {
            const e = required(pet.name);
            setNameError(e === 'required' ? 'required' : null);
            if (!e) next();
          }}
        >
          <TextField label={t('onboarding.pet.name')} value={pet.name} onChangeText={(v) => set({ name: v })} error={nameError} autoFocus />
        </OnboardingShell>
      );
    case 4:
      return (
        <OnboardingShell {...shell} title={t('onboarding.species.title')} body={t('onboarding.species.body')} onNext={next}>
          <SpeciesBreedFields species={pet.species} breed={pet.breed} onChange={set} />
        </OnboardingShell>
      );
    case 5:
      return (
        <OnboardingShell {...shell} title={t('onboarding.basics.title')} body={t('onboarding.basics.body')} onNext={next} onSkip={next}>
          <BasicsFields birthDate={pet.birthDate} sex={pet.sex} weightKg={pet.weightKg} onChange={set} />
        </OnboardingShell>
      );
    case 6:
      return (
        <OnboardingShell {...shell} title={t('onboarding.photo.title')} body={t('onboarding.photo.body')} onNext={next} onSkip={next}>
          <PhotoPicker pet={{ ...pet, id: 'draft' }} onChange={(photoUri) => set({ photoUri })} />
        </OnboardingShell>
      );
    case 7:
      return (
        <OnboardingShell {...shell} title={t('onboarding.health.title')} body={t('onboarding.health.body')} onNext={next} onSkip={next}>
          <HealthFields allergies={pet.allergies} conditions={pet.conditions} onChange={set} />
        </OnboardingShell>
      );
    case 8:
      return (
        <OnboardingShell {...shell} title={t('onboarding.vet.title')} body={t('onboarding.vet.body')} onNext={next} onSkip={next}>
          <VetFields vetName={pet.vetName} vetClinic={pet.vetClinic} vetPhone={pet.vetPhone} onChange={set} />
        </OnboardingShell>
      );
    default:
      return (
        <OnboardingShell {...shell} title={t('onboarding.prefs.title')} body={t('onboarding.prefs.body')} onNext={finish} nextLabel={t('onboarding.prefs.finish')}>
          <PreferencesFields {...prefs} onChange={(c) => setPrefs((p) => ({ ...p, ...c }))} />
        </OnboardingShell>
      );
  }
}
