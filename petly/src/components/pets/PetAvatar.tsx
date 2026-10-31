import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { Pet } from '@/core/types';

import { PetIllustration } from './PetIllustration';

interface PetAvatarProps {
  pet: Pick<Pet, 'id' | 'name' | 'species' | 'photoUri'>;
  size?: number;
  shape?: 'circle' | 'rounded';
}

/** The pet's photo, or an illustrated portrait until one is added. */
export function PetAvatar({ pet, size = 56, shape = 'circle' }: PetAvatarProps) {
  const { t } = useTranslation();
  const radius = shape === 'circle' ? size / 2 : Math.min(20, size / 4);
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={t('a11y.petPhoto', { name: pet.name })}>
      {pet.photoUri ? (
        <Image source={{ uri: pet.photoUri }} style={{ width: size, height: size, borderRadius: radius }} contentFit="cover" transition={150} />
      ) : (
        <PetIllustration id={pet.id} species={pet.species} size={size} radius={radius} />
      )}
    </View>
  );
}
