import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { Pet } from '@/core/types';

import { Button } from '../ui/Button';
import { Txt } from '../ui/Txt';
import { PetAvatar } from './PetAvatar';

export function PhotoPicker({ pet, onChange }: { pet: Pick<Pet, 'id' | 'name' | 'species' | 'photoUri'>; onChange: (uri: string | null) => void }) {
  const { t } = useTranslation();
  const [denied, setDenied] = useState(false);
  const pick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      setDenied(true);
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!res.canceled && res.assets[0]) onChange(res.assets[0].uri);
  };
  return (
    <View className="items-center gap-4">
      <PetAvatar pet={pet} size={140} />
      <Button label={pet.photoUri ? t('onboarding.photo.change') : t('onboarding.photo.choose')} icon="image-outline" variant="secondary" onPress={pick} />
      {denied ? (
        <Txt variant="caption" tone="dangerInk" align="center">
          {t('onboarding.photo.denied')}
        </Txt>
      ) : null}
    </View>
  );
}
